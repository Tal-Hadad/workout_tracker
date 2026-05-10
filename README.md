# Workout Tracker

A Next.js workout tracking app with Google sign-in, built as an installable **Progressive Web App (PWA)** — install it on your phone or desktop and use it like a native app, including offline-friendly behavior.

**Live demo:** https://workout-tracker-sable-nine.vercel.app

## Features

- Installable PWA (works on mobile and desktop, with its own icon and standalone window)
- Google authentication via NextAuth
- MongoDB-backed workout data
- Built on Next.js 16 + React 19

## Prerequisites

Before running locally you'll need:

- **Node.js** 18.18+ (Next.js 16 requirement)
- A **MongoDB** connection string (local `mongod`, or a free Atlas cluster)
- **Google OAuth credentials** (Client ID + Secret) from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

## Getting Started

1. **Clone the repo**

   ```bash
   git clone https://github.com/Tal-Hadad/workout_tracker.git
   cd workout_tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the project root with the following keys:

   ```bash
   MONGODB_URI=your-mongodb-connection-string
   AUTH_SECRET=any-long-random-string
   GOOGLE_CLIENT_ID=your-google-oauth-client-id
   GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
   ```

   - Generate `AUTH_SECRET` with `npx auth secret` or any random 32+ character string.
   - When setting up the Google OAuth client, add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI.

4. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Installing the PWA

Once the app is running (locally or via the [live demo](https://workout-tracker-sable-nine.vercel.app)):

- **Desktop (Chrome/Edge):** click the install icon in the address bar.
- **Android (Chrome):** tap the menu, then "Install app" / "Add to Home screen".
- **iOS (Safari):** tap the Share button, then "Add to Home Screen".

## Build for Production

```bash
npm run build
npm start
```

## Deploy

The app is deployed to Vercel: https://workout-tracker-sable-nine.vercel.app

To deploy your own copy, push the repo to GitHub and import it in [Vercel](https://vercel.com/new). Add the same environment variables in the Vercel project settings, and update your Google OAuth redirect URI to `https://<your-domain>/api/auth/callback/google`.
