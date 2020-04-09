import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <h1 className="mx-auto text-base md:text-4xl">About the Data</h1>
    <div className="mx-auto md:mx-24  text-base md:text-xl">
      <p>
        Many thanks for those that have put time and effort to collect,
        correlate, and aggregate data used on this website. Without you the
        fight against COVID-19 would be even more difficult. Data used on this
        page has been graciously collected and distributed by the following:
      </p>
      <div className=" mx-auto my-8 md:mx-20">
        <table className="table-auto mx-auto md:mx-8 mb-10">
          <thead>
            <tr>
              <th className="border px-4 py-2">Organization</th>
              <th className="border px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 text-center">
                <a
                  className="text-blue-600 hover:underline"
                  href="https://github.com/CSSEGISandData/COVID-19"
                >
                  JHU CSSE
                </a>
              </td>
              <td className="border px-4 py-2 text-center">
                Contains data sourced from over a dozen data holdings
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 text-center">
                <a
                  className="text-blue-600 hover:underline"
                  href="https://github.com/rlindskog/covid19-graphql"
                >
                  Jrlindskog in collaboration with pomber & JHU data
                </a>
              </td>
              <td className="border px-4 py-2 text-center">
                APIs generated from JHU CSSE data
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2 text-center">
                <a
                  className="text-blue-600 hover:underline"
                  href="https://covidtracking.com/"
                >
                  The COVID Tracking Project
                </a>
              </td>
              <td className="border px-4 py-2 text-center">
                Led by{" "}
                <a
                  className="italic"
                  href="https://www.theatlantic.com/health/archive/2020/03/how-many-americans-have-been-tested-coronavirus/607597/"
                >
                  The Atlantic
                </a>{" "}
                to provide organized U.S. state data and insights on the U.S.
                response to the COVID-19 pandemic. (Data sources currently
                experiencing intermittent technical issues)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mb-4">
        All data used on this website are for academic purposes only. I do not
        benefit monetarily from the use of any of this data. Data aggreagatd and
        correlated may exhibit inconsistencies and potential inaccuracies.
        COVID-19 data is still scarce as many states, provinces, and countries
        either 1) do not have the systems in place to collect data or 2) have
        not done the due diligence to test and collect data appropriately. Also, some countries most likely under report because of potential international embarassment.
      </p>
    </div>
  </Layout>
)

export default AboutPage
