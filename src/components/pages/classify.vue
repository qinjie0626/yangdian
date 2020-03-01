<template>
  <div>
    <div class="containerbox">
        <van-row>
            <van-col span="24" class="header">
                <search></search>
            </van-col>
        </van-row>
        <van-row>
        <van-col span="7" class="crumbsnav">
            <ul class="clearfix">
                <li v-for="(item,index) in listdata" :key="index" :class='[num===index?"active":""]' @click='getdata(index)'>{{item.name}}</li>
            </ul>
        </van-col>
        <van-col span="17" class="prolist"  offset="7">
            <ul>
                <li v-for="item in nav" :key="item.id">
                    <img :src="item.thumbnail" alt="">
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </van-col>
        </van-row>
    </div>
  </div>
</template>
<script>
import search from '../mycom/search'
import api from '../../api'
export default {
    components:{
        search
    },
    data() {
        return {
            listdata:[],
            nav:[],
            num:0
        }
    },
    mounted(){
        this.$axios({
            url:api.getClassify
        }).then(res=>{
            this.listdata = res.data.data
            this.nav = res.data.data[0].list
        }).catch(err=>{
            console.log(err)
        })
    },
    methods: {
        getdata(i){
            this.num=i
            this.nav = this.listdata[i].list
        },
    },
};
</script>
<style lang="stylus" scoped>
.header
    height 1.08rem
    background #ff9900
.crumbsnav 
    position fixed
    left 0
    background #fafafa
    height 100%
    li
        height 0.94rem
        color #333333
        text-align center
        line-height 0.94rem
        position relative
    .active
        color #ff9900
        background #fff
    .active:before
        content ''
        position absolute
        left 0
        top 0
        width 0.1rem
        height 100%
        background #1d84a7
.prolist
    padding 0.2rem 0.2rem 0
    li
        position relative
        width 2.3rem
        height 2.4rem
        border 1px solid #1d84a7
        border-radius 0.08rem
        text-align center
        overflow hidden
        float left
        margin-bottom 0.2rem
        &:nth-child(2n-1)
            margin-right 0.2rem
        img 
            width 1.66rem
            height 1.73rem
            position absolute
            left 50%
            margin-left -0.83rem
            bottom 0.46rem
        p
            width 100%
            background #1d84a7
            position absolute
            bottom 0
            color #fff
            font-size 0.2rem
            height 0.46rem
            line-height 0.46rem

</style>