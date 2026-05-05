from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)

# ── CORS: allow React dev server ──────────────────────────────────────────────
cors_origins = os.getenv(
    "PORTFOLIO_CORS_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000",
).split(",")
CORS(app, origins=[origin.strip() for origin in cors_origins if origin.strip()])

# ── Database ──────────────────────────────────────────────────────────────────
basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(basedir, 'portfolio.db')}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "dev-secret-key-change-me")

db = SQLAlchemy(app)

# ── Model ─────────────────────────────────────────────────────────────────────
class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "message": self.message,
            "created_at": self.created_at.isoformat(),
        }

# Create tables
with app.app_context():
    db.create_all()

# ── Routes ────────────────────────────────────────────────────────────────────
@app.route("/", methods=["GET"])
def index():
    return jsonify({"status": "ok", "message": "Adarsh Portfolio API is running 🚀"})

@app.route("/contact/", methods=["POST", "OPTIONS"])
def contact():
    if request.method == "OPTIONS":
        return jsonify({"ok": True}), 200

    data = request.get_json(silent=True) or {}
    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    message = str(data.get("message", "")).strip()

    if not name or not email or not message:
        return jsonify({"ok": False, "error": "Name, email, and message are required."}), 400

    if len(message) > 2000:
        return jsonify({"ok": False, "error": "Message must be 2000 characters or less."}), 400

    msg = ContactMessage(name=name, email=email, message=message)
    db.session.add(msg)
    db.session.commit()

    print(f"📬 New message from {name} <{email}>")
    return jsonify({"ok": True, "message": "Message sent successfully!"}), 201

@app.route("/messages/", methods=["GET"])
def messages():
    """Simple admin endpoint to view all messages."""
    all_msgs = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
    return jsonify({
        "total": len(all_msgs),
        "messages": [m.to_dict() for m in all_msgs],
    })

if __name__ == "__main__":
    print("🚀 Portfolio backend running on http://localhost:8000")
    app.run(port=8000, debug=True)
