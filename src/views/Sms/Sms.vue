<template>
  <div @click="store.filter_show = false" class="px-2">
    <!-- ----------------------------------------- EMPLYE TABLE  ------------------------------------------------- -->

    <section class="pt-4">
      <!------------------------------------------- Search ------------------------------------------->
      <div v-show="!store.PageProduct">
        <Placeholder2 />
      </div>
      <!------------------------------------------- Search ------------------------------------------->

      <div v-show="store.PageProduct" class="w-full max-w-screen">
        <!-- Start coding here -->

        <!------------------------------------------- Search ------------------------------------------->
        <div
          class="shadow rounded-xl flex flex-col lg:flex-row items-center justify-between lg:space-x-4 p-4 gap-3 mb-4"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <h1 class="text-blue-700 font-bold text-lg w-full">
            Xabar jo'natish
          </h1>
        </div>
      </div>

      <div v-show="store.PageProduct" class="w-full max-w-screen">
        <!-- Start coding here -->

        <!------------------------------------------- Search ------------------------------------------->
        <div
          class="shadow rounded-xl flex flex-col justify-between p-4 py-10 gap-3 mb-4"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <div class="w-full flex lg:pb-0 pb-2 gap-5">
            <form
              @submit.prevent="addGroups"
              :class="{ darkForm: navbar.userNav }"
              class="lg:w-4/12 w-full"
            >
              <div class="w-full">
                <input
                  list="group-options"
                  id="name"
                  class="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2 pl-3"
                  placeholder="Guruhni tanlang"
                  required
                />
                <datalist id="group-options">
                  <option v-for="i in store.groups" :key="i.id" :value="i.name">
                    {{ i.name }}
                  </option>
                </datalist>
              </div>
            </form>
            <div
              class="lg:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center md:space-x-3"
            >
              <button
                v-show="!store.guard"
                id=""
                type="button"
                class="btnAdd flex items-center max-w-fit justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5"
              >
                <span class="">Yuborish</span>
              </button>
            </div>
          </div>
          <div
            class="font-bold lg:w-6/12 w-full flex flex-col gap-7 mt-10"
            :class="navbar.userNav ? 'text-white' : 'text-black'"
          >
            <span>
              Guruhni tanlang va yuborish tugmasini bosing va SMS xabarnoma
              guruhdagi to'lov qilmagan talabalar uchun avtomatik tarzda
              yuboriladi.
            </span>
            <span>
              SMS Namuna <br />
              Assalomu aleykum $studentName ning ota-onasi, Iltimos $subjectName
              kursiga joriy oy uchun 15-sanagacha to\'lov qilishni unutmang.
              Xurmat bilan CAMELOT o'quv markazi !
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ----------------------------------------- EMPLYE TABLE END --------------------------------------------- -->
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useNavStore } from "../../stores/toggle";
import { Placeholder2 } from "../../components";
import { useNotificationStore } from "../../stores/notification";
import axios from "@/services/axios";
import { useInfoStore } from "../../stores/dashboard";

const info = useInfoStore();
const notification = useNotificationStore();
const navbar = useNavStore();
const router = useRouter();

const modal = ref(false);

const toggleModal = () => {
  modal.value = !modal.value;
  form.full_name = "";
  form.phone_number = "";
  form.login = "";
  form.password = "";
  form.group_id = "";
};

const davomat = ref(true);
const davomatToggle = () => (davomat.value = !davomat.value);

const store = reactive({
  PageProduct: "",
  page: [],
  pagination: 1,
  allProducts: false,
  error: false,
  groups: [{ name: "Guruh yaratilmagan" }],
  guard: "",
  groupModal: false,
  filter: "",
  filter_show: false,
  searchList: [],
});

// ---------------------------- search ------------------------------------
function searchFunc() {
  store.searchList = [];
  for (let i of store.allProducts) {
    if (i.full_name.toLowerCase().includes(store.filter.toLowerCase())) {
      store.searchList.push(i);
    }
  }

  if (!store.filter.length) {
    store.searchList = [];
  }
}
// ---------------------------- search end ------------------------------------

function enterSlug(id, name) {
  router.push(`./students/${id}/${name}`);
}

function cancelFunc() {
  form.full_name = "";
  form.phone_number = "";
  form.login = "";
  form.password = "";
  form.group_id = "";
  modal.value = false;
}

function deleteFunc(id) {
  remove.id = id;
  remove.toggle = true;
}

// ----------------------------------- forms -----------------------------------
const form = reactive({
  full_name: "",
  phone_number: "",
  login: "",
  password: "",
  group_id: "",
});

const edit = reactive({
  full_name: "",
  phone_number: "",
  login: "",
  password: "",
  group_id: "",
  id: "",
  toggle: false,
});

const remove = reactive({
  id: "",
  toggle: false,
});

// ----------------------------------- axios --------------------------------
const getAllProduct = () => {
  axios
    .get("/student", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      console.log(res.data, "all");
      store.allProducts = res.data;
      store.error = false;
    })
    .catch((error) => {
      store.allProducts = error.response.data.message;
      store.error = true;
      console.log("error", error);
    });
};

const getProduct = (page) => {
  axios
    .get(`/student/page?page=${page}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      store.PageProduct = res.data?.data?.records;
      const pagination = res.data?.data?.pagination;
      store.page = [];
      store.page.push(pagination.currentPage, pagination.total_count);
      store.error = false;
    })
    .catch((error) => {
      store.PageProduct = error.response.data.message;
      store.error = true;
    });
};

const getGroups = () => {
  axios
    .get("/group", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      store.groups = res.data;
    })
    .catch((error) => {
      store.groups = [{ name: "Guruh yaratilmagan" }];
      console.log("error", error);
    });
};

const getOneProduct = (id) => {
  axios
    .get(`/student/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      edit.full_name = res.data.full_name;
      edit.phone_number = res.data.phone_number;
      edit.login = res.data.login;
      edit.password = res.data.password;
      edit.group_id = res.data.group_id;
      edit.id = id;
      edit.toggle = true;
    })
    .catch((error) => {
      notification.warning(error.response.data.message);
      console.log("error", error);
    });
};

const createProduct = () => {
  const data = {
    full_name: form.full_name,
    phone_number: form.phone_number,
    login: form.login,
    password: form.password,
    group_id: form.group_id || store.groups[0],
  };
  axios
    .post("/student/create", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      info.getStudent();
      notification.success("Guruh qo'shildi");
      getProduct(store.pagination);
      cancelFunc();
    })
    .catch((error) => {
      notification.warning(error.response.data.message);
      console.log(error);
    });
};

const editProduct = () => {
  const data = {
    full_name: edit.full_name,
    phone_number: edit.phone_number,
    login: edit.login,
    password: edit.password || "parol",
    group_id: edit.group_id,
  };
  axios
    .patch(`/student/${edit.id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      console.log(res.data.statusCode);
      notification.success("Guruh tahrirlandi");
      getProduct(store.pagination);
      edit.name = "";
      edit.start_date = "";
      edit.toggle = false;
    })
    .catch((error) => {
      if (error.response.data.statusCode == 400) {
        console.log(error.response.data.message);
        notification.warning(error.response.data.message);
      } else if (error.response.data.statusCode == 401) {
        console.log(error.response.data.message);
        notification.warning(error.response.data.message);
      }
      console.log("error", error);
    });
};

const deleteProduct = () => {
  axios
    .delete(`/student/${remove.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      console.log(res.data.statusCode);
      notification.success(res.data.message);
      getProduct(store.pagination);
      info.getStudent();
      remove.toggle = false;
    })
    .catch((error) => {
      if (error.response.data.statusCode == 400) {
        console.log(error.response.data.message);
        notification.warning(error.response.data.message);
      } else if (error.response.data.statusCode == 401) {
        console.log(error.response.data.message);
        notification.warning(error.response.data.message);
      }
      console.log("error", error);
    });
};

const getGuard = () => {
  axios
    .delete("/staff/1", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {})
    .catch((error) => {
      if (error.response.data.message == "Admin huquqi sizda yo'q!") {
        store.guard = true;
      }
    });
};

onMounted(() => {
  getProduct(store.pagination);
  getAllProduct();
  getGroups();
  getGuard();
});
</script>

<style lang="scss" scoped>
.btnAdd {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}

.btnKirish {
  background-image: linear-gradient(to right, white -450%, #4141eb);
}

.btnOrqaga {
  background-image: linear-gradient(to right, white -450%, #2f73f0);
}

.darkForm {
  label {
    color: white;
  }
}

// #056674
</style>
