[![CI](https://github.com/Cgabriel65/cinephile/actions/workflows/ci.yml/badge.svg?branch=test-ci&event=pull_request)](https://github.com/Cgabriel65/cinephile/actions/workflows/ci.yml)

## About the Project

Cinephile is a Single Page Application (SPA) for managing movies, allowing:

- Real-time dashboard with KPIs
- Movie list with filters and search
- Creation and editing form (Reactive Forms)
- Movie detail with complete information
- Data persistence using LocalStorage 

## Technologies Used

- Angular
- TypeScript
- HTML & CSS
- LocalStorage 

## How to Run the Project

Clone the repository:

```bash
git clone https://github.com/Cgabriel65/cinephile.git
cd projeto-final
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
ng serve --open
```

Features
- Dashboard with KPIs
- Movie CRUD (Create, Read, Update, Delete)
- Filters and search in the list
- Movie detail page
- Form with validations
- Responsive and vintage-style design

Project Structure

- src/app/components – Angular components (Dashboard, Movie List, Movie Form, Movie Detail, Header, Movie Card)
- src/app/services – MovieService (CRUD & KPIs)
- src/app/models – Movie interface
- src/app/pipes – Custom pipes (minutesToHours)
- src/styles.css – Global styles


Project developed for academic purposes.

Author: Cláudio Monteiro
