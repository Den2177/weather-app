<template>
	<div class="container">
		<form action="#" class="form box vertical" @submit.prevent="submit">
			<h3>Register your city</h3>
			<div class="input-wrap">
				<span>City name</span>
				<input type="text" class="input" v-model="locationData.city_name" placeholder="Template: Kazan">
			</div>
			<div class="input-wrap">
				<span>Country Code</span>
				<input type="number" class="input" v-model="locationData.country_code" list="country-codes">
				<datalist id="country-codes">
					<option value="643">Russia</option>
				</datalist>
			</div>
			<button class="btn" type="submit">Submit</button>
		</form>
	</div>
</template>

<script async setup>
import {getCords} from "../api/weather.js";
import {reactive} from "vue";
import {saveCityName, saveCords} from "../storage/cords.js";
import {useNotification} from "../composables/notification.js";

const emit = defineEmits(['change-cord']);

let locationData = reactive({
	city_name: '',
	country_code: '',
});

let {add} = useNotification();

function clearFields() {
	locationData = reactive({
		city_name: '',
		country_code: '',
	});
}

function submit() {
	getCords(locationData.city_name, locationData.country_code).then((res) => {
		if (+res.cod >= 400) {
			add({
				message: res.message,
				isError: true,
			});

			return null;
		}
		const {lat, lon} = res[0];
		saveCords({lat, lon});
		saveCityName(res[0].name);

		add({
			message: 'New region successfully set. You may check weather!',
			isError: false,
		});
	});
}
</script>

<style scoped>
.form {
	max-width: 430px;
	margin: 40px auto 0;
	width: 100%;
}
</style>