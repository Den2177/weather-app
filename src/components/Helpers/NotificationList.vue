<template>
	<div class="notifications">
		<TransitionGroup name="list">
			<div class="notification" v-for="notification in notifications" :key="notification.id">
				<div class="notification-icon">
					<div class="notification-icon">
						<img :src="`/src/assets/images/${notification.isError ? 'error.png' : 'tick.png'}`" alt="notification icon">
					</div>
				</div>
				<div class="notification-content">
					<h4 :class="notification.isError ? 'red' : 'blue'">{{notification.title}}</h4>
					<div class="message">
						{{notification.message}}
					</div>
				</div>

			</div>
		</TransitionGroup>

	</div>
</template>

<script setup>
import {useNotification} from "../../composables/notification.js";

const {destroy, notifications} = useNotification();

</script>

<style scoped>
.notifications {
	display: flex;
	left: 50%;
	transform: translate(-50%, 0);
	bottom: 20px;
	position: fixed;
	flex-direction: column;
	gap: 5px;
}

.notification-icon {
	width: 40px;
	height: 40px;
}
.notification-icon > img {
	opacity: .8;
}

.notification {
	background-color: #fff;
	color: #000;
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 20px;
	box-shadow: 1px 1px 8px 2px rgba(0, 0, 0, 0.08);
	border-radius: 6px;
}

h4 {
	margin-bottom: 3px;
}

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