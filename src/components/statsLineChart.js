import React from "react"
import { LineChart, Line, ResponsiveContainer, Legend, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';


class StatsLineChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = ({
            data: this.props.data,
            confirmed: {
                hide: false,
                color: "#8884d8"
            },
            deaths: {
                hide: false,
                color: "#912710"
            },
            recovered: {
                hide: false,
                color: "#F4B926"
            }, 
            payload: [
                {color: "#8884d8",
                dataKey: "confirmed",
                inactive: false,
                type: "line",
                value: "Confirmed"},
                {color: "#912710",
                dataKey: "deaths",
                inactive: false,
                type: "line",
                value: "Deaths"},
                {color: "#F4B926",
                dataKey: "recovered",
                inactive: false,
                type: "line",
                value: "Recovered"},
            ]    
        })
    }

    handleLegendClick = (e) => {
        const key = e.dataKey

        //Need to copy values not reference for setState to update UI on reassignment
        var newPayload = this.state.payload.slice()

        var index = 0;
        for(var i = 0; i<newPayload.length; i++) {
            if(newPayload[i].dataKey === key) {
                index = i;
                break;
            }
        }
        
        newPayload[index].inactive = !newPayload[index].inactive 

        var lineToUpdate = Object.assign({}, this.state[key])
        lineToUpdate.hide = !lineToUpdate.hide
        console.log(lineToUpdate)

        this.setState({
            payload: newPayload,
            [key]: lineToUpdate
        })
    }

    render() {
        return (
            <div className="mx-auto w-full sm:w-5/6">
                <ResponsiveContainer width={'100%'} minHeight={475}>
                    <LineChart data={this.state.data}>

                        {!this.state.confirmed.hide &&
                        <Line type="monotone" dataKey="confirmed" stroke={this.state.confirmed.color} dot={false} yAxisId="confirmed" hide={this.state.confirmed.hide}/>
                        }
                        {!this.state.confirmed.hide &&
                        <YAxis yAxisId="confirmed" axisLine={false} tickLine={false} stroke={this.state.confirmed.color}/>
                        }

                        {!this.state.deaths.hide &&
                        <Line type="monotone" dataKey="deaths" stroke={this.state.deaths.color} dot={false} yAxisId="deaths" hide={this.state.deaths.hide}/>
                        }
                        {!this.state.deaths.hide &&
                        <YAxis yAxisId="deaths" axisLine={false} tickLine={false} stroke={this.state.deaths.color} orientation="right"/>
                        }

                        {!this.state.recovered.hide &&
                        <Line type="monotone" dataKey="recovered" stroke={this.state.recovered.color} dot={false} yAxisId="recovered" hide={this.state.recovered.hide}/>
                        }
                        {!this.state.recovered.hide &&
                        <YAxis yAxisId="recovered" axisLine={false} tickLine={false} stroke={this.state.recovered.color} orientation="right"/>
                        }

                        {/* <CartesianGrid strokeDasharray="5 5" /> */}
                        
                        <XAxis interval="preserveStartEnd" dataKey="date" />

                        <Legend verticalAlign="bottom" height={36} onClick={this.handleLegendClick} payload={this.state.payload}/>
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

export default StatsLineChart