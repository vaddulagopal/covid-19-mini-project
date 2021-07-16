import './index.css'
import {AiOutlineGithub, AiOutlineInstagram} from 'react-icons/ai'
import {FiTwitter} from 'react-icons/fi'

function FooterSection() {
  return (
    <div className="footer-sec-container">
      <h1 className="logo logo-title">
        COVID19
        <span className="logo country-name">INDIA</span>
      </h1>
      <p className="footer-description">
        We stand with everyone who is fighting on the front lines
      </p>
      <div className="icons-container">
        <a href="https://github.com/covid19india/covid19india-react">
          <AiOutlineGithub className="footer-icon" />
        </a>
        <a href="https://www.instagram.com/covid19indiaorg/">
          <AiOutlineInstagram className="footer-icon" />
        </a>
        <a href="https://twitter.com/covid19indiaorg">
          <FiTwitter className="twitter-icon" />
        </a>
      </div>
    </div>
  )
}
export default FooterSection
