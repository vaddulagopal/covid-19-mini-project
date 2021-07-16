import {Component} from 'react'
import Loader from 'react-loader-spinner'
import FooterSection from '../FooterSection'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class About extends Component {
  state = {
    isLoading: true,
    faqData: [],
  }

  componentDidMount() {
    this.getAllFaq()
  }

  getAllFaq = async () => {
    const dataUrl = 'https://api.covid19india.org/website_data.json'

    const response = await fetch(dataUrl)
    const jsonData = await response.json()

    this.setState({
      isLoading: false,
      faqData: jsonData.faq,
    })
  }

  displayFaqData = data =>
    data.map(eachFaq => (
      <div className="faq-container">
        <p className="question">{eachFaq.question}</p>
        <p className="answer">{eachFaq.answer}</p>
      </div>
    ))

  render() {
    const {isLoading, faqData} = this.state
    return (
      <>
        {isLoading ? (
          <div className="state-loader-details-container">
            <Loader type="Oval" color="#007BFF" height={32} width={32} />
          </div>
        ) : (
          <div className="about-sec-container">
            <h1 className="about-heading">About</h1>
            <p className="about-vaccine">
              Covid-19 vaccine be ready for distribution
            </p>
            <div className="footer-container">
              {this.displayFaqData(faqData)}
            </div>
            <FooterSection />
          </div>
        )}
      </>
    )
  }
}
export default About
