<template>
  <div @click="store.filter_show = false" class="py-4 px-2">
    <!-- Placeholder -->
    <div v-if="!store.PageProduct.length">
      <Placeholder2 />
    </div>

    <!-- Search -->
    <div
      v-if="store.PageProduct.length"
      class="shadow rounded-xl flex flex-col lg:flex-row items-center justify-between lg:space-x-4 p-4 mb-4"
      :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
    >
      <div
        class="w-full flex items-center lg:justify-start lg:pb-0 pb-4 justify-between gap-5"
      >
        <h1 class="text-blue-700 font-bold text-lg">Test natijalari</h1>
      </div>

      <div class="w-full lg:w-80">
        <form class="flex items-center text-gray-900 font-medium">
          <label for="simple-search" class="sr-only">Qidiruv</label>
          <div class="relative w-full">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              v-model="store.filter"
              @input="
                store.filter_show = true;
                searchFunc();
              "
              type="search"
              id="simple-search"
              class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
              placeholder="Qidirish..."
            />
            <ul
              v-show="store.filter_show && store.searchList.length"
              class="absolute z-10 max-h-80 overflow-y-auto overflow-hidden py-1 text-gray-600 rounded bg-white w-full"
            >
              <li
                class="hover:bg-gray-100 cursor-pointer pl-2"
                v-for="(i, index) in store.searchList"
                :key="index"
                @click="
                  store.filter = i.subject?.title;
                  store.filter_show = false;
                  searchFunc();
                "
              >
                {{ i.subject?.title }}
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>

    <!-- Table -->
    <div
      class="relative shadow-md rounded-lg overflow-hidden"
      :class="navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'"
    >
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead
            class="text-xs rounded-lg uppercase"
            :class="navbar.userNav ? 'bg-gray-700' : 'bg-gray-50'"
          >
            <tr>
              <th class="py-3 px-8 text-center">Fan</th>
              <th class="py-3 px-8 text-center">Savollar soni</th>
              <th class="py-3 px-6 text-center">Testga berilgan vaqt</th>
              <th scope="col" class="text-center py-3">
                O'quvchilarning natijalari
              </th>
            </tr>
          </thead>
          <tbody v-if="!store.error">
            <tr
              class="border-b cursor-pointer"
              :class="navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'"
              v-for="i in filteredPageProduct"
              :key="i.id"
            >
              <td class="py-3 px-6 text-center">
                {{ i.subject.title }}
              </td>
              <td class="py-3 px-6 text-center">
                {{ i.test_count }}
              </td>
              <td class="py-3 px-6 whitespace-nowrap text-center">
                {{ i.test_time }}
              </td>
              <td class="text-center font-medium px-8 py-3">
                <button
                  @click="enterSlug(i.id)"
                  class="btnKirish bg-blue-600 rounded-lg px-5 py-2.5 text-white focus:ring-2"
                >
                  Batafsil
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-if="store.error">
            <tr class="flex w-full justify-center">
              <td colspan="4" class="py-20 text-2xl font-medium text-center">
                Natijalar ro'yhati bo'sh
              </td>
            </tr>
          </tbody>
        </table>
        <nav v-if="!store.searchList.length"
          class="flex flex-row justify-between items-center md:items-center space-y-3 md:space-y-0 p-4"
          aria-label="Table navigation"
        >
          <ul class="inline-flex items-stretch -space-x-px">
            <li
              :class="{
                'pointer-events-none opacity-50': store.page[0] === 1,
              }"
              @click="
                if (store.page[0] > 1) {
                  store.pagination -= 1;
                  getProduct(store.pagination);
                }
              "
              href="#"
              class="flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm py-2 sm:mt-0 -mt-2 px-6 rounded-lg leading-tight"
            >
              Oldingi
            </li>
          </ul>
          <span class="text-sm font-normal">
            Sahifa
            <span class="font-semibold">
              <span>{{ store.page[0] * 10 - 9 }}</span> -
              <span v-if="store.page[0] * 10 < store.page[1]">
                {{ store.page[0] * 10 }}
              </span>
              <span v-else>{{ store.page[1] }}</span>
            </span>
            dan
            <span class="font-semibold">{{ store.page[1] }}</span>
          </span>
          <ul class="inline-flex items-stretch -space-x-px">
            <li
              :class="{
                'pointer-events-none opacity-50': store.page[0] * 10 >= store.page[1],
              }"
              @click="
                if (store.page[0] * 10 < store.page[1]) {
                  store.pagination += 1;
                  getProduct(store.pagination);
                }
              "
              href="#"
              class="flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm py-2 sm:mt-0 -mt-2 px-6 rounded-lg leading-tight"
            >
              Keyingi
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useNavStore } from "../../stores/toggle";
import { Placeholder2 } from "../../components";
import { useNotificationStore } from "../../stores/notification";
import axios from "@/services/axios";

const notification = useNotificationStore();
const navbar = useNavStore();
const router = useRouter();

const store = reactive({
  PageProduct: [],
  page: [1, 0],
  pagination: 1,
  allProducts: [],
  error: false,
  filter: "",
  filter_show: false,
  searchList: [],
});

// ---------------------------- search ------------------------------------
const searchFunc = () => {
  if (store.filter.length === 0) {
    store.searchList = [];
    return;
  }

  store.searchList = store.allProducts.filter((i) =>
    i.subject?.title.toLowerCase().includes(store.filter.toLowerCase())
  );
};
// ---------------------------- search ------------------------------------

// ----------------------------------- axios --------------------------------
const getAllProduct = () => {
  axios
    .get("/test-group", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.allProducts = res.data;
      store.error = false;
    })
    .catch((error) => {
      console.error(error);
      store.error = true;
    });
};

const getProduct = (page) => {
  axios
    .get(`/test-group/page?page=${page}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.PageProduct = res.data?.data?.records || [];
      const pagination = res.data?.data?.pagination || {};
      store.page = [pagination.currentPage || 1, pagination.total_count || 0];
      store.error = false;
    })
    .catch((error) => {
      console.error(error);
      store.error = true;
    });
};

onMounted(() => {
  getProduct(1);
  getAllProduct();
});

function enterSlug(id) {
  router.push(`./results/${id}`);
}

// Computed property for filtered PageProduct
const filteredPageProduct = computed(() => {
  return store.searchList.length ? store.searchList : store.PageProduct;
});
</script>

<style lang="scss" scoped>
.btnKirish {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}
</style>
