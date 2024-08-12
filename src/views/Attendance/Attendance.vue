<template>
    <div @click="store.filter_show = false" class="px-2">
      <section class="pt-4">
        <!------------------------------------------- Search ------------------------------------------->
        <div v-show="!store.PageProduct">
          <Placeholder2 />
        </div>
        <!------------------------------------------- Search ------------------------------------------->
      </section>
    </div>
  </template>
  
  <script setup>
  import { Placeholder2 } from "../../components";
  import { onMounted, ref, reactive } from "vue";
  
  const store = reactive({
    PageProduct: "",
    page: [],
    pagination: 1,
    allProducts: false,
    error: false,
    guard: "",
    filter: "",
    filter_show: false,
    searchList: [],
  });
  </script>
  
  <style lang="scss" scoped></style>
  