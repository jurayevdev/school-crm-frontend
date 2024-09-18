<template>
  <nav
    class="fixed top-0 z-50 w-full"
    :class="{
      'bg-[#1e293b] text-white': navbar.userNav,
      'bg-white text-black': !navbar.userNav,
    }"
  >
    <div class="flex items-center justify-between px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center gap-3">
        <button @click="toggleSidebar" class="xl:hidden">
          <i class="bx bx-menu text-2xl"></i>
        </button>
        <router-link to="/" class="flex items-center ml-2">
          <img
            :src="store.image ? store.link + store.image : '../favicon.ico'"
            class="h-8 sm:h-12 mr-2 rounded-full"
            alt="Logo"
          />
          <span class="hidden font-semibold  sm:block text-2xl whitespace-nowrap">
            {{ store.data ? store.data : "Devosoft" }}
          </span>
        </router-link>ufw allow 22/tcp
      </div>
      <div class="flex items-center">
        <div class="flex items-center mr-5">
          <div class="relative flex items-center cursor-pointer" @click="navbar.setMode()">
            <b
              class="flex items-center justify-between w-[3rem] sm:w-[4.5rem] h-6 sm:h-9 border-2 rounded-full"
            >
              <span
                ><i class="bx bxs-moon ml-1 text-yellow-300 rounded-full sm:text-2xl"></i
              ></span>
              <span><i class="bx bxs-sun mr-1 text-yellow-300 rounded-full mt-1 sm:mt-0 sm:text-2xl"></i></span>
            </b>
            <p
              class="absolute top-[1px] left-0 w-[1.4rem] h-[1.4rem] sm:w-9 sm:h-[2.1rem] -z-10 rounded-full duration-1000"
              :class="{
                'translate-x-full bg-black': !navbar.userNav,
                'bg-white': navbar.userNav,
              }"
            ></p>
          </div>
        </div>
        <img
          @click="toggleUserInfo"
          class="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gray-800 cursor-pointer border-2 border-[#1e293b]"
          src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
          alt="user"
        />
        <div
          v-show="navbar.userInfo"
          @click="navbar.userInfo = false"
          class="absolute top-16 right-5 z-50 border-2 rounded-lg overflow-hidden shadow-md divide-y"
          :class="{
            'bg-[#1e293b] border-white shadow-white': navbar.userNav,
            'bg-white': !navbar.userNav,
          }"
        >
          <div class="px-4 py-3 text-center">
            <p class="text-lg font-bold">{{ store.guard }}</p>
          </div>
          <ul class="py-1 font-medium">
            <li
              @click="Logout"
              class="block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
            >
              <i class="bx bx-log-out"></i> Log out
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useNavStore } from "../stores/toggle.js";
import { useSidebarStore } from "../stores/sidebar.js";
import { useRouter } from "vue-router";
import { onMounted, reactive } from "vue";
import axios from "@/services/axios";

const router = useRouter();
const sidebar = useSidebarStore();
const navbar = useNavStore();

const store = reactive({
  guard: localStorage.getItem("role"),
  data: "",
  image: "",
  link: "https://dev.edu-devosoft.uz/",
});

const Logout = () => {
  localStorage.removeItem("id");
  localStorage.removeItem("role");
  localStorage.removeItem("token");
  router.push("/login");
};

const toggleSidebar = () => {
  sidebar.sidebar = !sidebar.sidebar;
};

const toggleUserInfo = () => {
  navbar.userInfo = !navbar.userInfo;
};

const getOneProduct = () => {
  axios
    .get(`/school/${localStorage.getItem("school_id")}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.data = res.data.name;
      store.image = res.data.image;
    })
    .catch((error) => {
      console.log("error", error);
    });
};
onMounted(() => {
  getOneProduct();
});
</script>

<style lang="scss" scoped>
@media (max-width: 400px) {
  .icon {
    display: none;
  }
}
</style>
