# Movies and Actors Management App

This project is a full-stack application for managing movies and actors. It features a FastAPI backend and a React frontend. The app allows users to add, view, and delete movies and actors.

## Features

- **Movies Management:**
  - Add new movies
  - View a list of movies
  - Delete movies

- **Actors Management:**
  - Add new actors
  - View a list of actors
  - Delete actors

---

## Backend Setup

The backend is built using FastAPI and provides the API endpoints for movies and actors management.

### Prerequisites
- Python 3.9+
- pip

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/bozkaISSI/react-python-movies.git
   cd api
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the backend server:
   ```bash
   uvicorn main:app --reload
   ```

### API Endpoints

#### Movies Endpoints:
- `GET /movies` - Retrieve all movies
- `POST /movies` - Add a new movie
- `GET /movies/{movie_id}` - Retrieve a specific movie by ID
- `DELETE /movies/{movie_id}` - Delete a movie by ID

#### Actors Endpoints:
- `GET /actors` - Retrieve all actors
- `POST /actors` - Add a new actor
- `GET /actors/{actor_id}` - Retrieve a specific actor by ID
- `DELETE /actors/{actor_id}` - Delete an actor by ID

---

## Frontend Setup

The frontend is a React application that consumes the FastAPI backend.

### Prerequisites
- Node.js
- npm

### Installation Steps

1. Navigate to the `ui` folder:
   ```bash
   cd ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the React app:
   ```bash
   npm run build
   ```

4. Start the React app:
   ```bash
   npm start
   ```

---

## Application Structure

### Backend Structure
- `main.py` - Contains API endpoints and the FastAPI app setup.
- `models.py` - Defines the database models for movies and actors.
- `schemas.py` - Contains the Pydantic schemas for data validation.
- `ui/build/static` - Serves the static files of the React app.

### Frontend Structure
- `src/App.js` - Main component rendering the app layout.
- `src/MovieForm.js` - Form for adding movies.
- `src/MoviesList.js` - Component for displaying the movies list.
- `src/ActorForm.js` - Form for adding actors.
- `src/ActorList.js` - Component for displaying the actors list.

---

## Running the Application

1. Start the backend server using FastAPI:
   ```bash
   uvicorn main:app --reload
   ```

2. Start the frontend React app:
   ```bash
   cd ui
   npm start
   ```

3. Open the app in your browser:
   ```
   http://localhost:3000
   ```

---

## Example Usage

### Adding a Movie
1. Click on the "Add a movie" button.
2. Fill out the movie details in the form.
3. Submit the form to see the movie added to the list.

### Adding an Actor
1. Click on the "Add an actor" button.
2. Fill out the actor details in the form.
3. Submit the form to see the actor added to the list.



