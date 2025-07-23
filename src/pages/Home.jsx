import Tile from '../components/Tile'
import { motion } from 'framer-motion'
import aiChat from '../assets/aiChat.png'
import flashcards from '../assets/flashcards.png'

function Home() {
  return (
    <motion.div className="" inital={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.3}}>
      <h1 className="text-center text-4xl font-bold text-white mt-4 mb-2">IDIOMA</h1>
      <p className="text-center text-white text-lg mb-8">Learn languages with flashcards</p>
      <div className="flex justify-between flex-col md:flex-row">

      <Tile to="/flashcards">
        <h1 className="text-2xl font-bold">Learn with Flashcards</h1>
        <p className="text-lg mb-4">Learn languages with flashcards</p>
        <img src={flashcards} alt="Learn with Flashcards" className='w-[350px]'/>
        
      </Tile>
      <Tile to="/mi-amigo">
        <h1 className="text-2xl font-bold">Learn with AI</h1>
        <p className="text-lg mb-4">Learn languages with AI</p>
        <img src={aiChat} alt="Learn with Flashcards" className='w-[350px]'/>
      </Tile>
      </div>
    </motion.div>
  )
}

export default Home 