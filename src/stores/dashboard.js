import { computed, onMounted, reactive, ref } from 'vue'
import axios from '../services/axios'
import { defineStore } from 'pinia'

export const useInfoStore = defineStore('info', () => {
    const store = reactive({
        staff: 0,
        students: 0,
        subjects: 0,
        groups: 0,
    })

    const getStaff = () => {
        axios
            .get("/staff", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then(res => {
                store.staff = res.data;
            }).catch(err => {
                console.log(err);
            });
    };

    const getStudent = () => {
        axios
            .get("/student", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                store.students = res.data;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getSubjects = () => {
        axios
            .get("/subject", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                store.subjects = res.data;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getGroup = () => {
        axios
            .get("/group", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                store.groups = res.data;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const Staff = computed(() => store.staff.length || 0)

    const Students = computed(() =>
        store.students || 0
    )

    const Subjects = computed(() => store.subjects.length || 0)

    const Groups = computed(() => store.groups.length || 0)

    onMounted(() => {
        getStudent()
        getStaff();
        getGroup();
        getSubjects();
    })

    return { Staff, Students, Subjects, Groups, getStaff, getStudent, getSubjects, getGroup };
})
