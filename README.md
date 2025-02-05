# Atlas AI

## Project Overview

**Atlas AI** is a modern single-page application (SPA) that combines country information display with an AI-powered chatbot. Built using React with Vite and TypeScript for the frontend, and Express.js for the backend, this project allows users to explore various countries and interact with an AI assistant for queries and recommendations.

### Features
- **Country Table**: Displays a list of countries with relevant information such as name, capital, currency, and more.
- **AI Chatbot**: An interactive chatbot that provides answers to user queries about countries and offers travel recommendations.

### Note
The login feature has not yet been implemented.

## Setup Instructions

To set up the project locally, follow these steps:

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Clone the Repository
First, clone the repository to your local machine:
```bash
git clone https://github.com/Anandawd/SkillTest-Frontend-Kuasar.git
cd SkillTest-Frontend-Kuasar
```

# Folder Structure
The project consists of three main folders:
- **kuasarai-fe:** Contains the frontend code.
- **kuasar-be:** Contains the backend code.
- **screenshoot:** Contains screenshots of the web application.

## Backend Setup
1. Open a new terminal and navigate to the backend directory:
```bash
cd kuasar-be
```
2. Install the NVIDIA SDK:
```bash
npx api install "@nim/v1.0#1c2s2wlyzzt309"
```
During the installation, follow these steps:
- What language would you like to generate an SDK for? » **JavaScript**
- How are your project imports and exports structured? » **CommonJS**
- OK to proceed with package installation? » typing **"Y"**
- Wait until the installation is complete.
3. Create a .env file in the kuasarai-be directory and add the necessary environment variables, including your NVIDIA API key. You can generate an NVIDIA API key through the following link: 
NVIDIA API Key Generation or use your existing API key.
Example .env file:
```bash
NVIDIA_API_URL=
NVIDIA_API_KEY=
PORT=
```
4. Run the backend server:
```bash
nodemon app.js
```

## Frontend Setup
1. Navigate to the frontend directory
```bash
cd kuasarai-fe
```
2. Install the dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

# Technical Decisions and Architecture
- **Frontend:** The frontend is built using React with Vite and TypeScript, providing a modern and efficient development experience.
- **Backend:** The backend is developed using Express.js, serving as an API to handle requests from the frontend.
- **Data Fetching:** GraphQL is used to fetch country data, allowing for efficient and flexible queries.
- **AI Integration:** The application integrates with the NVIDIA AI model meta-llama-3_1-405b to power the chatbot features, enabling intelligent responses and recommendations.
