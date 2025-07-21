import { Link } from 'react-router-dom'

function Tile({ children, to }) {
  const tileClasses = "flex flex-col justify-center items-center hover:bg-gray-800 hover:border-b-2 hover:border-yellow-500 w-1/2 min-w-[500px] min-h-[600px] text-white cursor-pointer scale-100 hover:scale-105 transition duration-300 pt-10"

  if (to) {
    return (
      <Link to={to} className={tileClasses}>
        {children}
      </Link>
    )
  }

  return (
    <div className={tileClasses}>
      {children}
    </div>
  )
}

export default Tile