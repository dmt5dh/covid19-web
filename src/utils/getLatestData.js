const fs = require('fs');
const moment = require("moment");
const axios = require('axios');
const csv2geojson = require('csv2geojson');

//This is when i started the auto builds
const start = moment([2020, 3, 6])
const today = moment()
const steps = today.diff(start, 'days')
const endpoint = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/';

const downloadCsv = async (dateParam) => {
    const url = `${endpoint}${dateParam}.csv`;
    return axios.get(url)
      .then(response => {
        return response.data
      });
}

const convertToGeojson = async (data) => {
    return new Promise(resolve => {
        csv2geojson.csv2geojson(data,{
            numericFields: 'Confirmed, Deaths, Recovered'
        }, 
        (err, data) => {
            resolve(data);
        })
    })
}

getData = async () => {
    var date = start;
    for(var i = 0; i < steps; i++) {
        var dateParam = date.format("MM-DD-YYYY");
        var csv = await downloadCsv(dateParam);
        var geoJson = await convertToGeojson(csv);
        fs.writeFileSync(`./static/data/daily_summary/geojson/${dateParam}.geojson`, JSON.stringify(geoJson,null,2));
        date = date.add('1', 'days');
    }

    return 'done'
}

getData().then( data => {
   console.log(data);
})
