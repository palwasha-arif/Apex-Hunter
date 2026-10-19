# Apex Hunter Platform

A hunting-basics learning website for beginners, with a camouflage-inspired
React and Tailwind client, outdoor photography, introductory safety and ethics
lessons, and a trip-planning starter. The project also includes an Express API
and MongoDB models.

## Requirements

- Node.js 20 or newer and npm
- MongoDB running locally, or a MongoDB Atlas connection string

## Setup

Open two terminals in this project folder.

### 1. Configure and start the API

```powershell
cd server
if (!(Test-Path .env)) { Copy-Item .env.example .env }
npm install
npm run dev
```

The example URI is prefilled with the Atlas host and username. It cannot connect
until the password is set. Run the configuration helper below and enter the
database user's password at its hidden prompt. Confirm your machine's IP is
allowed in the Atlas Network Access settings.
`JWT_SECRET` should be a long, random value; keep `.env` private.
Add a newly generated `GEMINI_API_KEY` in `server/.env` to enable AI field
guides. Keep the key private; the browser calls your server, and the server
calls Gemini with the key. The key pasted into a chat or terminal example
should be revoked and replaced. To save a newly rotated key with a hidden
prompt from the project root, run
`powershell -ExecutionPolicy Bypass -File .\server\configure-gemini.ps1`.

Alternatively, from the project root run
`powershell -ExecutionPolicy Bypass -File .\server\configure-atlas.ps1`.
Enter the Atlas database password at the hidden prompt; the script URL-encodes
it and writes the connection URI to the ignored `server/.env` file.

To open an interactive Atlas shell, install MongoDB Shell (`mongosh`) and run
`cd server; npm run db:shell`. It prompts for the database user's password;
never put the password directly in the command.

The API health endpoint is available at <http://localhost:5000/api/health>.
The server starts even if MongoDB is unavailable; it logs the database
connection error and reports the database state in the health response.

### 2. Start the React client

In a second terminal, from the project folder:

```powershell
cd client
if (!(Test-Path .env)) { Copy-Item .env.example .env }
npm install
npm run dev
```

Open the local URL printed by Vite (usually <http://localhost:5173>).

## Current features

- Introductory hunting lessons cover safety, local rules, field awareness, and
  ethical practice. These do not replace certified training or local laws.
- The responsive dashboard includes outdoor imagery and a beginner gear
  overview.
- The trip planner keeps a draft in the current browser session.
- The AI field guide posts to `/api/ai/guide` and calls Gemini from the server
  using `GEMINI_API_KEY`.
- Authentication and persistent trip storage still need API implementation.
- MongoDB models are provided in `server/models`.

## Useful commands

- Client production build: `cd client; npm run build`
- API: `cd server; npm start`
