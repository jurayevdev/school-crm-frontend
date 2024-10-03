import { computed, onMounted, reactive } from "vue";
import axios from "../services/axios";
import { defineStore } from "pinia";

export const useInfoStore = defineStore("info", () => {
  const store = reactive({
    staff: 0,
    students: 0,
    groups: 0,
    payment: 0,
  });

  const getStatistics = async () => {
    try {
      const res = await axios.get(`/statistic/school/${localStorage.getItem("school_id")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      store.students = res.data.student_number;
      store.staff = res.data.employee_number;
      store.groups = res.data.group_number;
      store.payment = res.data.payment_sum;
    } catch (err) {
      console.error("Statistikani olishda xato:", err);
    }
  };

  const Staff = computed(() => store.staff);
  const Students = computed(() => store.students);
  const Groups = computed(() => store.groups);
  const Payment = computed(() => store.payment);

  onMounted(() => {
    getStatistics();
  });

  return {
    Staff,
    Students,
    Groups,
    Payment,
    getStatistics,
  };
});
