import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Splash from './pages/Splash'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import Receitas from './pages/Receitas'
import ReceitaDetalhe from './pages/ReceitaDetalhe'
import Calculadora from './pages/Calculadora'
import ResultadoCalculo from './pages/ResultadoCalculo'
import Historico from './pages/Historico'
import Maquinas from './pages/Maquinas'
import MaquinaDetalhe from './pages/MaquinaDetalhe'
import Roberto from './pages/Roberto'
import Treinamentos from './pages/Treinamentos'
import Perfil from './pages/Perfil'
import PergunteEspecialista from './modules/pergunte-ao-especialista'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/receitas" element={<Receitas />} />
        <Route path="/receitas/:id" element={<ReceitaDetalhe />} />
        <Route path="/calculadora" element={<Calculadora />} />
        <Route path="/calculadora/resultado" element={<ResultadoCalculo />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/maquinas" element={<Maquinas />} />
        <Route path="/maquinas/:id" element={<MaquinaDetalhe />} />
        <Route path="/roberto" element={<Roberto />} />
        <Route path="/treinamentos" element={<Treinamentos />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/especialista" element={<PergunteEspecialista />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
