const BASE_URL = "https://api.covid19api.com/";

export const getAllCovidData = async () => {
	const reqObj = {
		method: "GET",
		redirect: "follow"
	};

	try {
		return await callApi(reqObj, "world/total");

	} catch (e) {
		console.log("getAllCovidData api call failed: ", e);
		return {};
	}
};

export const getCountries = async () => {
	const reqObj = {
		method: "GET",
		redirect: "follow"
	};

	try {
		return await callApi(reqObj, "countries");
	} catch (e) {
		console.log("getCountries api call failed: ", e);
	}
};

export const getDailyCovidData = async (selectedCountry) => {
	const today = new Date();
	const prev16thDate = new Date(new Date().setDate(new Date().getDate() - 16));

	today.setHours(0, 0, 0, 0);
	prev16thDate.setHours(0, 0, 0, 0);

	const queryParams = {
		from: prev16thDate.toISOString(),
		to: today.toISOString()
	};
	const reqObj = {
		method: "GET",
		redirect: "follow"
	};

	try {
		return await callApi(reqObj, selectedCountry ? `country/${selectedCountry}` : "world", queryParams);

	} catch (e) {
		console.log("getDailyCovidData api call failed: ", e);
		return {};
	}
};

export const getCountryData = async (country) => {
	const reqObj = {
		method: "GET",
		redirect: "follow"
	};

	try {
		const countryData = await callApi(reqObj, `total/country/${country}`);

		return countryData[countryData.length - 1];

	} catch (e) {
		console.log("getCountryData api call failed: ", e);
		return {};
	}
};

function callApi(reqObj, path, queryParams) {
	return new Promise(async (resolve, reject) => {
		let url = `${BASE_URL}${path}`;

		if (queryParams) {
			let i = 0;
			url = url.concat("?");
			for (const query in queryParams) {
				url = url.concat(`${i !== 0 ? "&" : ""}${query}=${queryParams[query]}`);
				i++;
			}
		}

		try {
			const res = await fetch(url, reqObj);
			const response = await res.json();

			resolve(response);
		} catch (e) {
			console.log("Calling Api failed: ", e, url);

			reject(e);
		}
	});
}