<template>
  <div>
    <div class="header">
      <div class="title">
        <van-icon name="arrow-left" class="iconbg" @click="$router.go(-1)" />
        <h1>登录</h1>
        <span @click="register">注册</span>
      </div>
    </div>
    <div class="content">
      <van-cell-group>
        <van-field v-model="userInfo.phone" label="手机号：" />
        <van-field v-model="userInfo.password" type="password" label="密码：" />
        <p>
          <span>忘记密码</span>
        </p>
        <van-button type="primary" size="large" @click="getlogin">登录</van-button>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import api from "../api";
import { Dialog } from "vant";
export default {
  data() {
    return {
      userInfo: {
        phone: "",
        password: ""
      }
    };
  },
  methods: {
    register() {
      this.$router.push("/register");
    },
    getlogin() {
      if (this.userInfo.phone == "") {
        Dialog.alert({
          message: "手机号不能为空"
        });
        return
      }else if(this.userInfo.password == ""){
        Dialog.alert({
          message: "密码不能为空"
        });
        return
      }
       else {
        this.$axios({
          url: api.Login,
          params: this.userInfo
        })
          .then(res => {
            if (res.data.code == 501) {
              Dialog.alert({
                message: "账户不存在"
              });
            } else if (res.data.code == 502) {
              Dialog.alert({
                message: "密码错误"
              });
            } else if (res.data.code == 200) {
              this.$router.push("/mycenter");
              localStorage.setItem('uid',res.data.account.id);
            }
          })
          .catch(err => {
             Dialog.alert({
                message: "服务器错误"
              });
          });
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.header {
  height: 1.08rem;
  background: #ff9900;
  position: relative;
  font-size: 0.33rem;

  .title {
    padding: 0.4rem 0.3rem 0;
    display: flex;
    color: #fff;
    justify-content: space-between;
    align-items: center;

    .message {
      background-image: url('../assets/img/my/news.png');
    }
  }
}

.content {
  padding: 2.46rem 0.76rem 0;

  [class*=van-hairline]::after {
    border: none;
  }

  .van-cell:not(:last-child)::after {
    border-bottom: 1px solid #ccc;
  }

  p {
    text-align: right;
    line-height: 0.98rem;
  }

  .van-button--primary {
    background-color: #ff9900;
    border: none;
    border-radius: 0.1rem;
  }
}
</style>