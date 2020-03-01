<template>
    <div>
        <div class="appraise">
            <div class="appraisecase">
                <ul>
                <li v-for="(item,index) in appraise" :key="index" :class='[num===index?"active":""]' @click='dataFun(index)'>{{item}}</li>
                </ul>
            </div>
            <ul class="userappraise">
                <li v-for="(item,index) in discuss" :key="index">
                    <div class="user">
                        <h5>{{item.buyerName}}</h5>
                        <span class="time">{{item.createTime|timer}}</span>
                    </div>
                    <div>
                        <img :src="list" alt="" v-for="(list,index) in item.postImg" :key="index">
                    </div>
                    <p>{{item.postDescribe}}</p>
                    <div class="answer">{{item.adminReviews}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            appraise:[
                "全部评价",
                "好评",
                "差评",
                "晒单"
            ],
            num:0,
            discuss:this.buyerReviews['all']
        }
    },
    props:['buyerReviews'],
    methods: {
        dataFun(i){
            this.num=i
            let a = ''
            if(i==0){
                a = 'all'
            }else if(i==1){
                a='good'
            }else if(i==2){
                a='bad'
            }else{
                a = 'postForm'
            }
            this.discuss = this.buyerReviews[a]
        }
    },
    filters:{
        timer(n){
            n = parseInt(n)
            let date = new Date(n)
            let y = date.getFullYear()
            let m = date.getMonth()<8?'0'+(date.getMonth()+1):date.getMonth()+1
            let d = date.getDate()<9?'0'+date.getDate():date.getDate()
            return `${y}-${m}-${d}`
        }
    }
}
</script>
<style lang="stylus" scoped>
    .appraise
        border-top 1px solid #ccc
        .appraisecase
            padding: 0 0.3rem;
            ul
                width 100%
                display flex
                height 0.7rem
                align-items center
                justify-content flex-end
                border-bottom  1px solid #ccc
                li
                    flex 1
                    width 1.38rem
                    height 0.5rem
                    line-height 0.5rem
                    text-align center
                    color #fff
                    background-color #999999
                    font-size 0.24rem
                    border-radius 0.68rem
                    margin-right 0.5rem
                    &:last-child
                        margin-right 0
                .active
                    background-color #ff9900
        .userappraise
            li
                display flex
                flex-direction column
                border-bottom  1px solid #ccc
                padding: 0 0.3rem 0.2rem;
                .user
                    width 100%
                    display flex
                    justify-content space-between
                    height 0.62rem
                    align-items center
                    h5
                        font-size 0.26rem
                        color #ff9900
                    .time
                        font-size 0.16rem
                        color #999
                img 
                    width 1.5rem
                    height 1.5rem
                p
                    font-size 0.2rem
                    line-height 0.4rem
                .answer
                    border-radius 0.1rem
                    background-color #ccc
                    padding 0.1rem
                    font-size 0.16rem
                    line-height 0.26rem




</style>