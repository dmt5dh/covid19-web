import React from "react"
import DataTable from "react-data-table-component"

class SummaryTable extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            filterText: "",
            filterData: this.props.data
        }
    }

    handleSearch = (event) => {
        event.preventDefault()
        var text = event.target.value
        if(text) {
            var tmpData = this.props.data //because we don't wanna dirty things up in transit

            tmpData = tmpData.filter(item => item.country.name && item.country.name.toLowerCase().includes(text.toLowerCase()));
            this.setState({
                filterText: text,
                filterData: tmpData
            })
        }
        else {
            this.setState({
                filterText: "",
                filterData: this.props.data
            }) 
        }
    }

    handlePress = (event) => {
        if (event.keyCode == 13) { //for mobile if "ENTER" buton pressed
        console.log('asdf')
            event.preventDefault()
            event.target.blur()
        }
    }

    render() {
        //react-data-table-component relies on document which we'll skip during server side rendering on build
        if(typeof document === `undefined`) {
            return (
                null
            )
        }

        return (
            <div className="mx-32">
                <h1 className="underline text-center text-md sm:text-2xl mb-1">{this.props.title}</h1>
                <div className="w-full text-right">
                    <input className="shadow appearance-none border rounded w-full sm:w-3/12 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="search" onChange={this.handleSearch} onKeyDown={this.handlePress} value={this.state.filterText} placeholder="Search by Country"/>
                </div>
                <DataTable
                noHeader={true}
                columns={this.props.columns}
                data={this.state.filterData}
                defaultSortField={this.props.defaultSortField}
                defaultSortAsc={false}
                keyField={this.props.keyField}
                striped={true}
                highlightOnHover={true}
                pagination={true}
                dense={true}
                />
            </div>
        )
    }
}

export default SummaryTable
