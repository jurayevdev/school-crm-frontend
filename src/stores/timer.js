import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTimeStore = defineStore('time', () => {
    const timer = reactive({
        hour: 0,
        minute: 0,
        second: 0,
    })

    const changeTime = (hour, minute, second)=>{
        timer.second = second
        timer.minute = minute
        timer.hour = hour
    }

    let Hours = computed(() => timer.hour)
    let Minutes = computed(() => timer.minute)
    let Seconds = computed(() => timer.second)
    return { Hours, Minutes, Seconds, changeTime, timer };
})
