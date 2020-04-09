import React, { setState } from "react"
import ApolloClient from "apollo-boost"
import { gql } from "apollo-boost"
import moment from "moment"

import Layout from "../components/layout"
import SEO from "../components/seo"
import StatsLineChart from "../components/statsLineChart"

// const data = [
//     {name: '22 Jan', uv: 400, pv: 100, amt: 2400},
//     {name: '23 Jan', uv: 300, pv: 400, amt: 2400},
//     {name: '24 Jan', uv: 500, pv: 200, amt: 2400},
//     {name: '25 Jan', uv: 900, pv: 50, amt: 2400},
// ]
const client = new ApolloClient({
  uri: "https://covid19-graphql.now.sh/",
})

const today = moment()
  .add(-1, "days")
  .format("LLL")
var query
class StatisticsPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {},
      loading: true,
    }

    query = gql`
      query($country: String) {
        country(name: $country) {
          name
          results {
            date
            confirmed
            deaths
            recovered
            growthRate
          }
        }
      }
    `
  }

  componentDidMount() {
    client
      .query({
        query: query,
        variables: {
          country: decodeURI(this.props.location.search.split("=")[1]),
        },
      })
      .then(response => {
        this.setState({
          countryName: response.data.country.name,
          data: response.data.country.results,
          loading: false,
        })
      })
  }

  render() {
    return (
      <Layout>
        <SEO title="Country Statistics" />
        <div>
          {this.state.loading ? (
            <div className="text-center">
              <h1 className="text-4xl">Retrieving Data...</h1>
            </div>
          ) : (
            <div className="flex flex-col">
              <h1 className="mx-auto text-2xl underline mb-2">
                Country data for {this.state.countryName}
              </h1>
              <p className="mx-auto text-gray-500 sm:text-sm text-xs">
                Data on {today}. Updated daily
              </p>
              <table className="mx-auto text-sm sm:text-base table-auto mx-auto md:mx-32 mb-2">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Confirmed</th>
                    <th className="border px-4 py-2">Recovered</th>
                    <th className="border px-4 py-2">Deaths</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2 text-center">
                      {this.state.data[
                        this.state.data.length - 1
                      ].confirmed.toLocaleString("en")}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {this.state.data[
                        this.state.data.length - 1
                      ].deaths.toLocaleString("en")}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {this.state.data[
                        this.state.data.length - 1
                      ].recovered.toLocaleString("en")}
                    </td>
                  </tr>
                </tbody>
              </table>
              <StatsLineChart
                data={this.state.data}
                minHeight={475}
                width={"100%"}
              />
            </div>
          )}
        </div>
      </Layout>
    )
  }
}

export default StatisticsPage
