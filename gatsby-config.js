module.exports = {
  siteMetadata: {
    title: `COVID19 Stats`,
    description: `Basic statistics from various data sources on covid-19.`,
    author: `@dmt5dh`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `COVID19-Web`,
        short_name: `COVID19Web`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "CovidGlobal",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "global",
        // Url to query from
        url: "https://covid19-graphql.now.sh/",
      },
    },
    
    //TODO: Bring back whenever USA data back online
    // {
    //   resolve: "gatsby-source-graphql",
    //   options: {
    //     // Arbitrary name for the remote schema Query type
    //     typeName: "CovidUSA",
    //     // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
    //     fieldName: "usa",
    //     // Url to query from
    //     url: "https://covidtracking.com/api/graphql",
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
