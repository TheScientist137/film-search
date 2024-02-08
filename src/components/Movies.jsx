const ListOfMovies = ({ movies }) => {
  return (
    <ul className='movies'>
      {movies.map(movie => (
        <li className='movie' key={movie.id}>
          <div className='movie-title'>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
          </div>
          <div className='image-container'>
            <img src={movie.poster} alt={movie.title} />
          </div>
        </li>
      ))}
    </ul>
  )
}

const NoMoviesResults = () => {
  return <p>No se encontraron películas para esta búsqueda</p>
}

export function Movies ({ movies }) {
  // Comprobamos si hay películas
  const hasMovies = movies?.length > 0
  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />
}
