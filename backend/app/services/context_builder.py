def build_market_context(data):

    rsi = data["rsi"]
    macd = data["macd"]
    ema_20 = data["ema_20"]
    ema_50 = data["ema_50"]
    close = data["close"]

    trend = "Neutral"
    momentum = "Neutral"

    # Trend Analysis
    if ema_20 > ema_50:
        trend = "Bullish"
    elif ema_20 < ema_50:
        trend = "Bearish"

    # Momentum Analysis
    if rsi > 60:
        momentum = "Strong"
    elif rsi < 40:
        momentum = "Weak"

    # Market Summary
    summary = (
    f"{data['symbol']} is currently showing a {trend.lower()} trend structure. "
    f"Momentum appears {momentum.lower()} with RSI at {round(rsi, 2)}. "
    f"The stock is trading near ₹{close} while MACD remains at {round(macd, 2)}, "
    f"indicating {'continued bearish pressure' if trend == 'Bearish' else 'bullish continuation potential'}."
)

    return {
        "trend": trend,
        "momentum": momentum,
        "summary": summary.strip()
    }