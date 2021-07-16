import {Link} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class Header extends Component {
  state = {
    isDropDowned: false,
    isHomeSelected: true,
  }

  onDropNavClicked = () => {
    this.setState(prevState => ({isDropDowned: !prevState.isDropDowned}))
  }

  updateHomeClassNameState = () => {
    this.setState({
      isHomeSelected: true,
    })
  }

  updateAboutClassNameState = () => {
    this.setState({
      isHomeSelected: false,
    })
  }

  render() {
    const {isHomeSelected, isDropDowned} = this.state
    const HomeClass = isHomeSelected ? 'home-link' : 'about-link'
    const aboutClass = isHomeSelected ? 'about-link' : 'home-link'
    const navClass = isDropDowned
      ? 'nav-fixed navbar-container'
      : 'navbar-container'
    return (
      <nav className={navClass}>
        <Link to="/" className="nav-link">
          <span className="logo logo-title">
            COVID19
            <span className="logo country-name">INDIA</span>
          </span>
        </Link>
        <ul className="icons-container-large">
          <Link
            to="/"
            className="nav-link"
            onClick={this.updateHomeClassNameState}
          >
            <li className={HomeClass}>HOME</li>
          </Link>
          <Link
            to="/about"
            className="nav-link"
            onClick={this.updateAboutClassNameState}
          >
            <li className={aboutClass}>ABOUT</li>
          </Link>
        </ul>

        <div className="small-devices-navbar">
          <button
            type="button"
            className="menu-icon"
            onClick={this.onDropNavClicked}
          >
            <img
              alt="pop-up"
              src="https://res.cloudinary.com/dyi08eugq/image/upload/v1626411088/add-to-queue_1_1_gxb8w3.jpg"
              className="icon"
            />
          </button>
        </div>
        {isDropDowned && (
          <ul className="mobile-link-container-display">
            <Link to="/" className="nav-link" onClick={this.onDropNavClicked}>
              <li className={HomeClass} onClick={this.updateHomeClassNameState}>
                HOME
              </li>
            </Link>
            <Link
              to="/about"
              className="nav-link"
              onClick={this.onDropNavClicked}
            >
              <li
                className={aboutClass}
                onClick={this.updateHomeClassNameState}
              >
                ABOUT
              </li>
            </Link>
          </ul>
        )}
      </nav>
    )
  }
}
export default Header
