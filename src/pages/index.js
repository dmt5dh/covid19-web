import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"

import {
  getTotalSummary,
  getTodaysData,
  getTotalDataOverTime,
} from "../utils/global/global"

import GlobalDataConfiguration from "../utils/global/globalConfiguration"
import SummaryTable from "../components/summaryTable"
import SEO from "../components/seo"
import StatsLineChart from "../components/statsLineChart"

const IndexPage = () => (
  <Layout>
    <SEO title="Global Stats" />
    <StaticQuery
      query={graphql`
        query {
          global {
            results {
              country {
                name
              }
              date
              confirmed
              deaths
              recovered
              growthRate
            }
          }
        }
      `}
      render={data => {
        if (!data.global) {
          return <h1 className="text-4xl m-auto">Loading...</h1>
        }

        var todaysData = getTodaysData(data.global.results)
        var aggregateData = getTotalSummary(todaysData.results)
        var timeData = getTotalDataOverTime(data.global.results)

        return (
          <>
            <h1 className="mx-auto underline text-md sm:text-2xl">
              Global Statistics
            </h1>
            <p className="mx-auto text-gray-500 sm:text-sm text-xs">
              Data on {todaysData.date}. Updated daily
            </p>
            <table className="text-sm sm:text-base table-auto mx-auto md:mx-32 mb-4">
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
                    {aggregateData.totalConfirmed.toLocaleString("en")}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {aggregateData.totalRecovered.toLocaleString("en")}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {aggregateData.totalDeaths.toLocaleString("en")}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="w-full my-6">
              <StatsLineChart data={timeData} minHeight={300} width="100%" />
            </div>

            <SummaryTable
              data={todaysData.results}
              title={GlobalDataConfiguration.title}
              columns={GlobalDataConfiguration.columns}
              defaultSortField={GlobalDataConfiguration.defaultSortField}
              keyField={GlobalDataConfiguration.keyField}
            />
          </>
        )
      }}
    />
  </Layout>
)

export default IndexPage
