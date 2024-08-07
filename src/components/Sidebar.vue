<template>
  <aside
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform duration-700 -translate-x-full bg-gray-200 border-r sm:translate-x-0"
    :class="sidebar.sidebar ? '-translate-x-full' : 'translate-x-0'"
    @mousedown="sidebar.sidebar = true"
  >
    <div
      class="h-full px-3 py-4 pb-4 overflow-y-auto"
      :class="{ 'bg-[#1e293b]': navbar.userNav, 'bg-white': !navbar.userNav }"
    >
      <ul class="space-y-2 font-medium">
        <li v-for="i in header" v-show="i.role != store.guard" :key="i.id">
          <router-link
            class="flex items-center text-lg p-2 cursor-pointer duration-500 hover:bg-gray-400 hover:text-white rounded-lg gap-2"
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
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "../services/axios";

const router = useRouter();
const sidebar = useSidebarStore();
const navbar = useNavStore();

const store = reactive({
  guard: "",
});

onMounted(() => {
  try {
    axios
      .get("/staff", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        store.guard = "staff";
        store.guard = "staff";
      })
      .catch((err) => {
        store.guard = "student";
      });
  } catch (error) {
    console.log(error);
  }
});
</script>

<style lang="scss" scoped>
.router-link-active {
  background: transparent;
}

.router-link-exact-active {
  background: #4141eb;
  color: white;
}
</style>
