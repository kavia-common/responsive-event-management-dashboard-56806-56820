# events_frontend_app

React UI for the responsive event management dashboard.

## Environment variables

Configured via `.env` in the runtime environment (do not commit secrets). See `.env.example`.

The app uses these env vars (when set):

- `REACT_APP_API_BASE` (preferred) or `REACT_APP_BACKEND_URL` for REST calls
- `REACT_APP_WS_URL` for WS base URL (optional; UI currently resolves but does not connect)
- `REACT_APP_FRONTEND_URL` informational
- `REACT_APP_PORT` for dev server port

## Run

```bash
npm install
npm start
```

## Backend endpoints expected

- `GET /events`
- `POST /events`
- `PUT /events/:id`
- `DELETE /events/:id`
- `GET /admin/summary` (optional; admin page degrades gracefully if missing)
