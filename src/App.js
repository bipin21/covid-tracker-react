import React, { useState, useEffect } from 'react';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import LineGraph from "./LineGraph";
import {sortData} from "./util";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      })
  }, [])

  // state = how to write a variable in react
  // https://disease.sh/v3/covid-19/all
  // useEffect
  useEffect(() => {
    //  run once on first load of component and not again
    const getCountiresData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {

          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2, // UK, USA, FR
          }));
          
          let sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };

    getCountiresData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' :
      `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);

        // 
        setCountryInfo(data);
      })
  }


  return (
    <div className="app">
      <div className="app_left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined"
              value={country}
              onChange={onCountryChange}>
              {/* Loop through all country */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        {/* Header */}
        {/* Title + Selector */}

        {/* Info Boxes 1 */}
        <div className="app__stats">
          {/* Info Boxes 1 -> cases*/}
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          {/* Info Boxes 2 -> recoveries*/}
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          {/* Info Boxes 3 -> */}
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        {/* Table info */}
        <Map />

      </div>
      <Card className="app_right">
        {/* Table */}
        <CardContent>
          <h3>Live cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new {casesType}</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
        {/* Graph */}
      </Card>
    </div>
  );
}

export default App;
