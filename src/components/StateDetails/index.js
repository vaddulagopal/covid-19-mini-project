import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ChartsSelectIcon from '../ChartsSelectIcon'
import ActiveRecoveredSec from '../ActiveRecoveredSec'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import FooterSection from '../FooterSection'

class StateDetails extends Component {
  state = {
    isLoading: true,
    stateCovidData: {
      total: {
        confirmed: 0,
        deceased: 0,
        recovered: 0,
        tested: 0,
        vaccinated1: 0,
        vaccinated2: 0,
      },
      districts: {},
    },
    stateName: '',
    lastUpdatedDate: '',
  }

  componentDidMount() {
    this.getStateCovidData()
  }

  updateStateData = (data, name, date) => {
    this.setState({
      stateCovidData: data,
      stateName: name,
      lastUpdatedDate: date,
      isLoading: false,
    })
  }

  getStateCovidData = async () => {
    const {match} = this.props
    const {params} = match.match
    const {stateId} = params
    const dataUrl = 'https://api.covid19india.org/v4/min/data.min.json'

    const response = await fetch(dataUrl)
    const jsonData = await response.json()
    const stateList = Object.entries(jsonData).filter(
      eachKey => eachKey[0] === stateId,
    )
    const {statesList1} = this.props
    const stateNameList = statesList1.filter(
      eachState => eachState.state_code === stateList[0][0],
    )
    const updatedDateData = this.getTheSumOfStateData(stateList[0][1])
    this.updateStateData(
      stateList[0][1],
      stateNameList[0].state_name,
      updatedDateData,
    )
  }

  getTheSumOfStateData = dataResults => {
    const resultData = {
      updatedDate: dataResults.meta.last_updated,
    }

    return resultData
  }

  getTopDistricts = () => {
    const {stateCovidData} = this.state
    const districtDetailsList = []
    const districtsList = stateCovidData.districts
    Object.entries(districtsList).forEach(eachDistrict => {
      if (eachDistrict[1].total.confirmed !== undefined) {
        districtDetailsList.push([
          eachDistrict[0],
          eachDistrict[1].total.confirmed,
        ])
      }
    })
    const sorted = districtDetailsList.sort((a, b) => a[1] - b[1])
    const descSorted = sorted.reverse()
    return (
      <>
        <h1 className="top-district-title">Top Districts</h1>
        <ul className="top-districts-container">
          {descSorted.map(eachTop => (
            <li className="each-top-district" key={eachTop[0]}>
              <p className="top-number">{eachTop[1]}</p>
              <p className="top-district">{eachTop[0]}</p>
            </li>
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {stateCovidData, stateName, lastUpdatedDate, isLoading} = this.state
    const totalStateData = stateCovidData.total
    const dateFormate = new Date(lastUpdatedDate.updatedDate)
    const {match} = this.props
    const {params} = match.match
    const {stateId} = params
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const resultDate = `last Updated on ${
      months[dateFormate.getMonth()]
    } ${dateFormate.getDate()}th ${dateFormate.getFullYear()}`
    const {confirmed, recovered, tested, deceased} = totalStateData
    const activeData =
      totalStateData.confirmed -
      totalStateData.recovered -
      totalStateData.deceased
    return (
      <>
        {isLoading ? (
          <div className="state-loader-details-container">
            <Loader type="Oval" color="#007BFF" height={32} width={32} />
          </div>
        ) : (
          <div className="state-details-container">
            <div className="state-name-tested-container">
              <div className="state-name-date-container">
                <div className="state-name-container">
                  <h1 className="state-name">{stateName}</h1>
                </div>
                <p className="last-updated-time">{resultDate}</p>
              </div>
              <div className="tested-sec-container">
                <p className="tested-heading">Tested</p>
                <p className="tested-num">{tested}</p>
              </div>
            </div>
            <ActiveRecoveredSec
              confirmed={confirmed}
              recovered={recovered}
              active={activeData}
              deceased={deceased}
            />
            {this.getTopDistricts()}
            <ChartsSelectIcon
              id={stateId}
              key={stateId}
              districtsList={stateCovidData.districts}
            />
            <FooterSection />
          </div>
        )}
      </>
    )
  }
}

export default StateDetails
