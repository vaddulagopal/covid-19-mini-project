import {Component} from 'react'
import Loader from 'react-loader-spinner'
import SearchElement from '../SearchElement'
import ActiveRecoveredSec from '../ActiveRecoveredSec'
import FooterSection from '../FooterSection'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class Home extends Component {
  state = {
    result: {
      total: {
        confirmed: 0,
        deceased: 0,
        recovered: 0,
        tested: 0,
        vaccinated1: 0,
        vaccinated2: 0,
      },
    },
    totalData: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getTheCountryCovidData()
  }

  getTheCountryCovidData = async () => {
    const dataUrl = 'https://api.covid19india.org/v4/min/data.min.json'

    const response = await fetch(dataUrl)
    const jsonData = await response.json()

    const orderedSumData = this.getTheSumOfAllData(jsonData)
    this.updateState(orderedSumData, jsonData, false)
  }

  updateState = (orderedSumData, data, load) => {
    this.setState({result: orderedSumData, totalData: data, isLoading: load})
  }

  getTheSumOfAllData = dataResults => {
    const activeCases =
      dataResults.TT.total.confirmed -
      dataResults.TT.total.deceased -
      dataResults.TT.total.recovered
    const resultData = {
      confirmed: dataResults.TT.total.confirmed,
      deceased: dataResults.TT.total.deceased,
      recovered: dataResults.TT.total.recovered,
      active: activeCases,
      tested: dataResults.TT.total.tested,
    }

    return resultData
  }

  eachStateCovidData = (eachKey, eachStateName, StateList) => {
    const totalData = eachStateName.total
    const activeData =
      totalData.confirmed - totalData.deceased - totalData.recovered
    const metaData = eachStateName.meta
    let stateName = 'India'
    StateList.forEach(eachState => {
      if (eachState.stateCode === eachKey && eachKey !== 'TT') {
        stateName = eachState.stateName
      }
    })

    return (
      <tr className="state-detail-list">
        <td className="list-text state-table ">{stateName}</td>
        <td className="confirmed-table line-text">{totalData.confirmed}</td>
        <td className="active-table list-text">{activeData}</td>
        <td className="recovered-table list-text">{totalData.recovered}</td>
        <td className="deceased-table list-text">{totalData.deceased}</td>
        <td className="population-table list-text">{metaData.population}</td>
      </tr>
    )
  }

  getEachStateListItems = totalData => {
    const {statesList1} = this.props
    const newStateList = []
    statesList1.forEach(eachstate => {
      newStateList.push({
        stateCode: eachstate.state_code,
        stateName: eachstate.state_name,
      })
    })
    const stateList = Object.entries(totalData)
    return stateList.map(eachKey =>
      this.eachStateCovidData(eachKey[0], eachKey[1], newStateList),
    )
  }

  getTheReturnHomeData = () => {
    const {result, totalData} = this.state
    const {statesList1} = this.props
    const {confirmed, deceased, recovered, active} = result
    return (
      <div className="home-bg-container">
        <SearchElement statesList2={statesList1} key="search Item" />

        <ActiveRecoveredSec
          confirmed={confirmed}
          deceased={deceased}
          recovered={recovered}
          active={active}
        />
        <div className="table-container">
          <table className="state-wise-data-container">
            <tr className="headings-container">
              <th className="heading-text state-table">states/UT</th>
              <th className="heading-text">Confirmed</th>
              <th className="heading-text">Active</th>
              <th className="heading-text">Recovered</th>
              <th className="heading-text">Deceased</th>
              <th className="heading-text">Population</th>
            </tr>
            <hr className="line" />
            {this.getEachStateListItems(totalData)}
          </table>
        </div>
        <FooterSection />
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        {isLoading ? (
          <div className="state-loader-details-container">
            <Loader type="Oval" color="#007BFF" height={32} width={32} />
          </div>
        ) : (
          this.getTheReturnHomeData()
        )}
      </>
    )
  }
}

export default Home
