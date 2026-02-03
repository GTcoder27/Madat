
# Madat - Voice-Based Emergency Reporting System 🚨🗣️

**Madat** (meaning "Help" in several Indian languages) is a web-based emergency reporting platform designed to bridge language barriers during crisis situations. It enables users to report emergencies by recording voice messages in their regional languages. These messages are automatically processed, transcribed, and translated to assist emergency responders in taking rapid action.

## ✨ Features

### 📡 For Users (Emergency Reporters)

* **Voice-First Interface:** A "Push-to-Talk" interface allows users to record emergency messages quickly and easily.
* **Visual Feedback:** Real-time audio visualization (waveforms and bars) confirms that audio is being captured correctly during recording.
* **Secure Reporting:** Voice messages are encoded and securely transmitted to the backend server.
* **Location Integration:** (Planned/Implicit) The system is designed to facilitate automatic location sharing to assist responders.

### 👮 For Emergency Responders (Dashboard)

* **Live Dashboard:** A centralized view for officers to monitor incoming emergency alerts in real-time.
* **Audio Playback:** Responders can listen to the original voice recording directly from the browser.
* **AI Translation (Bhashini):** Integrated **Bhashini API** support allows officers to translate regional voice messages (Hindi, Marathi, Gujarati, etc.) into English or other languages instantly for better understanding.
* **Incident Tracking:** Displays timestamps and message details for efficient incident management.

## 🛠️ Tech Stack

### Frontend

* **React:** Core framework for building the user interface.
* **Redux Toolkit:** Used for managing global state, specifically user authentication (`AuthSlice`).
* **Lucide React:** Provides modern, consistent iconography (Mic, Shield, MessageSquare, etc.).
* **Tailwind CSS:** Utilized for responsive, modern styling with a dark-themed, "cyberpunk" aesthetic.
* **Axios:** Handles HTTP requests to the backend API.

### Backend

* **Node.js & Express:** Serves the REST API and handles routing.
* **MongoDB & Mongoose:** Stores user data and emergency messages.
* **JWT (JSON Web Tokens):** Manages secure user authentication and sessions.
* **Bhashini API:** External API integration for text-to-text and speech-to-text translation services.

## 📂 Project Structure

### Frontend Components

* **`HomePage.jsx`**: The main responder dashboard. It fetches messages, plays audio, and provides a dropdown to select languages for translation via Bhashini.
* **`RecordEMessage.jsx`**: The user interface for recording voice notes. It features a visualizer for audio levels and handles the conversion of audio blobs to Base64 for upload.
* **`LoginPage.jsx` & `SignupPage.jsx**`: Fully styled authentication pages with form validation and Redux integration.
* **`redux/`**: Contains the Redux store configuration and `AuthSlice` for managing login/signup states.

### Backend Services

* **`index.js`**: The server entry point that connects to the database and sets up middleware (CORS, Cookie Parser).
* **`routes/`**:
* **`auth.route.js`**: Manages authentication endpoints (Login, Signup, Logout).
* **`bhashini.route.js`**: Handles requests to the Bhashini translation service.


* **`package.json`**: Lists dependencies including `bcryptjs`, `jsonwebtoken`, `mongoose`, and `twilio`.

## 🚀 Getting Started

### Prerequisites

* Node.js (v14 or higher)
* MongoDB (Local instance or Atlas URI)

### Installation

1. **Clone the Repository**
```bash
git clone <repository-url>
cd Madat

```


2. **Install Backend Dependencies**
```bash
cd backend
npm install

```


3. **Install Frontend Dependencies**
```bash
cd frontend
npm install

```


4. **Environment Configuration**
Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173

```


5. **Run the Application**
* Start the Backend: `npm run dev` (uses nodemon)
* Start the Frontend: `npm run dev` (Vite/React)



## 🎮 Usage

1. **Register:** Users must sign up using the **Signup Page** to access the system.
2. **Record:** On the **Record Message** page, click the microphone icon. The visualizer will react to your voice. Click again to stop, then press send.
3. **Monitor:** Emergency officers log in to the **Home Page** dashboard. They will see a list of recent voice messages.
4. **Translate:** If a message is in a regional language (e.g., Hindi), select "Hindi" from the dropdown and click **Translate** to view the English text.

## 🤝 Contribution

Contributions are welcome! Please fork the repository and create a pull request for any feature enhancements or bug fixes.


---

**Developed with React, Node.js, MongoDB, and Bhashini AI**
