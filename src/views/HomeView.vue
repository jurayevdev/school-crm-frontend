<template>
  <div>
    <header>
      <Navbar />
    </header>
    <Sidebar @mousedown="navbar.userInfo = false" />
    <main
      @mousedown="
        sidebar.sidebar = true;
        navbar.userInfo = false;
      "
      class="bg-gray-200 mt-[110px] px-2 xl:ml-64 pb-4 overflow-y-auto max-h-[93vh] overflow-hidden min-h-screen"
    >
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { Sidebar, Navbar } from "../components";
import { useNavStore } from "../stores/toggle";
import { useSidebarStore } from "../stores/sidebar.js";

const sidebar = useSidebarStore();
const navbar = useNavStore();
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #e5e7eb;
  box-shadow: inset 0 0 5px e5e7eb;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to right, white -450%, #4141eb);
  border-radius: 15px;
}
</style>
