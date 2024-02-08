import { useEffect, useRef, useState } from 'react'

export function useSearch () {
  // State for the input value
  const [search, updateSearch] = useState('')
  // state for the error in search
  const [error, setError] = useState(null)
  // Check if is the first user`s input
  const isFirstInput = useRef(true)

  // Manage the error on search with an effect
  // The effect will occurr when the search change
  useEffect(() => {
    // Only works when the user clicks on the input
    // Used to know if it is the first time the component renders
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    // Error logic
    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 carácteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}
