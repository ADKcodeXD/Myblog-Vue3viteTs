<template >
    <div class="sub-title">
      <div class="content">
        <div class="icon">
          <div >
            <img src="@/assets/img/logo-icon.png"/>
          </div>
          <p>
              <slot></slot>
          </p>
        </div>
        <p class="right">
            <!-- 右侧小文字 -->
            <slot name="right"></slot>
        </p>
      </div>
    </div>
</template>
<style lang="less" scoped>
    .sub-title{
          .font-ura();
          display: flex;
          flex-direction: column;
          margin: @margin-general 0;
          padding:@padding-general @padding-general 0 @padding-general ;
          border-radius: @border-radius @border-radius 0 0;
          font-size: @very-big-text;
          background-color: @bgColor;
          .content{
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            .icon{
              display: flex;
              align-items: flex-end;
              img{
                width: 3rem;
                height: auto;
              }
            }
            .right{
              font-size: @mid-text;
            }
          }
          &::after{
            content: '';
            display: block;
            width: 100%;
            margin-top: @margin-general;
            height: 5px;
            border-radius: 999px;
            background-color: @themeColor;
          }
        }
</style>