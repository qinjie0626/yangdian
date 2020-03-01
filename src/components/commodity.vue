<template>
  <div>
    <div class="content">
      <div class="header">
        <van-icon name="arrow-left" class="iconbg" @click="$router.go(-1)" />
        <van-icon name="cart-o" />
        <van-icon name="ellipsis" />
      </div>
      <div class="picimg">
        <sildes :msg="content.swiperImgArr"></sildes>
      </div>
      <div class="presentation">
        <div class="title">
          <p class="titlecontent">{{content.name}}</p>
          <div>
            <van-icon name="star-o" color="red" />
            <p>收藏</p>
          </div>
        </div>
        <div class="price">
          <div class="left">
            <span>￥{{content.reduct_price}}</span>
            <del>￥{{content.original_price}}</del>
          </div>
          <div class="right">
            <div>
              <span>{{(10*content.allowance).toFixed(1)}}折</span>
              <span>{{content.isFreeShip?"包邮":"不包邮"}}</span>
            </div>
            <ul>
              <li v-for="(item,index) in content.describe" :key="index">{{item}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="proimg">
        <div class="navtitle">
          <a href="javascript:;" @click='flag="detailsCon"' :class="[flag=='detailsCon'?'active':'']">
            <span>商品详情</span>
          </a>
          <a href="javascript:;" @click='flag="comment"' :class="[flag=='comment'?'active':'']">
            <span>卖家口碑</span>
          </a>
        </div>
        <div class="module">
          <div :is='flag' :buyerReviews="content.buyerReviews" :shopDes="content.shopDes"></div>
        </div>
      </div>
      <div class="purchase">
          <div class="flex">
            <div class="total">总价：<span>￥{{prices|fprice}}</span> </div>
          <van-button
            block
            type="primary"
            @click="getshopping"
          >
            加入购物车
          </van-button><van-button square type="primary">立即购买</van-button>
          <van-button v-if="disflag"
            block
            type="primary"
            @click="getcar"
          >
            加入购物车
          </van-button>
          <van-button v-if="disflag"
            square
            type="primary"
            @click="getcar"
          >
            立即购买
          </van-button>
          </div>
      </div>
    </div>
    <div class="mask" v-show="disflag">
      <div class="conentbox">
          <div class="title">
            <div class="box">
              <img :src="content.swiperImgArr[0]" alt="" v-if="content.swiperImgArr">
            </div>
            <div class="font">
              <p class="red">￥{{content.reduct_price}}</p>
              <p>库存件</p>
              <p>请选择商品属性</p>
            </div>
            <van-icon name="close"  @click="close"/>
          </div>
          <div class="buynum">
              <p>购买数量</p>
              <van-stepper v-model="value" />
          </div>
          <div class="commoditytitle">
              <p>{{buySelect.name}}</p>
              <ul>
                  <li v-for="(list,idx) in buySelect.list" :key="idx" :class='[num===idx?"cur":""]' @click='num=idx'>{{list}}</li>
              </ul>
          </div>
          <div class="commoditytitle">
              <p>{{buySelect1.name}}</p>
              <ul>
                  <li v-for="(list,idx) in buySelect1.list" :key="idx" :class='[num1===idx?"cur":""]' @click='num1=idx'>{{list}}</li>
              </ul>
          </div>
      </div>
  </div>
  </div>
</template>
<script>
import sildes from './mycom/slideshow'
import detailsCon from './pages/details'
import comment from './pages/comment'
import api from '../api'
export default {  
  data() {
    return {
      content:{},
      flag:'detailsCon',
      disflag:false,
      value:1,
      buySelect:[],
      buySelect1:[],
      num:0,
      num1:0,
    };
  },
  computed: {
    prices(){
      return this.value*this.content.reduct_price
    }
  },
  filters:{
    fprice(n){
      return n.toFixed(2)+'元'
    }
  },
  methods: {
    getshopping(){
      this.disflag = true
    },
    close(){
      this.disflag = false
    },
    getcar(){
      let obj = {value:this.value,flag:false,price:this.content.reduct_price,img:this.content.swiperImgArr[0],title:this.content.name}
      this.$store.commit('getArr',obj)
      this.$router.push('/shoppingcar')
    }
  },
  components:{
      sildes,
      detailsCon,
      comment,
  },
  mounted(){
    this.$axios({
      url:api.getDetails,
      params:{
        pid:this.$route.query.id
      }
    }).then(res=>{
      this.content = res.data.data
      this.buySelect = res.data.data.buySelect[0]
      this.buySelect1 = res.data.data.buySelect[1]
    }).catch(err=>{
      console.log(err)
    })
  },
  activated(){
    this.$axios({
      url:api.getDetails,
      params:{
        pid:this.$route.query.id
      }
    }).then(res=>{
      this.content = res.data.data
      this.buySelect = res.data.data.buySelect[0]
      this.buySelect1 = res.data.data.buySelect[1]
    }).catch(err=>{
      console.log(err)
    })
  }
};
</script>
<style lang="stylus" scoped>
.mask
      width 100%
      height 100%
      position fixed
      left 0
      top 0
      background-color rgba(0,0,0,.3)
      z-index 97
  .conentbox
      position absolute
      bottom 1rem
      width 100%
      background-color #fff
      padding  0 0.3rem
      .title
        display flex
        position relative
        padding-top 0.2rem
        .box
          position relative
          top -0.5rem
          width 2rem
          height 2rem
          border 0.02rem solid #ccc
          background-color #fff
          img 
            width 100%
            height 100%
        i 
          position absolute
          right 0
          top 0.2rem
          font-size 0.5rem
        .font
          font-size 0.24rem
          margin-left 0.2rem
          .red
            color red
            font-size 0.24rem
      .buynum
        display flex
        justify-content space-between
        p
          font-size 0.32rem
      .commoditytitle
        p
          font-size 0.32rem
        ul
          display flex
          padding 0.2rem 0
          li
            background-color #ccc
            text-align center
            height 0.4rem
            width 1.2rem
            line-height 0.4rem
            margin-right 0.1rem
            border-radius 0.08rem
            color #333
          .cur
            background #ff9900
            color #fff
.demo-sku {
  .sku-container {
    padding: 0 15px;
  }
}
.content {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #eeeeee;
}

.header {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  font-size: 0.4rem;
  z-index: 20;

  i {
    position: absolute;
    top: 0.2rem;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    padding: 0.1rem;
    color: #fff;

    &:nth-child(1) {
      left: 0.2rem;
    }

    &:nth-child(2) {
      right: 1.4rem;
    }

    &:nth-child(3) {
      right: 0.2rem;
    }
  }
}

.picimg {
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 0.3rem 0;
  background: #fff;
}
.presentation {
  padding: 0.1rem 0 0.2rem 0.3rem;
  background-color: #fff;
  margin-bottom: 0.32rem;

  .title {
    display: flex;

    .titlecontent {
      font-size: 0.3rem;
      font-weight: 500;
      border-right: 1px solid #cccccc;
      width: 6.2rem;
      padding-right: 0.5rem;
      line-height: 0.4rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    div {
      display: flex;
      flex-direction: column;
      width: 1rem;
      justify-content: center;
      align-items: center;
      color: red;
      font-size: 0.19rem;
    }
  }

  .price {
    display: flex;
    align-items: center;

    .left {
      font-size: 0.2rem;
      margin-right: 0.4rem;
      display: flex;
      flex-direction: column;

      span {
        color: red;
        font-size: 0.26rem;
      }
    }

    .right {
      span {
        display: inline-block;
        width: 0.7rem;
        height: 0.3rem;
        text-align: center;
        line-height: 0.3rem;
        background-color: #ff9900;
        color: #fff;
        font-size: 0.2rem;
        margin-right: 0.1rem;
      }

      ul {
        display: flex;
        padding-top 0.1rem
        li {
          text-align: center;
          line-height: 0.3rem;
          border: 1px solid #f90;
          color: #f90;
          font-size: 0.2rem;
          margin-right: 0.1rem;
          padding: 0 0.1rem;
        }
      }
    }
  }
}

.proimg {
  background-color: #fff;

  .navtitle {
    display: flex;
    padding: 0.26rem 0;
    a {
      font-size: 0.26rem;
      flex: 1;
      text-align: center;
      color: #ccc;

      span {
        border-bottom: 0.01rem solid transparent;
      }
    }

    .active span {
      color: #ff9900;
      padding: 0.1rem 0.2rem;
      border-bottom: 0.01rem solid #ff9900;
    }
  }
}
.module
  padding-bottom 0.98rem
.purchase
  width 100%
  background-color #fff
  position fixed
  bottom 0
  border-top 1px solid #ccc
  z-index 99
  .flex
    display flex
    position relative
    .total
      width 3.98rem
      padding-left 0.3rem
      line-height 0.88rem
      font-size 0.28rem
      background-color #fff
      span 
        color red
    .van-button
      height 0.98rem
      font-size 0.28rem
      width 1.76rem
      text-align center
      padding 0
      line-height 0.98rem
      &:nth-child(2)
        background-color #ff9900
        border 1px solid #ff9900
      &:nth-child(3)
        background-color red
        border 1px solid red
      &:nth-child(4)
        background-color #ff9900
        border 1px solid #ff9900
        position absolute
        top 0 
        right 1.76rem
      &:nth-child(5)
        background-color red
        border 1px solid red
        position absolute
        top 0 
        right 0
// 改变购物车样式
.van-popup--bottom.van-popup--round
  padding-bottom  0.88rem
>>> .van-sku-actions
  display  none
.van-popup--bottom.van-popup--round
  border-radius 0
>>>.van-sku-header__img-wrap
  top -0.48rem
  margin 0
  img 
    width 100%
    height 100%
</style>