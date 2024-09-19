<template>
  <div @click="store.filter_show = false" class="px-2">
    <!-- ----------------------------------------- EMPLYE TABLE  ------------------------------------------------- -->

    <section class="pt-4">
      <!------------------------------------------- Search ------------------------------------------->
      <div v-show="!store.PageProduct">
        <Placeholder2 />
      </div>
      <!------------------------------------------- Search ------------------------------------------->

      <div
        v-show="modal"
        :class="
          modal
            ? 'absolute overflow-y-auto flex bg-[rgba(0,0,0,0.5)] overflow-x-hidden z-50 justify-center items-center w-full inset-0 h-full'
            : 'hidden'
        "
      >
        <div class="relative p-4 w-full max-w-3xl h-auto">
          <!-- Modal content -->
          <div
            class="relative p-4 rounded-lg shadow sm:p-5"
            :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
          >
            <!-- Modal header -->
            <div
              class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5"
            >
              <h3
                class="text-lg"
                :class="navbar.userNav ? 'text-white' : 'text-black'"
              >
                To'lov qilish
              </h3>
              <button
                @click="toggleModal"
                type="button"
                class="bg-transparent hover:bg-gray-200 hover rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                :class="{ 'text-white': navbar.userNav }"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->
            <form
              @submit.prevent="addPayment"
              :class="{ darkForm: navbar.userNav }"
            >
              <div class="grid font-medium gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label for="year" class="block mb-2 text-sm"
                    >Yilni tanlang</label
                  >
                  <select
                    v-model="form.year"
                    id="name"
                    class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    required
                  >
                    <option value="" disabled selected>Yilni tanlang</option>
                    <option
                      v-for="i in store.curentYil"
                      :key="i.id"
                      :value="i.name"
                    >
                      {{ i.name }}
                    </option>
                  </select>
                </div>
                <div>
                  <label for="month" class="block mb-2 text-sm"
                    >Oyni tanlang</label
                  >
                  <select
                    v-model="form.month"
                    id="month"
                    class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    required
                  >
                    <option value="" disabled selected>Oyni tanlang</option>
                    <option value="01">Yanvar</option>
                    <option value="02">Fevral</option>
                    <option value="03">Mart</option>
                    <option value="04">Aprel</option>
                    <option value="05">May</option>
                    <option value="06">Iyun</option>
                    <option value="07">Iyul</option>
                    <option value="08">Avgust</option>
                    <option value="09">Sentabr</option>
                    <option value="10">Oktabr</option>
                    <option value="11">Noyabr</option>
                    <option value="12">Dekabr</option>
                  </select>
                </div>
                <div class="">
                  <label for="price" class="block mb-2 text-sm">Price</label>
                  <input
                    v-model="form.price"
                    type="number"
                    name="price"
                    id="price"
                    class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-3 p-2.5"
                    placeholder="To'lov sumani kiriting"
                    required
                  />
                </div>
                <div>
                  <label
                    for="name"
                    class="block mb-2 text-sm"
                    :class="navbar.userNav ? 'text-white' : 'text-black'"
                    >To'lov turi tanlang</label
                  >
                  <select
                    v-model="form.method"
                    id="name"
                    class="bg-white border text-black border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    required
                  >
                    <option value="" disabled selected>
                      To'lov turini tanlang
                    </option>
                    <option v-for="i in store.method" :key="i.id" :value="i.id">
                      {{ i.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div
                class="w-full flex items-center justify-between border-t pt-5 mt-5"
              >
                <button
                  @click="toggleModal"
                  type="button"
                  class="border inline-flex items-center bg-white hover:bg-red-700 hover:border-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  class="btnAdd text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  To'lash
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div v-show="store.PageProduct" class="w-full max-w-screen">
        <!-- Start coding here -->

        <!------------------------------------------- Search ------------------------------------------->
        <div
          class="shadow rounded-xl flex flex-col lg:flex-row items-center justify-between lg:space-x-4 p-4 gap-3 mb-4"
          :class="navbar.userNav ? 'bg-[#1e293b]' : 'bg-white'"
        >
          <h1 class="text-blue-700 font-bold text-lg w-full">To'lov</h1>
          <div class="w-full flex items-center lg:pb-0 pb-2 gap-5 justify-end">
            <form
              @submit.prevent="getOneProduct(form.group_id)"
              :class="{ darkForm: navbar.userNav }"
              class="lg:w-10/12 w-full flex items-center gap-5"
            >
              <select
                v-model="form.group_id"
                id="name"
                class="bg-white border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full py-1.5 pl-3"
                required
              >
                <option value="" disabled selected>Guruhni tanlang</option>
                <option v-for="i in store.group" :key="i.id" :value="i.id">
                  {{ i.name }}
                </option>
              </select>

              <div
                class="lg:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3"
              >
                <button
                  id=""
                  type="submit"
                  class="btnAdd flex items-center max-w-fit justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5"
                >
                  <span class="">To'lov qilish</span>
                </button>
                <!-- <button
                  id=""
                  type=""
                  class="btnAdd flex items-center max-w-fit justify-center whitespace-nowrap text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5"
                >
                  <span class="">To'lov tarixi</span>
                </button> -->
              </div>
            </form>
          </div>
        </div>
        <!------------------------------------------- Search ------------------------------------------->

        <div
          class="relative shadow-md rounded-lg overflow-hidden mb-20"
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
                  <th scope="col" class="text-center py-3">To'lov</th>
                </tr>
              </thead>
              <tbody v-if="!store.error">
                <tr
                  v-for="i in store.allProducts"
                  :key="i.id"
                  class="border-b"
                  :class="
                    navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  "
                >
                  <th
                    scope="row"
                    class="text-center px-8 py-4 font-medium whitespace-nowrap"
                  >
                    <span>{{ i.full_name }}</span>
                  </th>
                  <td class="text-center font-medium px-8 py-4">
                    <p
                    :class="{
                        'bg-green-100 text-green-800':
                          i.paymentStatus.includes('to\'langan'),
                        'bg-red-100 text-red-800':
                          i.paymentStatus.includes('to\'lanmagan'),
                        'bg-yellow-100 text-yellow-800':
                          i.paymentStatus.includes('0 so\'m')
                      }"
                      class="rounded-[5px] p-1"
                    >
                      {{ i.paymentStatus }}
                    </p>
                  </td>

                  <td class="text-center font-medium text-blue-800 px-8 py-4">
                    <button
                      @click="toggleModal(i.id)"
                      class="bg-green-600 rounded-lg py-2.5 px-5 text-white"
                    >
                      To'lov qilish
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              v-show="!store.allProducts"
              class="w-full max-w-screen text-center p-20 text-2xl font-medium"
            >
              <h1>To'lov ro'yhati bo'sh</h1>
            </div>
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
const hozirgiSana = new Date();
const hozirgiYil = String(hozirgiSana.getFullYear());
const orqaYil = hozirgiSana.getFullYear() - 2;
let hozirgiOy = hozirgiSana.getMonth() + 1;
hozirgiOy = hozirgiOy.toString().padStart(2, "0");

const store = reactive({
  PageProduct: "",
  page: [],
  pagination: 1,
  allProducts: false,
  error: false,
  guard: "",
  method: "",
  filter: "",
  filter_show: false,
  searchList: [],
  price: 0,
  date: "",
  curentYil: [],
});

const toggleModal = (id) => {
  modal.value = !modal.value;
  form.year = hozirgiYil;
  form.month = hozirgiOy;
  form.method = "";
  form.price = store.price;
  form.id = id;
};

function cancelFunc() {
  form.year = "";
  form.month = "";
  form.method = "";
  form.price = store.price;
  form.id = "";
  modal.value = false;
}

// ----------------------------------- forms -----------------------------------

const form = reactive({
  year: hozirgiYil,
  month: hozirgiOy,
  method: "",
  price: store.price,
  id: "",
  group_id: "",
});

// ----------------------------------- axios --------------------------------

const calculatePaymentStatus = (paymentHistory, groupPrice, groupStartDate) => {
  const startDate = new Date(groupStartDate);
  const currentDate = new Date();

  // Guruh ochilgan sanadan hozirgi kunga qadar oylar sonini hisoblash
  const monthsDiff =
    (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
    currentDate.getMonth() -
    startDate.getMonth() +
    1; // +1 agar to'liq hozirgi oyni hisobga olish kerak bo'lsa

  if (!paymentHistory || paymentHistory.length === 0) {
    return `(${groupPrice * monthsDiff}) so'm to'lanmagan`;
  }

  // To'lovlar ro'yxatini yaratish va to'lovlarni sanaga qarab guruhlash
  const paymentsByMonth = {};
  paymentHistory.forEach((payment) => {
    const paymentDate = new Date(payment.year, payment.month - 1); // JavaScriptda oy 0-11 bo'ladi
    const key = `${paymentDate.getFullYear()}-${paymentDate.getMonth() + 1}`;

    if (!paymentsByMonth[key]) {
      paymentsByMonth[key] = 0;
    }
    paymentsByMonth[key] += payment.price;
    // console.log(paymentsByMonth);
  });

  // To'lovlar amalga oshirilgan oylar va to'lanmagan oylar hisoblanadi
  let totalPaid = 0;
  let totalDue = 0;

  // Guruh ochilganidan hozirgi kungacha oylik to'lovlar
  for (let i = 0; i < monthsDiff; i++) {
    const monthDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + i
    );

    const key = `${monthDate.getFullYear()}-${monthDate.getMonth() + 1}`;

    const monthDue = groupPrice;

    const monthPaid = paymentsByMonth[key] || 0;

    totalDue += monthDue;
    totalPaid += monthPaid;
  }

  // To'lovlar sonini hisoblash
  const monthsPaid = Object.keys(paymentsByMonth).length;

  // Har bir oylik to'lov miqdorini hisoblash
  const averagePayment = (groupPrice * monthsDiff) / monthsPaid;

  // Qoldiq to'lov va qarzdorlikni hisoblash
  const expectedPayment = averagePayment * monthsPaid;
  const amountDue = totalDue - totalPaid;

  if (amountDue < 0) {
    return `(${Math.abs(amountDue)}) so'm ortiqcha to'langan`;
  } else if (amountDue === 0) {
    return "(0 so'm) hammasi to'langan";
  } else {
    return `(${amountDue}) so'm to'lanmagan`;
  }
};

const getOneProduct = async (id) => {
  try {
    const groupResponse = await axios.get(
      `/group/${localStorage.getItem("school_id")}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const groupPrice = Number(groupResponse.data.price);
    const groupStartDate = groupResponse.data.start_date;
    store.price = groupPrice;
    store.date = groupStartDate;
    form.group_id = id;

    if (!groupStartDate || isNaN(Date.parse(groupStartDate))) {
      throw new Error("Guruh ochilgan sana noto'g'ri");
    }

    const studentList = [];
    const studentPromises = groupResponse.data.student.map(async (student) => {
      const studentInfo = await axios.get(
        `/student/${localStorage.getItem("school_id")}/${student.student_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const payments = studentInfo.data.payment;
      const paymentsForGroup = payments.filter(
        (payment) => payment.group_id === form.group_id
      );

      studentInfo.data.paymentStatus = calculatePaymentStatus(
        paymentsForGroup,
        groupPrice,
        groupStartDate
      );
      return studentInfo.data;
    });

    for (const studentInfo of await Promise.all(studentPromises)) {
      studentList.push(studentInfo);
    }

    store.allProducts = studentList;
  } catch (error) {
    notification.warning(
      error.response?.data?.message || "Something went wrong"
    );
    console.log("error", error);
  }
};

const getGroup = () => {
  axios
    .get(`/group/${localStorage.getItem("school_id")}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.group = res.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const checkPayment = (year, month, groupStartDate) => {
  const paymentYear = parseInt(year, 10);
  const paymentMonth = parseInt(month, 10);

  const groupStart = new Date(groupStartDate);
  const groupStartYear = groupStart.getFullYear();
  const groupStartMonth = groupStart.getMonth() + 1;

  if (
    paymentYear < groupStartYear ||
    (paymentYear === groupStartYear && paymentMonth < groupStartMonth)
  ) {
    return false;
  } else {
    return true;
  }
};

const addPayment = () => {
  const data = {
    school_id: Number(localStorage.getItem("school_id")),
    student_id: form.id,
    group_id: Number(form.group_id),
    year: form.year,
    month: form.month,
    method_id: form.method,
    discount: 0,
    price: form.price,
  };

  const check = checkPayment(form.year, form.month, store.date);

  if (!check) {
    notification.warning("To'lov qilmoqchi bo'lgan sanada guruh boshlanmagan");
  } else {
    axios
      .post("/payment", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        cancelFunc();
        notification.success("To'lov qilindi!");
        getOneProduct(form.group_id);
      })
      .catch((error) => {
        console.log("error", error);
        notification.warning("Xatolik! To'lov qilinmadi");
      });
  }
};

const getMethod = () => {
  axios
    .get(`/payment-method/${localStorage.getItem("school_id")}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.method = res.data;
    })
    .catch((error) => {
      console.log("error", error);
    });
};

onMounted(() => {
  getGroup();
  getMethod();
  for (let i = 0; i < 5; i++) {
    let list = {
      id: i,
      name: String(orqaYil + i),
    };
    store.curentYil.push(list);
  }
  setTimeout(function () {
    store.PageProduct = true;
  }, 500);
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
