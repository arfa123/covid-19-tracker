import React, { useState, useEffect } from "react";
import {
	NativeSelect,
	FormControl
} from "@material-ui/core"

import { getCountries } from "../../api";
import styles from "./CountryPicker.module.css";

const CountryPicker = ({ countrySelected }) => {

	const [countries, setCountries] = useState([]);

	useEffect(() => {

		async function fetchCountries() {
			const data = await getCountries();

			setCountries(data);
		}

		fetchCountries();
	}, []);

	return (
		<FormControl className={styles.formControl}>
			<NativeSelect defaultValue="" onChange={(e) => countrySelected(e.target.value)}>
				<option value="">Global</option>
				{countries.map(country => <option key={country.ISO2} value={country.Slug}>{country.Country}</option>)}
			</NativeSelect>
		</FormControl>
	);
};

export default CountryPicker;