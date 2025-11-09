import { useEffect, useRef } from "react";
import { AreaSeries, createChart, ColorType, type IChartApi, type ISeriesApi, type UTCTimestamp } from "lightweight-charts";
import { lineColors, areaTopColors, intervals, type Interval } from "../components/chart/chartConfigurations";


export interface Data {
    time: UTCTimestamp, // Unix timestamp in seconds
    value: number
}

export interface SeriesData {
    data: Data[];
    label: string;
    color: string;
    topColor?: string;
    livePrice?: number;
}

const useChart = (
    data: Data[] | SeriesData[], 
    graphRange: string, 
    setGraphRange?: (range: string) => void, 
    livePrice?: number
) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<'Area'> | null>(null);
    const seriesMapRef = useRef<Map<string, ISeriesApi<'Area'>>>(new Map());
    const priceLinesRef = useRef<Map<string, any>>(new Map());
    const buttonsContainerRef = useRef<HTMLDivElement | null>(null);
    const priceLineRef = useRef<any>(null);
    const isMultiSeries = Array.isArray(data) && data.length > 0 && 'label' in data[0];

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const isDarkMode = true;
        const backgroundColor = isDarkMode ? "#1f2937" : "white";
        const textColor = isDarkMode ? "white" : "black";

        const calculateChartHeight = () => {
            if (!chartContainerRef.current) return 300;
            const containerWidth = chartContainerRef.current.clientWidth;
            if (containerWidth < 640) {
                return Math.max(containerWidth * 0.65, 300);
            } else if (containerWidth < 1024) {
                return containerWidth * 0.45;
            } else {
                return containerWidth * 0.25;
            }
        };

        if (!chartRef.current) {
            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor,
                },
                width: chartContainerRef.current.clientWidth,
                height: calculateChartHeight(),
                grid: {
                    vertLines: { visible: false },
                    horzLines: { visible: false },
                },
                timeScale: {
                    timeVisible: true,
                    secondsVisible: false,
                },
            });
            chart.timeScale().fitContent();
            chartRef.current = chart;

            // For single series mode (backward compatibility)
            if (!isMultiSeries) {
                const series = chart.addSeries(AreaSeries, {
                    topColor: areaTopColors["1D"],
                    bottomColor: 'rgba(41, 98, 255, 0.28)',
                });
                seriesRef.current = series;
            } else {
                // For multi-series mode, series will be created dynamically
            }

            // Buttons only once
            if (!buttonsContainerRef.current) {
                const buttonsContainer = document.createElement("div");
                buttonsContainer.style.display = "flex";
                buttonsContainer.style.gap = "10px";
                buttonsContainer.style.marginBottom = "10px";
                buttonsContainer.style.justifyContent = "flex-start";

                intervals.forEach((interval) => {
                    const button = document.createElement("button");
                    button.style.backgroundColor = isDarkMode ? "#374151" : "#f3f4f6";
                    button.style.color = textColor;
                    button.style.paddingLeft = "15px";
                    button.style.paddingRight = "15px";
                    button.style.paddingTop = "5px";
                    button.style.paddingBottom = "5px";
                    button.style.borderRadius = "10px";
                    button.style.border = "none";
                    button.style.cursor = "pointer";
                    button.innerText = interval;
                    button.addEventListener("click", () => {
                        setGraphRange?.(interval);
                    });
                    buttonsContainer.appendChild(button);
                });

                chartContainerRef.current.insertBefore(
                    buttonsContainer,
                    chartContainerRef.current.firstChild
                );
                buttonsContainerRef.current = buttonsContainer;
            }

            const handleResize = () => {
                if (chartContainerRef.current && chartRef.current) {
                    chartRef.current.applyOptions({
                        width: chartContainerRef.current.clientWidth,
                        height: calculateChartHeight()
                    });
                }
            };
            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
                // Clean up all series
                seriesMapRef.current.forEach((series) => {
                    try {
                        chartRef.current?.removeSeries(series);
                    } catch {}
                });
                seriesMapRef.current.clear();
                priceLinesRef.current.clear();
                chartRef.current?.remove();
                chartRef.current = null;
                seriesRef.current = null;
                if (buttonsContainerRef.current) {
                    buttonsContainerRef.current.remove();
                    buttonsContainerRef.current = null;
                }
            };
        }
    }, []);

    // Update data efficiently - single series mode
    useEffect(() => {
        if (isMultiSeries || !chartRef.current || !seriesRef.current) return;
        const chart = chartRef.current;
        const series = seriesRef.current;
        const dataArray = data as Data[];
        series.setData(dataArray);
        chart.timeScale().fitContent();
        if (dataArray.length > 0) {
            const firstTime = dataArray[0].time;
            const lastTime = dataArray[dataArray.length - 1].time;
            chart.timeScale().setVisibleLogicalRange({
                from: firstTime,
                to: lastTime,
            });
            chart.timeScale().applyOptions({
                fixLeftEdge: true,
                fixRightEdge: true,
            });
        }
    }, [data, isMultiSeries]);

    // Update data efficiently - multi-series mode
    useEffect(() => {
        if (!isMultiSeries || !chartRef.current) return;
        const chart = chartRef.current;
        const seriesDataArray = data as SeriesData[];

        // Remove series that are no longer in the data
        const currentLabels = new Set(seriesDataArray.map(s => s.label));
        seriesMapRef.current.forEach((series, label) => {
            if (!currentLabels.has(label)) {
                try {
                    chart.removeSeries(series);
                    seriesMapRef.current.delete(label);
                    priceLinesRef.current.delete(label);
                } catch {}
            }
        });

        // Create or update series
        seriesDataArray.forEach((seriesData) => {
            let series = seriesMapRef.current.get(seriesData.label);
            
            if (!series) {
                // Create new series
                series = chart.addSeries(AreaSeries, {
                    lineColor: seriesData.color,
                    topColor: seriesData.topColor || seriesData.color + "40",
                    bottomColor: seriesData.color + "10",
                    title: seriesData.label,
                });
                seriesMapRef.current.set(seriesData.label, series);
            }

            // Update series data
            series.setData(seriesData.data);

            // Update series options
            series.applyOptions({
                lineColor: seriesData.color,
                topColor: seriesData.topColor || seriesData.color + "40",
                bottomColor: seriesData.color + "10",
            });

            // Handle live price line for this series
            if (seriesData.livePrice != null) {
                const existingPriceLine = priceLinesRef.current.get(seriesData.label);
                if (existingPriceLine) {
                    try {
                        series.removePriceLine(existingPriceLine);
                    } catch {}
                }
                try {
                    const priceLine = series.createPriceLine({
                        price: seriesData.livePrice,
                        color: '#f59e0b',
                        lineWidth: 1,
                        lineStyle: 2, // Dashed
                        axisLabelVisible: true,
                        title: `${seriesData.label} Live`,
                    });
                    priceLinesRef.current.set(seriesData.label, priceLine);
                } catch {}
            }
        });

        // Fit content after all updates
        chart.timeScale().fitContent();
        if (seriesDataArray.length > 0 && seriesDataArray[0].data.length > 0) {
            const firstTime = seriesDataArray[0].data[0].time;
            const lastTime = seriesDataArray[0].data[seriesDataArray[0].data.length - 1].time;
            chart.timeScale().setVisibleLogicalRange({
                from: firstTime,
                to: lastTime,
            });
            chart.timeScale().applyOptions({
                fixLeftEdge: true,
                fixRightEdge: true,
            });
        }
    }, [data, isMultiSeries]);

    // Update colors/options on graphRange change only (single series mode)
    useEffect(() => {
        if (isMultiSeries || !seriesRef.current) return;
        seriesRef.current.applyOptions({
            lineColor: lineColors[graphRange as Interval],
            topColor: areaTopColors[graphRange as Interval],
            bottomColor: 'rgba(41, 98, 255, 0.28)',
        });
    }, [graphRange, isMultiSeries]);

    // Live price overlay line
    useEffect(() => {
        if (!seriesRef.current || livePrice == null) return;
        try {
            if (priceLineRef.current) {
                seriesRef.current.removePriceLine(priceLineRef.current);
            }
            priceLineRef.current = seriesRef.current.createPriceLine({
                price: livePrice,
                color: '#f59e0b',
                lineWidth: 2,
                lineStyle: 0,
                axisLabelVisible: true,
                title: 'Live',
            });
        } catch {
            // no-op
        }
    }, [livePrice]);


    return chartContainerRef;

}

export default useChart;