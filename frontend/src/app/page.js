"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import StockChart from "../components/StockChart";

export default function Home() {
  const [symbol, setSymbol] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const watchlist = [
    "TCS.NS",
    "RELIANCE.NS",
    "INFY.NS",
    "HDFCBANK.NS",
    "ICICIBANK.NS"
  ];

  useEffect(() => {
    if (!symbol || !data) return;

    const interval = setInterval(() => {
      fetchMarketData();
    }, 15000);

    return () => clearInterval(interval);
  }, [symbol, data]);

  async function fetchMarketData(customSymbol = null) {
    const finalSymbol = customSymbol || symbol;
    if (!finalSymbol) return;

    setError("");

    const cleanSymbol = finalSymbol.trim().toUpperCase();
    const tickerRegex = /^[A-Z0-9.-]+$/;
    if (!tickerRegex.test(cleanSymbol)) {
      setError("Invalid symbol format. Use letters, numbers, dots, or dashes (e.g. TCS.NS, AAPL).");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://trade-copilot-backend.onrender.com/market/${symbol}`
      );
      setData(response.data);
    } catch (err) {
      console.error(err);
      const statusText = err.response?.data?.detail || "Failed to fetch market data. Please verify the stock symbol exists.";
      setError(statusText);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#11100d] flex relative overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="w-80 bg-[#f0ede6] border-r border-[#dfd9ce] p-6 flex flex-col justify-between z-10 shrink-0">
        <div className="flex flex-col">
          {/* Logo & Header */}
          <div className="flex items-center gap-3 mb-10 mt-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8c6f4a] to-[#735939] flex items-center justify-center shadow-md shadow-[#8c6f4a]/10">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight font-serif text-[#11100d]">
                Trade Copilot
              </h2>
              <span className="text-[9px] text-[#786851] font-extrabold tracking-widest uppercase font-sans">
                AI CONTEXT LAYER
              </span>
            </div>
          </div>

          {/* Watchlist Section */}
          <div>
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="text-xs font-extrabold text-[#4e4a43] uppercase tracking-widest font-sans">
                Watchlist
              </span>
              <span className="w-2 h-2 rounded-full bg-[#8c6f4a] animate-pulse" />
            </div>

            <div className="space-y-2.5">
              {watchlist.map((stock) => {
                const isActive = symbol === stock;
                return (
                  <button
                    key={stock}
                    onClick={() => {
                      setSymbol(stock);
                      fetchMarketData(stock);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between group ${isActive
                        ? "bg-white border-[#8c6f4a] text-[#8c6f4a] shadow-sm font-bold"
                        : "bg-white/40 hover:bg-white/80 border-[#dfd9ce] text-[#4e4a43] hover:text-[#11100d]"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isActive ? "bg-[#f5ede1] text-[#8c6f4a]" : "bg-[#dfd9ce] text-[#786851] group-hover:bg-[#d5ccba]"
                        }`}>
                        <span className="text-xs font-extrabold font-sans">{stock.slice(0, 2)}</span>
                      </div>
                      <span className="font-bold text-sm tracking-tight font-sans">{stock}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded transition-all ${isActive ? "bg-[#f5ede1] text-[#8c6f4a]" : "bg-[#dfd9ce] text-[#4e4a43]"
                        }`}>
                        NSE
                      </span>
                      <svg className={`w-4 h-4 transition-transform duration-200 ${isActive ? "text-[#8c6f4a] translate-x-0.5" : "text-[#807b73] group-hover:translate-x-0.5 group-hover:text-[#4e4a43]"
                        }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>


      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto max-h-screen z-10 flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 mt-2">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2 font-serif text-[#11100d] leading-none">
              AI Market Context
            </h1>
            <p className="text-[#4e4a43] text-sm font-semibold tracking-wide font-sans">
              Instant, AI-synthesized real-time market intelligence for key assets.
            </p>
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-3 max-w-md w-full">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#807b73]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Enter stock symbol (e.g. TCS.NS)..."
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && fetchMarketData()}
                className="w-full bg-white border border-[#dfd9ce] focus:border-[#8c6f4a] rounded-xl pl-11 pr-4 py-3 text-sm text-[#11100d] placeholder-[#807b73] outline-none transition-all duration-200 shadow-sm focus:shadow-[0_0_12px_rgba(140,111,74,0.08)] font-bold"
              />
            </div>
            <button
              type="button"
              onClick={() => fetchMarketData()}
              disabled={loading}
              className="bg-[#8c6f4a] hover:bg-[#735939] text-white px-6 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2 shadow-sm cursor-pointer font-sans"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="font-extrabold">Analyzing...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="font-extrabold">Analyze</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-[#fdf2f0] border border-[#f1b3ab] text-[#6b140a] px-5 py-4 rounded-xl flex items-center gap-3 shadow-sm mb-6 animate-fade-in font-sans">
            <div className="w-8 h-8 rounded-lg bg-[#f1b3ab]/30 flex items-center justify-center text-[#9a2b1d] shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-extrabold text-[#6b140a]">Analysis Failed</p>
              <p className="text-xs text-[#6b140a]/90 mt-0.5 font-bold">{error}</p>
            </div>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="bg-white border border-[#dfd9ce] rounded-2xl p-8 animate-pulse space-y-6 flex-1 flex flex-col justify-center min-h-[400px]">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-[#f0ede6] rounded-xl"></div>
              <div className="space-y-2">
                <div className="h-4 w-48 bg-[#f0ede6] rounded"></div>
                <div className="h-3 w-32 bg-[#f0ede6] rounded"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-[#f0ede6] rounded w-full"></div>
              <div className="h-4 bg-[#f0ede6] rounded w-5/6"></div>
              <div className="h-4 bg-[#f0ede6] rounded w-4/5"></div>
            </div>
            <div className="h-64 bg-[#f0ede6]/50 rounded-xl border border-[#dfd9ce]"></div>
          </div>
        )}

        {/* Main Dashboard Panel */}
        {!loading && data && (
          <div className="space-y-6 flex-1 flex flex-col">

            {/* AI Insights & Trend Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Left 2 cols: AI Insights */}
              <div className={`lg:col-span-2 p-6 rounded-2xl border relative overflow-hidden flex flex-col justify-between group ${data.context.trend === "Bullish"
                  ? "panel-bullish"
                  : data.context.trend === "Bearish"
                    ? "panel-bearish"
                    : "panel-neutral"
                }`}>
                {/* Background Ambient SVG Decoration */}
                <div className="absolute right-0 bottom-0 opacity-[0.03] text-[#11100d] pointer-events-none select-none translate-x-6 translate-y-6">
                  <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#dfd9ce] flex items-center justify-center text-[#8c6f4a] shadow-xs">
                        <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h2 className="text-lg font-bold tracking-tight font-serif text-[#11100d]">AI Market Insight</h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-extrabold tracking-wider uppercase ${data.context.trend === "Bullish"
                          ? "badge-success"
                          : data.context.trend === "Bearish"
                            ? "badge-danger"
                            : "badge-neutral"
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${data.context.trend === "Bullish"
                            ? "bg-[#205c3c] animate-pulse"
                            : data.context.trend === "Bearish"
                              ? "bg-[#9a2b1d] animate-pulse"
                              : "bg-[#786851] animate-pulse"
                          }`} />
                        {data.context.trend} Sentiment
                      </span>
                    </div>
                  </div>

                  <p className="text-[#11100d] text-base leading-relaxed tracking-wide font-serif font-medium">
                    {data.ai_summary}
                  </p>
                </div>
              </div>

              {/* Right 1 col: Key metric Highlight */}
              <div className="bg-white border border-[#dfd9ce] p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden group shadow-sm">
                <div className="absolute right-[-20px] top-[-20px] w-32 h-32 rounded-full bg-[#f5ede1] blur-2xl group-hover:bg-[#eedfcb] transition-all duration-500" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold text-[#786851] uppercase tracking-widest font-sans">Asset Valuation</span>
                    <div className="w-8 h-8 rounded-lg bg-[#f0ede6] border border-[#dfd9ce] flex items-center justify-center text-[#4e4a43] shadow-2xs">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-[#786851] font-sans uppercase tracking-wider">Current Close Price</span>
                  <div className="text-3xl font-extrabold mt-1 tracking-tight flex items-baseline gap-1 text-[#11100d] font-sans">
                    ₹{Number(data.market_data.close).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </div>
                </div>

                <div className="border-t border-[#dfd9ce] pt-4 mt-4 flex items-center justify-between text-xs text-[#786851] font-sans relative z-10">
                  <span className="font-bold uppercase tracking-wider">Ticker Code</span>
                  <span className="font-mono bg-[#f0ede6] px-2.5 py-1 rounded border border-[#dfd9ce] text-[#11100d] font-extrabold">{symbol}</span>
                </div>
              </div>

            </div>

            {/* Market Chart Container */}
            <div className="bg-white border border-[#dfd9ce] p-6 rounded-2xl flex-1 flex flex-col shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#eff6f2] border border-[#aedcc3] flex items-center justify-center text-[#205c3c]">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold tracking-tight font-serif text-[#11100d]">Market Candlesticks</h2>
                    <p className="text-[10px] text-[#786851] uppercase tracking-widest font-extrabold font-sans">TradingView Lightweight Chart</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-[#f0ede6] p-1.5 rounded-lg border border-[#dfd9ce]">
                  <span className="text-[11px] px-2.5 py-1 rounded bg-white text-[#8c6f4a] font-bold border border-[#dfd9ce] shadow-xs font-sans">15m Interval</span>
                  <span className="text-[11px] px-2.5 py-1 rounded hover:bg-white/40 text-[#4e4a43] font-bold cursor-pointer font-sans">1h</span>
                  <span className="text-[11px] px-2.5 py-1 rounded hover:bg-white/40 text-[#4e4a43] font-bold cursor-pointer font-sans">1d</span>
                </div>
              </div>

              <div className="bg-[#fbfaf7] rounded-xl p-4 border border-[#dfd9ce]">
                <StockChart candles={data.candles} />
              </div>
            </div>

            {/* Technical Indicators Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

              {/* Card 1: Trend */}
              <div className="bg-white border border-[#dfd9ce] p-5 rounded-2xl flex items-center justify-between shadow-xs hover:shadow-md hover:border-[#c4bcae] transition-all duration-200 group relative overflow-hidden">
                <div className={`absolute top-[-30px] right-[-30px] w-20 h-20 rounded-full blur-xl opacity-10 ${data.context.trend === "Bullish" ? "bg-[#205c3c]" : data.context.trend === "Bearish" ? "bg-[#9a2b1d]" : "bg-[#786851]"
                  }`} />
                <div className="space-y-1 z-10">
                  <span className="text-[11px] font-extrabold text-[#786851] uppercase tracking-widest font-sans">Trend Sentiment</span>
                  <p className={`text-2xl font-extrabold tracking-tight font-sans ${data.context.trend === "Bullish"
                      ? "text-[#205c3c]"
                      : data.context.trend === "Bearish"
                        ? "text-[#9a2b1d]"
                        : "text-[#786851]"
                    }`}>
                    {data.context.trend}
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all z-10 ${data.context.trend === "Bullish"
                    ? "bg-[#eff6f2] border-[#aedcc3] text-[#205c3c]"
                    : data.context.trend === "Bearish"
                      ? "bg-[#fdf2f0] border-[#f1b3ab] text-[#9a2b1d]"
                      : "bg-[#f5f2eb] border-[#d5ccba] text-[#786851]"
                  }`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>

              {/* Card 2: RSI */}
              <div className="bg-white border border-[#dfd9ce] p-5 rounded-2xl flex items-center justify-between shadow-xs hover:shadow-md hover:border-[#c4bcae] transition-all duration-200 group relative overflow-hidden">
                <div className="absolute top-[-30px] right-[-30px] w-20 h-20 rounded-full bg-[#f5ede1] blur-xl opacity-15" />
                <div className="space-y-1 z-10">
                  <span className="text-[11px] font-extrabold text-[#786851] uppercase tracking-widest font-sans">Relative Strength (RSI)</span>
                  <p className="text-2xl font-extrabold tracking-tight text-[#11100d] font-sans">
                    {data.market_data.rsi}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#f0ede6] border border-[#dfd9ce] flex items-center justify-center text-[#4e4a43] group-hover:border-[#8c6f4a] group-hover:text-[#8c6f4a] transition-all z-10 shadow-3xs">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                  </svg>
                </div>
              </div>

              {/* Card 3: MACD */}
              <div className="bg-white border border-[#dfd9ce] p-5 rounded-2xl flex items-center justify-between shadow-xs hover:shadow-md hover:border-[#c4bcae] transition-all duration-200 group relative overflow-hidden">
                <div className="absolute top-[-30px] right-[-30px] w-20 h-20 rounded-full bg-[#f5ede1] blur-xl opacity-15" />
                <div className="space-y-1 z-10">
                  <span className="text-[11px] font-extrabold text-[#786851] uppercase tracking-widest font-sans">MACD Signal</span>
                  <p className="text-2xl font-extrabold tracking-tight text-[#11100d] font-sans">
                    {data.market_data.macd}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#f0ede6] border border-[#dfd9ce] flex items-center justify-center text-[#4e4a43] group-hover:border-[#8c6f4a] group-hover:text-[#8c6f4a] transition-all z-10 shadow-3xs">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
              </div>

              {/* Card 4: Close Valuation */}
              <div className="bg-white border border-[#dfd9ce] p-5 rounded-2xl flex items-center justify-between shadow-xs hover:shadow-md hover:border-[#c4bcae] transition-all duration-200 group relative overflow-hidden">
                <div className="absolute top-[-30px] right-[-30px] w-20 h-20 rounded-full bg-[#f5ede1] blur-xl opacity-15" />
                <div className="space-y-1 z-10">
                  <span className="text-[11px] font-extrabold text-[#786851] uppercase tracking-widest font-sans">Asset Close</span>
                  <p className="text-2xl font-extrabold tracking-tight text-[#11100d] font-sans">
                    ₹{data.market_data.close}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#f0ede6] border border-[#dfd9ce] flex items-center justify-center text-[#8c6f4a] font-extrabold font-sans z-10 shadow-3xs">
                  ₹
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Empty State when no data has been queried yet */}
        {!loading && !data && (
          <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] border border-dashed border-[#c4bcae] rounded-2xl bg-white/20 p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white border border-[#dfd9ce] flex items-center justify-center text-[#8c6f4a] mb-6 shadow-sm">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-[#11100d] font-serif mb-2">No Stock Selected</h3>
            <p className="text-[#4e4a43] text-sm max-w-sm mx-auto leading-relaxed font-sans font-medium">
              Select an asset from the Watchlist on the left or search for any stock symbol to generate an AI market context analysis.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}