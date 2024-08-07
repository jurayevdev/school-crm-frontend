import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGuardStore = defineStore('guard', () => {
    const role = ref('all');;
    return { role };
})
