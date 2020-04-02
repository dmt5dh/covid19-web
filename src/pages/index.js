import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"

import { getTotalSummary, getTodaysData } from "../utils/global/global"

import GlobalDataConfiguration from "../utils/global/globalConfiguration"
import SummaryTable from "../components/summaryTable"
import SEO from "../components/seo"

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
        return (
          <>
            <div className="text-gray-500 m-4">
              <h1>Showing latest data on {todaysData.date}</h1>
              <h1>
                Data source thanks to{" "}
                <a
                  className="text-blue-600 hover:underline"
                  href="https://github.com/rlindskog/covid19-graphql"
                >
                  rlindskog in collaboration with pomber & JHU data
                </a>
              </h1>
              <h1>**Data updated daily**</h1>
            </div>

            <h1 className="mx-auto underline text-2xl mb-6">Global Summary</h1>
            <table className="table-auto mx-8 mb-10">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Confirmed</th>
                  <th className="border px-4 py-2">Deaths</th>
                  <th className="border px-4 py-2">Recovered</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 text-center">
                    {aggregateData.totalConfirmed.toLocaleString("en")}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {aggregateData.totalDeaths.toLocaleString("en")}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {aggregateData.totalRecovered.toLocaleString("en")}
                  </td>
                </tr>
              </tbody>
            </table>

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
