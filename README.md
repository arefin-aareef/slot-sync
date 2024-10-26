# Appointment Scheduler Application

This is an Appointment Scheduler application built with Next.js 14, TypeScript, Firebase, and Chakra UI. It allows users to register, login, schedule appointments, and manage appointment statuses. The application also supports audio messaging for appointments.

## Features

- User registration and login
- Create, view, and manage appointments
- Appointment status updates (accept, decline, cancel)
- Audio message support for appointments
- Search and filter appointments
- Sort appointments by latest or oldest

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Chakra UI
- **Backend**: Firebase Authentication, Firestore
- **State Management**: React Hooks
- **Audio Support**: HTML5 Audio API

## Prerequisites

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Git](https://git-scm.com/)

## Getting Started

Follow these steps to set up and run the application locally:

1. **Clone the repository:**
```bash
git clone <https://github.com/arefin-aareef/slot-sync>
```
2. **Navigate to the project directory:**
```bash
cd <project-directory>
```
3. **Install the dependencies:**
```bash
npm install
```
4. **Start the development server:**
```bash
npm run dev
```
5. **Access the application:**

## Usage

**Register an account:**
- Click the "Register" button and create a new account.

**Login to the application:**
- Use your registered credentials to login.

**Schedule an appointment:**
- Go to the "Appointments" section and create a new appointment.

**Manage appointments:**
- Accept, decline, or cancel appointments based on your role (invitee or appointee).

**Add an audio message:**
- You can record or upload an audio message for an appointment.

## Firebase Configuration:

To connect the application with Firebase, create a .env.local file in the root of the project and add your Firebase configuration:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Replace the placeholder values with your actual Firebase project configuration.

## Available Scripts:
npm run dev: Starts the development server.
npm run build: Builds the application for production.
npm run start: Starts the production server.
npm run lint: Lints the codebase.

## Contributing
Contributions are welcome! If you find any issues or want to add new features, feel free to open an issue or submit a pull request.