import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const DailyCharts = props => {
  const {dateDataForDaily, chartType, curveStroke} = props
  const legendData = [{name: 'something', value: chartType}]
  function createData(time, cases) {
    return {time, cases}
  }
  function getDateMonth(date) {
    const dateMonthString = new Date(date)
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    return `${dateMonthString.getDate()} ${months[dateMonthString.getMonth()]}`
  }

  function dataAssign() {
    console.log(dateDataForDaily[112][1].delta7[chartType])
    const data = []
    if (chartType === 'active') {
      dateDataForDaily.forEach((eachData, index) => {
        if (index !== 0) {
          data.push(
            createData(
              getDateMonth(eachData[0]),
              eachData[1].total.confirmed -
                eachData[1].total.recovered -
                eachData[1].total.deceased -
                (dateDataForDaily[index - 1][1].total.confirmed -
                  dateDataForDaily[index - 1][1].total.deceased -
                  dateDataForDaily[index - 1][1].total.recovered),
            ),
          )
        } else {
          data.push(
            createData(
              getDateMonth(eachData[0]),
              eachData[1].total.confirmed -
                eachData[1].total.recovered -
                eachData[1].total.deceased,
            ),
          )
        }
      })
    } else if (chartType === 'Test Positivity Ratio') {
      dateDataForDaily.forEach((eachData, index) => {
        if (index !== 0) {
          data.push(
            createData(
              getDateMonth(eachData[0]),
              (eachData[1].total.confirmed / eachData[1].total.tested) * 100 -
                (dateDataForDaily[index - 1][1].total.confirmed /
                  dateDataForDaily[index - 1][1].total.tested) *
                  100,
            ),
          )
        } else {
          data.push(
            createData(
              getDateMonth(eachData[0]),
              (eachData[1].total.confirmed / eachData[1].total.tested) * 100,
            ),
          )
        }
      })
    } else {
      dateDataForDaily.forEach((eachData, index) => {
        if (index !== 0) {
          data.push(
            createData(
              getDateMonth(eachData[0]),
              eachData[1].total[chartType] -
                dateDataForDaily[index - 1][1].total[chartType],
            ),
          )
        } else {
          data.push(
            createData(getDateMonth(eachData[0]), eachData[1].total[chartType]),
          )
        }
      })
    }
    return data
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={dataAssign()}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
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
        <Bar dataKey="cases" fill={curveStroke} />
      </BarChart>
    </ResponsiveContainer>
  )
}
export default DailyCharts
