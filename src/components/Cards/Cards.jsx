import React from "react";
import {
	Grid
} from "@material-ui/core";
import cx from "classnames";

import StatsCard from "./StatsCard";
import styles from "./Cards.module.css";

const Cards = ({ covidData }) => {
	return (
		<div className={styles.container}>
			<Grid container spacing={3} justify="center">
				<StatsCard
					heading="Infected"
					value={covidData.confirmed}
					details="Number of active cases of COVID-19"
					classNames={cx(styles.card, styles.infected)}
				/>
				<StatsCard
					heading="Recovered"
					value={covidData.recovered}
					details="Number of recoveries from COVID-19"
					classNames={cx(styles.card, styles.recovered)}
				/>
				<StatsCard
					heading="Deaths"
					value={covidData.deaths}
					details="Number of deaths from COVID-19"
					classNames={cx(styles.card, styles.deaths)}
				/>
			</Grid>
		</div>
	);
};

export default Cards;