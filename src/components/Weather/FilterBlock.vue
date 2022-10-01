<template>
	<div class="box">
		<div class="filter">
			<h3>Filter</h3>
			<div class="input-wrap">
				<span>Find by state or temperature</span>
				<input type="text" class="input" ref="dateInput" v-model="textInput">
			</div>
			<div class="paginate-links flex-row sb">
				<a href="#" class="link" :class="{'active': link.active}" v-for="link in dateLinks"
					 @click.prevent="changeSelectedDate(link)" >{{ link.text }}
				</a>
			</div>
		</div>
	</div>
</template>

<script setup>
import {computed, ref, watchEffect} from "vue";
import {useDatesFormat} from "../../composables/date.js";
const {getDateFromDt, getMonthFromNumber} = useDatesFormat();

const emit = defineEmits(['filter-end']);
const props = defineProps({
	weatherInfos: {
		type: Object,
		required: true,
	}
});

let textInput = ref(''),
		selectedDate = ref(getDateFromDt(props.weatherInfos[0].dt));

const filteredItems = computed(() => {
			return props.weatherInfos.filter(item => {
				return item.weather[0].main.toLowerCase().includes(textInput.value.toLowerCase())
						|| Math.round(+item.main.temp) === +textInput.value;
			});
		}),
		paginatedItems = computed(() => {
			return filteredItems.value.filter(item => {
				return getDateFromDt(item.dt).getDate() === selectedDate.value.getDate();
			});
		}),
		dateLinks = computed(() => {
			let addedDays = [];

			return props.weatherInfos
					.map(link => {
						const date = getDateFromDt(link.dt);

						return {
							data: date,
							text: date.getDate() + " " + getMonthFromNumber(date.getMonth()).slice(0, 3),
							active: selectedDate.value.getDate() === date.getDate(),
						};
					})
					.filter(item => {
						if (!addedDays.includes(item.text)) {
							addedDays.push(item.text);
							return true;
						}

						return false;
					});
		});

function changeSelectedDate(link) {
	selectedDate.value = link.data;
}

watchEffect(() => {
	emit('filter-end', paginatedItems.value);
});

</script>

<style scoped>
.paginate-links .link {
	padding: .3rem;
	border-radius: 6px;
	background-color: #243031;
	color: #fff;
	transition: background-color .2s ease;
}
.link.active {
	background-color: #60e8c7;
}
.link:hover {
	background-color: #60e8c7;
}

.paginate-links {
	margin-top: 10px;
}
</style>