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
              </div>
            </form>
            <button
              id=""
              @click="addAttendance()"
              class="flex items-center max-w-fit justify-center whitespace-nowrap text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5"
            >
              <span class="">Davomat saqlash</span>
            </button>
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
                  <th scope="col" class="text-center py-3">Davomat</th>
                </tr>
              </thead>
              <tbody v-if="!store.error">
                <tr
                  v-for="i in store.allProducts"
                  :key="i.id"
                  class="border-b"
                  :class="navbar.userNav ? 'hover:bg-gray-700' : 'hover:bg-gray-50'"
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
                        'bg-green-100 text-green-800': i.paymentStatus.includes(
                          'to\'langan'
                        ),
                        'bg-red-100 text-red-800': i.paymentStatus.includes(
                          'to\'lanmagan'
                        ),
                        'bg-yellow-100 text-yellow-800': i.paymentStatus.includes(
                          '0 so\'m'
                        ),
                      }"
                      class="rounded-[5px] p-1"
                    >
                      {{ i.paymentStatus }}
                    </p>
                  </td>
                  <td class="text-center font-medium text-blue-800 px-8 py-4">
                    <button
                      @click="davomatToggle(i.id, false)"
                      :class="
                        getStudentStatus(i.id)
                          ? 'bg-green-600 rounded-lg w-24 py-2.5 text-white'
                          : 'hidden'
                      "
                    >
                      Keldi
                    </button>
                    <button
                      @click="davomatToggle(i.id, true)"
                      :class="
                        getStudentStatus(i.id)
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

const davomatToggle = (id, status) => {
  let student = store.student.find((s) => s.student_id === id);
  if (student) {
    student.status = status;
  }
};

const getStudentStatus = (id) => {
  let student = store.student.find((s) => s.student_id === id);
  return student ? student.status : false;
};

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
  status: false,
  attendance_id: 0,
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

const calculatePaymentStatus = (
  paymentHistory,
  groupPrice,
  groupStartDate,
  studentGroup
) => {
  const startDate = new Date(studentGroup[0].createdAt);
  const groupStart = new Date(groupStartDate);
  const currentDate = new Date();

  if (groupStart > currentDate) {
    store.btn_lamp = false;
    return "Guruh hali boshlanmagan";
  }
  store.btn_lamp = true;

  const monthsDiff =
    (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
    currentDate.getMonth() -
    startDate.getMonth() +
    1;

  if (!paymentHistory || paymentHistory.length === 0) {
    return `(${groupPrice * monthsDiff}) so'm to'lanmagan`;
  }

  const paymentsByMonth = {};
  paymentHistory.forEach((payment) => {
    const paymentDate = new Date(payment.year, payment.month - 1);
    const key = `${paymentDate.getFullYear()}-${paymentDate.getMonth() + 1}`;

    if (!paymentsByMonth[key]) {
      paymentsByMonth[key] = 0;
    }
    paymentsByMonth[key] += payment.price;
  });

  let totalPaid = 0;
  let totalDue = 0;

  for (let i = 0; i < monthsDiff; i++) {
    const monthDate = new Date(startDate.getFullYear(), startDate.getMonth() + i);

    const key = `${monthDate.getFullYear()}-${monthDate.getMonth() + 1}`;

    const monthDue = Number(groupPrice);
    const monthPaid = paymentsByMonth[key] || 0;

    totalDue += monthDue;
    totalPaid += monthPaid;
  }

  const monthsPaid = Object.keys(paymentsByMonth).length;

  const averagePayment = (groupPrice * monthsDiff) / monthsPaid;

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
        groupStartDate,
        studentInfo.data.group
      );
      return studentInfo.data;
    });

    for (const studentInfo of await Promise.all(studentPromises)) {
      studentList.push(studentInfo);
    }

    store.allProducts = studentList;
    listStudent(store.allProducts, form.group_id);
    if (store.status) {
      notification.warning("Bu guruhga oldin davomat qilingan");
    }
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const getGroup = () => {
  axios
    .get(`/group/${localStorage.getItem("school_id")}/find`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      store.group = res.data;
      store.PageProduct = res.data;
    })
    .catch((error) => {
      store.group = [{ name: "Guruh yaratilmagan" }];
    });
};

const addAttendance = () => {
  try {
    if (!store.status) {
      for (let i = 0; i < store.student.length; i++) {
        axios
          .post(`/attendance`, store.student[i], {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {})
          .catch((error) => {
            notification.warning(
              "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
            );
          });
      }
      notification.success("Davomat saqlandi");
    } else {
      for (let i = 0; i < store.student.length; i++) {
        axios
          .put(
            `/attendance/${store.student[i].school_id}/${store.student[i].attendance_id}`,
            store.student[i],
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {})
          .catch((error) => {
            notification.warning(
              "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
            );
          });
      }
      notification.success("Davomat saqlandi");
    }
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  } catch (error) {
    notification.warning(
      "Xatolik! Nimadir noto‘g‘ri. Internetni tekshirib qaytadan urinib ko‘ring!"
    );
  }
};

const checkAttendance = (attendanceData, studentID, groupID) => {
  const today = new Date().toISOString().split("T")[0];
  const attendanceRecord = attendanceData.find(
    (record) =>
      record.student_id === studentID &&
      record.group_id === groupID &&
      record.createdAt.split("T")[0] === today
  );
  if (attendanceRecord) {
    store.attendance_id = attendanceRecord.id;
    store.status = true;
  }
  return attendanceRecord ? attendanceRecord.status : true;
};

const listStudent = (allStudent, groupID) => {
  for (let i = 0; i < allStudent.length; i++) {
    let list = {
      school_id: Number(localStorage.getItem("school_id")),
      student_id: allStudent[i].id,
      group_id: groupID,
      status: checkAttendance(allStudent[i].attendance, allStudent[i].id, groupID),
      attendance_id: store.attendance_id,
    };
    store.student.push(list);
  }
};

onMounted(() => {
  getGroup();
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
