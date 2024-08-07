<template>
  <!------------------------------------------ Dashboard placeholder ------------------------------------------>
  <div class="px-2 pt-4 rounded-lg">
    <div class="card grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-2 gap-4 mb-4">
      <div v-for="i in 4" :key="i" class="animate-pulse flex items-center justify-center h-20 rounded-lg bg-gray-700">
        <p class="text-2xl text-gray-400"></p>
      </div>
    </div>

    <div class="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
      <div v-for="i in 4" :key="i"
        class="animate-pulse flex items-center justify-center rounded-lg h-[23.9rem] bg-gray-700"></div>
    </div>

    <div class="card grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-2 gap-4 mb-4">
      <div v-for="i in 4" :key="i" class="animate-pulse flex items-center justify-center h-20 rounded-lg bg-gray-700">
        <p class="text-2xl text-gray-400"></p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@media (max-width: 500px) {
  .card {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
