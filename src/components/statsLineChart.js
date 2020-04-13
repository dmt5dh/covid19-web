import React from "react"
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
} from "recharts"

class StatsLineChart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: this.props.data,
      confirmed: {
        hide: false,
        color: "#E3AD25",
      },
      deaths: {
        hide: false,
        color: "#AB3117",
      },
      recovered: {
        hide: false,
        color: "#3681D0",
      },
      payload: [
        {
          color: "#E3AD25",
          dataKey: "confirmed",
          inactive: false,
          type: "line",
          value: "Confirmed",
        },
        {
          color: "#AB3117",
          dataKey: "deaths",
          inactive: false,
          type: "line",
          value: "Deaths",
        },
        {
          color: "#3681D0",
          dataKey: "recovered",
          inactive: false,
          type: "line",
          value: "Recovered",
        },
      ],
    }
  }

  handleLegendClick = e => {
    const key = e.dataKey

    //Need to copy values not reference for setState to update UI on reassignment
    var newPayload = this.state.payload.slice()

    var index = 0
    for (var i = 0; i < newPayload.length; i++) {
      if (newPayload[i].dataKey === key) {
        index = i
        break
      }
    }

    newPayload[index].inactive = !newPayload[index].inactive

    var lineToUpdate = Object.assign({}, this.state[key])
    lineToUpdate.hide = !lineToUpdate.hide

    this.setState({
      payload: newPayload,
      [key]: lineToUpdate,
    })
  }

  render() {
    return (
      <div className="mx-auto w-full sm:w-5/6">
        <ResponsiveContainer
          width={this.props.width}
          minHeight={this.props.minHeight}
        >
          <LineChart data={this.state.data}>
            {!this.state.confirmed.hide && (
              <Line
                type="monotone"
                dataKey="confirmed"
                stroke={this.state.confirmed.color}
                dot={false}
                yAxisId="confirmed"
                hide={this.state.confirmed.hide}
              />
            )}
            {!this.state.confirmed.hide && (
              <YAxis
                tick={{fontSize: 12}}
                yAxisId="confirmed"
                axisLine={false}
                tickLine={false}
                stroke={this.state.confirmed.color}
                tickFormatter={item => item.toLocaleString("en")}
              />
            )}

            {!this.state.deaths.hide && (
              <Line
                type="monotone"
                dataKey="deaths"
                stroke={this.state.deaths.color}
                dot={false}
                yAxisId="deaths"
                hide={this.state.deaths.hide}
              />
            )}
            {!this.state.deaths.hide && (
              <YAxis
                tick={{fontSize: 12}}
                yAxisId="deaths"
                axisLine={false}
                tickLine={false}
                stroke={this.state.deaths.color}
                orientation="right"
                tickFormatter={item => item.toLocaleString("en")}
              />
            )}

            {!this.state.recovered.hide && (
              <Line
                type="monotone"
                dataKey="recovered"
                stroke={this.state.recovered.color}
                dot={false}
                yAxisId="recovered"
                hide={this.state.recovered.hide}
              />
            )}
            {!this.state.recovered.hide && (
              <YAxis
                tick={{fontSize: 12}}
                yAxisId="recovered"
                axisLine={false}
                tickLine={false}
                stroke={this.state.recovered.color}
                orientation="right"
                tickFormatter={item => item.toLocaleString("en")}
              />
            )}

            <XAxis interval="preserveStartEnd" dataKey="date" />

            <Legend
              verticalAlign="bottom"
              height={36}
              onClick={this.handleLegendClick}
              payload={this.state.payload}
            />

            <Brush dataKey="date" data={this.state.data}>
              <LineChart data={this.state.data}>
                {!this.state.confirmed.hide && (
                  <Line
                    type="monotone"
                    dataKey="confirmed"
                    stroke={this.state.confirmed.color}
                    dot={false}
                    yAxisId="confirmed"
                    hide={this.state.confirmed.hide}
                  />
                )}
                  {!this.state.deaths.hide && (
                    <Line
                      type="monotone"
                      dataKey="deaths"
                      stroke={this.state.deaths.color}
                      dot={false}
                      yAxisId="deaths"
                      hide={this.state.deaths.hide}
                    />
                  )}
                  {!this.state.recovered.hide && (
                    <Line
                      type="monotone"
                      dataKey="recovered"
                      stroke={this.state.recovered.color}
                      dot={false}
                      yAxisId="recovered"
                      hide={this.state.recovered.hide}
                    />
                  )}
              </LineChart>
            </Brush>

            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default StatsLineChart
