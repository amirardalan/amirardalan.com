import { useState } from 'react'

// Show loading indicator during fetch requests
export const useFetchStatus = () => {
  const [fetchStatus, setFetchStatus] = useState(false)
  return [fetchStatus, setFetchStatus] as const
}