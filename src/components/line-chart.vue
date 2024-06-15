<template>
  <div ref="lineChartRef" :id="props.id" class="lineChart"></div>
</template>

<script setup>
import {ref, onMounted, toRaw} from "vue";
  import * as echarts from 'echarts'
  const props = defineProps(["id", "width", "height", "labels", "data", "range", "catalog"])

  const range = toRaw(props.range)
  console.log()

  const options = {
    grid: {
      left: "2%",
      right: "2%",
      bottom: "10%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },

    xAxis: [
      {
        data: props.labels,
        axisPointer: {
          type: "shadow",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        min: range[0][0],
        max: range[0][1],
        interval: Math.ceil((range[0][1]-range[0][0]))/5,
        axisLabel: {
          formatter: "{value} ",
        },
      },
      {
        type: "value",
        min: range[1][0],
        max: range[1][1],
        interval: Math.ceil((range[1][1]-range[1][0]))/5,
        axisLabel: {
          formatter: "{value}%",
        },
      },
    ],
    series: [
      {
        name: props.catalog[0],
        type: "bar",
        data: props.data[0],
        barWidth: 20,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#83bff6" },
            { offset: 0.5, color: "#188df0" },
            { offset: 1, color: "#188df0" },
          ]),
        },
      },
      {
        name: props.catalog[1],
        type: "bar",
        data: props.data[1],
        barWidth: 20,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#25d73c" },
            { offset: 0.5, color: "#1bc23d" },
            { offset: 1, color: "#179e61" },
          ]),
        },
      },
      {
        name: props.catalog[2],
        type: "line",
        yAxisIndex: 1,
        data: props.data[2],
        itemStyle: {
          color: "#67C23A",
        },
      },
      {
        name: props.catalog[3],
        type: "line",
        yAxisIndex: 1,
        data: props.data[3],
        itemStyle: {
          color: "#409EFF",
        },
      },
    ],
  };
  const lineChartRef = ref(null)

  onMounted(()=>{
    let dom = document.getElementById(props.id)
    let myChart = echarts.init(dom);
    myChart.setOption(options)
    window.addEventListener("resize", () => myChart.resize(), false);
  })
</script>
<style scoped>
.lineChart{
  height: v-bind(height);
  width: v-bind(width);
}
</style>