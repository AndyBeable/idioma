import { Link } from 'react-router-dom'

function Button({ children, onClick, to, className = "bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-colors" }) {
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export default Button