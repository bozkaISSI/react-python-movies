import MovieListItem from "./MovieListItem";

export default function MoviesList(props) {
    return (
        <div>
            <h2>Movies</h2>
            <div className="movies-list">
                {props.movies.map((movie) => (
                    <div
                        key={movie.title}
                        className="movie-item"
                        style={{
                            marginBottom: "8px",
                            border: "1px solid #ccc",
                            padding: "8px",
                            borderRadius: "4px",
                        }}
                    >
                        <MovieListItem
                            movie={movie}
                            onDelete={() => props.onDeleteMovie(movie)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
