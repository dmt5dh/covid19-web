const GlobalDataConfiguration = {
  columns: [
    {
      name: "Country",
      selector: "country.name",
      sortable: true,
    },
    {
      name: "Confirmed Cases",
      selector: "confirmed",
      sortable: true,
    },
    {
      name: "Deaths",
      selector: "deaths",
      sortable: true,
    },
    {
      name: "Recovered Cases",
      selector: "recovered",
      sortable: true,
    },
    {
      name: "Growth Rate",
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