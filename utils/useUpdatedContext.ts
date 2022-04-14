import { useState } from 'react'

// Manage state for blog post publishing
export const useUpdatedContext = () => {
  const [isUpdated, setIsUpdated] = useState(false)
  return [isUpdated, setIsUpdated] as const
}