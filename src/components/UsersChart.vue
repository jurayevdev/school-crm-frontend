<script>
import CanvasJSChart from "../assets/CanvasJSVueComponent.vue";
import { useNavStore } from "../stores/toggle";

export default {
  components: {
    CanvasJSChart,
  },
  data() {
    return {
      navbar: useNavStore(),
      chart: null,
      options: {
        animationEnabled: true,
        backgroundColor: "#FFF",
        exportEnabled: true,
        responsive: true,
        title: {
          text: "Number of Students",
          horizontalAlign: "left",
          fontSize: 16,
          padding: 5,
        },
        axisY2: {
          valueFormatString: "#,##0.##",
        },
        toolTip: {
          shared: true,
        },
        data: [
          {
            type: "column",
            name: "No of New Customers",
            color: "rgb(12, 44, 220)",
            dataPoints: [
              { label: "Jan", y: 30 },
              { label: "Feb", y: 70 },
              { label: "Mar", y: 81 },
              { label: "Apr", y: 93 },
              { label: "May", y: 104 },
              { label: "Jun", y: 97 },
              { label: "Jul", y: 170 },
              { label: "Aug", y: 190 },
              { label: "Sep", y: 350 },
              { label: "Oct", y: 410 },
              { label: "Nov", y: 485 },
              { label: "Dec", y: 550 },
            ],
          },
          {
            type: "line",
            axisYType: "secondary",
            name: "Revenue",
            color: "rgb(12, 44, 220)",
            dataPoints: [
              { label: "Jan", y: 100000 },
              { label: "Feb", y: 142000 },
              { label: "Mar", y: 165000 },
              { label: "Apr", y: 198000 },
              { label: "May", y: 164000 },
              { label: "Jun", y: 151000 },
              { label: "Jul", y: 172000 },
              { label: "Aug", y: 235000 },
              { label: "Sep", y: 246000 },
              { label: "Oct", y: 275000 },
              { label: "Nov", y: 310000 },
              { label: "Dec", y: 345000 },
            ],
          },
        ],
      },
      darkOptions: {
        animationEnabled: true,
        backgroundColor: "#1e293b",
        exportEnabled: true,
        responsive: true,
        title: {
          text: "Number of Students",
          horizontalAlign: "left",
          fontColor: '#FFFFFF',
          fontSize: 16,
          padding: 5,
        },
        axisY: {
          titleFontColor: "#FFFFFF",
          labelFontColor: "#FFFFFF",
          lineColor: "#FFFFFF",
          tickColor: "#FFFFFF",
        },
        axisY2: {
          valueFormatString: "#,##0.##",
          titleFontColor: "#FFFFFF",
          labelFontColor: "#FFFFFF",
          lineColor: "#FFFFFF",
          tickColor: "#FFFFFF",
        },
        axisX: {
          titleFontColor: "#FFFFFF",
          labelFontColor: "#FFFFFF",
          lineColor: "#FFFFFF",
          tickColor: "#FFFFFF",
        },
        toolTip: {
          shared: true,
        },
        data: [
          {
            type: "column",
            name: "No of New Customers",
            color: "rgb(12, 44, 220)",
            dataPoints: [
              { label: "Jan", y: 30 },
              { label: "Feb", y: 70 },
              { label: "Mar", y: 81 },
              { label: "Apr", y: 93 },
              { label: "May", y: 104 },
              { label: "Jun", y: 97 },
              { label: "Jul", y: 170 },
              { label: "Aug", y: 190 },
              { label: "Sep", y: 350 },
              { label: "Oct", y: 410 },
              { label: "Nov", y: 485 },
              { label: "Dec", y: 550 },
            ],
          },
          {
            type: "line",
            axisYType: "secondary",
            name: "Revenue",
            color: "rgb(12, 44, 220)",
            dataPoints: [
              { label: "Jan", y: 100000 },
              { label: "Feb", y: 142000 },
              { label: "Mar", y: 165000 },
              { label: "Apr", y: 198000 },
              { label: "May", y: 164000 },
              { label: "Jun", y: 151000 },
              { label: "Jul", y: 172000 },
              { label: "Aug", y: 235000 },
              { label: "Sep", y: 246000 },
              { label: "Oct", y: 275000 },
              { label: "Nov", y: 310000 },
              { label: "Dec", y: 345000 },
            ],
          },
        ],
      },
      styleOptions: {
        width: "100%",
        height: "100%",
        lineHeight: "50px",
      },
    };
  },
  methods: {
    chartInstance(chart) {
      this.chart = chart;
    },
  },
};
</script>
<template>
  <div>
    <CanvasJSChart v-show="!navbar.userNav" :options="options" :style="styleOptions" @chart-ref="chartInstance" />
    <CanvasJSChart v-show="navbar.userNav" :options="darkOptions" :style="styleOptions" @chart-ref="chartInstance" />
  </div>
</template>
