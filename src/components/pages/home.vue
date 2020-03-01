<template>
    <div>
        <div class="header">
            <search></search>
        </div>
        <div class="content">
            <div class="yd-list" v-for="(item,index) in listdata" :key="index">
                <div class="title">
                    <i class="iconbg"></i><h1>{{item.name}}</h1>
                </div>
                <ul>
                    <li v-for="list in item.list" :key="list.id" @click="goDetail(list.id)">
                        <div class="proimg">
                            <img v-lazy="list.thumbnail" alt="">
                        </div>
                        <div class="price">
                            <span>￥{{list.reduct_price}}</span><del>￥{{list.stock}}</del>
                        </div>
                        <p>{{list.name}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import search from '../mycom/search'
import api from '../../api'
export default {
    data() {
        return {
            listdata:[],
        }
    },
    components:{
        search
    },
    mounted(){
        this.$axios({
            url:api.IndexData
        }).then(res=>{
            this.listdata = res.data.data
        }).catch(err=>{
            console.log(err)
        })
    },
    methods: {
        goDetail(i){
            this.$router.push('/commodity?id='+i)
        }
    },
}
</script>
<style lang="stylus" scoped>
    .header
        width 100%
        height 4.9rem
        background url(../../assets/img/home/index_banner.png)
        background-size 7.5rem 4.9rem
        overflow hidden
    .content
        width 100%
        padding-left 0.2rem
        padding-bottom 1.24rem
        background #fafafa
    .yd-list
        &:nth-child(2) .title .iconbg
            background-image url(../../assets/img/home/baby.png)
        &:nth-child(3) .title .iconbg
            background-image url(../../assets/img/home/meizhuang.png)
        &:nth-child(4) .title .iconbg
            background-image url(../../assets/img/home/furniture.png)
        &:nth-child(5) .title .iconbg
            background-image url(../../assets/img/home/food.png)
        &:nth-child(6) .title .iconbg
            background-image url(../../assets/img/home/airplane.png)
        .title
            height 0.95rem 
            display flex
            align-items center
            .iconbg
                width 0.35rem
                height 0.4rem
                background-image url(../../assets/img/home/hot.png)
                background-size 0.35rem 0.4rem
                margin-right 0.16rem
            h1
                font-size 0.28rem
        ul 
            overflow hidden
            li
                width 3.3rem
                height 4.7rem
                border 1px solid #ccc
                display flex
                flex-direction column
                padding: 0 0.2rem 0.2rem;
                background #fff
                float left
                &:nth-child(1)
                    margin-right: 0.49rem;
                .proimg 
                    width 100%
                    text-align center
                    img 
                        width 2.5rem
                        height 2.67rem
                        margin-top 0.5rem
                .price
                    line-height 0.5rem
                    span 
                        color red
                        font-size 0.28rem
                    del
                        font-size 0.24rem
                        color #666
                        float right
                p
                    font-size 0.26rem
                    display -webkit-box;
                    -webkit-box-orient vertical;
                    -webkit-line-clamp 2;
                    overflow hidden
                .one
                    width 100%
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
    
</style>