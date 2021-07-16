import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-bg-container">
    <img
      className="not-found-img"
      alt="not-found"
      src="https://res.cloudinary.com/dyi08eugq/image/upload/v1626264048/Vector_5_mk9gwu.jpg"
    />
    <p className="not-found-heading">PAGE NOT FOUND</p>
    <p className="not-found-description">
      we’re sorry, the page you requested could not be found Please go back to
      the homepage
    </p>
    <Link to="/">
      <button className="home-btn" type="button">
        Home
      </button>
    </Link>
  </div>
)

export default NotFound
