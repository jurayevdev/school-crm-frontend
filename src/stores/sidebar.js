import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {
    const sidebar = ref(true);;
    return { sidebar };
})
