# Webhook Backend | NestJS

### Clone Repository

- Clone The Repository And install packages
```
git clone https://github.com/Yagnik-Gohil/webhook-backend.git
```
- Move to directory
```
cd webhook-backend
```
- Install dependency
```
npm install
```

### ENV & Database Setup
- Create database `webhook_dev` in PostgreSQL
- Go to `config/env/development.env` and update the database credentials
- Run Below command to migrate & seed the database
```
npm run migration:up:development
```

### Run Project
```
npm run start:development
```
- Go to `http://localhost:3000/api` and verify server is live.

- After completing the backend setup, Go to https://github.com/Yagnik-Gohil/webhook-simulator and setup the webhook simulator.

- After completing the simulator setup, Go to https://github.com/Yagnik-Gohil/webhook-frontend and setup the webhook frontend.
