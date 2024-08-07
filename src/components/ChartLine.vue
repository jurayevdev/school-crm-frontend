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
      options: {
        theme: "light2",
        exportEnabled: true,
        title: {
          text: "Overview",
          horizontalAlign: "left",
          fontSize: 16,
          padding: 5,
        },
        toolTip: {
          shared: true,
        },
        responsive: true,
        legend: {
          cursor: "pointer",
          itemclick: function (e) {
            if (
              typeof e.dataSeries.visible === "undefined" ||
              e.dataSeries.visible
            ) {
              e.dataSeries.visible = false;
            } else {
              e.dataSeries.visible = true;
            }
            e.chart.render();
          },
        },
        data: [
          {
            type: "line",
            name: "United Kingdom",
            showInLegend: true,
            color: "rgb(12, 44, 220)",
            toolTipContent:
              '<img src="https://canvasjs.com/wp-content/uploads/images/gallery/javascript-column-bar-charts/germany.png" style="height:11px;width:18px;"> {name}: {y}',
            dataPoints: [
              { label: "2014", y: 20 },
              { label: "2015", y: 30 },
              { label: "2016", y: 25 },
              { label: "2017", y: 56 },
              { label: "2018", y: 72 },
              { label: "2019", y: 10 },
            ],
          },
          {
            type: "line",
            name: "United Kingdom",
            showInLegend: true,
            color: "#70C4CF",
            toolTipContent:
              '<img src="https://canvasjs.com/wp-content/uploads/images/gallery/javascript-column-bar-charts/uk.png" style="height:11px;width:18px;"> {name}: {y}',
            dataPoints: [
              { label: "2014", y: 50 },
              { label: "2015", y: 70 },
              { label: "2016", y: 60 },
              { label: "2017", y: 50 },
              { label: "2018", y: 40 },
              { label: "2018", y: 30 },
              { label: "2019", y: 20 },
              { label: "2019", y: 0 },
            ],
          },
        ],
      },
      darkOptions: {
        theme: "light2",
        backgroundColor: "#1e293b",
        exportEnabled: true,
        responsive: true,
        title: {
          text: "Overview",
          horizontalAlign: "left",
          fontColor: "#FFFFFF",
          fontSize: 16,
          padding: 5,
        },
        axisY: {
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
        legend: {
          cursor: "pointer",
          itemclick: function (e) {
            if (
              typeof e.dataSeries.visible === "undefined" ||
              e.dataSeries.visible
            ) {
              e.dataSeries.visible = false;
            } else {
              e.dataSeries.visible = true;
            }
            e.chart.render();
          },
        },
        data: [
          {
            type: "line",
            name: "United Kingdom",
            showInLegend: true,
            color: "rgb(12, 44, 220)",
            toolTipContent:
              '<img src="https://canvasjs.com/wp-content/uploads/images/gallery/javascript-column-bar-charts/germany.png" style="height:11px;width:18px;"> {name}: {y}',
            dataPoints: [
              { label: "2014", y: 20 },
              { label: "2015", y: 30 },
              { label: "2016", y: 25 },
              { label: "2017", y: 56 },
              { label: "2018", y: 72 },
              { label: "2019", y: 10 },
            ],
          },
          {
            type: "line",
            name: "United Kingdom",
            showInLegend: true,
            color: "#70C4CF",
            toolTipContent:
              '<img src="https://canvasjs.com/wp-content/uploads/images/gallery/javascript-column-bar-charts/uk.png" style="height:11px;width:18px;"> {name}: {y}',
            dataPoints: [
              { label: "2014", y: 50 },
              { label: "2015", y: 70 },
              { label: "2016", y: 60 },
              { label: "2017", y: 50 },
              { label: "2018", y: 40 },
              { label: "2018", y: 30 },
              { label: "2019", y: 20 },
              { label: "2019", y: 0 },
            ],
          },
        ],
      },
      styleOptions: {
        lineHeight: "50px",
        width: "100%",
        height: "100%",
      },
    };
  },
};
</script>
<template>
  <div>
    <CanvasJSChart v-show="!navbar.userNav" :options="options" :styles="styleOptions" />
    <CanvasJSChart v-show="navbar.userNav" :options="darkOptions" :styles="styleOptions" />
  </div>
</template>