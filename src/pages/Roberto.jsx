import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Roberto foi migrado para o módulo Pergunte ao Especialista
export default function Roberto() {
  const navigate = useNavigate()
  useEffect(() => { navigate('/especialista', { replace: true }) }, [navigate])
  return null
}
