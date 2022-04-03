<template>
  <div
    class="
      boxcard
      tw-bg-slate-500 tw-text-white tw-p-3 tw-mt-3
      md:tw-ml-4 md:tw-rounded-lg md:tw-drop-shadow-md
    "
  >
    <p
      class="
        pinkbox
        tw-p-3
        tw-bg-pink-500
        tw-w-36
        tw-font-bold
        tw-text-2xl
        tw-text-white
        tw-rounded-full
        tw-text-center
      "
    >
      观看状态
    </p>
    <div class="tw-text-2xl tw-font-bold tw-m-3">
      在看人数:{{ collectionData?.doing }}
    </div>
    <div id="collectionCharts"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import * as echarts from "echarts";
import { Collection } from "@/interface/bangumiApi.type";
import { CollectionType } from "@/interface/BangumiEnum";
export default defineComponent({
  props: {
    collectionData: {
      type: Object as PropType<Collection>,
      require: true,
    },
  },
  setup(props) {
    let collectionChart:any;
    onMounted(() => {
      let domEl:HTMLElement|null = document.getElementById("collectionCharts");
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
          },
          legend: {
            top: "center",
            orient: "vertical",
            left: "0",
            textStyle: {
              color: "#fff",
            },
          },
          series: [
            {
              name: "观看分布",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              label: {
                formatter: "{b}:{c}",
                color: "#fff",
                fontWeight: "bold",
              },
              left: "20%",
              labelLine: {
                show: true,
              },
              itemStyle: {
                normal: {
                  color: function (params: { dataIndex: string | number }) {
                    //自定义颜色
                    var colorList = [
                      "#CE6693",
                      "#39C08F",
                      "#FF8328",
                      "#943160",
                      "#3C4856",
                    ];
                    return colorList[params.dataIndex];
                  },
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

    onBeforeUnmount(()=>{
      if(collectionChart)
        collectionChart.clear();
    })
  },
});
</script>


<style lang="less" scoped>
#collectionCharts {
  height: 22rem;
}
</style>