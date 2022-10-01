<script setup>

import HeaderBlock from "./components/HeaderBlock.vue";
import RegisterLocation from "./views/RegisterLocation.vue";
import {computed, defineAsyncComponent, ref} from "vue";
import {useNotification} from "./composables/notification.js";
import NotificationList from "./components/Helpers/NotificationList.vue";
import SpinnerLoader from "./components/Helpers/SpinnerLoader.vue";

const MyCityWeather = defineAsyncComponent(() => import('./views/MyCityWeather.vue'));

const routes = {
	'#/': MyCityWeather,
	'#/my-weather': MyCityWeather,
	'#/register-location': RegisterLocation,
};

let {destroy, notifications} = useNotification();

let currentUrl = ref(window.location.hash);

window.addEventListener('hashchange', () => {
	currentUrl.value = window.location.hash;
});

const currentPage = computed(() => routes[currentUrl.value] || MyCityWeather);

</script>

<template>
	<div class="root-wrap">
		<header-block :active-link-hash="currentUrl"></header-block>

		<Suspense>
			<component :is="currentPage"></component>

			<template #fallback>
				<spinner-loader></spinner-loader>
			</template>
		</Suspense>

		<notification-list></notification-list>
	</div>
</template>

<style>

.box {
	box-shadow: 1px 2px 3px rgba(17, 23, 20, 0.1);
	padding: 20px;
	border-radius: 10px;
	height: fit-content;
	background-color: #fff;
}

</style>
