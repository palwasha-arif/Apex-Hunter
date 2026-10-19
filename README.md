# Apex Hunter Platform

A full-stack MERN e-commerce and AI field-guide platform for sportsmen, with a
React and Tailwind client, an Express API, and MongoDB models. This repository
currently contains a runnable starter dashboard and API health endpoint.

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

If using MongoDB Atlas, replace `REPLACE_WITH_URL_ENCODED_ATLAS_PASSWORD` in
`server/.env` with your database user's password. URL-encode special characters
in the password before inserting it; do not share or commit the completed URI.
Confirm your machine's IP is allowed in the Atlas Network Access settings.
`JWT_SECRET` should be a long, random value; keep `.env` private.
`GEMINI_API_KEY` is optional until the AI guide endpoint is implemented.

Alternatively, from the project root run
`powershell -ExecutionPolicy Bypass -File .\server\configure-atlas.ps1`.
Enter the Atlas database password at the hidden prompt; the script URL-encodes
it and writes the connection URI to the ignored `server/.env` file.

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

## Starter status

- The dashboard and responsive navigation are implemented.
- The trip planner keeps a draft in the current browser session.
- The gear catalog contains sample items, not live inventory.
- Authentication, persistent trip storage, checkout, and AI guide generation
  still need API implementation. The AI key alone does not enable generation.
- MongoDB models are provided in `server/models`.

## Useful commands

- Client production build: `cd client; npm run build`
- API: `cd server; npm start`
