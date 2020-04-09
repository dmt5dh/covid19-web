import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import moment from "moment"

import StatsLineChart from "../components/statsLineChart"
import Layout from "../components/layout"
import SEO from "../components/seo"

const today = moment().format("LLL")
const StatisticsPage = (props) => {
    const query = gql`
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

    const { loading, error, data } = useQuery(query, {variables: { country: decodeURI(props.location.search.split("=")[1]) }});
    return(
        <Layout>
            <SEO title="Country Statistics" />
            {loading && 
            <div className="text-center">
            <h1 className="text-4xl">Retrieving Data...</h1>
          </div>
            }

            {data &&
            // <div>
            //   {JSON.stringify(data)}
            // </div>
                <div className="flex flex-col">
              <h1 className="mx-auto text-xl underline mb-2">
                Country data for {decodeURI(props.location.search.split("=")[1])}
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
                      {data.country.results[
                        data.country.results.length - 1
                      ].confirmed.toLocaleString("en")}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {data.country.results[
                        data.country.results.length - 1
                      ].deaths.toLocaleString("en")}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {data.country.results[
                        data.country.results.length - 1
                      ].recovered.toLocaleString("en")}
                    </td>
                  </tr>
                </tbody>
              </table>
              <StatsLineChart
                data={data.country.results}
                minHeight={475}
                width={"100%"}
              />
            </div>
            }
        </Layout>
    )
}
export default StatisticsPage