import {Component} from 'react'
import SearchElement from '../SearchElement'
import ActiveRecoveredSec from '../ActiveRecoveredSec'
import './index.css'

class Home extends Component {
  statesList = this.props

  state = {
    result: {},
    totalData: {},
  }

  componentDidMount() {
    this.getTheCountryCovidData()
  }

  getTheCountryCovidData = async () => {
    const dataUrl = 'https://api.covid19india.org/v4/min/data.min.json'

    const response = await fetch(dataUrl)
    const jsonData = await response.json()
    console.log(jsonData)
    const orderedData = this.getTheSumOfAllData(jsonData)
    this.updateState(orderedData, jsonData)
  }

  updateState = (resultData, data) => {
    this.setState({result: resultData, totalData: data})
  }

  getTheSumOfAllData = dataResults => {
    const resultData = {
      confirmed: 0,
      deceased: 0,
      recovered: 0,
      active: 0,
      tested: 0,
    }
    Object.keys(dataResults).forEach(eachData => {
      const keyValue = dataResults[eachData]
      const totalValues = keyValue.total
      resultData.confirmed += totalValues.confirmed
      resultData.deceased += totalValues.deceased
      resultData.recovered += totalValues.recovered
      resultData.active += totalValues.active
      resultData.tested += totalValues.tested
    })

    return resultData
  }

  getEachStateDetails = (eachKey, stateDetails) => {
    const statesList = this.props
    const stateName = statesList.statesList.filter(
      eachState => eachState.state_code === eachKey,
    )

    const stateObject = stateName[0]
    console.log(typeof stateObject)
    const totalData = stateDetails.total
    const metaData = stateDetails.meta
    return (
      <div className="state-detail-list">
        <p className="list-text state ">{eachKey}</p>
        <p className="confirmed line-text">{totalData.confirmed}</p>
        <p className="active list-text">{totalData.tested}</p>
        <p className="recovered list-text">{totalData.recovered}</p>
        <p className="deceased list-text">{totalData.deceased}</p>
        <p className="population list-text">{metaData.population}</p>
      </div>
    )
  }

  getEachStateListItems = totalData => {
    const stateList = Object.entries(totalData)
    return stateList.map(eachKey =>
      this.getEachStateDetails(eachKey[0], eachKey[1]),
    )
  }

  render() {
    const {result, totalData} = this.state
    const statesList = this.props
    console.log(typeof statesList)
    console.log(statesList.statesList)
    const {confirmed, deceased, recovered, tested} = result
    console.log(tested)
    return (
      <div className="home-bg-container">
        <SearchElement statesList={statesList} />

        <ActiveRecoveredSec
          confirmed={confirmed}
          deceased={deceased}
          recovered={recovered}
          tested={tested}
        />
        <div className="state-wise-data-container">
          <div className="headings-container">
            <p className="heading-text">states/UT</p>
            <p className="heading-text">Confirmed</p>
            <p className="heading-text">Active</p>
            <p className="heading-text">Recovered</p>
            <p className="heading-text">Deceased</p>
            <p className="heading-text">Population</p>
          </div>
          <hr className="line" />
          <div className="states-list-container">
            {this.getEachStateListItems(totalData)}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
