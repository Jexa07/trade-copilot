# AI Context Layer — Trade Copilot

AI-powered stock market intelligence platform for retail traders.

Built using:
- FastAPI
- Next.js
- Groq LLM
- Yahoo Finance API
- Technical Indicators (RSI, MACD, EMA)
- Trading Dashboard UI

---

## Features

- Live stock market analysis
- AI-generated market insights
- RSI indicator
- MACD indicator
- EMA 20 / EMA 50
- Candlestick chart visualization
- Watchlist support
- FastAPI backend
- Next.js frontend
- Production deployment on Render + Vercel

---

## Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS
- Axios
- Lightweight Charts

### Backend
- FastAPI
- yFinance
- Pandas
- TA library
- Groq API

---

## Live Demo

### Frontend
https://trade-copilot-blush.vercel.app/

### Backend API Docs
https://trade-copilot-backend.onrender.com/docs

### Backend Health Endpoint
https://trade-copilot-backend.onrender.com/

---

## Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/trade-copilot.git
cd trade-copilot
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## API Endpoint

```bash
GET /market/{symbol}
```

Example:

```bash
/market/TCS.NS
```

---

## Deployment

### Frontend
- Vercel

### Backend
- Render

---

## Future Improvements

- Real-time WebSocket streaming
- News sentiment analysis
- Portfolio dashboard
- AI trading assistant
- Authentication system
- Database integration
- Multi-stock comparison

---

## Author
Arpita Pani
