import React from "react"
import { Link } from "gatsby"

const GlobalDataConfiguration = {
  columns: [
    {
      name: "Country",
      selector: "country.name",
      sortable: true,
      wrap: true,
      maxWidth: "5em"
    },
    {
      cell: (row) => <Link to={`/statistics?country=${row.country.name}`} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded-md">More Info</Link>,
      button: true,
    },
    {
      name: "Confirmed Cases",
      selector: "confirmed",
      sortable: true,
      format: row => `${row.confirmed.toLocaleString("en")}`
    },
    {
      name: "Recovered Cases",
      selector: "recovered",
      sortable: true,
      format: row => `${row.recovered.toLocaleString("en")}`
    },
    {
      name: "Deaths",
      selector: "deaths",
      sortable: true,
      format: row => `${row.deaths.toLocaleString("en")}`
    },
    {
      name: "Daily Growth Rate",
      selector: "growthRate",
      sortable: true,
      format: row => `${(row.growthRate * 100).toFixed(2) + " %"}`,
    },
  ],
  title: "Country Summary",
  defaultSortField: "confirmed",
  keyField: "country.name",
}

export default GlobalDataConfiguration
