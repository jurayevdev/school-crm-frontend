<template>
  <section class="px-2">
    <!-- Slug start  -->

    <div>
      <div
        class="mt-[30px] rounded-[6px] p-[15px]"
        :class="navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'"
      >
        <div class="flex justify-between items-center font-bold mb-5">
          <h1 class="text-xl text-blue-700">
            <span>O'quvchi ma'lumotlari</span>
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
            class="btn flex flex-wrap justify-end text-sm font-medium p-3 gap-2 text-center text-[16px] rounded-t-lg"
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
                class="inline-block px-3 py-1 hover:text-[#1e293b] text-white font-semibold btn border rounded-lg"
              >
                Ma'lumot
              </button>
            </li>
            <li class="mr-2">
              <button
                id="about-tab"
                data-tabs-target="#about"
                type="button"
                role="tab"
                aria-controls="about"
                aria-selected="true"
                class="inline-block px-3 py-1 hover:text-[#1e293b] text-white font-semibold btn border rounded-lg"
              >
                Guruhlar
              </button>
            </li>
            <li class="mr-2">
              <button
                id="about-tab"
                data-tabs-target="#about"
                type="button"
                role="tab"
                aria-controls="about"
                aria-selected="true"
                class="inline-block px-3 py-1 hover:text-[#1e293b] text-white font-semibold btn border rounded-lg"
              >
                To'lov tarixi
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
                  class="w-full lg:border-l border-[#4141eb] p-5 flex flex-col gap-3"
                >
                  <h2
                    class="w-full flex items-center justify-between pb-3 border-b border-[#4141eb] text-lg"
                    :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                  >
                    <span class="w-full font-bold">Ism-familya :</span>
                    <span class="w-full">{{ store.data.full_name }}</span>

                    <!-- <span
                      class="w-full text-[16px] text-red-600"
                      v-show="!store.data.is_active"
                      >Faol emas</span
                    >
                    <span
                      class="w-full text-[16px] text-green-400"
                      v-show="store.data.is_active"
                      >Faol</span
                    > -->
                  </h2>

                  <h2
                    class="w-full flex items-center justify-between pb-3 border-b border-[#4141eb] text-lg"
                    :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                  >
                    <span class="w-full font-bold">Telefon raqam :</span>
                    <span class="w-full">+998901234567</span>
                  </h2>

                  <h2
                    class="w-full flex items-center justify-between pb-3 border-b border-[#4141eb] text-lg"
                    :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                  >
                    <span class="w-full font-bold">Ota-ona ismi :</span>
                    <span class="w-full">Hurmatli ota-ona</span>
                  </h2>

                  <h2
                    class="w-full flex items-center justify-between border-b pb-3 border-[#4141eb] text-lg"
                    :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                  >
                    <span class="w-full font-bold">Ota-ona raqami :</span>
                    <span class="w-full">+998901234567</span>
                  </h2>

                  <h2
                    class="w-full flex items-center justify-between border-b pb-3 border-[#4141eb] text-lg"
                    :class="navbar.userNav ? 'text-white' : 'text-[#1e293b]'"
                  >
                    <span class="w-full font-bold">Qo'shilgan vaqti :</span>
                    <span class="w-full">02-08-2024</span>
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
