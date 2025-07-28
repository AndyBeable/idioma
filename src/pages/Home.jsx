import Tile from '../components/Tile'
import { motion } from 'framer-motion'
import ai from '../assets/ai.png'
import quiz from '../assets/quiz.png'
import flashcards from '../assets/flashcards.png'
import Footer from '../components/Footer'

function Home() {
  return (
    <motion.div 
      className="min-h-screen flex flex-col" 
      initial={{ x: 300, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }} 
      exit={{ x: -300, opacity: 0 }} 
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-center text-4xl font-bold text-white mt-4 mb-2">IDIOMA</h1>
        <p className="text-center text-white text-lg mb-8">Your personal language learning companion
        </p>
        <div className="flex justify-between flex-col md:flex-row">

        <Tile to="/flashcards">
          <h1 className="text-2xl font-bold">Learn with Flashcards</h1>
          <p className="text-lg mb-4">Learn Spanish with flashcards</p>
          <img src={flashcards} alt="Learn with Flashcards" className='w-[350px]'/>
          
        </Tile>
        <Tile to="/mi-amigo">
          <h1 className="text-2xl font-bold">Learn with AI</h1>
          <p className="text-lg mb-4">Learn Spanish with AI</p>
          <img src={ai} alt="Learn with Flashcards" className='w-[350px]'/>
        </Tile>
        <Tile to="/quiz">
          <h1 className="text-2xl font-bold">Learn with a Quiz</h1>
          <p className="text-lg mb-4">Learn Spanish with a Quiz</p>
          <img src={quiz} alt="Learn with Flashcards" className='w-[350px]'/>
        </Tile>
        </div>
      </div>
      
      <Footer />
    </motion.div>
  )
}

export default Home 