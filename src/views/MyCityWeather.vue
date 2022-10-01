<template>
	<div class="container">
		<div class="list-body">
			<filter-block
					v-if="weatherInfos.length"
					:weather-infos="weatherInfos"
					@filter-end="setFilteredInfo">
			</filter-block>

			<weather-list v-if="filteredInfos.length" :weather-list="filteredInfos"></weather-list>
			<empty-message v-else>
				No info for this date
			</empty-message>

		</div>
	</div>
</template>

<script async setup>
import {getCords, getWeatherInfos} from "../api/weather.js";
import {reactive, ref} from "vue";
import {getLat, getLon, saveCityName, getCityName} from "../storage/cords.js";
import FilterBlock from "../components/Weather/FilterBlock.vue";
import WeatherList from "../components/Weather/WeatherList.vue";
import EmptyMessage from "../components/Helpers/EmptyMessage.vue";

const currentCountry = reactive({
	city: getCityName() || 'Kazan',
	code: '643',
	lat: getLat(),
	lon: getLon(),
});

let weatherInfos = ref(await getWeatherData());
let filteredInfos = ref([]);

function setFilteredInfo(filteredItems) {
	filteredInfos.value = filteredItems;
}

async function getWeatherData() {
	if (currentCountry.lat && currentCountry.lon) {

		let result = await getWeatherInfos(currentCountry);

		return result.list;
	}

	let res = await getCords(currentCountry.city, currentCountry.code);
	const cordObj = res.at(0);
	currentCountry.lat = cordObj.lat;
	currentCountry.lon = cordObj.lon;
	saveCityName(cordObj.name);

	const weatherData = await getWeatherInfos(currentCountry);
	return weatherData.list;
}

</script>

<style scoped>
.list-body {
	margin-top: 40px;
	display: grid;
	grid-template-columns: 1fr 2fr;
	gap: 20px;
}

.card-list {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.filter > * {
	width: 100%;
}
</style>