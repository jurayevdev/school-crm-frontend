<template>
  <section>
    <div
      :class="
        store.toggle
          ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
          : 'hidden'
      "
    >
      <div class="relative p-4 max-w-5xl min-w-[50%] h-auto">
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
              Ma'lumotlarni tahrirlash
            </h3>
            <button
              @click="store.toggle = false"
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
          <form
            @submit.prevent="editProduct"
            :class="{ darkForm: navbar.userNav }"
          >
            <div class="w-full">
              <label for="name" class="block mb-2 text-sm">F . I . O</label>
              <input
                v-model="form.full_name"
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                placeholder="To'liq ismini kiriting"
                required
              />
            </div>
            <div class="grid font-medium gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label for="phone" class="block mb-2 text-sm"
                  >Telefon raqam</label
                >
                <input
                  v-model="form.phone_number"
                  type="tel"
                  name="phone"
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Telefon raqamini kiriting"
                  required
                />
              </div>
              <div>
                <label for="username" class="block mb-2 text-sm"
                  >Telegram username</label
                >
                <input
                  v-model="form.telegram_username"
                  type="username"
                  name="password"
                  id="username"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="@username"
                />
              </div>
              <div class="col-span-2">
                <label for="email" class="block mb-2 text-sm">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  name="email"
                  id="email"
                  class="bg-g0ray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="example@gmail.com"
                />
              </div>
              <div class="col-span-2">
                <div class="block mb-2 text-sm">Rasm yuklash</div>
                <label
                  for="file"
                  class="cursor-pointer text-center bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  >Rasm yuklash</label
                >
                <input
                  @change="uploadFile"
                  type="file"
                  name="file"
                  id="file"
                  class="sr-only bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                />
              </div>
            </div>
            <div
              class="w-full flex items-center justify-between border-t pt-5 mt-5"
            >
              <button
                @click="store.toggle = false"
                type="button"
                class="border cursor-pointer inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                class="btnAdd cursor-pointer text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Tahrirlash
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Slug start  -->
    <div>
      <div
        class="flex justify-center items-center mt-[30px] rounded-lg p-[15px] min-h-screen overflow-hidden overflow-y-auto max-h-screen lg:pb-0 lg:pt-0 pb-40 pt-72"
        :class="navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'"
      >
        <div
          class="w-full max-w-2xl mx-auto bg-white border overflow-hidden rounded-lg border-[#046f80]"
        >
          <ul
            class="btn flex flex-wrap text-sm font-medium p-3 text-center text-[16px] rounded-t-lg"
            id="defaultTab"
            data-tabs-toggle="#defaultTabContent"
            role="tablist"
          >
            <li class="flex justify-between items-center w-full mr-2">
              <button
                id="about-tab"
                data-tabs-target="#about"
                type="button"
                role="tab"
                aria-controls="about"
                aria-selected="true"
                class="inline-block px-3 py-1 hover:text-[#1e293b] text-white font-semibold border-b border-white"
              >
                Sozlamalar
              </button>
              <button
                @click="router.back(-1)"
                class="btn shadow-lg rounded-lg border px-5 py-2.5 text-white focus:ring-2"
              >
                Orqaga qaytish
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
              <div class="flex flex-col lg:flex-row overflow-hidden gap-10">
                <img
                  :src="
                    form.image
                      ? `http://localhost:3000/${form.image}`
                      : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                  "
                  alt=""
                  class="w-56 h-56 2xl:w-80 2xl:h-80 rounded-full object-cover mx-auto"
                />
                <div
                  class="w-full lg:border-l border-[#046f80] p-5 flex flex-col gap-10 justify-between"
                >
                  <h2
                    class="w-full flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between border-b border-[#046f80]"
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
                    v-if="store.data?.subjects?.length"
                    class="w-full flex items-center justify-between border-b border-[#046f80]"
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
                    class="w-full flex items-center justify-between sm:border-b border-[#046f80]"
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
                              ? 'flex items-center gap-3 whitespace-nowrap overflow-x-auto'
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
                              ? 'flex items-center gap-3 whitespace-nowrap overflow-x-auto'
                              : 'hidden'
                          "
                        >
                          <i class="bx bxs-phone" style="color: #16f500"></i>|
                          <span
                            class="text-[16px] font-bold whitespace-nowrap"
                            >{{ store.data.phone_number }}</span
                          >
                        </span>
                        <span
                          :class="
                            store.data.telegram_username
                              ? 'flex items-center gap-3 whitespace-nowrap overflow-x-auto'
                              : 'hidden'
                          "
                        >
                          <i class="bx bxl-telegram" style="color: #009cf5"></i
                          >|
                          <a
                            href=""
                            class="text-[16px] font-bold underline whitespace-nowrap"
                            >{{ store.data.telegram_username }}</a
                          >
                        </span>
                      </span>
                    </span>
                  </h2>
                </div>
              </div>
              <button
                @click="store.toggle = true"
                class="btn shadow-lg w-full rounded-lg border px-5 py-2.5 text-white focus:ring-2 text-center mt-5 font-medium"
              >
                Ma'lumotlarni tahrirlash
              </button>
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
  toggle: false,
  image: "",
});

const form = reactive({
  full_name: "",
  phone_number: "",
  telegram_username: "",
  email: "",
  image: "",
});

const getProduct = () => {
  const id = localStorage.getItem("userId");
  axios
    .get(`/staff/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      store.data = res.data;
      form.full_name = res.data.full_name;
      form.email = res.data.email;
      form.phone_number = res.data.phone_number;
      form.telegram_username = res.data.telegram_username;
      form.image = res.data.image;
    })
    .catch((error) => {
      if (error.response.data.message == "Admin huquqi sizda yo'q!") {
        axios
          .get(`/student/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            store.data = res.data;
            form.full_name = res.data.full_name;
            form.email = res.data.email;
            form.phone_number = res.data.phone_number;
            form.telegram_username = res.data.telegram_username;
            form.image = res.data.image;
          })
          .catch((error) => {});
      }
    });
};

const editProduct = async () => {
  const id = localStorage.getItem("userId");
  const data = {
    full_name: form.full_name,
    phone_number: form.phone_number,
    email: form.email,
    telegram_username: form.telegram_username,
  };
  axios
    .patch(`/staff/edit/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.data = res.data;
      form.full_name = res.data.full_name;
      form.email = res.data.email;
      form.phone_number = res.data.phone_number;
      form.telegram_username = res.data.telegram_username;
      form.image = res.data.image;
      store.toggle = false;
      getProduct();
    })
    .catch((error) => {
      axios
        .patch(`/student/edit/${id}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          form.full_name = res.data.full_name;
          form.email = res.data.email;
          form.phone_number = res.data.phone_number;
          form.telegram_username = res.data.telegram_username;
          form.image = res.data.image;
          store.toggle = false;
          getProduct();
        })
        .catch((error) => {});
    });
};

const uploadFile = (e) => {
  let image = e.target.files[0];
  const id = localStorage.getItem("userId");
  const data = {
    full_name: form.full_name,
    phone_number: form.phone_number,
    image: image,
  };
  axios
    .patch(`/staff/edit/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      form.full_name = res.data.full_name;
      form.phone_number = res.data.phone_number;
      form.image = res.data.image;
      getProduct();
    })
    .catch((error) => {
      axios
        .patch(`/student/edit/${id}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          form.full_name = res.data.full_name;
          form.phone_number = res.data.phone_number;
          form.image = res.data.image;
          getProduct();
        });
    });
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
