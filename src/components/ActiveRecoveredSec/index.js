import './index.css'

const HomeStateDetails = props => {
  const {confirmed, recovered, active, deceased} = props

  return (
    <div className="brief-details-container">
      <div className="each-sec-container confirmed">
        <p className="detail-name ">Confirmed</p>
        <img
          alt="confirmed"
          src="https://res.cloudinary.com/dyi08eugq/image/upload/v1626265599/check-mark_1_1_rwqx9y.jpg"
          className="confirmed-icon "
        />
        <h1 className="confirmed-number-stat">{confirmed}</h1>
      </div>
      <div className="each-sec-container active">
        <p className="detail-name ">active</p>
        <img
          alt="active"
          src="https://res.cloudinary.com/dyi08eugq/image/upload/v1626265599/protection_2_mebpvn.jpg"
          className="confirmed-icon "
        />
        <h1 className="confirmed-number-stat">{active}</h1>
      </div>
      <div className="each-sec-container recovered">
        <p className="detail-name ">Recovered</p>
        <img
          src="https://res.cloudinary.com/dyi08eugq/image/upload/v1626265599/Vector_6_ge3yfh.jpg"
          className="confirmed-icon "
          alt="recovered"
        />
        <h1 className="confirmed-number-stat">{recovered}</h1>
      </div>
      <div className="each-sec-container deceased">
        <p className="detail-name ">Deceased</p>
        <img
          alt="deceased"
          src="https://res.cloudinary.com/dyi08eugq/image/upload/v1626265599/breathing_1_1_hd6gio.jpg"
          className="confirmed-icon "
        />
        <h1 className="confirmed-number-stat">{deceased}</h1>
      </div>
    </div>
  )
}
export default HomeStateDetails
