<template>
  <div @click="store.filter_show = false" class="container mx-auto px-2">
    <!-- Main modal -->
    <div
      :class="
        modal
          ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
          : 'hidden'
      "
    >
      <div class="relative p-4 w-full max-w-xl h-auto">
        <!-- Modal content -->
        <div
          class="relative p-10 rounded-lg shadow"
          :class="navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'"
        >
          <!-- Modal header -->
          <div
            class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5"
          >
            <h3 class="text-lg">Test qo'shish</h3>
            <button
              @click="modal = false"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <!-- Modal body -->
          <form @submit.prevent="createProduct">
            <div class="grid mb-4 grid-cols-1">
              <div class="w-full flex justify-between gap-8">
                <div class="flex w-full flex-col gap-5">
                  <div class="">
                    <label
                      for="name"
                      class="block mb-2 text-sm text-center text-amber-900 font-medium bg-amber-200 rounded-[5px] py-1"
                      >Fanni tanlang</label
                    >
                    <select
                      v-model="form.subject_id"
                      id="name"
                      class="bg-gray-50 text-black cursor-pointer border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    >
                      <option
                        v-for="i in store.subjects"
                        :key="i.id"
                        :value="i.id"
                      >
                        {{ i.title }}
                      </option>
                    </select>
                  </div>
                  <div class="flex gap-5">
                    <div class="w-1/2">
                      <label
                        for="time"
                        class="block mb-2 text-sm text-amber-900 text-center font-medium bg-amber-200 py-1 rounded-[5px]"
                        >Savollarning umumiy soni</label
                      >
                      <input
                        type="number"
                        name="time"
                        max="600"
                        min="1"
                        v-model="form.test_time"
                        class="bg-gray-50 border float-left w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block p-2.5"
                        placeholder="60"
                        required
                      />
                    </div>
                    <div class="w-1/2">
                      <label
                        for="time"
                        class="block mb-2 text-sm text-amber-900 text-center font-medium bg-amber-200 py-1 rounded-[5px]"
                        >Savollarning umumiy vaqti</label
                      >
                      <input
                        v-model="form.test_count"
                        type="number"
                        name="time"
                        max="600"
                        min="1"
                        class="bg-gray-50 border float-left w-1/2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block p-2.5"
                        placeholder="60"
                        required
                      />
                      <span class="float-left pt-1 pl-5 text-xl">daqiqa</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="w-full flex items-center justify-between border-t pt-5 mt-5"
            >
              <button
                type="button"
                @click="modal = false"
                class="text-gray-500 border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Qo'shish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- ----------------------------------------- MODAL END ---------------------------------------------------- -->

    <!-- ----------------------------------------- EDIT MODAL END ---------------------------------------------------- -->
    <div
      :class="
        edit.toggle
          ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
          : 'hidden'
      "
    >
      <div class="relative p-4 w-full max-w-xl h-auto">
        <!-- Modal content -->
        <div
          class="relative p-10 rounded-lg shadow"
          :class="navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'"
        >
          <!-- Modal header -->
          <div
            class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5"
          >
            <h3 class="text-lg">Test ma'lumotlarini o'zgartirish</h3>
            <button
              @click="edit.toggle = false"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <!-- Modal body -->
          <form @submit.prevent="editProduct">
            <div class="grid mb-4 grid-cols-1">
              <div class="w-full flex justify-between gap-8">
                <div class="flex w-full flex-col gap-5">
                  <div class="">
                    <label
                      for="name"
                      class="block mb-2 text-sm text-center text-amber-900 font-medium bg-amber-200 rounded-[5px] py-1"
                      >Fanni tanlang</label
                    >
                    <select
                      v-model="edit.subject_id"
                      id="name"
                      class="bg-gray-50 text-black cursor-pointer border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    >
                      <option
                        v-for="i in store.subjects"
                        :key="i.id"
                        :value="i.id"
                      >
                        {{ i.title }}
                      </option>
                    </select>
                  </div>
                  <div class="flex gap-5">
                    <div class="w-1/2">
                      <label
                        for="time"
                        class="block mb-2 text-sm text-amber-900 text-center font-medium bg-amber-200 py-1 rounded-[5px]"
                        >Savollarning umumiy soni</label
                      >
                      <input
                        type="number"
                        name="time"
                        max="600"
                        min="1"
                        v-model="edit.test_time"
                        class="bg-gray-50 border float-left w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block p-2.5"
                        placeholder="60"
                        required
                      />
                    </div>
                    <div class="w-1/2">
                      <label
                        for="time"
                        class="block mb-2 text-sm text-amber-900 text-center font-medium bg-amber-200 py-1 rounded-[5px]"
                        >Savollarning umumiy vaqti</label
                      >
                      <input
                        v-model="edit.test_count"
                        type="number"
                        name="time"
                        max="600"
                        min="1"
                        class="bg-gray-50 border float-left w-1/2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block p-2.5"
                        placeholder="60"
                        required
                      />
                      <span class="float-left pt-1 pl-5 text-xl">daqiqa</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="w-full flex items-center justify-between border-t pt-5 mt-5"
            >
              <button
                type="button"
                @click="edit.toggle = false"
                class="text-gray-500 border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                O'zgartirish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- ----------------------------------------- EDIT MODAL END ---------------------------------------------------- -->

    <!-- ----------------------------------------- Delete modal ---------------------------------------------------- -->
    <div
      :class="
        remove.toggle
          ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
          : 'hidden'
      "
    >
      <div class="relative p-4 max-w-5xl min-w-[30%] h-auto">
        <!-- Modal content -->
        <div
          class="relative p-4 rounded-lg shadow sm:p-5"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <!-- Modal header -->
          <div
            class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5"
          >
            <h3
              class="text-lg"
              :class="navbar.userNav ? 'text-white' : 'text-black'"
            >
              Testni o'chirib tashlash
            </h3>
            <button
              @click="remove.toggle = false"
              type="button"
              class="bg-transparent hover:bg-gray-200 hover rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              :class="navbar.userNav ? 'text-white' : 'text-black'"
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
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <!-- Modal body -->
          <div :class="{ darkForm: navbar.userNav }">
            <div class="grid font-medium gap-4 mb-4 grid-cols-1">
              <div>
                <div></div>
                <h1
                  class="text-2xl"
                  :class="navbar.userNav ? 'text-white' : 'text-black'"
                >
                  Siz testni o'chirishni xohlaysizmi?
                </h1>
              </div>
              <div
                class="w-full flex items-center justify-between border-t pt-5 mt-5"
              >
                <button
                  @click="remove.toggle = false"
                  type="button"
                  class="border cursor-pointer inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Bekor qilish
                </button>
                <button
                  @click="deleteProduct"
                  class="btnAdd cursor-pointer text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  O'chirish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ----------------------------------------- delete modal end ---------------------------------------------------- -->

    <!-- ----------------------------------------- EMPLYE TABLE ------------------------------------------------- -->

    <section class="md:py-4" :class="{ 'text-white': navbar.userNav }">
      <!------------------------------------------- Placeholder ------------------------------------------->
      <div v-show="!store.PageProduct">
        <Placeholder2 />
      </div>
      <!------------------------------------------- Placeholder ------------------------------------------->

      <!------------------------------------------- Search ------------------------------------------->

      <div v-show="store.PageProduct" class="w-full max-w-screen">
        <!-- Start coding here -->
        <div
          class="shadow rounded-xl flex flex-col lg:flex-row items-center justify-between lg:space-x-4 p-4 mb-4"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <div
            class="w-full flex items-center lg:justify-start lg:pb-0 pb-4 justify-between gap-5"
          >
            <h1 class="text-blue-700 font-bold text-lg">Testlar</h1>
            <div
              class="lg:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3"
            >
              <button
                v-show="
                  !(store.guard == 'o\'quvchi' || store.guard == 'o\'qituvchi')
                "
                @click="modal = true"
                id=""
                type="button"
                class="btnAdd flex items-center max-w-fit justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 sm:py-2"
              >
                <span class="sm:block hidden">Test qo'shish</span>
                <i class="sm:hidden block bx bxs-user-plus text-lg"></i>
              </button>
            </div>
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
                    viewbox="0 0 20 20"
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
                  v-show="store.filter_show"
                  class="absolute z-10 max-h-80 overflow-y-auto overflow-hidden py-1 text-gray-600 rounded bg-white w-full"
                  :class="{ hidden: !store.searchList.length }"
                >
                  <li
                    class="hover:bg-gray-100 cursor-pointer pl-2"
                    v-for="(i, index) in store.searchList"
                    :key="index"
                    @click="
                      store.filter = i.subject?.title;
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
        <!------------------------------------------- Search ------------------------------------------->

        <div
          class="relative shadow-md rounded-lg overflow-hidden"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead
                class="text-xs rounded-lg uppercase"
                :class="navbar.userNav ? 'bg-gray-700' : 'bg-gray-50'"
              >
                <tr>
                  <th scope="col" class="py-3 pl-8">Fan nomi</th>
                  <th scope="col" class="text-center py-3">Savollar soni</th>
                  <th scope="col" class="text-center py-3">Test vaqti</th>
                  <th scope="col" class="text-center py-3">Savollar</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody v-if="!(store.guard == 'o\'quvchi')" v-show="!store.error">
                <tr
                  class="border-b"
                  :class="
                    navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  "
                  v-show="!store.searchList.length"
                  v-for="i in store.PageProduct"
                  :key="i"
                >
                  <th
                    scope="row"
                    class="px-8 py-3 font-medium whitespace-nowrap"
                  >
                    {{ i.subject?.title }}
                  </th>
                  <td class="text-center font-medium px-8 py-2">
                    {{ i.test_time }}
                  </td>
                  <td class="text-center font-medium px-6 py-2">
                    {{ i.test_count }}
                  </td>
                  <td class="text-center font-medium px-8 py-3">
                    <button
                      @click="enterSlug(i.id)"
                      class="btnKirish bg-blue-600 rounded-lg px-5 py-2.5 text-white focus:ring-2"
                    >
                      Qo'shish
                    </button>
                  </td>
                  <td
                    v-show="!(store.guard == 'o\'qituvchi')"
                    class="text-center whitespace-nowrap font-medium pr-5"
                  >
                    <i
                      @click="getOneProduct(i.id, 'edit')"
                      class="bx bxs-pencil bg-blue-300 text-blue-600 rounded-lg p-2 mr-3 cursor-pointer focus:ring-2"
                    >
                    </i>
                    <i
                      @click="deleteFunc(i.id)"
                      class="bx bxs-trash bg-red-300 cursor-pointer text-red-600 rounded-lg p-2 focus:ring-2"
                    >
                    </i>
                  </td>
                </tr>
                <tr
                  class="border-b"
                  :class="
                    navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  "
                  v-show="store.searchList.length"
                  v-for="i in store.searchList"
                  :key="i"
                >
                  <th
                    scope="row"
                    class="px-8 py-3 font-medium whitespace-nowrap"
                  >
                    {{ i.subject?.title }}
                  </th>
                  <td class="text-center font-medium px-8 py-2">
                    {{ i.test_count }}
                  </td>
                  <td class="text-center font-medium px-6 py-2">
                    {{ i.test_time }}
                  </td>
                  <td class="text-center font-medium px-8 py-3">
                    <button
                      @click="enterSlug(i.id)"
                      class="btnKirish bg-blue-600 rounded-lg px-5 py-2.5 text-white focus:ring-2"
                    >
                      Qo'shish
                    </button>
                  </td>
                  <td
                    v-show="!(store.guard == 'o\'qituvchi')"
                    class="text-center whitespace-nowrap font-medium pr-5"
                  >
                    <i
                      @click="getOneProduct(i.id, 'edit')"
                      class="bx bxs-pencil bg-blue-300 text-blue-600 rounded-lg p-2 mr-3 cursor-pointer focus:ring-2"
                    >
                    </i>
                    <i
                      @click="deleteFunc(i.id)"
                      class="bx bxs-trash bg-red-300 cursor-pointer text-red-600 rounded-lg p-2 focus:ring-2"
                    >
                    </i>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-if="!(store.guard == 'o\'quvchi')"
              v-show="store.PageProduct && store.error"
              class="w-full max-w-screen text-center p-20 text-2xl font-medium"
            >
              <h1>Testlar ro'yhati bo'sh</h1>
            </div>
            <div
              v-show="store.guard == 'o\'quvchi'"
              class="w-full max-w-screen text-center p-20 text-2xl font-medium"
            >
              <h1>Siz testlarni ko'rish huququga ega emassiz!</h1>
            </div>
          </div>
          <nav
            v-if="!store.searchList.length"
            class="flex flex-row justify-between items-center md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <ul class="inline-flex items-stretch -space-x-px">
              <li
                :class="{
                  'pointer-events-none opacity-50': store.page[0] == 1,
                }"
                @click="
                  store.pagination -= 1;
                  getProduct(store.pagination);
                "
                href="#"
                class="flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm py-2 sm:mt-0 -mt-2 px-6 rounded-lg leading-tight"
              >
                Oldingi
              </li>
            </ul>
            <span class="text-sm font-normal">
              Sahifa
              <span class="font-semibold"
                ><span>{{ store.page[0] * 10 - 9 }}</span> -
                <span v-if="store.page[0] * 10 < store.page[1]">{{
                  store.page[0] * 10
                }}</span
                ><span v-else>{{ store.page[1] }}</span></span
              >
              dan
              <span class="font-semibold">{{ store.page[1] }}</span>
            </span>
            <ul class="inline-flex items-stretch -space-x-px">
              <li
                :class="{
                  'pointer-events-none opacity-50':
                    store.page[0] * 10 >= store.page[1],
                }"
                @click="
                  store.pagination += 1;
                  getProduct(store.pagination);
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
    </section>

    <!-- ----------------------------------------- EMPLYE TABLE END --------------------------------------------- -->
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useNavStore } from "../../stores/toggle";
import { Placeholder2 } from "../../components";
import { useNotificationStore } from "../../stores/notification";
import axios from "@/services/axios";

const notification = useNotificationStore();
const navbar = useNavStore();
const router = useRouter();

const modal = ref(false);

const store = reactive({
  PageProduct: "",
  page: [],
  pagination: 1,
  allProducts: false,
  error: false,
  subjects: [{ title: "Fan yaratilmagan" }],
  guard: false,
  filter: "",
  filter_show: false,
  searchList: [],
});

// ---------------------------- search ------------------------------------
function searchFunc() {
  store.searchList = [];
  for (let i of store.allProducts) {
    if (i.subject?.title.toLowerCase().includes(store.filter.toLowerCase())) {
      store.searchList.push(i);
    }
  }

  if (!store.filter.length) {
    store.searchList = [];
  }
}
// ---------------------------- search ------------------------------------

function enterSlug(id) {
  router.push(`./tests/question/${id}`);
}

function cancelFunc1() {
  edit.name = "";
  edit.description = "";
  edit.toggle = false;
}

function deleteFunc(id) {
  remove.id = id;
  remove.toggle = true;
}

// ----------------------------------- forms -----------------------------------
const form = reactive({
  test_count: "",
  test_time: "",
  subject_id: "",
  question: "",
  a: "",
  b: "",
  c: "",
  d: "",
  true_answer: "",
  test_group_id: "",
  question_id: "",
});

const edit = reactive({
  name: "",
  description: "",
  id: "",
  toggle: false,
});

const remove = reactive({
  id: "",
  toggle: false,
});

// ----------------------------------- axios --------------------------------
const getAllProduct = () => {
  axios
    .get("/test-group", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      store.allProducts = res.data;
      store.error = false;
    })
    .catch((error) => {
      store.error = true;
      store.allProducts = error.response.data.message;
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
      console.log(res.data);
      store.PageProduct = res.data?.data?.records;
      const pagination = res.data?.data?.pagination;
      store.page = [];
      store.page.push(pagination.currentPage, pagination.total_count);
      store.error = false;
    })
    .catch((error) => {
      store.PageProduct = error.response.data.message;
      store.error = true;
    });
};

function createProduct() {
  const data = {
    test_count: form.test_count,
    test_time: form.test_time,
    subject_id: form.subject_id,
  };

  axios
    .post("/test-group", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      notification.success(res.data.message);
      form.test_group_id = res.data.id;
      modal.value = false;
      getProduct();
      location.reload()
    })
    .catch((error) => {
      notification.warning(error.response.data.message);
    });
}

const getOneProduct = (id) => {
  axios
    .get(`/test-group/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      edit.test_count = res.data.test_count;
      edit.test_time = res.data.test_time;
      edit.subject_id = res.data.subject_id;
      edit.id = id;
      edit.toggle = true;
    })
    .catch((error) => {
      notification.warning(error.response.data.message);
      console.log("error", error);
    });
};

const getSubject = () => {
  axios
    .get("/subject", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.subjects = res.data || [{ title: "Fan yaratilmagan" }];
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const editProduct = () => {
  const data = {
    test_count: edit.test_count,
    test_time: edit.test_time,
    subject_id: edit.subject_id,
  };
  axios
    .patch(`/test-group/${edit.id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      notification.success(res.data.message);
      getProduct();
      edit.toggle = false;
    })
    .catch((error) => {
      notification.warning(error.response.data.message);
      console.log("error", error);
    });
};

const deleteProduct = () => {
  axios
    .delete(`/test-group/${remove.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      notification.success(res.data.message);
      getProduct();
      remove.toggle = false;
      location.reload()
    })
    .catch((error) => {
      notification.warning(error.response.data.message);
      console.log(error.response.data.message);
      console.log("error", error);
    });
};

const getGuard = () => {
  axios
    .get("/staff", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      axios
        .delete("/staff/1", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {})
        .catch((error) => {
          if (error.response.data.message == "Admin huquqi sizda yo'q!") {
            store.guard = "o'qituvchi";
          }
        });
    })
    .catch((error) => {
      if (error.response.data.message == "Admin huquqi sizda yo'q!") {
        store.guard = "o'quvchi";
      }
      store.error = true;
      store.allProducts = error.response.data.message;
    });
};

onMounted(() => {
  getProduct(1);
  getAllProduct();
  getSubject();
  getGuard();
});
</script>

<style lang="scss" scoped>
.btnAdd {
  background-image: linear-gradient(
    to right,
    white -450%,
    #4141eb
  );
}

.btnKirish {
  background-image: linear-gradient(
    to right,
    white -450%,
    #4141eb
  );
}

.btnOrqaga {
  background-image: linear-gradient(
    to right,
    white -450%,
    #4141eb
  );
}
</style>
