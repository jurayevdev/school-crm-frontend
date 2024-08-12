<template>
  <section class="px-2">
    <!-- Slug start  -->
    <div>
      <div
        class="mt-[30px] rounded-[6px] p-[15px]"
        :class="navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'"
      >
        <div class="flex justify-between items-center font-bold mb-10">
          <h1>
            <span>{{ store.data.full_name }}</span>
          </h1>
          <button
            @click="router.back(-1)"
            class="btn shadow-lg rounded-lg px-5 py-2.5 text-white focus:ring-2"
          >
            Orqaga qaytish
          </button>
        </div>

        <div class="w-full bg-white border rounded-lg border-[#4141eb]">
          <ul
            class="btn flex flex-wrap text-sm font-medium p-3 text-center text-[16px] rounded-t-lg"
            id="defaultTab"
            data-tabs-toggle="#defaultTabContent"
            role="tablist"
          >
            <li class="mr-2">
              <button
                @click="store.toggle = true"
                id="about-tab"
                data-tabs-target="#about"
                type="button"
                role="tab"
                aria-controls="about"
                aria-selected="true"
                class="inline-block px-3 py-1 hover:text-[#1e293b]"
                :class="
                  store.toggle
                    ? 'text-white font-semibold border-b border-white '
                    : 'text-white'
                "
              >
                Ma'lumot
              </button>
            </li>
            <li class="mr-2">
              <button
                @click="store.toggle = false"
                id="services-tab"
                data-tabs-target="#services"
                type="button"
                role="tab"
                aria-controls="services"
                aria-selected="false"
                class="inline-block px-3 py-1 hover:text-[#1e293b]"
                :class="
                  !store.toggle
                    ? 'text-white font-semibold border-b border-white '
                    : 'text-white'
                "
              >
                Guruh
              </button>
            </li>
          </ul>
          <div
            id="defaultTabContent"
            :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
          >
            <div
              :class="
                store.toggle
                  ? 'p-4 rounded-lg md:p-8'
                  : 'hidden p-4 rounded-lg md:p-8'
              "
              id="about"
              role="tabpanel"
              aria-labelledby="about-tab"
            >
              <div class="flex flex-col lg:flex-row gap-10">
                <img
                  :src="
                    store.image
                      ? store.image
                      : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                  "
                  alt=""
                  class="w-56 h-56 2xl:w-80 2xl:h-80 rounded-full object-cover mx-auto"
                />
                <div
                  class="w-full lg:border-l border-[#4141eb] p-5 flex flex-col gap-10 justify-between"
                >
                  <h2
                    class="w-full flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between border-b border-[#4141eb]"
                    :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                  >
                    <span class="flex items-center gap-3 text-[24px]">
                      <span class="text-[24px] font-bold">{{
                        store.data.full_name
                      }}</span
                      ><span class="text-[16px] uppercase">{{
                        store.role
                      }}</span>
                    </span>
                  </h2>

                  <h2
                    class="w-full flex items-center justify-between border-b border-[#4141eb]"
                    :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                  >
                    <span class="text-[24px]">
                      <span>Fanlar :</span>
                      <span
                        class="flex gap-5 flex-wrap lg:flex-row lg:items-center pb-2"
                      >
                        <span
                          v-for="el in store.data.subjects"
                          :key="el.id"
                          class="text-[16px] font-bold py-1"
                          >{{ el.title }}</span
                        >
                      </span>
                    </span>
                  </h2>

                  <h2
                    class="w-full flex items-center justify-between sm:border-b border-[#4141eb]"
                    :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                  >
                    <span class="w-full flex flex-col gap-3 text-[24px]">
                      <span class="text-[24px]">Bog'lanish :</span>
                      <span
                        class="w-full flex flex-col gap-3 xl:flex-row xl:items-center xl:gap-10 2xl:gap-20 text-[24px] pl-5"
                      >
                        <span
                          :class="
                            store.data.email
                              ? 'flex items-center gap-3'
                              : 'hidden'
                          "
                        >
                          <i class="bx bx-envelope" style="color: #f50000"></i>|
                          <span class="text-[16px] font-bold">{{
                            store.data.email
                          }}</span>
                        </span>
                        <span
                          :class="
                            store.data.phone_number
                              ? 'flex items-center gap-3'
                              : 'hidden'
                          "
                        >
                          <i class="bx bxs-phone" style="color: #16f500"></i>|
                          <span class="text-[16px] font-bold">{{
                            store.data.phone_number
                          }}</span>
                        </span>
                        <span
                          :class="
                            store.data.telegram_username
                              ? 'flex items-center gap-3'
                              : 'hidden'
                          "
                        >
                          <i class="bx bxl-telegram" style="color: #009cf5"></i
                          >|
                          <a href="" class="text-[16px] font-bold underline">{{
                            store.data.telegram_username
                          }}</a>
                        </span>
                      </span>
                    </span>
                  </h2>
                </div>
              </div>
            </div>
            <div
              :class="
                !store.toggle
                  ? 'p-4 rounded-lg md:p-8 dark:bg-gray-800'
                  : 'hidden p-4 rounded-lg md:p-8 dark:bg-gray-800'
              "
              id="services"
              role="tabpanel"
              aria-labelledby="services-tab"
            >
              <div
                class="relative shadow-md rounded-lg overflow-hidden"
                :class="navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'"
              >
                <div class="overflow-x-auto">
                  <table class="w-full text-sm text-left">
                    <thead class="bg-[#4141eb] text-xs rounded-lg uppercase">
                      <tr class="text-white">
                        <th scope="col" class="text-center py-3">Nomi</th>
                        <th scope="col" class="text-center py-3">
                          Boshlangan sana
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="el in store.data.groups"
                        :key="el.id"
                        class="border-b"
                        :class="
                          navbar.userNav
                            ? 'hover:bg-gray-700'
                            : 'hover:bg-gray-50'
                        "
                      >
                        <th
                          scope="row"
                          class="text-center px-8 py-3 font-medium whitespace-nowrap"
                        >
                          {{ el.name }}
                        </th>
                        <td
                          class="text-center font-medium text-green-800 px-8 py-2"
                        >
                          <p class="bg-green-100 rounded-[5px] p-1">
                            {{ el.start_date?.slice(0, 10) }}
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
                    <span class="font-semibold">1 - 10</span>
                    dan
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
      </div>
    </div>
    <!-- Slug END -->
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useNavStore } from "../../stores/toggle";
import axios from "@/services/axios";

const navbar = useNavStore();
const router = useRouter();

const store = reactive({
  data: "",
  toggle: true,
});

const getStaff = () => {
  const id = router.currentRoute.value.params.id;
  axios
    .get(`/staff/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.data = res.data;
      console.log(res.data);
    })
    .catch((error) => {
      // notification.warning(error.response.data.message);
    });
};

onMounted(() => {
  getStaff();
});
</script>

<style lang="scss" scoped>
.btn {
  background-image: linear-gradient(
    to right,
    white -450%,
    #4141eb
  );
}
</style>
