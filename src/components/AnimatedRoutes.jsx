import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import Flashcards from '../pages/Flashcards'
import MiAmigo from '../pages/MiAmigo'
import Quiz from '../pages/Quiz'
import {AnimatePresence} from 'framer-motion'


function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/mi-amigo" element={<MiAmigo />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes