import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="mx-auto">
      <h1>Confirmed</h1>
      <h2>Deaths</h2>
    </div>
  </Layout>
)

export default IndexPage
