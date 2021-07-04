import {Link} from 'react-router-dom'
import {Component} from 'react'
import {AiOutlineMenu} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {
    isDropDowned: false,
  }

  onDropNavClicked = () => {
    this.setState(prevState => ({isDropDowned: !prevState.isDropDowned}))
  }

  render() {
    const {isDropDowned} = this.state
    const navDropDownForSmall = isDropDowned
      ? 'mobile-link-container-display'
      : 'mobile-link-container-none'
    return (
      <nav className="navbar-container">
        <Link to="/" className="nav-link">
          <span className="logo logo-title">
            COVID119
            <span className="logo country-name">INDIA</span>
          </span>
        </Link>
        <ul className="icons-container-large">
          <Link to="/" className="nav-link">
            <li className="home-link">HOME</li>
          </Link>
          <Link to="/about" className="nav-link">
            <li className="about-link">ABOUT</li>
          </Link>
        </ul>

        <div className="small-devices-navbar">
          <button
            type="button"
            className="menu-icon"
            onClick={this.onDropNavClicked}
          >
            <AiOutlineMenu className="icon" />
          </button>
        </div>
        <ul className={navDropDownForSmall}>
          <Link to="/" className="nav-link">
            <li className="home-link">HOME</li>
          </Link>
          <Link to="/about" className="nav-link">
            <li className="about-link">ABOUT</li>
          </Link>
        </ul>
      </nav>
    )
  }
}
export default Header
