//Helper functions for domestic data

const getTotalConfirmed = data => {
  var confirmed = 0
  data.map(d => (confirmed += d.covidResource.total.positive))
  return confirmed
}

const getTotalNegative = data => {
  var negative = 0
  data.map(d => (negative += d.covidResource.total.negative))
  return negative
}

const getTotalDeaths = data => {
  var deaths = 0
  data.map(d => (deaths += d.covidResource.total.death))
  return deaths
}

export const cleanData = data => {
  var cleanData = {
    results: [],
  }

  data.map(d => {
    if (!d.covidResource.total.positive) {
      d.covidResource.total.positive = 0
    }

    if (!d.covidResource.total.negative) {
      d.covidResource.total.negative = 0
    }

    if (!d.covidResource.total.death) {
      d.covidResource.total.death = 0
    }

    // cleanData.results.push(d)
  })

  // return cleanData
}

export const getTotalSummary = data => {
  return {
    totalPositive: getTotalConfirmed(data),
    totalNegative: getTotalNegative(data),
    totalDeaths: getTotalDeaths(data),
  }
}
