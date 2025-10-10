import { useEffect, useRef } from "react";
import { AreaSeries, createChart, ColorType } from "lightweight-charts";
import { lineColors, areaTopColors, intervals, type Interval } from "../components/chart/chartConfigurations";


interface Data {
    time: string,
    value: number
}

const useChart = (data: Data[]) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        // Clear previous content
        chartContainerRef.current.innerHTML = "";
        const isDarkMode = true;
        console.log("isDarkMode", isDarkMode);
        const backgroundColor = isDarkMode ? "#1f2937" : "white";
        const textColor = isDarkMode ? "white" : "black";

        //for developing purposes, chart will autochange by changed screen
        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                });
            }
        };

        //Create chart
        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: backgroundColor },
                textColor,
            },
            width: chartContainerRef.current.clientWidth,
            height: 120,
            grid: {
                vertLines: {
                    visible: false,
                },
                horzLines: {
                    visible: false,
                },
            },
        });
        chart.timeScale().fitContent();

        //Insert data
        const newSeries = chart.addSeries(AreaSeries, {
            // lineColors["1D"],
            topColor: areaTopColors["1D"],
            bottomColor: 'rgba(41, 98, 255, 0.28)',
        });

        //Set range interval and colors for chart
        function setChartInterval(interval: Interval) {
            newSeries.setData(data);
            newSeries.applyOptions({
                lineColor: lineColors[interval],
                topColor: areaTopColors[interval],
                bottomColor: 'rgba(41, 98, 255, 0.28)',
            });
            chart.timeScale().fitContent();
        }
        setChartInterval("1D");

        //Range interval buttons
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
            button.addEventListener("click", () => setChartInterval(interval));
            buttonsContainer.appendChild(button);
        });

        //Insert buttons div element
        chartContainerRef.current.insertBefore(
            buttonsContainer,
            chartContainerRef.current.firstChild
        );

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
        };
    }, [data]);


    return chartContainerRef;

}

export default useChart;