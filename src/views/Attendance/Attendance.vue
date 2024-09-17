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
                  <span class="">Davomat qilish</span>
                </button>
                <button
                  id=""
                  type="submit"
                  class="flex items-center max-w-fit justify-center whitespace-nowrap text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5"
                >
                  <span class="">Davomat saqlash</span>
                </button>
              </div>
            </form>
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
                    class="text-center px-8 py-3 font-medium whitespace-nowrap"
                  >
                    <span>{{ i.full_name }}</span>
                  </th>
                  <td class="text-center font-medium px-8 py-2">
                    <p
                      :class="{
                        'bg-green-100 text-green-800':
                          i.paymentStatus.includes('to\'langan'),
                        'bg-red-100 text-red-800':
                          i.paymentStatus.includes('to\'lanmagan'),
                        'bg-yellow-100 text-yellow-800':
                          i.paymentStatus.includes('0 so\'m'),
                      }"
                      class="rounded-[5px] p-1"
                    >
                      {{ i.paymentStatus }}
                    </p>
                  </td>
                  <td class="text-center font-medium text-blue-800 px-8 py-2">
                    <button
                      @click="davomatToggle(i.id, false)"
                      :class="
                        davomat
                          ? 'bg-green-600 rounded-lg w-24 py-2.5 text-white'
                          : 'hidden'
                      "
                    >
                      Keldi
                    </button>
                    <button
                      @click="davomatToggle(i.id, true)"
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
              v-show="!store.allProducts"
              class="w-full max-w-screen text-center p-20 text-2xl font-medium"
            >
              <h1>Davomat ro'yhati bo'sh</h1>
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

const davomat = ref(true);
const davomatToggle = () => (davomat.value = !davomat.value);

const store = reactive({
  PageProduct: "",
  page: [],
  pagination: 1,
  allProducts: false,
  error: false,
  guard: "",
  group: "",
  filter: "",
  filter_show: false,
  searchList: [],
  student: [],
});

function cancelFunc() {
  form.full_name = "";
  form.payment = "";
  form.status = [];
}

// ----------------------------------- forms -----------------------------------
const form = reactive({
  full_name: "",
  payment: "",
  status: [],
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
    listStudent(store.allProducts)
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

const addAttendance = async (schoolId, studentId, status) => {
  try {
    await axios.post(
      `/attendance`,
      {
        school_id: schoolId,
        student_id: studentId,
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const listStudent = (all) => {
  for (let i in all) {
    let list = {
      id: i.id,
      status: true,
    };
    store.student.push(list);
  }
  console.log(store.student);
};

onMounted(() => {
  getGroup();
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
