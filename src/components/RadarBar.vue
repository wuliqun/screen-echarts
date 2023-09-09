<template>
  <div>
    <div>【云端报警风险】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";

import { type VisualizationData } from "@/api";

const props = defineProps<{
  risks: VisualizationData["riskData"]["risks"];
}>();

const target = ref<HTMLDivElement>();
let chart: null | echarts.ECharts = null;
const options: echarts.EChartsOption = {
  // 坐标系配置
  radar: {
    shape: "polygon",
    axisName: {
      color: "#05d5ff",
      fontSize: 14,
    },
    // 雷达图位置
    center: ["50%", "50%"],
    // 雷达图半径
    radius: "70%",
    startAngle: 120,
    // 坐标线
    axisLine: {
      lineStyle: {
        color: "rgba(5,213,255,.2)",
      },
    },
    // 网格线
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(5,213,255,.2)",
        width: 1,
      },
    },
    indicator: [],
    // 不拆分区域  拆分的话网格线内 会有阴影
    splitArea: {
      show: false,
    },
  },
  // 极点  会在图上画圆
  polar: {
    center: ["50%", "50%"],
    radius: "0%",
  },
  // 角度
  angleAxis: {
    min: 0,
    interval: 5,
    clockwise: false,
  },
  // 径向轴
  radiusAxis: {
    min: 0,
    interval: 20,
    splitLine: {
      show: false,
    },
  },
  series: [
    {
      type: "radar",
      symbol: "circle",
      // 圆点大小
      symbolSize: 5,

      itemStyle: {
        color: "#05d5ff",
        // opacity: 0.5,
      },
      areaStyle: {
        color: "#05d5ff",
        opacity: 0.3,
      },
      lineStyle: {
        width: 1,
        color: "#05d5ff",
      },
      // 数字值
      label: {
        show: true,
        color: "#fff",
      },
      data: [],
    },
  ],
};
function renderChart() {
  if (chart) {
    (<any>options).radar.indicator = props.risks.map((risk) => ({
      name: risk.name,
      max: 100,
    }));
    (<any>options).series[0].data[0] = props.risks.map((risk) => risk.value);

    chart.setOption(options);
  }
}

onMounted(() => {
  chart = echarts.init(target.value!);
  renderChart();
});
watch(() => props.risks, renderChart);
</script>
