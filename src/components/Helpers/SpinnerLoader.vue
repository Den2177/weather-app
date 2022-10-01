<template>
<div class="loader-bc">
	<div class="loader">

	</div>
</div>
</template>

<script setup>

</script>

<style scoped>
.loader-bc {
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.2);
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.loader {
	border: 6px solid #f3f3f3;
	border-top: 6px solid #ff514f;
	border-radius: 50%;
	width: 50px;
	height: 50px;
	animation: spin 1.6s ease infinite;
}

@keyframes spin {
	from {
		transform: translate(-50%, 0) rotate(0deg);
	}
	to {
		transform: translate(-50%, 0) rotate(360deg);
	}
}
</style>