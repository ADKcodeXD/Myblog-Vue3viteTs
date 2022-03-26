<template>
  <div
    class="
      rating
      tw-p-3 tw-mt-3 tw-bg-slate-600 tw-relative
      md:tw-mt-0 md:tw-ml-4 md:tw-rounded-lg md:tw-drop-shadow-md
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
      评分box
    </p>
    <div class="watch tw-flex tw-justify-evenly tw-my-3">
      <p>想看</p>
      <p>看过</p>
      <p>在看</p>
      <p>搁置</p>
      <p>抛弃</p>
    </div>
    <div
      class="
        tw-flex
        tw-w-full
        tw-mt-3
        tw-flex-col
        tw-absolute
        tw-z-10
        tw-top-20%
        tw-ml-3
      "
    >
      <p class="tw-text-3xl tw-text-white tw-font-bold">
        评分:{{ animeDetail?.rating.score }}
        <span
          v-if="animeDetail?.rating.score"
          class="
            tw-bg-white tw-px-2 tw-text-xs tw-text-orange-500 tw-rounded-full
          "
        >
          {{ tags }}
        </span>
      </p>
      <p class="tw-text-xs tw-text-orange-100">
        评分人数:{{ animeDetail?.rating.total }}
      </p>
    </div>
    <div
      class="rating tw-mt-5 tw-bg-slate-600"
      ref="echartRating"
      id="raitingChart"
    ></div>
  </div>
</template>


<script lang="ts">
import { defineComponent, PropType } from "vue";
import * as echarts from "echarts";
import { AnimeDeatilItem } from "@/interface/bangumiApi.type";
export default defineComponent({
  props: {
    animeDetail: {
      type: Object as PropType<AnimeDeatilItem>,
      require: true,
    },
  },
  setup(props) {
    let ratingChart:echarts.ECharts;
    onMounted(() => {
      let countValue = props.animeDetail?.rating.count;
      let chartValue = [];
      for (let i in countValue) {
        chartValue.push(countValue[i]);
      }
      let domRating = document.getElementById("raitingChart");
      if (domRating != null) {
        ratingChart = echarts.init(domRating);
        const option = {
          grid: {
            left: "10%",
            top: "20%",
            right: "10%",
            bottom: "10%",
          },
          xAxis: {
            type: "category",
            data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff", //更改坐标轴文字颜色
                fontSize: 14, //更改坐标轴文字大小
              },
            },
          },
          yAxis: {
            type: "value",
            show: false,
          },
          tooltip: {
            triggerOn: "click",
            padding: 10,
            formatter: "{b}分<br/>人数:{c}",
          },
          series: [
            {
              data: chartValue,
              type: "bar",
              barBorderRadius: 5,
              itemStyle: {
                normal: {
                  color: "#ff99cc",
                },
              },
              label: {
                show: true,
                formatter: "{c}",
                position: "top",
                distance: 10,
                textStyle: {
                  color: "#fff",
                },
              },
            },
          ],
          padding: 0,
          backgroundColor: "transparent",
        };
        ratingChart.setOption(option);
      } else {
        return;
      }
    });

    let tags = computed<String>(() => {
      let tag = "";
      if (props.animeDetail?.rating && props.animeDetail?.rating.score) {
        if (props.animeDetail.rating.score >= 8.5) {
          tag = "神作";
        } else if (
          props.animeDetail.rating.score < 8.5 &&
          props.animeDetail.rating.score >= 7.5
        ) {
          tag = "不可多得";
        } else if (
          props.animeDetail.rating.score < 7.5 &&
          props.animeDetail.rating.score >= 6.5
        ) {
          tag = "佳作";
        } else if (
          props.animeDetail.rating.score < 6.5 &&
          props.animeDetail.rating.score >= 5.5
        ) {
          tag = "还算可以";
        } else if (
          props.animeDetail.rating.score < 5.5 &&
          props.animeDetail.rating.score >= 4.5
        ) {
          tag = "勉强能看";
        } else if (
          props.animeDetail.rating.score < 4.5 &&
          props.animeDetail.rating.score >= 3.5
        ) {
          tag = "厕所消遣";
        } else if (props.animeDetail.rating.score < 3.5) {
          tag = "图一乐";
        } else {
          tag = "暂无数据";
        }
      } else {
        tag = "暂无数据";
      }
      return tag;
    });
    
    onBeforeUnmount(()=>{
      ratingChart.clear();
    })
    return {
      tags,
    };
  },
});
</script>


<style lang="less" scoped>
#raitingChart {
  height: 22rem;
}
.watch {
  background-color: rgb(255, 243, 243);
  border-radius: 5px;
  outline: 1px solid red;
  p {
    flex: 1;
    text-align: center;
    &:hover {
      background-color: rgb(255, 120, 103);
    }
    .active {
      background-color: rgb(255, 7, 131);
    }
  }
}
</style>