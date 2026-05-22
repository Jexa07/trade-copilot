"use client";

import { useEffect, useRef } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";

export default function StockChart({ candles }) {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current || !candles) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 380,
      layout: {
        background: {
          type: "solid",
          color: "transparent",
        },
        textColor: "#6b6760",
        fontSize: 11,
        fontFamily: "var(--font-plus-jakarta), ui-sans-serif, sans-serif",
      },
      grid: {
        vertLines: { color: "rgba(26, 24, 20, 0.05)" },
        horzLines: { color: "rgba(26, 24, 20, 0.05)" },
      },
      crosshair: {
        vertLine: {
          color: "rgba(140, 111, 74, 0.4)",
          width: 1,
          style: 3,
          labelBackgroundColor: "#8c6f4a",
        },
        horzLine: {
          color: "rgba(140, 111, 74, 0.4)",
          width: 1,
          style: 3,
          labelBackgroundColor: "#8c6f4a",
        },
      },
      timeScale: {
        borderColor: "rgba(26, 24, 20, 0.08)",
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: "rgba(26, 24, 20, 0.08)",
      },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#2d6a4a",
      downColor: "#a83424",
      borderUpColor: "#2d6a4a",
      borderDownColor: "#a83424",
      wickUpColor: "#2d6a4a",
      wickDownColor: "#a83424",
    });

    candlestickSeries.setData(candles);
    chart.timeScale().fitContent();

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length === 0 || !entries[0].contentRect) return;
      chart.applyOptions({ width: entries[0].contentRect.width });
    });
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [candles]);

  return <div ref={chartContainerRef} className="w-full relative" />;
}