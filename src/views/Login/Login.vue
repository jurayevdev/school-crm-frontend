<template>
  <div
    class="bg-[#1e293b] flex justify-center items-center min-h-screen bg-cover bg-center"
  >
    <div class="w-[400px] md:w-[500px] p-10 bg-white rounded-xl bg-opacity-60">
      <img
        class="w-24 sm:w-[120px] mx-auto"
        src="../../assets/img/devo.png"
        alt="Logo"
      />
      <h1 class="text-2xl sm:text-[28px] font-bold text-center py-5">
        Tizimga kirish
      </h1>
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
          <label for="password" class="block mt-3 sm:mt-9 mb-2 font-semibold"
            >Parol</label
          >
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
import { reactive, ref } from "vue";
import axios from "@/services/axios";
import { useRouter } from "vue-router";
import { useNotificationStore } from "@/stores/notification";

const notification = useNotificationStore();
const router = useRouter();

const school = ref([]);

const form = reactive({
  password: "",
  login: "",
});

const handleSubmit = () => {
  const data = {
    login: form.login,
    password: form.password,
  };
  axios
    .post("/auth/login", data)
    .then((res) => {
      form.login = "";
      form.password = "";
      localStorage.setItem("token", res.data.tokens.access_token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("id", res.data.user.id);

      if (localStorage.getItem("role") == "owner") {
        axios
          .get(`/user/${localStorage.getItem("id")}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            for (let i in res.data.school) {
              school.value.push(res.data.school[i].id);
            }
            localStorage.setItem("school_id", school.value);
          });
        router.push("/");
      } else if (
        localStorage.getItem("role") == "administrator" ||
        localStorage.getItem("role") == "teacher"
      ) {
        localStorage.setItem("school_id", res.data.user.school_id);
        router.push("/");
      }
    })
    .catch((error) => {
      notification.warning(error.response.data.message);
    });
};
</script>

<style lang="scss" scoped></style>
