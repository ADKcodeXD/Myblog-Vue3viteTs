<template>
  <div class="boxcard">
    <p class="boxcard-title">
      观看分布
    </p>
    <div >
      在看人数:{{ collectionData?.doing }}
    </div>
    <div id="collectionCharts"></div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import * as echarts from "echarts";
import {CollectionType} from '@/interface/EnumExport';
import { useGlobalConfigStore } from "@/store/globalConfig";
const props = defineProps({
  collectionData: {
    type: Object as PropType<Bangumi.Collection>,
    require: true,
  },
});

let collectionChart: any;
const config=useGlobalConfigStore();
onMounted(() => {
  let domEl: HTMLElement | null = document.getElementById("collectionCharts");
  if (domEl) {
    echarts.init(domEl).dispose();
    collectionChart = echarts.init(domEl);
    collectionChart.clear();
    let data = [];
    for (let i in props.collectionData) {
      let temp = { value: 0, name: "" };
      temp["value"] = props.collectionData[i];
      temp["name"] = CollectionType[i];
      data.push(temp);
    }
    const option = {
      tooltip: {
        trigger: "item",
        show:false
      },
      legend: {
        left: "center",
        textStyle: {
          color: config.config.textColor,
        },
      },
      series: [
        {
          name: "观看分布",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show:false,
            formatter: "{b}:{c}",
            color: config.config.textColor,
            fontWeight: "bold",
            position:'center'
          },
          top:"10%",
          labelLine: {
            show: false,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold'
            }
          },
          itemStyle: {
            normal: {
              color: function (params: { dataIndex: string | number }) {
                //自定义颜色
                var colorList = [
                  "#f2cae8",
                  "#39C08F",
                  "#FF8328",
                  "#943160",
                  "#3C4856",
                ];
                return colorList[params.dataIndex];
              },
              borderRadius: 20,
              borderWidth: 5
            },
          },
          data: data,
        },
      ],
    };
    collectionChart.setOption(option);
    window.onresize = function () {
      collectionChart.resize();
    };
  }
});

onBeforeUnmount(() => {
  if (collectionChart)
    collectionChart.clear();
})
</script>


<style lang="less" scoped>
@import url(./styles/AnimeCollections.less);
</style>