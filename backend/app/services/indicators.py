import pandas_ta as ta


def calculate_indicators(df):

    df["rsi"] = ta.rsi(df["Close"], length=14)

    macd = ta.macd(df["Close"])

    df["macd"] = macd["MACD_12_26_9"]

    df["ema_20"] = ta.ema(df["Close"], length=20)

    df["ema_50"] = ta.ema(df["Close"], length=50)

    return df