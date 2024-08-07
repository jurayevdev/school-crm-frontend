<template>
  <section>
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
                id="about-tab"
                data-tabs-target="#about"
                type="button"
                role="tab"
                aria-controls="about"
                aria-selected="true"
                class="inline-block px-3 py-1 hover:text-[#1e293b] text-white font-semibold border-b border-white"
              >
                Ma'lumot
              </button>
            </li>
          </ul>
          <div
            id="defaultTabContent"
            :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
          >
            <div
              class="p-4 rounded-lg md:p-8"
              id="about"
              role="tabpanel"
              aria-labelledby="about-tab"
            >
              <div class="flex flex-col lg:flex-row gap-10">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt=""
                  class="w-56 h-56 2xl:w-80 2xl:h-80 rounded-full object-cover mx-auto"
                />
                <div
                  class="w-full lg:border-l border-[#4141eb] p-5 flex flex-col gap-10 justify-between"
                >
                  <h2
                    class="w-full flex py-5 flex-col gap-3 xl:flex-row xl:items-center xl:justify-between border-b border-[#4141eb]"
                    :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                  >
                    <span class="flex items-center gap-3 text-[24px]">
                      <span class="text-[24px] font-bold">{{
                        store.data.full_name
                      }}</span>
                      |
                      <span
                        class="text-[16px] text-red-600"
                        v-show="!store.data.is_active"
                        >aktiv emas</span
                      >
                      <span
                        class="text-[16px] text-red-600"
                        v-show="store.data.is_active"
                        >aktiv</span
                      >
                    </span>
                  </h2>

                  <h2
                    class="w-full flex items-center justify-between border-b border-[#4141eb]"
                    :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                  >
                    <span class="w-full flex flex-col gap-3 text-[24px]">
                      <span>Guruh :</span>
                      <span
                        class="w-full flex flex-col gap-3 lg:flex-row justify-between lg:items-center pb-2"
                      >
                        <span
                          class="text-[16px] font-bold pl-5 flex items-center gap-3"
                          ><span class="font-normal pr-2">Guruh nomi:</span
                          ><span class="text-[16px] font-bold pl-5">{{
                            store.data?.group?.name
                          }}</span></span
                        >

                        <span
                          class="text-[16px] font-bold pl-5 flex items-center gap-3"
                          ><span class="font-normal">Boshlangan sana:</span
                          >{{
                            store.data?.group?.start_date?.slice(0, 10)
                          }}</span
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
                          v-show="store.data.email"
                          class="flex items-center gap-3"
                        >
                          <i class="bx bx-envelope" style="color: #f50000"></i>|
                          <span class="text-[16px] font-bold">{{
                            store.data.email
                          }}</span>
                        </span>
                        <span
                          v-show="store.data.phone_number"
                          class="flex items-center gap-3"
                        >
                          <i class="bx bxs-phone" style="color: #16f500"></i>|
                          <span class="text-[16px] font-bold">{{
                            store.data.phone_number
                          }}</span>
                        </span>
                        <span
                          v-show="store.data.telegram_username"
                          class="flex items-center gap-3"
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
import axios from "../../services/axios";
const navbar = useNavStore();
const router = useRouter();

const store = reactive({
  data: "",
});

const getStudent = () => {
  const id = router.currentRoute.value.params.id;
  axios
    .get(`/student/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.data = res.data;
      console.log(res.data);
    })
    .catch((error) => {
      // console.log("error", error);
    });
};

onMounted(() => {
  getStudent();
});
</script>

<style lang="scss" scoped>
.btn {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}
</style>
