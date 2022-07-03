<template>
  <div class="rating">
    <p class="rating-title">评分分布</p>
    <div class="rating-score">
      <p class="rating-score-title">
        评分:{{ animeDetail?.rating.score }}
        <span v-if="animeDetail?.rating.score" class="tag">
          {{ ratingTag }}
        </span>
      </p>
      <p class="total">评分人数:{{ animeDetail?.rating.total }}</p>
    </div>
    <div ref="echartRating" id="raitingChart"></div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import * as echarts from 'echarts';
import { useRatingTag } from '@/hooks/Bangumi';
import { useGlobalConfigStore } from '@/store/globalConfig';

const props = defineProps({
  animeDetail: {
    type: Object as PropType<Bangumi.AnimeDeatilItem>,
    require: true
  }
});
let ratingChart: echarts.ECharts;

const global = useGlobalConfigStore();
onMounted(() => {
  const countValue = props.animeDetail?.rating.count;
  const chartValue = [];
  for (let i in countValue) {
    chartValue.push(countValue[i]);
  }
  let domRating = document.getElementById('raitingChart');
  if (domRating != null) {
    ratingChart = echarts.init(domRating);
    const option = {
      grid: {
        bottom: '10%'
      },
      xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        axisLabel: {
          show: true,
          textStyle: {
            color: global.config.textColor, //更改坐标轴文字颜色
            fontSize: 14 //更改坐标轴文字大小
          }
        }
      },
      yAxis: {
        type: 'value',
        show: false
      },
      tooltip: {
        triggerOn: 'click',
        padding: 10,
        formatter: '{b}分<br/>人数:{c}'
      },
      series: [
        {
          data: chartValue,
          type: 'bar',
          itemStyle: {
            normal: {
              barBorderRadius: 20,
              color: global.config.themeColor
            }
          },
          label: {
            show: true,
            formatter: '{c}',
            position: 'top',
            distance: 10,
            textStyle: {
              color: global.config.textColor
            }
          }
        }
      ],
      padding: 0,
      backgroundColor: 'transparent'
    };
    ratingChart.setOption(option);
  } else {
    return;
  }
});
const { ratingTag } = useRatingTag(props.animeDetail?.rating?.score || 0);
onBeforeUnmount(() => {
  if (ratingChart) ratingChart.clear();
});
</script>

<style lang="less" scoped>
@import url(./styles/RataingBox.less);
</style>
