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
          font-family: 'urafont','幼圆';
          font-weight: 600;
          display: flex;
          flex-direction: column;
          margin: 1.5rem 0;
          font-size: 2rem;
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
              font-size: 1rem;
            }
          }
          &::after{
            content: '';
            display: block;
            width: 100%;
            margin-top: 5px;
            height: 5px;
            border-radius: 999px;
            background-color: rgb(255, 22, 61);
          }
        }
</style>