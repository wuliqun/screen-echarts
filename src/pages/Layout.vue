<template>
  <div class="flex-1 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
    <HorizontalBar
      class="h-1/3 box-border pb-4"
      :regions="data.regionData.regions"
    />

    <RadarBar class="h-1/3 box-border pb-4" :risks="data.riskData.risks" />

    <Relation class="h-1/3" :relations="data.relationData.relations" />
  </div>
  <div class="w-1/2 mx-5 flex flex-col">
    <TotalData class="bg-opacity-50 bg-slate-800 p-3 mt-4" />

    <MapChart class="bg-opacity-50 bg-slate-800 p-3 flex-1" />
  </div>
  <div class="flex-1 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
    <!-- 竖向柱状图 -->
    <VerticalBar
      class="h-1/3 box-border pb-4"
      :servers="data.serverData.servers"
    />
    <!-- 环形图 -->
    <RingBar
      class="h-1/3 box-border pb-4"
      :abnormals="data.abnormalData.abnormals"
    />
    <!-- 数据云图 -->
    <WordCloud class="h-1/3" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";

import HorizontalBar from "@/components/HorizontalBar.vue";
import RadarBar from "@/components/RadarBar.vue";
import Relation from "@/components/Relation.vue";

import TotalData from "@/components/TotalData.vue";
import MapChart from "@/components/MapChart.vue";

import VerticalBar from "@/components/VerticalBar.vue";
import RingBar from "@/components/RingBar.vue";
import WordCloud from "@/components/WordCloud.vue";

import { type VisualizationData, getVisualization } from "@/api";

function loadData() {
  return getVisualization();
}

const data = ref<VisualizationData>(await loadData());

const timer = setInterval(async () => {
  try {
    data.value = await loadData();
  } catch (e) {
    console.error(e);
  }
}, 5000);

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>
