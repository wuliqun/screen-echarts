<template>
  <div>
    <div>【数据传递关系图】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import * as echarts from "echarts";

import { type VisualizationData } from "@/api";

const props = defineProps<{
  relations: VisualizationData["relationData"]["relations"];
}>();

const target = ref<HTMLDivElement>();
let chart: null | echarts.ECharts = null;

const options: echarts.EChartsOption = {
  // X轴展示数据
  xAxis: {
    show: false,
    type: "value",
  },
  // y轴展示数据
  yAxis: {
    show: false,
    type: "value",
  },
  series: [
    {
      type: "graph",
      // 布局类型
      layout: "none",
      // 二维直角坐标系
      coordinateSystem: "cartesian2d",
      symbolSize: 26,
      z: 3,
      edgeLabel: {
        show: true,
        color: "#fff",
        fontSize: 14,
        formatter: function (params: any) {
          return params.data.speed;
        },
      },
      label: {
        show: true,
        position: "bottom",
        color: "#5e5e5e",
      },
      // 线条末端
      edgeSymbol: ["none", "arrow"],
      edgeSymbolSize: 8,
    },
    // 动态的线
    {
      type: "lines",
      coordinateSystem: "cartesian2d",
      z: 2,
      // 线特效
      effect: {
        show: true,
        trailLength: 0,
        symbol: "pin",
        color: "rgba(55,155,255,0.6)",
        symbolSize: 8,
      },
      lineStyle: {
        curveness: 0.2,
      },
    },
  ],
};

function renderChart() {
  if (chart) {
    (<any>options).series[0].data = getSeriesData();
    (<any>options).series[0].links = getSeriesLinks();
    (<any>options).series[1].data = getSeriesLinesData();

    chart.setOption(options);
  }
}

function getSeriesData() {
  return props.relations.map(({ speed, id, value, name }) => {
    if (id !== 0) {
      return {
        name,
        value,
        category: 0,
        active: true,
        speed: `${speed}kb/s`,
      };
    } else {
      return {
        name,
        value,
        symbolSize: 100,
        itemStyle: {
          color: {
            colorStops: [
              {
                offset: 0,
                color: "#157eff",
              },
              {
                offset: 1,
                color: "#35c2ff",
              },
            ],
          },
        },
        label: {
          fontSize: 14,
        },
      };
    }
  });
}

function getSeriesLinks() {
  return props.relations.map(({ source, target, name, speed }) => ({
    source,
    target,
    z: 2,
    speed: `${speed}kb/s`,
    lineStyle: {
      color: "#12b5d0",
      // 连接线曲度
      curveness: 0.2,
    },
    label: {
      show: true,
      position: "middle",
      fontSize: 12,
      offset: target === name ? [20, 0] : void 0, // 偏移
    },
  }));
}

function getSeriesLinesData() {
  const data: any = [];
  const root = props.relations.find((item) => item.id === 0)!;
  props.relations.forEach((relation) => {
    if (relation !== root) {
      if (relation.target === root.name) {
        data.push({
          coords: [relation.value, root.value],
        });
      } else if (root.name === relation.source) {
        data.push({
          coords: [root.value, relation.value],
        });
      }
    }
  });
  return data;
}

onMounted(() => {
  chart = echarts.init(target.value!);
  renderChart();
});
watch(() => props.relations, renderChart);
</script>
