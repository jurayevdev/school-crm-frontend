<template>
  <div class="bg-gradient-to-r from-purple-300 to-blue-200 min-h-screen flex items-center justify-center">
    <div
      class="w-7/12 shadow-lg overflow-hidden sm:rounded-3xl pb-8"
      :class="{
        'bg-[#1e293b] text-white shadow-white': navbar.userNav,
        'bg-white': !navbar.userNav
      }"
    >
      <div class="border-t border-gray-200 text-center py-16">
        <h1 class="text-9xl font-bold text-purple-400">404</h1>
        <h2 class="text-6xl font-medium py-8">Sahifa topilmadi!</h2>
        <p class="text-2xl pb-8 px-12 font-medium">
          Siz qidirayotgan sahifa mavjud emas.
        </p>
        <router-link to="/">
          <button class="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-blue-400 hover:to-blue-400 text-white font-semibold px-6 py-3 rounded-md">
            HOME
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNavStore } from '../../stores/toggle';
const navbar = useNavStore();
</script>

<style scoped>
/* Min-height for full screen */
.min-h-screen {
  min-height: 100vh;
}
</style>
