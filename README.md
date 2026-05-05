# Adarsh Portfolio — React + Python (Flask)

A modern, animated full-stack portfolio built with **React (Vite)** on the frontend and **Python (Flask)** on the backend.

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Framer Motion, react-type-animation |
| Styling | Vanilla CSS with CSS variables |
| Backend | Python, Flask, Flask-SQLAlchemy |
| Database | SQLite (via SQLAlchemy) |

## ✨ Features

- **Particle canvas** animation in the hero section
- **Rotating conic gradient** ring around the profile image
- **Typing animation** cycling through specializations
- **Scroll-triggered** fade-in / slide-in animations on every section
- **Animated skill progress bars** with glowing dot indicators
- **Project cards** with hover-lift and color-coded accents
- **Alternating timeline** with glowing center-line for experience
- **Contact form** that sends messages to email through FormSubmit by default
- **Scroll-to-top** button with spring animation
- **Active nav tracking** via react-scroll

## 📁 Project Structure

```
Portfolio_up/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── ScrollToTop.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── backend/
│   ├── app.py       ← Flask API
│   └── requirements.txt
├── public/
│   └── profile.jpeg
└── index.html
```

## 🛠️ Running Locally

### Frontend (React)
```bash
npm install
npm run dev
# → http://localhost:5173
```

### Backend (Flask)
```bash
cd backend
pip install -r requirements.txt
python app.py
# → http://localhost:8000
```

### API Endpoints
- `GET  /`            — Health check
- `POST /contact/`    — Submit contact message (JSON body: name, email, message)
- `GET  /messages/`   — View all messages (admin use)
