<template>
  <div>
    <van-row>
      <van-col span="24" class="header">
        <van-icon name="arrow-left" class="iconbg" @click="$router.go(-1)" />
        <h1>购物车</h1>
      </van-col>
    </van-row>
    <div class="commodity">
      <ul v-if="flagarr.length!=0">
        <li v-for="(item,index) in flagarr" :key="index">
          <div class="store clearfix">
            <van-icon name="shop-o" />
            <h3>杭州保税区仓</h3>
          </div>
          <van-swipe-cell :on-close="onClose" :name="index">
            <template slot="default">
              <div class="storecontent">
                <van-icon
                  name="passed"
                  :class="[item.flag?'active':'']"
                  @click="checkedFun(index)"
                />
                <img :src="item.img" alt />
                <div class="title">
                  <p>
                    {{item.title}}
                    <span>90粒装</span>
                  </p>
                  <van-stepper v-model="item.value" />
                </div>
                <p class="price">￥{{item.price}}</p>
              </div>
            </template>
            <template slot="right">
              <van-button square type="danger" text="删除" />
            </template>
          </van-swipe-cell>
        </li>
      </ul>
      <div class="emity" v-if="flagarr.length==0">
        <i></i>
        <p>购物车是空的</p>
        <p>快去逛逛吧~</p>
      </div>
    </div>
    <div class="closeon">
      <div class="flexdiv" @click="checkedAll">
        <van-icon name="passed" :class="[bool?'active':'']" />
        <p>全选</p>
      </div>
      <div class="flexdiv compilebox">
        <i class="compile"></i>
        <p>编辑</p>
      </div>
      <div class="flexdiv total">
        <p>合计：{{priceds|fprice}}</p>
        <p>(不含运费)</p>
      </div>
      <div class="up">去结算</div>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      value: 1,
      namelist: "",
      flagarr: this.$store.state.arr,
      bool: false
    };
  },
  mounted() {
    this.bool = this.flagarr.every(item => {
      return item.flag == true;
    });
    if (this.flagarr.length == 0) {
      this.bool = false;
    }
  },
  methods: {
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case "cell":
        case "outside":
          instance.close();
          break;
        case "right":
          Dialog.confirm({
            message: "确定删除吗？"
          })
            .then(() => {
              this.getdelete(instance.name);
            })
            .catch(err => {
              console.log(err);
            });
          break;
      }
    },
    getdelete(num) {
      this.$store.dispatch("getDel", num);
    },
    checkedFun(i) {
      this.flagarr[i].flag = !this.flagarr[i].flag;
    },
    checkedAll() {
      this.bool = !this.bool;
      this.flagarr.forEach(item => {
        item.flag = this.bool;
      });
    }
  },
  computed: {
    priceds() {
      let sum = 0;
      for (let i in this.flagarr) {
        if (this.flagarr[i].flag) {
          sum += this.flagarr[i].value * this.flagarr[i].price;
        }
      }
      return sum;
    }
  },
  filters: {
    fprice(n) {
      return n.toFixed(2) + "元";
    }
  },
  watch: {
    flagarr: {
      handler() {
        this.bool = this.flagarr.every(item => {
          return item.flag == true;
        });
        if (this.flagarr.length == 0) {
          this.bool = false;
        }
      },
      deep: true
    }
  }
};
</script>
<style lang="stylus" scoped>
.active {
  color: #f60;
}

.header {
  height: 1.08rem;
  background: #ff9900;
  text-align: center;
  position: relative;
  line-height: 1.38rem;
  color: #fff;
  font-size: 0.4rem;

  .iconbg {
    position: absolute;
    left: 0.4rem;
    top: 50%;
    margin-top: -0.16rem;
  }
}

.commodity {
  position: absolute;
  width: 100%;
  padding-bottom: 108px;

  .emity {
    width: 100%;
    padding-top: 3.3rem;
    text-align: center;

    i {
      display: block;
      margin: 0 auto;
      width: 0.88rem;
      height: 0.88rem;
      background-image: url('../../assets/img/home/tab_shopping_nor.png');
      background-size: 0.88rem 0.88rem;
    }

    p {
      line-height: 0.45rem;
      height: 0.3rem;
    }
  }
}

.commodity li {
  padding-left: 0.4rem;
}

.store {
  padding-top: 0.36rem;
  font-size: 0.26rem;
  color: #b4b4b4;

  i {
    margin-right: 0.3rem;
    font-size: 0.35rem;
    float: left;
  }

  h1 {
    float: left;
  }
}

.storecontent {
  display: flex;
  align-items: center;
  height: 2.6rem;

  i {
    font-size: 0.44rem;
  }

  img {
    width: 1.6rem;
    height: 1.6rem;
    margin: 0 0.2rem;
  }

  .title {
    width: 2.8rem;
    margin-right: 0.4rem;

    p {
      position: relative;
      font-size: 0.3rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;

      span {
        position: absolute;
        right: 0;
        top: 0.45rem;
        color: #ccc;
        font-size: 0.26rem;
        background: #fff;
      }
    }
  }

  .price {
    font-size: 0.26rem;
    color: #000;
    font-weight: 600;
  }
}

.van-button {
  height: 2.6rem;
  background: #f60;
}

.closeon {
  position: fixed;
  width: 100%;
  bottom: 1rem;
  height: 1.16rem;
  display: flex;
  border-top: 1px solid #ccc;
  padding-left: 0.4rem;
  background-color: #fff;

  .compilebox {
    margin: 0 0.7rem;
  }

  .total {
    width: 2.3rem;
    font-size: 0.23rem;
    color: #adadad;

    p {
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .flexdiv {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    i {
      width: 0.47rem;
      height: 0.47rem;
      font-size: 0.47rem;
    }

    .compile {
      background-image: url('../../assets/img/shopping/editor_nor.png');
      background-size: 0.47rem 0.47rem;
    }
  }

  .up {
    position: absolute;
    right: 0;
    width: 2.3rem;
    height: 100%;
    text-align: center;
    background-color: #f60;
    line-height: 1.16rem;
    font-size: 0.35rem;
    color: #fff;
  }
}
</style>