import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")       # e.g., your@gmail.com
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")     # App password if Gmail

def send_consent_email(to_email, user_id, method, language):
    try:
        subject = "✅ New Consent Granted"
        body = f"""
        Hello Doctor,

        A new patient consent has been granted.

        🧑‍💼 User ID: {user_id}
        ✅ Consent Method: {method}
        🌐 Language: {language}

        Regards,
        HealSense
        """

        msg = MIMEMultipart()
        msg["From"] = EMAIL_ADDRESS
        msg["To"] = to_email
        msg["Subject"] = subject

        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)

        print("📧 Consent email sent.")
    except Exception as e:
        print("❌ Error sending email:", e)
