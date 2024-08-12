<template>
  <div class="bg-[#1e293b] flex justify-center items-center min-h-screen bg-cover bg-center">
    <div class="w-[400px] md:w-[500px] p-10 bg-white rounded-xl bg-opacity-60">
      <img class="w-24 sm:w-[120px] mx-auto" src="../../assets/img/devo.png" alt="Logo" />
      <h1 class="text-2xl sm:text-[28px] font-bold text-center py-5">Tizimga kirish</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="login" class="block mb-2 font-semibold">Login</label>
          <input
            type="text"
            id="login"
            v-model="form.login"
            class="w-full p-2 sm:p-[10px] border rounded-[9px]"
            placeholder="login"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block mt-3 sm:mt-9 mb-2 font-semibold">Parol</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            class="w-full p-2 sm:p-[10px] border rounded-[9px]"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-[#4141eb] text-white hover:bg-white hover:text-[#4141eb] hover:border-[#4141eb] py-2 sm:py-[10px] rounded-md"
        >
          Kirish
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import axios from '@/services/axios';
import { useRouter } from 'vue-router';
import { useNotificationStore } from '@/stores/notification';

const notification = useNotificationStore();
const router = useRouter();

const form = reactive({
  password: '',
  login: '',
});

const handleLogin = async (url, successRedirect) => {
  try {
    const response = await axios.post(url, {
      login: form.login,
      password: form.password,
    });

    if (response.status === 201) {
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('token', response.data.access_token);
      notification.success(response.data.message);
      router.push(successRedirect);
    } else {
      throw new Error('Error');
    }
  } catch {
    // No need to handle individual errors here; it will be handled in the main function
    throw new Error('Error');
  }
};

const handleSubmit = async () => {
  try {
    await handleLogin('staff/login', '/');
  } catch {
    try {
      await handleLogin('student/login');
    } catch {
      notification.warning('Foydalanuvchi topilmadi!');
    }
  }
};
</script>

<style lang="scss" scoped></style>
