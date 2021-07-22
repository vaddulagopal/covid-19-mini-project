import {useTheme} from '@material-ui/core/styles'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'

const CumulativeCharts = props => {
  const {dateDataForCumulative, chartType, curveStroke} = props
  function createData(time, cases) {
    return {time, cases}
  }
  function getDateMonth(date) {
    const dateMonthString = new Date(date)
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
    return months[dateMonthString.getMonth()]
  }

  function dataAsign() {
    if (chartType === 'active') {
      return dateDataForCumulative.map(eachData =>
        createData(
          getDateMonth(eachData[0]),
          eachData[1].total.confirmed -
            eachData[1].total.deceased -
            eachData[1].total.recovered,
        ),
      )
    }
    if (chartType === 'Test Positivity Ratio') {
      return dateDataForCumulative.map(eachData =>
        createData(
          getDateMonth(eachData[0]),
          (eachData[1].total.confirmed / eachData[1].total.tested) * 100,
        ),
      )
    }
    return dateDataForCumulative.map(eachData =>
      createData(getDateMonth(eachData[0]), eachData[1].total[chartType]),
    )
  }
  const legendData = [{name: 'something', value: chartType}]

  const theme = useTheme()
  const dotValue = true
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={dataAsign()}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <YAxis stroke={curveStroke} orientation="left">
            <Label
              angle={270}
              position="left"
              style={{textAnchor: 'middle', fill: theme.palette.text.primary}}
            >
              Cases
            </Label>
          </YAxis>
          <Tooltip />
          <XAxis
            dataKey="time"
            stroke={curveStroke}
            className="x-axis-styles"
          />

          <Legend
            payload={legendData.map(item => ({
              id: item.name,
              type: 'line',
              value: item.value,
            }))}
            wrapperStyle={{margin: '0px', color: curveStroke}}
            layout="vertical"
            verticalAlign="top"
            align="right"
          />
          <Line
            type="monotone"
            dataKey="cases"
            stroke={curveStroke}
            dot={dotValue}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

export default CumulativeCharts
