import React from "react"
import mapboxgl from "mapbox-gl"
import moment from "moment"

import '../styles/map.css'

import Layout from "../components/layout"
import SEO from "../components/seo"

mapboxgl.accessToken = 'pk.eyJ1IjoiZG10bWFwcyIsImEiOiJjazhpOXczZXowM3l3M2dtMXdvbmVuejJqIn0.7qF25W9xmSvQp2GVsXNJKA'; 

// const today = moment().add(-1, 'days');

//TODO: set to april 1st for now... make this dynamic later
const today = moment([2020, 3, 1])

class MapPage extends React.Component {

    constructor(props) {
        super(props);

        this.pageMap = {};

        this.state = {
            dateDisplay: today.format('MM-DD-YYYY'),
            currentDay: today.diff(moment([2020, 2, 1]), 'days'),
            totalDays: today.diff(moment([2020, 2, 1]), 'days'),
            loading: true
        }
    }

    handleSlider = (event) => {
        event.preventDefault()
        var updatedDay = event.target.value

        var difference = updatedDay - this.state.currentDay

        var newDay = today.add(difference, 'days')

        this.setState({
            dateDisplay: newDay.format('MM-DD-YYYY'),
            currentDay: newDay.diff(moment([2020, 2, 1]), 'days'),
        })

        console.log(this.state.currentDay)
        this.pageMap.getSource('covid19-data').setData(`/data/daily_summary/geojson/${this.state.dateDisplay}.geojson`)

        // this.pageMap.setFilter('collisions', ['==', ['number', ['get', 'Hour']], this.state.hour]);
    }

    componentDidMount() {
            const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [10.615040, 30.459741], 
            zoom: 1
            });

            map.on("render", function() {
                if(map.loaded()) {
                    this.setState({
                        loading: false,
                    })
                }
            }.bind(this));
            
            map.on('load', function() {
                map.resize()

                map.addSource('covid19-data', {
                        type: 'geojson',
                        data: `/data/daily_summary/geojson/${today.format('MM-DD-YYYY')}.geojson` // replace this with the url of your own geojson
                })

                map.addLayer({
                  id: 'covid19',
                  type: 'circle',
                  source: "covid19-data",
                  paint: {
                    'circle-radius': [
                      'interpolate',
                      ['linear'],
                      ['number', ['get', 'Confirmed']],
                      1, 3,
                      500, 5,
                      1000, 10,
                      10000, 15,
                      50000, 20,
                      100000, 30,
                    ],
                    'circle-color': [
                      'interpolate',
                      ['linear'],
                      ['number', ['get', 'Confirmed']],
                      1, '#2dc4b2',
                      500, '#55B0C5',
                      1000, '#7385C2',
                      10000, '#9B7CB7',
                      50000, '#97606E',
                      100000, '#BC2B55'
                    ],
                    'circle-opacity': 0.8,
                  },
                //   filter: ['==', ['string', ['get', 'Country_Region']], 'China']
                });
              });

              this.pageMap = map;
    }

    addLayer = () => {
        this.pageMap.addLayer({
            id: 'covid19',
            type: 'circle',
            source: {
              type: 'geojson',
              data: `/data/daily_summary/geojson/${this.state.dateDisplay}.geojson` // replace this with the url of your own geojson
            },
            paint: {
              'circle-radius': [
                'interpolate',
                ['linear'],
                ['number', ['get', 'Confirmed']],
                1, 3,
                500, 5,
                1000, 10,
                10000, 15,
                50000, 20,
                100000, 30,
              ],
              'circle-color': [
                'interpolate',
                ['linear'],
                ['number', ['get', 'Confirmed']],
                1, '#2dc4b2',
                500, '#55B0C5',
                1000, '#7385C2',
                10000, '#9B7CB7',
                50000, '#97606E',
                100000, '#BC2B55'
              ],
              'circle-opacity': 0.8,
            },
          //   filter: ['==', ['string', ['get', 'Country_Region']], 'China']
          });
    }

    render() {

        return (
            <Layout>
                <SEO title="Global Map" />
                <h2 className="mx-auto text-base md:text-2xl">Confirmed cases for date: <label className="text-base md:text-2xl">{this.state.dateDisplay}</label></h2>
                <p className="text-sm italic text-gray-600">Use slider to change date</p>
                
                {!this.state.loading &&
                        <input id='slider' className="slider w-full mb-6" type='range' min='0' max={this.state.totalDays} step='1' value={this.state.currentDay} onChange={this.handleSlider} />
                }
                {this.state.loading &&
                        <input disabled id='slider' className="slider w-full mb-6" type='range' min='0' max={this.state.totalDays} step='1' value={this.state.currentDay} onChange={this.handleSlider} />
                }
                
                <div style={{height:"65vh"}}>
                    <div className="mx-auto w-full md:w-4/6 h-full" ref={el=> this.mapContainer = el}></div>
                    <div className="mx-auto w-full md:w-4/6 bg-white mt-2">
                        <div style={{
                                background: "linear-gradient(to right, #2dc4b2, #55B0C5, #7385C2, #9B7CB7, #97606E, #BC2B55)",
                                marginBottom: "5px"
                            }} 
                            className='h-4'>
                        </div>
                        <div className="flex flex-row justify-between flex-grow text-sm md:text-base">
                            <div>1+</div>
                            <div>500+</div>
                            <div>1000+</div>
                            <div>10000+</div>
                            <div>50000+</div>
                            <div>100000+</div>
                        </div>
                    </div>
                    <div className="text-gray-500 text-sm text-right">
                    <h1>
                        Data source thanks to{" "}
                        <a
                        className="text-blue-600 hover:underline"
                        href="https://github.com/CSSEGISandData/COVID-19"
                        >
                        JHU CSSE
                        </a>
                    </h1>
                    <h1>Figures updated daily</h1>
                </div>      
                </div>
            </Layout>
        )
    }
}

export default MapPage