<template>
	<header class="header">
		<div class="container">
			<a href="#" class="logo">
				<span class="purple">Den</span>Weather
			</a>
			<nav class="links">
				<a :href="link.href" class="link" :class="{active: link.href === activeLinkHash}" v-for="link in pageController">{{link.name}}</a>
			</nav>
		</div>
	</header>
</template>

<script setup>
import {computed, reactive, ref} from "vue";

const props = defineProps({
	activeLinkHash: {
		type: String,
		required: true,
	}
});

console.log(props.activeLinkHash);

const pageController = ref([
	{
		name: 'Register location',
		href: '#/register-location',
	},
	{
		name: 'My city weather',
		href: '#/my-weather'
	}
]);

</script>

<style scoped>
.header {
	background-color: #fff;
}

.logo {
	font-size: 1.5rem;
	font-weight: 500;
}

.link {
	text-transform: uppercase;
}
.link.active {
	background-color: #50cafd;
	color: #fff;
	padding: .5rem;
	border-radius: 20px;
}
</style>