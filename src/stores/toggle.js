import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNavStore = defineStore('toggle', () => {
  const userNav = ref(false);
  const userInfo = ref(false);
  if (localStorage.getItem('darkMode') == 'true') {
    userNav.value = true;
  } else {
    userNav.value = false;
  }

  const setMode = () => {
    localStorage.setItem('darkMode', !userNav.value);
    userNav.value = !userNav.value;
  }

  return { userNav, setMode, userInfo };
})
