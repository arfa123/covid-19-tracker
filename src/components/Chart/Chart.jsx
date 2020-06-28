import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

import { getDailyCovidData } from "../../api";
import styles from "./Chart.module.css";

const Chart = ({ selectedCountry }) => {

	const [dailyData, setDailyData] = useState([]);

	useEffect(() => {
		async function getDailyData() {
			const data = await getDailyCovidData(selectedCountry);
			setDailyData(data);
		}

		getDailyData();

	}, [selectedCountry]);

	const lineChart = (
		dailyData[0] ?
			<Line
				data={{
					labels: dailyData.map((data, i) => data.Date ? new Date(data.Date).toLocaleDateString() : i),
					datasets: [{
						data: dailyData.map(({ Confirmed }) => Confirmed),
						label: "Infected",
						borderColor: "#3333ff",
						fill: true
					}, {
						data: dailyData.map(({ Deaths }) => Deaths),
						label: "Deaths",
						borderColor: "red",
						backgroundColor: "rgba(255, 0, 0, 0.5)",
						fill: true
					}]
				}}
			/>
			: null
	);

	return (
		<div className={styles.container}>
			{lineChart}
		</div>
	);
};

export default Chart;