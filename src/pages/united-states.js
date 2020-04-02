import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SummaryTable from "../components/summaryTable"

import DomesticConfiguration from "../utils/domestic/domesticConfiguration"
import { getTotalSummary, cleanData } from "../utils/domestic/domestic"

const UnitedStatesPage = () => (
  <Layout>
    <StaticQuery
      query={graphql`
        query {
          usa {
            states(
              ids: [
                "AL"
                "AK"
                "AZ"
                "AR"
                "CA"
                "CO"
                "CT"
                "DE"
                "FL"
                "GA"
                "HI"
                "ID"
                "IL"
                "IN"
                "IA"
                "KS"
                "KY"
                "LA"
                "ME"
                "MD"
                "MA"
                "MI"
                "MN"
                "MS"
                "MO"
                "MT"
                "NE"
                "NV"
                "NH"
                "NJ"
                "NM"
                "NY"
                "NC"
                "ND"
                "OH"
                "OK"
                "OR"
                "PA"
                "RI"
                "SC"
                "SD"
                "TN"
                "TX"
                "UT"
                "VT"
                "VA"
                "WA"
                "WV"
                "WI"
                "WY"
                "AS"
                "DC"
                "GU"
                "MP"
                "PR"
                "VI"
              ]
            ) {
              name
              covidResource {
                total {
                  positive
                  negative
                  death
                }
              }
            }
          }
        }
      `}
      render={data => {
        if (!data.usa) {
          return <h1 className="text-4xl m-auto">Loading...</h1>
        }

        cleanData(data.usa.states)
        var aggregateData = getTotalSummary(data.usa.states)

        return (
          <>
            <div className="text-gray-500 m-4">
              <h1>
                Data source thanks to{" "}
                <a
                  className="text-blue-600 hover:underline"
                  href="https://github.com/COVID19Tracking/covid-tracking-api"
                >
                  COVID Tracking API
                </a>
              </h1>
              <h1>**Data updated periodically (around every 3 hours)**</h1>
            </div>

            <h1 className="mx-auto underline text-2xl mb-6">U.S.A. Summary</h1>
            <table className="table-auto mx-8 mb-10">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Positive Test Cases</th>
                  <th className="border px-4 py-2">Negative Test Cases</th>
                  <th className="border px-4 py-2">Total Tests Done</th>
                  <th className="border px-4 py-2">Deaths</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 text-center">
                    {aggregateData.totalPositive.toLocaleString("en")}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {aggregateData.totalNegative.toLocaleString("en")}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {(
                      aggregateData.totalPositive + aggregateData.totalNegative
                    ).toLocaleString("en")}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {aggregateData.totalDeaths.toLocaleString("en")}
                  </td>
                </tr>
              </tbody>
            </table>

            <SummaryTable
              data={data.usa.states}
              title={DomesticConfiguration.title}
              columns={DomesticConfiguration.columns}
              defaultSortField={DomesticConfiguration.defaultSortField}
              keyField={DomesticConfiguration.keyField}
            />
          </>
        )
      }}
    />
  </Layout>
)

export default UnitedStatesPage
