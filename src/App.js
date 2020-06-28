import React, { useState, useEffect } from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { getAllCovidData, getCountryData } from "./api";

function App() {

	const [covidData, setCovidData] = useState({});
	const [selectedCountry, setSelectedCountry] = useState("");

	useEffect(() => {
		getAllData();
	}, []);

	const getAllData = async () => {
		const data = await getAllCovidData();
		setCovidData({
			confirmed: data.TotalConfirmed,
			deaths: data.TotalDeaths,
			recovered: data.TotalRecovered
		});
	};

	const countrySelected = async (country) => {
		const countryData = await getCountryData(country);
		setSelectedCountry(country);
		if (country) {
			if (countryData) {
				setCovidData({
					confirmed: countryData.Confirmed,
					deaths: countryData.Deaths,
					recovered: countryData.Recovered
				});
			} else {
				setCovidData({});
			}
		} else {
			getAllData();
		}
	};

	return (
		<div className={styles.container}>
			<Cards covidData={covidData} />
			<CountryPicker countrySelected={countrySelected} />
			<Chart selectedCountry={selectedCountry} />
		</div>
	);
}

export default App;
