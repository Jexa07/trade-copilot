from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_ai_summary(context):

    prompt = f"""
You are an AI market intelligence engine used inside a professional trading platform.

Analyze the market context below and generate a concise technical interpretation for retail traders.

Market Context:
{context}

Rules:
- Keep response under 70 words
- Be concise, sharp, and professional
- Focus only on current market structure
- Explain what RSI, MACD, and trend imply
- Keep analysis observational only
- Avoid speculative or predictive statements
- Avoid reversal commentary
- No markdown
- No headings
- No bullet points
- No financial advice
- No buy/sell recommendations
- No future price forecasting
- Sound like institutional market commentary
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],

        temperature=0.3,
        max_tokens=100
    )

    cleaned_response = response.choices[0].message.content

    cleaned_response = cleaned_response.replace("*", "")
    cleaned_response = cleaned_response.replace("\n", " ")
    cleaned_response = cleaned_response.replace("  ", " ")

    return cleaned_response.strip()