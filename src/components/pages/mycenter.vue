<template>
    <div>
        <div class="containerbox">
            <div class="header" :style="{backgroundImage:(bgimg?`url(${bgimg})`:'')}">
                <div class="title">
                    <i></i>
                    <h1>个人中心</h1>
                    <i class="message">
                        <span class="redbox" v-if="flag">5+</span>
                    </i>
                </div>
                <div class="headerimg" @click="login">
                    <div class="box">
                        <img :src="img" alt="">
                    </div>
                    <p>{{name}}</p>
                </div>
            </div>
            <div class="collect">
                <van-icon name="like-o" color="red"/>我的收藏
            </div>
            <div class="order">
                <h3>我的订单</h3>
                <ul>
                    <li><i><span v-if="flag" class="redbox">2</span></i><p>待付款</p></li>
                    <li><i><span v-if="flag" class="redbox">2</span></i><p>待发货</p></li>
                    <li><i><span v-if="flag" class="redbox">2</span></i><p>待收货</p></li>
                    <li><i><span v-if="flag" class="redbox">2</span></i><p>待评价</p></li>
                    <li><i><span v-if="flag" class="redbox">2</span></i><p>退款/售后</p></li>
                </ul>
            </div>
            <div class="take">
                <p>收货地址管理</p>
            </div>
        </div>
    </div>
</template>
<script>
import { Dialog } from 'vant';
import api from '../../api'
export default {
    data(){
        return {
            flag:false,
            img:'',
            name:'点我登录',
            bgimg:''
        }
    },
    mounted(){
        if(localStorage.getItem('uid')){
            this.$axios({
                url:api.userDetail,
                params:{
                    uid:localStorage.getItem('uid')
                }
            }).then(res=>{
                this.flag = true
                this.img = res.data.profile.avatarUrl
                this.name = res.data.profile.nickname
                this.bgimg = res.data.profile.backgroundUrl
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        }
        
    },
    methods: {
        login(){
            if(this.flag){
                Dialog.confirm({
            message: "确定退出吗？"
          }).then(() => {
              localStorage.removeItem('uid')
              this.$router.go(0)
          }).catch(err=>{
            console.log(err)
          });
            }else{
                this.$router.push('/login')
            }
        }
    },
}
</script>
<style lang="stylus" scoped>

.redbox 
    display block
    position absolute
    top -0.2rem
    right -0.2rem
    width 0.4rem
    height 0.4rem
    border-radius 50%
    background red
    text-align center
    line-height 0.4rem
    color #fff
.containerbox
    background-color #f3f3f3
    position absolute
    width 100%
    height 100%
    .header
        height 3.4rem
        background #ff9900
        background-size:7.5rem 3.4rem
        position relative
        .title
            padding 0.4rem 0.3rem 0
            display flex
            color #fff
            justify-content space-between
            i 
                display block
                width 0.5rem
                height 0.5rem
                background-size 0.5rem 0.5rem
                background-image url(../../assets/img/my/set.png)
            .message
                background-image url(../../assets/img/my/news.png)
                position relative
            h1
                font-size 0.4rem
        .headerimg
            position absolute
            left 50%
            margin-left -1.05rem
            bottom -1.3rem
            display flex
            flex-direction column
            text-align center
            .box
                width 2.1rem
                height 2.1rem
                border-radius 50%
                border 5px solid #ffffff
                background #ccc
                overflow hidden
                img 
                    width 100%
                    height 100%
            p
                color #333
                font-size 0.3rem
                line-height 0.5rem
    .collect
        height 2.6rem
        background #fff
        padding-top 1.8rem
        padding-left 0.3rem
        font-size 0.3rem
        margin-bottom 0.16rem
        i 
            margin-right  0.26rem
    .order
        background-color #fff
        padding 0 0.3rem
        margin-bottom 0.16rem
        h3
            line-height 1.22rem
            font-size 0.3rem
        ul
            display flex
            padding 0.45rem 0
            li
                flex 1
                display flex
                flex-direction column
                justify-content center
                align-items center
                i 
                    width 0.83rem
                    height 0.72rem
                    margin-bottom 0.28rem
                    background-size 0.83rem 0.72rem
                    background-image url(../../assets/img/my/icon_boligation.png)
                    position relative
                p
                    font-size 0.22rem
                &:nth-child(2) i
                    background-image url(../../assets/img/my/prepare.png)
                &:nth-child(3) i
                    background-image url(../../assets/img/my/icon_consignee.png)
                &:nth-child(4) i
                    background-image url(../../assets/img/my/icon_evaluate.png)
                &:nth-child(5) i
                    background-image url(../../assets/img/my/icon_refund.png)
    .take
        padding-left 0.3rem
        font-size 0.3rem
        height 1.3rem
        line-height 1.3rem
        background-color #fff



</style>