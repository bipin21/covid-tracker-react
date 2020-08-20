import React, { useState, useEffect } from 'react';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
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

          setCountries(countries);
        });
    };

    getCountiresData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  }

  return (
    <div className="app">
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
        <InfoBox title="Coronavirus Cases" cases={1500} total={2000} />
        {/* Info Boxes 2 -> recoveries*/}
        <InfoBox title="Recovered" cases={1500} total={2000} />
        {/* Info Boxes 3 -> */}
        <InfoBox title="Total Cases" cases={1500} total={2000} />
      </div>


      {/* Table info */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
