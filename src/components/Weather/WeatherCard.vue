<template>
	<div class="card" :style="{background: `linear-gradient(to left, ${cardStyle.colorFrom}, ${cardStyle.colorTo})`}">
		<div class="weather-body">
			<div class="weather-info">
				<div class="weather-state">
					{{ cardInformation.state }}
				</div>
				<div class="weather-content">
					<div class="gradus">
						{{ cardInformation.temp }}°
					</div>
					<div class="weather-data">
						<div class="date">{{ formattedDate }}</div>
						<div class="location">{{ cardInformation.currentLocation }}</div>
					</div>
				</div>
			</div>

			<div class="right-image">
				<component :is="cardStyle.image"></component>
			</div>
		</div>
	</div>
</template>

<script setup>
import {computed} from "vue";
import RainIcon from "../icons/RainIcon.vue";
import ThunderstormIcon from "../icons/ThunderstormIcon.vue";
import CloudsIcon from "../icons/CloudsIcon.vue";
import ClearIcon from "../icons/ClearIcon.vue";
import SnowIcon from "../icons/SnowIcon.vue";
import {getCityName} from "../../storage/cords.js";
import {useDatesFormat} from "../../composables/date.js";

const props = defineProps({
	weatherInfo: {
		type: Object,
		required: true,
	}
});

const cardStyles = [
	{
		name: 'Rain',
		colorFrom: '#0cbca5',
		colorTo: '#6af0a3',
		image: RainIcon,
	},
	{
		name: 'Clear',
		colorFrom: '#2191f7',
		colorTo: '#76c3ff',
		image: ClearIcon,
	},
	{
		name: 'Clouds',
		colorFrom: '#2e63f0',
		colorTo: '#b784d8',
		image: CloudsIcon,
	},
	{
		name: 'Thunderstorm',
		colorFrom: '#2e63f0',
		colorTo: '#b784d8',
		image: ThunderstormIcon,
	},
	{
		name: 'Drizzle',
		colorFrom: '#0cbca5',
		colorTo: '#6af0a3',
		image: RainIcon,
	},
	{
		name: 'Snow',
		colorFrom: '#4970d3',
		colorTo: '#58acce',
		image: SnowIcon,
	},
	{
		name: 'Atmosphere',
		colorFrom: '#5f6a9b',
		colorTo: '#6860d9',
		image: CloudsIcon,
	},
];

const formattedDate = computed(() => {
	const currentDate = new Date(props.weatherInfo.dt * 1000);

	const {getMonthFromNumber, getDayFromNumber, } = useDatesFormat();
	return `${getDayFromNumber(currentDate.getDay())}, ${currentDate.getDate()} ${getMonthFromNumber(currentDate.getMonth())} - ${currentDate.toLocaleTimeString().replace(/:\d\d$/, '')}`;
});

const cardStyle = computed(() => {
	return cardStyles.find(item => item.name === props.weatherInfo.weather[0].main) || '';
});

const cardInformation = computed(() => {
	return {
		state: props.weatherInfo.weather[0].main,
		temp: Math.round(props.weatherInfo.main.temp),
		currentLocation: getCityName(),
	}
});

</script>

<style scoped>
.weather-body {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.card {
	border-radius: 20px;
	opacity: .9;
	padding: 30px;
	box-shadow: 1px 2px 4px rgba(17, 23, 20, 0.09);
}
.right-image {
	width: 100px;
}
.right-image > * {
	width: 100%;
	fill: whitesmoke;
	height: 100%;
	object-fit: cover;
}
.card > * {
	color: #fff;
}

.weather-state {
	font-size: 1.3rem;
}

.gradus {
	font-size: 4.5rem;
}

.weather-content {
	display: flex;
	gap: 20px;
	align-items: center;
}

.weather-data {
	display: flex;
	flex-direction: column;
	gap: 7px;
}

.weather-data > * {
	color: #f3f2f2;
}
</style>