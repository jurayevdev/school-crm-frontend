<template>
  <nav
    class="fixed top-0 z-50 w-full border-b"
    :class="{
      'bg-[#1e293b] text-white': navbar.userNav,
      'bg-white text-black': !navbar.userNav,
    }"
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <button @click="toggleSidebar">
            <i class="bx bx-menu text-2xl sm:hidden block"></i>
          </button>
          <router-link to="/" class="flex ml-2 md:mr-24">
            <img
              src="../assets/img/devo.png"
              class="h-8 mr-3 rounded-full"
              alt="Logo"
            />
            <span
              class="self-center text-lg font-semibold sm:text-2xl whitespace-nowrap"
            >
              DEVOSOFT SCHOOL
            </span>
          </router-link>
        </div>
        <div class="flex items-center">
          <div class="flex items-center ml-3">
            <ul class="flex sm:gap-5 text-2xl">
              <li>
                <div class="relative" @click="navbar.setMode()">
                  <b
                    class="flex mr-5 w-[4.1rem] items-center justify-between h-9 cursor-pointer border-2 rounded-full"
                  >
                    <span
                      ><i
                        class="bx bxs-moon pl-1 text-yellow-300 rounded-full"
                      ></i
                    ></span>
                    <span
                      ><i
                        class="bx bxs-sun px-1 rounded-full text-yellow-300"
                      ></i
                    ></span>
                  </b>
                  <p
                    class="w-8 h-8 rounded-full absolute top-[2px] -z-10 duration-1000"
                    :class="{
                      'translate-x-full bg-black': !navbar.userNav,
                      'bg-white': navbar.userNav,
                    }"
                  ></p>
                </div>
              </li>
              <li>
                <img
                  @click="toggleUserInfo"
                  class="w-8 h-8 rounded-full bg-gray-800 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 cursor-pointer"
                  src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                  alt="user"
                />
              </li>
            </ul>
            <div
              v-show="navbar.userInfo"
              @click="navbar.userInfo = false"
              class="absolute z-50 top-14 right-2 border-2 shadow-black text-base rounded-lg list-none divide-y divide-gray-100 shadow-md overflow-hidden"
              :class="{
                'bg-[#203843] border-white shadow-white': navbar.userNav,
                'bg-white': !navbar.userNav,
              }"
            >
              <div class="px-4 py-3 text-center">
                <p class="text-lg font-bold">{{ store.guard }}</p>
              </div>
              <ul class="py-1 font-medium">
                <li
                  @click="Logout"
                  class="block px-4 py-2 text-sm hover:cursor-pointer"
                >
                  <i class="bx bx-log-out"></i> Log out
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useNavStore } from "../stores/toggle.js";
import { useSidebarStore } from "../stores/sidebar.js";
import { useRouter } from "vue-router";
import { reactive } from "vue";

const router = useRouter();
const sidebar = useSidebarStore();
const navbar = useNavStore();

const store = reactive({
  guard: localStorage.getItem("role"),
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
</script>

<style lang="scss" scoped>
@media (max-width: 400px) {
  .icon {
    display: none;
  }
}
</style>
