<template>
  <section class="px-2">
    <div class="wrapper mt-8">
      <div
        :class="
          navbar.userNav
            ? 'bg-[#1e293b] text-white px-5 py-10 sm:px-10 flex flex-col gap-5 rounded-lg'
            : 'bg-white px-5 py-10 sm:px-10 flex flex-col gap-5 rounded-lg'
        "
        id="accordion-collapse"
        data-accordion="collapse"
      >
        <div class="flex items-center justify-between mb-6">
          <div class="flex flex-col gap-2">
            <h1 class="text-[24px] font-bold border-b border-[#4141eb]">
              {{ router.currentRoute.value.params.name.toUpperCase() }}
            </h1>
            <p class="text-[14px] flex items-center gap-3">
              <span class="font-bold">Boshlangan sana:</span>
              {{ store.start_time?.slice(0, 10) }}
            </p>
          </div>
          <button
            @click="router.back(-1)"
            class="btn shadow-lg rounded-lg px-5 py-2.5 text-white focus:ring-2"
          >
            Orqaga qaytish
          </button>
        </div>
        <h2 id="accordion-collapse-heading-1">
          <button
            @click="toggleStaff"
            type="button"
            class="flex items-center justify-between w-full text-left rounded-lg bg-[rgba(213,219,242,0.5)] py-[24px] px-[32px]"
            data-accordion-target="#accordion-collapse-body-1"
            aria-expanded="true"
            aria-controls="accordion-collapse-body-1"
          >
            <div class="flex items-center gap-5">
              <i
                class="btn bx bx-user text-[24px] p-3 text-white rounded-full"
              ></i>
              <h2 class="text-[18px]">Xodimlar</h2>
            </div>
            <i
              :class="
                store.staff
                  ? 'bx bx-minus bg-white p-2 text-[#4141eb] text-[30px] rounded-full'
                  : 'bx bx-plus bg-white p-2 text-[#4141eb] text-[30px] rounded-full'
              "
            ></i>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-1"
          :class="store.staff ? '' : 'hidden'"
          aria-labelledby="accordion-collapse-heading-1"
        >
          <div
            class="relative shadow-md rounded-lg overflow-hidden"
            :class="navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'"
          >
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="btn text-xs rounded-lg uppercase">
                  <tr class="text-white">
                    <th scope="col" class="text-center py-3">I . F . O</th>
                    <th scope="col" class="text-center py-3">Lavozim</th>
                    <th scope="col" class="text-center py-3">Telefon raqami</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="i in store.teachers"
                    :key="i.id"
                    class="border-b"
                    :class="
                      navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    "
                  >
                    <th
                      scope="row"
                      class="text-center px-8 py-3 font-medium whitespace-nowrap"
                    >
                      {{ i.full_name }}
                    </th>
                    <td
                      class="text-center font-medium text-green-800 px-8 py-2"
                    >
                      <p class="bg-green-100 rounded-[5px] p-1">{{ i.role }}</p>
                    </td>
                    <td class="text-center font-medium text-red-800 px-8 py-2">
                      <p class="bg-red-100 rounded-[5px] p-1">
                        {{ i.phone_number }}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <nav
              class="flex flex-row justify-between items-center md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <span class="text-sm font-normal">
                Sahifa
                <span class="font-semibold">1 - 10</span> dan
                <span class="font-semibold">10</span>
              </span>
              <ul class="inline-flex items-stretch -space-x-px">
                <li>
                  <a
                    href="#"
                    class="flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm py-2 sm:mt-0 -mt-2 px-6 rounded-lg leading-tight"
                    >Next</a
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <h2 id="accordion-collapse-heading-2">
          <button
            @click="toggleStudent"
            type="button"
            class="flex items-center justify-between w-full text-left rounded-lg bg-[rgba(213,219,242,0.5)] py-[24px] px-[32px]"
            data-accordion-target="#accordion-collapse-body-2"
            aria-expanded="false"
            aria-controls="accordion-collapse-body-2"
          >
            <div class="flex items-center gap-5">
              <i
                class="btn bx bxs-graduation text-[24px] p-3 text-white rounded-full"
              ></i>
              <h2 class="text-[18px]">O'quvchilar</h2>
            </div>
            <i
              :class="
                store.student
                  ? 'bx bx-minus bg-white text-[#4141eb] p-2 text-[30px] rounded-full'
                  : 'bx bx-plus bg-white text-[#4141eb] p-2 text-[30px] rounded-full'
              "
            ></i>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-2"
          :class="store.student ? '' : 'hidden'"
          aria-labelledby="accordion-collapse-heading-2"
        >
          <div
            class="relative shadow-md rounded-lg overflow-hidden"
            :class="navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'"
          >
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left">
                <thead class="btn text-xs rounded-lg uppercase">
                  <tr class="text-white">
                    <th scope="col" class="text-center py-3">I . F . O</th>
                    <th scope="col" class="text-center py-3">Telefon raqami</th>
                    <th scope="col" class="text-center py-3">Holati</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="i in store.students"
                    :key="i.id"
                    class="border-b"
                    :class="
                      navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    "
                  >
                    <th
                      scope="row"
                      class="text-center px-8 py-3 font-medium whitespace-nowrap"
                    >
                      {{ i.full_name }}
                    </th>
                    <td class="text-center font-medium text-red-800 px-8 py-2">
                      <p class="bg-red-100 rounded-[5px] p-1">
                        {{ i.phone_number }}
                      </p>
                    </td>
                    <td
                      v-show="!i.is_active"
                      class="text-center font-medium text-red-800 px-8 py-2"
                    >
                      <p class="bg-red-100 rounded-[5px] p-1">Faol emas</p>
                    </td>
                    <td
                      v-show="i.is_active"
                      class="text-center font-medium text-green-700 px-8 py-2"
                    >
                      <p class="bg-green-100 rounded-[5px] p-1">Faol</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <nav
              class="flex flex-row justify-between items-center md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <span class="text-sm font-normal">
                Sahifa
                <span class="font-semibold">1 - 10</span> dan
                <span class="font-semibold">10</span>
              </span>
              <ul class="inline-flex items-stretch -space-x-px">
                <li>
                  <a
                    href="#"
                    class="flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm py-2 sm:mt-0 -mt-2 px-6 rounded-lg leading-tight"
                    >Next</a
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useNavStore } from "../../stores/toggle";
import { useRouter } from "vue-router";
import axios from "../../services/axios";

const navbar = useNavStore();
const router = useRouter();

const store = reactive({
  staff: false,
  student: false,
  teachers: [],
  students: [],
  start_time: "",
});

const getGroup = () => {
  const id = router.currentRoute.value.params.id;
  axios
    .get(`/group/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.teachers = res.data.staffs;
      store.students = res.data.students;
      store.start_time = res.data.start_date;
    })
    .catch((error) => {
      console.error("Error fetching group data:", error);
    });
};

const toggleStaff = () => {
  store.staff = !store.staff;
  store.student = false;
};

const toggleStudent = () => {
  store.student = !store.student;
  store.staff = false;
};

onMounted(() => {
  getGroup();
});
</script>

<style lang="scss" scoped>
.btn {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}
</style>
