import { computed, onMounted, reactive, ref } from "vue";
import axios from "../services/axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();

export const useInfoStore = defineStore("info", () => {
  const store = reactive({
    staff: 0,
    students: 0,
    subjects: 0,
    groups: 0,
    payment: 0,
  });

  const getStaff = () => {
    axios
      .get(`/employee/${localStorage.getItem("school_id")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        store.staff = res.data;
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message == "Invalid or expired token") {
          localStorage.removeItem("token");
          router.push("/login");
        }
      });
  };

  const getStudent = () => {
    axios
      .get(`/student/${localStorage.getItem("school_id")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        store.students = res.data;
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.message == "Invalid or expired token") {
          localStorage.removeItem("token");
          router.push("/login");
        }
      });
  };

  const getSubjects = () => {
    axios
      .get(`/subject/${localStorage.getItem("school_id")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        store.subjects = res.data;
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.message == "Invalid or expired token") {
          localStorage.removeItem("token");
          router.push("/login");
        }
      });
  };

  const getGroup = () => {
    axios
      .get(`/group/${localStorage.getItem("school_id")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        store.groups = res.data;
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.message == "Invalid or expired token") {
          localStorage.removeItem("token");
          router.push("/login");
        }
      });
  };

  const getPayment = () => {
    axios
      .get(`/payment/${localStorage.getItem("school_id")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        let sch = 0;
        const currentMonth = new Date().toLocaleString('default', { month: 'long' });
        const currentYear = new Date().getFullYear().toString();
        
        res.data.forEach(payment => {
          if (
            payment.month === currentMonth &&
            payment.year === currentYear
          ) {
            sch += payment.price;
          }
        });
  
        store.payment = sch;
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.message === "Invalid or expired token") {
          localStorage.removeItem("token");
          router.push("/login");
        }
      });
  };

  const Staff = computed(() => store.staff.length || 0);

  const Students = computed(() => store.students || 0);

  const Subjects = computed(() => store.subjects.length || 0);

  const Groups = computed(() => store.groups.length || 0);

  const Payment = computed(() => store.payment || 0);
  

  onMounted(() => {
    getStudent();
    getStaff();
    getGroup();
    getSubjects();
    getPayment();
  });

  return {
    Staff,
    Students,
    Subjects,
    Groups,
    Payment,
    getStaff,
    getStudent,
    getSubjects,
    getGroup,
    getPayment
  };
});
