# Portfólio de Projetos

A modern, full-stack personal portfolio built with **Angular 19** (frontend) and **Node.js/Express** (backend). The application includes a dynamic UI with a functional contact form that sends real emails using the [Resend](https://resend.com) API, protected by built-in rate-limiting and anti-spam measures.

## 🚀 Tech Stack

- **Frontend**: Angular 19, Tailwind CSS v4, Lucide Icons
- **Backend**: Node.js, Express
- **Email Service**: Resend API
- **Security**: Express Rate Limit, Honeypot detection, Input sanitization

---

## 🛠️ Local Development Setup

The project is structured as a monorepo containing both the frontend (`portfolioFront`) and the backend API (`portfolioApi`). It is configured to run both simultaneously with a single command.

### 1. Prerequisites
- Node.js installed
- A [Resend](https://resend.com) API key for sending emails

### 2. Environment Variables
Create a `.env` file in the **root** of the project (`portfolio/.env`) with the following variables:

```env
RESEND_API_KEY=your_resend_api_key_here
EMAIL_FROM=onboarding@resend.dev
EMAIL_TO=your_personal_email@example.com
PORT=3000
```

### 3. Installation
Open your terminal in the root folder (`portfolio/`) and install all dependencies:
```bash
npm install
npm run install:all
```
*(This installs the root `concurrently` package, then automatically installs the frontend and backend dependencies).*

### 4. Run the Project
To start both the Angular development server and the Node.js API concurrently, run from the root folder:
```bash
npm start
```
- Frontend will run on: `http://localhost:4200`
- Backend API will run on: `http://localhost:3000`

> **Note:** The Angular app is configured with a local proxy (`proxy.conf.json`). Any requests made to `/api/*` from the frontend are automatically routed to the backend running on port 3000. This solves CORS issues locally and mimics the production environment perfectly.

---

## ☁️ Deployment (Vercel)

This project is fully configured to be deployed on **Vercel** with zero-downtime, treating the frontend as an Angular build and the backend as a Serverless Function.

### Steps to Deploy:
1. Push your repository to GitHub.
2. Go to your Vercel Dashboard and click **Add New Project**.
3. Import your GitHub repository.
4. Leave the Framework Preset as **Other** (Vercel will read the `vercel.json` file automatically).
5. In the **Environment Variables** section, add your Resend credentials:
   - `RESEND_API_KEY`
   - `EMAIL_FROM`
   - `EMAIL_TO`
6. Click **Deploy**.

### How it works on Vercel
- The `vercel.json` config routes all traffic starting with `/api/(.*)` to the Express server inside `portfolioApi/server.js`.
- All other traffic `/(.*)` is routed to the compiled Angular app.
- The `server.js` file explicitly exports the Express `app` module without calling `.listen()` in production, strictly following Vercel's Serverless Functions requirements.
