import {ref} from "vue";

const notifications = ref([]);
const LIFETIME = 4000;

export function useNotification() {

    function add({message, isError}) {
        const currentId = Date.now();

        notifications.value.push({
            id: currentId,
            title: isError ? 'Error!' : 'Successful',
            message: message,
            isError: isError,
        });

        console.log(notifications.value);

        setTimeout(() => {
            notifications.value = notifications.value.filter(item => item.id !== currentId);
        }, LIFETIME );
    }

    function destroy(notificationId) {
        notifications.value = notifications.value.filter(item => item.id !== notificationId);
    }

    return {
        add,
        destroy,
        notifications,
    }
}