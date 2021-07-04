import {GiConfirmed} from 'react-icons/gi'
import './index.css'

const HomeStateDetails = props => {
  const {confirmed, recovered, tested, deceased} = props

  return (
    <div className="brief-details-container">
      <div className="each-sec-container">
        <p className="detail-name confirmed">Confirmed</p>
        <GiConfirmed className="confirmed-icon confirmed" />
        <h1 className="confirmed-number-stat confirmed">{confirmed}</h1>
      </div>
      <div className="each-sec-container">
        <p className="detail-name active">active</p>
        <GiConfirmed className="confirmed-icon active" />
        <h1 className="confirmed-number-stat active">{tested}</h1>
      </div>
      <div className="each-sec-container">
        <p className="detail-name recovered">Recovered</p>
        <GiConfirmed className="confirmed-icon recovered" />
        <h1 className="confirmed-number-stat recovered">{recovered}</h1>
      </div>
      <div className="each-sec-container">
        <p className="detail-name deceased">Deceased</p>
        <GiConfirmed className="confirmed-icon deceased" />
        <h1 className="confirmed-number-stat deceased">{deceased}</h1>
      </div>
    </div>
  )
}
export default HomeStateDetails
