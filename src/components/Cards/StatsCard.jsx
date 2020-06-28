import React from "react";
import {
	Grid,
	Card,
	CardContent,
	Typography
} from "@material-ui/core";
import CountUp from "react-countup";

const StatsCard = ({ heading, value, details, classNames }) => {

	return (
		<Grid item component={Card} xs={12} md={3} className={classNames}>
			<CardContent>
				<Typography color="textSecondary" gutterBottom>
					{heading}
				</Typography>
				<Typography variant="h5">
					{value &&
						<CountUp
							start={0}
							end={value}
							duration={2.5}
							separator=","
						/>
					}
				</Typography>
				<Typography color="textSecondary">
					{new Date().toDateString()}
				</Typography>
				<Typography variant="body2">
					{details}
				</Typography>
			</CardContent>
		</Grid>
	);
};

export default StatsCard;