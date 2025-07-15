import AppRouter from './router'
import { Analytics } from '@vercel/analytics/next';

function App() {
  return (
    <>
      <AppRouter />
      <Analytics />
    </>
  )
}

export default App
