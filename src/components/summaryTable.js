import React from "react"
import DataTable from "react-data-table-component"

const SummaryTable = ({ data, title, columns, defaultSortField, keyField }) => {

    //react-data-table-component relies on document which we'll skip during server side rendering on build
    if(typeof document === `undefined`) {
        return (
            null
        )
    }

    return (
        <div className="mx-8">
            <h1 className="underline text-center text-2xl">{title}</h1>
            <DataTable
            noHeader={true}
            columns={columns}
            data={data}
            defaultSortField={defaultSortField}
            defaultSortAsc={false}
            keyField={keyField}
            striped={true}
            highlightOnHover={true}
            pagination={true}
            />
        </div>
    )
}

export default SummaryTable
