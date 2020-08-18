import React, { useState, useEffect } from 'react';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";

function App() {
  const [countries, setCountries] = useState([]);
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
            name : country.country,
            value : country.countryInfo.iso2, // UK, USA, FR
          }));

          setCountries(countries);
        });
    };

    getCountiresData();
  }, []);

  return (
    <div className="app">
      <div className="app__header">
        <h1>Covid-19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined"
            value="abc"
          >
            {/* Loop through all country */}
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
      {/* Info Boxes 2 */}
      {/* Info Boxes 3 */}

      {/* Table info */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
