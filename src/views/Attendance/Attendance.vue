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
          <h1 class="text-blue-700 font-bold text-lg w-full">Davomat</h1>
          <div class="w-full flex items-center lg:pb-0 pb-2 gap-5 justify-end">
            <form
              @submit.prevent="addGroups"
              :class="{ darkForm: navbar.userNav }"
              class="lg:w-8/12 w-full"
            >
              <div class="w-full">
                <input
                  list="group-options"
                  id="name"
                  class="bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-1 pl-3"
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
              class="lg:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3"
            >
              <button
                v-show="!store.guard"
                id=""
                type="button"
                class="btnAdd flex items-center max-w-fit justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                <span class="">Davomat qilish</span>
              </button>
            </div>
          </div>
        </div>
        <!------------------------------------------- Search ------------------------------------------->

        <div
          class="relative shadow-md rounded-lg overflow-hidden"
          :class="navbar.userNav ? 'bg-[#1e293b] text-white' : 'bg-white'"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead
                class="text-xs rounded-lg uppercase"
                :class="navbar.userNav ? 'bg-gray-700' : 'bg-gray-50'"
              >
                <tr>
                  <th scope="col" class="text-center py-3">F . I . O</th>
                  <th scope="col" class="text-center py-3">To'lov holati</th>
                  <th scope="col" class="text-center py-3">Davomat</th>
                </tr>
              </thead>
              <tbody v-show="!store.error">
                <tr
                  class="border-b"
                  :class="
                    navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  "
                >
                  <th
                    scope="row"
                    class="text-center px-8 py-3 font-medium whitespace-nowrap"
                  >
                    <span>John Doe</span>
                  </th>
                  <td class="text-center font-medium text-red-800 px-8 py-2">
                    <p class="bg-red-100 whitespace-nowrap rounded-[5px] p-1">
                      0 so'm
                    </p>
                  </td>
                  <td class="text-center font-medium text-blue-800 px-8 py-2">
                    <button
                      @click="davomatToggle()"
                      :class="
                        davomat
                          ? 'bg-green-600 rounded-lg w-24 py-2.5 text-white'
                          : 'hidden'
                      "
                    >
                      Keldi
                    </button>
                    <button
                      @click="davomatToggle()"
                      :class="
                        davomat
                          ? 'hidden'
                          : 'bg-red-600 rounded-lg w-24 py-2.5 text-white'
                      "
                    >
                      Kelmadi
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-show="store.PageProduct && store.error"
              class="w-full max-w-screen text-center p-20 text-2xl font-medium"
            >
              <h1>O'quvchilar ro'yhati bo'sh</h1>
            </div>
          </div>
          <nav
            v-if="!store.searchList.length"
            class="flex flex-row justify-between items-center md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <ul class="inline-flex items-stretch -space-x-px">
              <li
                :class="{
                  'pointer-events-none opacity-50': store.page[0] == 1,
                }"
                @click="
                  store.pagination -= 1;
                  getProduct(store.pagination);
                "
                href="#"
                class="flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm py-2 sm:mt-0 -mt-2 px-6 rounded-lg leading-tight"
              >
                Oldingi
              </li>
            </ul>
            <span class="text-sm font-normal">
              Sahifa
              <span class="font-semibold"
                ><span>{{ store.page[0] * 10 - 9 }}</span> -
                <span v-if="store.page[0] * 10 < store.page[1]">{{
                  store.page[0] * 10
                }}</span
                ><span v-else>{{ store.page[1] }}</span></span
              >
              dan
              <span class="font-semibold">{{ store.page[1] }}</span>
            </span>
            <ul class="inline-flex items-stretch -space-x-px">
              <li
                :class="{
                  'pointer-events-none opacity-50':
                    store.page[0] * 10 >= store.page[1],
                }"
                @click="
                  store.pagination += 1;
                  getProduct(store.pagination);
                "
                href="#"
                class="flex font-bold text-black border-2 bg-white hover:bg-gray-300 items-center justify-center text-sm py-2 sm:mt-0 -mt-2 px-6 rounded-lg leading-tight"
              >
                Keyingi
              </li>
            </ul>
          </nav>
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
