//Helper functions for global data
import moment from "moment"

const today = moment()
  .add(-1, "days")
  .format("YYYY-M-D")

const getTotalConfirmed = data => {
  var confirmed = 0
  data.map(d => (confirmed += d.confirmed))
  return confirmed
}

const getTotalDeaths = data => {
  var deaths = 0
  data.map(d => (deaths += d.deaths))
  return deaths
}

const getTotalRecovered = data => {
  var recovered = 0
  data.map(d => (recovered += d.recovered))
  return recovered
}

export const getTodaysData = data => {
  var todaysData = {
    results: [],
    date: moment()
      .add(-1, "days")
      .format("LL"),
  }
  data.map(d => {
    if (d.date === today) {
      todaysData.results.push(d)
    }
  })

  return todaysData
}

export const getSortDataByConfirmed = data => {
  return data.sort((a, b) => {
    return b.confirmed - a.confirmed
  })
}

export const getTotalSummary = data => {
  return {
    totalConfirmed: getTotalConfirmed(data),
    totalDeaths: getTotalDeaths(data),
    totalRecovered: getTotalRecovered(data),
  }
}
