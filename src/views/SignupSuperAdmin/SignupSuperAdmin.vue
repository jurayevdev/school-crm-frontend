<template>
  <div class="bg-[#1e293b] flex justify-center items-center min-h-screen bg-cover bg-center">
    <div class="w-[400px] md:w-[500px] p-10 bg-white rounded-xl bg-opacity-60">
      <img
        class="w-24 sm:w-[120px] mx-auto"
        src="../../assets/img/devo.png"
        alt="Logo"
      />
      <h1 class="text-xl sm:text-[24px] font-bold text-center py-2">Super admin</h1>
      <form @submit.prevent="formInfo">
        <div class="flex flex-col gap-3">
          <div>
            <label for="full_name" class="block font-semibold">F. I. O.</label>
            <input
              type="text"
              id="full_name"
              v-model="form.full_name"
              class="p-2 w-full sm:p-[10px] border rounded-[9px]"
              placeholder="To'liq ism"
              required
            />
          </div>
          <div>
            <label for="tel" class="block font-semibold">Telefon raqam</label>
            <input
              type="tel"
              id="tel"
              v-model="form.phone_number"
              class="p-2 w-full sm:p-[10px] border rounded-[9px]"
              placeholder="+998 99 999 99 99"
              required
            />
          </div>
          <div>
            <label for="login" class="block font-semibold">Login</label>
            <input
              type="text"
              id="login"
              v-model="form.login"
              class="p-2 w-full sm:p-[10px] border rounded-[9px]"
              placeholder="Login"
              required
            />
          </div>
          <div>
            <label for="password" class="block font-semibold">Parol</label>
            <input
              type="password"
              id="password"
              v-model="form.password"
              class="p-2 w-full sm:p-[10px] border rounded-[9px]"
              placeholder="••••••••"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          class="w-full bg-[#4141eb] mt-4 text-white hover:bg-white hover:text-blue-900 hover:border-blue-900 py-2 sm:py-[10px] rounded-md"
        >
          Ro'yxatdan o'tish
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import axios from "@/services/axios";
import { useRouter } from "vue-router";
import { useNotificationStore } from "../../stores/notification";

const notification = useNotificationStore();
const router = useRouter();

const form = reactive({
  login: "",
  password: "",
  full_name: "",
  phone_number: "",
  role: "superadmin",
});

const formInfo = async () => {
  try {
    const res = await axios.post("staff/signup", {
      login: form.login,
      password: form.password,
      full_name: form.full_name,
      phone_number: form.phone_number,
      role: form.role,
    });

    if (res.status === 201) {
      router.push("/login");
    } else {
      notification.warning(res.data.message || "Unknown error occurred.");
    }
  } catch (error) {
    notification.warning(error.response?.data?.message || "Unknown error occurred.");
    console.error(error);
  }
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
