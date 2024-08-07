import { ref } from 'vue'
import { defineStore } from 'pinia'
import { h } from "vue";
import { ElNotification } from "element-plus";

export const useNotificationStore = defineStore('nptification', () => {
    const success = (message) => {
        if (typeof (message) === 'string') {
            message = [message]
        }
        for (let i of message) {
            setTimeout(() => {
                ElNotification({
                    title: "Success",
                    message: h("b", { style: "color: green;" }, i),
                    customClass: "background: black;",
                    type: "success",
                });
            }, 1)
        }
    };

    const warning = (message) => {
        if (typeof (message) === 'string') {
            message = [message]
        }
        for (let i of message) {
            setTimeout(() => {
                ElNotification({
                    title: "Warning",
                    message: h("b", { style: "color: #e6a23c;" }, i),
                    type: "warning",
                });
            }, 1)
        }
    };

    const error = (message) => {
        for (let i of message) {
            setTimeout(() => {
                ElNotification({
                    title: "Error",
                    message: i,
                    type: "error",
                });
            }, 1)
        }
    };

    return { success, warning, error };
})
