import './App.css'
import { useCallback, useState } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App () {
  // Sort the films by year
  const [sort, setSort] = useState(false)
  // Extract input value, state function for input value and error value from custom hook useSearch
  const { search, updateSearch, error } = useSearch()
  // Ectract the movies and getMovies from the custom hook useMovies
  // Pass search
  const { movies, getMovies, loading } = useMovies({ search, sort })

  // Debounce
  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies({ search })
    }, 300)
    , [getMovies]
  )

  // Handle the submit of the form
  const handleSubmit = event => {
    event.preventDefault()
    getMovies({ search })
  }

  // Activate or desactivate handle the sort by year
  const handleSort = () => {
    setSort(!sort)
  }

  // Handle the change on the input value
  // Update search while tiping
  const handleChange = event => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
            onChange={handleChange}
            value={search}
            name='search'
            placeholder='Avengers, Star Wars, The Matrix...'
          />
          <button type='submit'>Buscar</button>
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <p>Sort by title</p>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </div>
  )
}

export default App
