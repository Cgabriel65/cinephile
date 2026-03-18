[![CI](https://github.com/Cgabriel65/cinephile/actions/workflows/ci.yml/badge.svg?branch=test-ci&event=pull_request)](https://github.com/Cgabriel65/cinephile/actions/workflows/ci.yml)

## About the Project

Cinephile is a Single Page Application (SPA) for managing movies, allowing:

- Real-time dashboard with KPIs
- Movie list with filters and search
- Creation and editing form (Reactive Forms)
- Movie detail with complete information
- Data persistence using LocalStorage and Supabase
- Runs locally or in a Docker container

## Technologies Used

- Angular
- TypeScript
- HTML & CSS
- LocalStorage 
- Docker
- Supabase
- Github Actions
- Vercel

## How to Run the Project

Clone the repository:

```bash
git clone https://github.com/Cgabriel65/cinephile.git
cd cinephile
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
ng serve --open
```

With docker
```bash
docker compose up --build
```

## CI/CD

GitHub Actions runs on Pull Requests: Pipeline includes:
- Lint
- Build

Deployment is automated with Vercel:

- Pushes to develop-idp trigger production deployment via cd.yml
- Environment variables (SUPABASE_URL, SUPABASE_ANON_KEY) are configured in Vercel


## Project Structure

- src/app/components – Angular components (Dashboard, Movie List, Movie Form, Movie Detail, Header, Movie Card, Auth)
- src/app/services – MovieService (CRUD & KPIs)
- src/app/models – Movie interface
- src/app/pipes – Custom pipes (minutesToHours)
- src/styles.css – Global styles


Project developed for academic purposes.

Author: Cláudio Monteiro
