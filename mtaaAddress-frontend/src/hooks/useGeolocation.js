import { useState, useEffect } from 'react'

export default function useGeolocation() {
  const [position, setPosition] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }

    const onSuccess = (pos) => setPosition({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    })

    const onError = (err) => setError(err.message)

    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }, [])

  return { position, error }
}
