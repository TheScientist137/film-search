import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/searchMovies'
// Custom hook who makes the data fetching
export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [, setError] = useState(null)
  // Control the input render when the search is done
  const previousSearch = useRef(search)

  // We use useMemo() to execute the async-await when the dependence search change
  // (Nos aseguramos de que esto ocurra solo cuando cambia el searchz)
  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return

    try {
      setLoading(true)
      setError(null)

      previousSearch.current = search

      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      // Tanto en el try como en el catch
      setLoading(false)
    }
  }, [])

  const sortedMovies = useMemo(() => {
    console.log('pruebva')
    // Sort the movies when sort or movies change
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading }
}
