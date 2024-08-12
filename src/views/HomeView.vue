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
      class="bg-gray-200 pt-14 px-2 sm:ml-64 pb-4 overflow-y-auto max-h-[93vh] overflow-hidden min-h-screen"
      
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

<style lang="scss" scoped></style>
