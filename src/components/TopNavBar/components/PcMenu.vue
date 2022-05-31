<template >
    <div class="menu">
        <ul class="menu-list">
            <li @click="$router.push('/index')">
                <a>首页</a>
                <span>Index</span>
            </li>
            <li @click="$router.push('/index/articlelist')">
                <a>文章</a>
                <span>Article</span>
            </li>
            <li @click="$router.push('/index/messageboard')">
                <a>留言板</a>
                <span>Message</span>
            </li>
            <li @click="$router.push('/index/anime')">
                <a>动漫</a>
                <span>Anime</span>
            </li>
            <li @click="$router.push('/index/edit')">
                <a>我也要写</a>
                <span>Edit</span>
            </li>
        </ul>
    </div>
</template>
<style lang="less" scoped>
@media screen and(min-width: 320px) {

    // 导航栏样式
    .menu {
        display: none;
        justify-content: start;
        font-size: 1.5rem;
        font-family: '幼圆';
        flex: 1;

        .menu-list {
            display: flex;
            color: black;

            li {
                padding: 1rem;
                transition: all ease 0.4s;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;

                a {
                    font-weight: 600;
                }

                span {
                    font-family: 'Cartoonfont', 'Microsoft';
                    font-size: 1.2rem;
                }

                &:hover {
                    text-shadow: 1px 1px 10px rgb(255, 80, 124);
                }
            }
        }
    }
}
@media screen and(min-width:992px) {
    .menu {
        display: flex;
        .menu-list {
          display: flex;
          color: rgb(10, 10, 10);
        }
      }
}
</style>