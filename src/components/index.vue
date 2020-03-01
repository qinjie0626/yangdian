<template>
    <div>
        <div class="container">
            <router-view></router-view>
        </div>
        <div class="navfooter">
            <div :class="[$route.path==item.path?'nav active':'nav']" v-for="item in navlist" :key="item.path" @click="getRouter(item.path)">
                <i></i>
                <p>首页</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            navlist:[
                {
                    path:'/home',
                    title:'首页'
                },
                {
                    path:'/classify',
                    title:'分类'
                },
                {
                    path:'/shoppingcar',
                    title:'购物车'
                },
                {
                    path:'/mycenter',
                    title:'个人中心'
                },
            ]
        }
    },
    methods:{
        getRouter(path){
            this.$router.push(path).catch(err=>err)
        }
    }
}
</script>
<style lang="stylus" scoped>
    .navfooter
        display flex
        width 100%
        height 1rem
        position fixed
        bottom 0
        border-top 1px solid #ccc
        background #fff
        .nav
            display flex
            flex-direction column
            justify-content center
            align-items center
            flex 1
            font-size 0.2rem
            i 
                width 0.43rem
                height 0.38rem
                background-size 0.43rem 0.38rem
            &:nth-child(1) i 
                    background-image url(../assets/img/home/tab_home_nor.png)
            &:nth-child(2) i 
                    background-image url(../assets/img/home/tab_menu_nor.png)
            &:nth-child(3) i 
                    background-image url(../assets/img/home/tab_shopping_nor.png)
            &:nth-child(4) i 
                    background-image url(../assets/img/home/tab_me_nor.png)
            &:nth-child(1).active 
                color #f90
                i 
                    background-image url(../assets/img/home/tab_home_hig.png)
            &:nth-child(2).active 
                color #f90
                i 
                    background-image url(../assets/img/home/tab_menu_hig.png)
            &:nth-child(3).active 
                color #f90
                i 
                    background-image url(../assets/img/home/tab_shopping_hig.png)

            &:nth-child(4).active 
                color #f90
                i 
                    background-image url(../assets/img/home/tab_me_hig.png)
</style>