const DomesticDataConfiguration = {
  columns: [
    {
      name: "State",
      selector: "name",
      sortable: true,
    },
    {
      name: "Positive Test Cases",
      selector: "covidResource.total.positive",
      sortable: true,
    },
    {
      name: "Negative Test Cases",
      selector: "covidResource.total.negative",
      sortable: true,
    },
    {
      name: "Deaths",
      selector: "covidResource.total.death",
      sortable: true,
    },
  ],
  title: "States Summary",
  defaultSortField: "covidResource.total.positive",
  keyField: "name",
}

export default DomesticDataConfiguration
