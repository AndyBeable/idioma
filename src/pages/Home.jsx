import { Link } from 'react-router-dom'
import Tile from '../components/Tile'
import { motion } from 'framer-motion'

function Home() {
  return (
    <motion.div className="" inital={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.3}}>
      <h1 className="text-center text-4xl font-bold text-white mt-4 mb-2">IDIOMA</h1>
      <p className="text-center text-white text-lg mb-8">Learn languages with flashcards</p>
      <div className="flex justify-between">

      <Tile to="/flashcards">
        <h1 className="text-2xl font-bold">Learn with Flashcards</h1>
        <p className="text-lg">Learn languages with flashcards</p>
      </Tile>
      <Tile to="/mi-amigo">
        <h1 className="text-2xl font-bold">Learn with AI</h1>
        <p className="text-lg">Learn languages with AI</p>
      </Tile>
      </div>
    </motion.div>
  )
}

export default Home 