<template>
  <div class="py-4 px-2">
    <!-- Placeholder -->
    <div v-if="!store.product">
      <Placeholder2 />
    </div>

    <!-- Search -->
    <div v-if="store.product"
      class="shadow rounded-xl flex flex-col lg:flex-row items-center justify-between lg:space-x-4 p-4 mb-4"
      :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'">
      <div class="w-full flex items-center lg:justify-start lg:pb-0 pb-4 justify-between gap-5">
        <h1 class="text-blue-700 font-bold text-lg">O'quvchilar</h1>
      </div>

      <div class="w-full lg:w-80">
        <form class="flex items-center text-gray-900 font-medium">
          <label for="simple-search" class="sr-only">Qidiruv</label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <input type="text" id="simple-search"
              class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
              placeholder="Izlash uchun yozing..." />
          </div>
        </form>
      </div>

      <button @click="router.back()" class="btn w-60 shadow-lg rounded-lg px-5 py-2.5 text-white focus:ring-2">
        Orqaga qaytish
      </button>
    </div>

    <!-- Table -->
    <div class="relative shadow-md rounded-lg overflow-hidden"
      :class="navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="text-xs rounded-lg uppercase" :class="navbar.userNav ? 'bg-gray-700' : 'bg-gray-50'">
            <tr>
              <th class="py-3 px-8 text-center">F. I. O.</th>
              <th class="py-3 px-8 text-center">To'g'ri javoblar</th>
              <th class="py-3 px-6 text-center">Noto'g'ri javoblar</th>
            </tr>
          </thead>
          <tbody v-if="!store.error">
            <tr v-for="i in store.product?.test_submits" :key="i.id" class="border-b cursor-pointer"
              :class="navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'">
              <td class="py-3 px-6 whitespace-nowrap text-center">
                {{ i.student.full_name }}
              </td>
              <td class="py-3 px-6 font-bold text-[#4141eb] text-center">
                {{ i.correct_answers }}
              </td>
              <td class="py-3 px-6 font-bold text-[red] text-center">
                {{ store.product?.test_count - i.correct_answers }}
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="store.error" class="flex w-full justify-center">
          <h1 class="p-20 text-2xl font-medium">{{ store.error }}</h1>
        </div>
      </div>
      <nav class="flex flex-row justify-between items-center md:items-center space-y-3 md:space-y-0 p-4"
        aria-label="Table navigation">
        <span class="text-sm font-normal">
          Sahifa
          <span class="font-semibold">1 - 10</span>
          dan
          <span class="font-semibold">10</span>
        </span>
        <ul class="inline-flex items-stretch -space-x-px">
          <li>
            <a href="#"
              class="flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm py-2 sm:mt-0 -mt-2 px-6 rounded-lg leading-tight">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useNavStore } from '../../stores/toggle';
import { Placeholder2 } from '../../components';
import axios from '@/services/axios';

const navbar = useNavStore();
const router = useRouter();

const store = reactive({
  product: {},
  error: null,
});

const getProduct = async () => {
  const id = router.currentRoute.value.params.id;
  try {
    const response = await axios.get(`/test-group/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    store.product = response.data;
    store.error = null;
  } catch (error) {
    store.product = {};
    store.error = error.response?.data?.message || 'Xatolik yuz berdi!';
  }
};

onMounted(() => {
  getProduct();
});
</script>

<style lang="scss" scoped>
.btn {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}
</style>
