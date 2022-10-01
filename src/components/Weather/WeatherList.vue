<template>
	<div class="card-list">
		<TransitionGroup name="list">
			<weather-card
					v-for="weatherInfo in weatherList"
					:key="weatherInfo.dt"
					:weather-info="weatherInfo">
			</weather-card>
		</TransitionGroup>
	</div>
</template>

<script setup>

import WeatherCard from "./WeatherCard.vue";

const props = defineProps({
	weatherList: {
		type: Array,
		required: true,
	}
});


</script>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
	transition: all .4s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

</style>