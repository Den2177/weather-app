export function useDatesFormat() {

    function getMonthFromNumber(num) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[num];
    }

    function getDayFromNumber(num) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[num];
    }

    function getDateFromDt(dt) {
        return new Date(dt * 1000);
    }

    return {
        getMonthFromNumber,
        getDayFromNumber,
        getDateFromDt,
    }
}