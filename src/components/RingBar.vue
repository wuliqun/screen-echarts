<template>
  <div>
    <div>【大区异常处理】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";

import { type VisualizationData } from "@/api";

const props = defineProps<{
  abnormals: VisualizationData["abnormalData"]["abnormals"];
}>();

const target = ref<HTMLDivElement>();
let chart: null | echarts.ECharts = null;
const options: echarts.EChartsOption = {
  // 图例配置
  legend: {
    show: true,
    icon: "circle",
    top: "14%",
    left: "56%",
    data: [],
    width: -5,
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 6,
    textStyle: {
      fontSize: 12,
      lineHeight: 5,
      color: "#ffffff",
    },
  },
  // 提示层
  tooltip: {
    show: true,
    trigger: "item",
    formatter: "{a}<br>{c}({d}%)",
  },
  // Y轴
  yAxis: {
    show: false,
  },
  // X轴
  xAxis: {
    show: false,
  },
  // 核心配置
  series: [],
};
function renderChart() {
  if (chart) {
    (<any>options).legend.data = props.abnormals.map((ab) => ab.name);
    (<any>options).series = getSeriesData();

    chart.setOption(options);
  }
}
function getSeriesData() {
  const series: echarts.EChartsOption["series"] = [];
  props.abnormals.forEach((item, index) => {
    // 上层
    series.push({
      name: item.name,
      type: "pie",
      clockwise: false,
      emphasis: {
        scale: false,
      },
      radius: [73 - index * 15 + "%", 68 - index * 15 + "%"],
      center: ["55%", "55%"],
      label: {
        show: false,
      },
      data: [
        {
          value: item.value,
          name: item.name,
        },
        // 延伸到75%的背景
        {
          value: 1200 - item.value,
          itemStyle: {
            color: "rgba(0,0,0,.2)",
            borderWidth: 0,
          },
          emphasis: { scale: false },
          tooltip: {
            show: false,
          },
          cursor: "default",
        } as any,
        // 最后25%透明
        {
          value: 400,
          itemStyle: {
            color: "rgba(0,0,0,0)",
            borderWidth: 0,
          },
          emphasis: { scale: false },
          tooltip: {
            show: false,
          },
          cursor: "default",
        } as any,
      ],
    });
  });
  return series;
}

onMounted(() => {
  chart = echarts.init(target.value!);
  renderChart();
});
watch(() => props.abnormals, renderChart);
</script>
