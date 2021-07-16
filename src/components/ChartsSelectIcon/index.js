import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CumulativeCharts from '../CumulativeCharts'
import DailyCharts from '../DailyCharts'
import MySelect from '../MySelect'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class ChartsSelectIcon extends Component {
  state = {
    dateData: [],
    isFetching: true,
    isCumulativeChartsDisplayed: true,
  }

  componentDidMount() {
    this.getDateWiseDataForCharts()
  }

  updateStateData = value => {
    this.setState({
      dateData: value,
      isFetching: false,
      selected: 'India',
    })
  }

  getDateWiseDataForCharts = async () => {
    const {id} = this.props
    const requestUrl = `https://api.covid19india.org/v4/min/timeseries-${id}.min.json`
    const options = {
      method: 'GET',
    }

    const response = await fetch(requestUrl, options)
    const jsonData = await response.json()

    const dateObjectData = Object.entries(jsonData[id].dates)

    this.updateStateData(dateObjectData)
  }

  onCumulativeClicked = () => {
    this.setState({isCumulativeChartsDisplayed: true})
  }

  onDailyChartsClicked = () => {
    this.setState({isCumulativeChartsDisplayed: false})
  }

  handleChange = value => {
    this.setState({selected: value})
  }

  getOptionsForSelect = () => {
    const {districtsList} = this.props
    console.log(Object.keys(districtsList))
    const optionsData = Object.keys(districtsList)
    const options = optionsData.map(eachOption => ({
      value: eachOption,
      label: eachOption,
    }))
    return options
  }

  getChatBars = () => {
    const {isCumulativeChartsDisplayed, dateData, selected} = this.state
    const ChartNames = [
      ['confirmed', 'confirmed-chart', '#FF073A'],
      ['active', 'active-chart', '#007BFF'],
      ['recovered', 'recovered-chart', '#27A243'],
      ['deceased', 'deceased-chart', '#6C757D'],
      ['tested', 'tested-chart', '#9673B9'],
      ['vaccinated2', 'vaccination-chart', '#F95581'],
      ['Test Positivity Ratio', 'positive-ratio', '#FD7E14'],
    ]
    const cumulativeButtonClassName = isCumulativeChartsDisplayed
      ? 'btn-selected'
      : 'btn-not-selected'
    const dailyButtonClassName = isCumulativeChartsDisplayed
      ? 'btn-not-selected'
      : 'btn-selected'

    return (
      <div className="charts-bg-container">
        <h1 className="charts-heading">Spread Threads</h1>
        <div className="chart-buttons-container">
          <button
            type="button"
            className={cumulativeButtonClassName}
            onClick={this.onCumulativeClicked}
          >
            Cumulative
          </button>
          <button
            type="button"
            className={dailyButtonClassName}
            onClick={this.onDailyChartsClicked}
          >
            Daily
          </button>
        </div>
        <div className="district-select-item-container">
          <MySelect
            key="select-option"
            options={this.getOptionsForSelect()}
            onChange={this.handleChange}
            selected={selected}
          />
        </div>
        {isCumulativeChartsDisplayed ? (
          <>
            {ChartNames.map(eachName => (
              <div className={`chart-container ${eachName[1]}`}>
                <CumulativeCharts
                  dateDataForCumulative={dateData}
                  chartType={eachName[0]}
                  curveStroke={eachName[2]}
                  key={eachName[0]}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            {ChartNames.map(eachName => (
              <div className={`chart-container ${eachName[1]}`}>
                <DailyCharts
                  dateDataForDaily={dateData}
                  chartType={eachName[0]}
                  curveStroke={eachName[2]}
                  key={eachName[0]}
                />
              </div>
            ))}
          </>
        )}
      </div>
    )
  }

  render() {
    const {isFetching} = this.state
    return (
      <>
        {isFetching ? (
          <Loader type="Oval" color="#007BFF" height={32} width={32} />
        ) : (
          this.getChatBars()
        )}
      </>
    )
  }
}

export default ChartsSelectIcon
