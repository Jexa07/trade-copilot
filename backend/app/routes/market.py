from fastapi import APIRouter
import yfinance as yf

from app.services.indicators import calculate_indicators
from app.services.context_builder import build_market_context
from app.services.ai_engine import generate_ai_summary

router = APIRouter()


@router.get("/market/{symbol}")
def get_market_data(symbol: str):

    stock = yf.Ticker(symbol)

    df = stock.history(period="3mo")

    df = calculate_indicators(df)

    latest = df.iloc[-1]

    # Candlestick data

    candles = []

    recent_data = df.tail(30)

    for index, row in recent_data.iterrows():

        candles.append({
            "time": index.strftime("%Y-%m-%d"),
            "open": round(float(row["Open"]), 2),
            "high": round(float(row["High"]), 2),
            "low": round(float(row["Low"]), 2),
            "close": round(float(row["Close"]), 2),
        })

    # Market snapshot

    market_data = {
        "symbol": symbol,

        "open": round(float(latest["Open"]), 2),
        "high": round(float(latest["High"]), 2),
        "low": round(float(latest["Low"]), 2),
        "close": round(float(latest["Close"]), 2),

        "volume": int(latest["Volume"]),

        "rsi": round(float(latest["rsi"]), 2),

        "macd": round(float(latest["macd"]), 2),

        "ema_20": round(float(latest["ema_20"]), 2),

        "ema_50": round(float(latest["ema_50"]), 2)
    }

    # Context + AI summary

    context = build_market_context(market_data)

    ai_summary = generate_ai_summary(context)

    return {
        "market_data": market_data,
        "context": context,
        "ai_summary": ai_summary,
        "candles": candles
    }
