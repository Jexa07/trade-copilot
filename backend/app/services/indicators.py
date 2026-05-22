from ta.trend import MACD
from ta.momentum import RSIIndicator


def calculate_indicators(df):

    # RSI

    rsi = RSIIndicator(close=df["Close"], window=14)

    df["rsi"] = rsi.rsi()

    # MACD

    macd = MACD(close=df["Close"])

    df["macd"] = macd.macd()

    # EMA 20

    df["ema_20"] = df["Close"].ewm(span=20).mean()

    # EMA 50

    df["ema_50"] = df["Close"].ewm(span=50).mean()

    return df