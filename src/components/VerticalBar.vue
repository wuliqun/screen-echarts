<template>
  <div>
    <div>【服务资源占用比】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";

import { type VisualizationData } from "@/api";

const props = defineProps<{
  servers: VisualizationData["serverData"]["servers"];
}>();

const target = ref<HTMLDivElement>();
let chart: null | echarts.ECharts = null;
const options: echarts.EChartsOption = {
  yAxis: {
    show: false,
    type: "value", // 作为数据展示
    max: (value) => {
      return Math.round(value.max * 1.2);
    },
  },
  xAxis: {
    type: "category",
    data: [],
    inverse: true,
    // 不展示线
    axisLine: { show: false },
    // 不展示刻度
    axisTick: { show: false },
    axisLabel: {
      color: "#9eb1c8",
    },
  },
  // 图表绘制位置
  grid: {
    top: 16,
    right: 0,
    bottom: 25,
    left: -26,
    containLabel: true, // 包含标签
  },
  series: [
    {
      type: "bar",
      data: [],
      // showBackground: true,
      // backgroundStyle: { color: "rgba(180,180,180,.2)", borderRadius: 5 },
      itemStyle: {
        color: "#5d98ce",
        borderRadius: 5,
        shadowColor: "rgba(0,0,0,.3)",
        shadowBlur: 5,
      },
      barWidth: 20,
      label: {
        color: "#fff",
        show: true,
        position: "top",
        formatter: "{c}%",
      },
    },
  ],
};
function renderChart() {
  if (chart) {
    (<any>options).xAxis.data = props.servers.map((region) => region.name);
    (<any>options).series![0].data = props.servers;

    chart.setOption(options);
  }
}

onMounted(() => {
  chart = echarts.init(target.value!);
  renderChart();
});
watch(() => props.servers, renderChart);
</script>
