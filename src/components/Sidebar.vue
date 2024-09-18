<template>
  <aside
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-700 -translate-x-full bg-gray-200 border-r xl:translate-x-0"
    :class="sidebar.sidebar ? '-translate-x-full' : 'translate-x-0'"
    @mousedown="sidebar.sidebar = true"
  >
    <div
      class="h-full px-3 py-4 pb-4 overflow-y-auto"
      :class="{ 'bg-[#1e293b]': navbar.userNav, 'bg-white': !navbar.userNav }"
    >
      <ul class="space-y-2 font-medium mt-[70px]">
        <li v-for="i in header" v-show="checkRole(i.role)" :key="i.id">
          <router-link
            class="flex items-center text-lg p-2 cursor-pointer duration-500 hover:bg-gray-400 rounded-lg gap-2"
            :class="{ 'text-white': navbar.userNav }"
            :to="i.link"
          >
            <i :class="i.icon"></i><span>{{ i.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { header } from "../constants/sidebar";
import { useNavStore } from "../stores/toggle";
import { useSidebarStore } from "../stores/sidebar.js";
import { reactive } from "vue";

const sidebar = useSidebarStore();
const navbar = useNavStore();

const store = reactive({
  guard: localStorage.getItem("role"),
});

const checkRole = (roles) => {
  const roleArray = roles.split(", ");
  return roleArray.includes(store.guard);
};
</script>

<style lang="scss" scoped>
.router-link-exact-active {
  background: transparent;
}

.router-link-exact-active {
  background: #4141eb;
  color: white;
}
</style>
