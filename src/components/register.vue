<template>
  <div>
    <div class="header">
      <div class="title">
        <van-icon name="arrow-left" class="iconbg" @click="$router.go(-1)" />
        <h1>注册</h1>
        <span @click="login">登录</span>
      </div>
    </div>
    <div class="content">
      <van-cell-group>
        <van-field v-model="userInfo.nickname" label="昵称：" placeholder="请输入用户名" @blur="getUser"
        :error-message="nickname"/>
        <van-field
          type="number"
          v-model="userInfo.phone"
          label="手机号："
          placeholder="请输入手机号"
          maxlength="11"
          :error-message="phone"
          @blur="getExist"
        />
        <van-field
          v-model="userInfo.password"
          type="password"
          label="密码："
          placeholder="8-18位字母及特殊符号"
          @blur="getPass"
          :error-message="password"
        />
        <van-field v-model="userInfo.captcha" label="验证码：" placeholder="请输入验证码" maxlength="4" @blur="getyzm" :error-message="captcha">
          <van-button
            slot="button"
            size="small"
            class="clickup"
            @click="getup"
            :disabled="flag"
          >{{content}}</van-button>
        </van-field>
        <van-button type="primary" size="large" @click="getNext" :disabled="checkedflag">下一步</van-button>
        <div class="agreement">
          <van-checkbox v-model="checked" shape="square"></van-checkbox>
          <p>我已阅读并同意使用条款和隐私协议</p>
        </div>
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
        nickname: "",
        phone: "",
        password: "",
        captcha: ""
      },
      time: 60,
      content: "点击获取",
      timer: null,
      flag: false,
      checked: true,
      nickname: "",
      phone: "",
      password: "",
      captcha: "",
      checkedflag:false
    };
  },
  methods: {
    getPass(){
        if (!this.userInfo.password) {
          this.password = '密码不能为空'
        }else if(!/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{6,16}$/.test(this.userInfo.password)){
          this.password = '密码格式不正确'
        }else{
          this.password = ''
        }
    },
    getyzm(){
        if (!this.userInfo.captcha) {
          this.captcha = '验证码不能为空'
        }else{
          this.captcha = ''
        }
    },
    getUser(){
      if (!this.userInfo.nickname) {
        this.nickname = '用户名不能为空'
      }else{
          this.nickname = ''
        }
    },
    getExist() {
      if (!this.userInfo.phone) {
        this.phone = '手机号不能为空'
      }
      else if (!/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.userInfo.phone)) {
        this.phone = '手机号格式不正确'
      } else {
         this.phone = ''
        this.$axios({
          url: api.existence,
          params: {
            phone: this.userInfo.phone
          }
        })
          .then(res => {
            if (res.data.hasPassword) {
              this.phone = '您的手机号已注册'
            }else{
              this.phone = ''
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 下一步
    getNext() {
      let bool = true;
      for (let i in this.userInfo) {
        if (this.userInfo[i] == "") {
          bool = false;
        }
      }
      if(!this.checked){
        Dialog.alert({
          message: "请您同意协议"
        });
            // return
      } else if (!bool) {
        Dialog.alert({
          message: "内容不能为空"
        });
          return
      }else if (!/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/.test(this.userInfo.phone)
      ) {
        return
      }
       else if (!/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{6,16}$/.test(this.userInfo.password)
      ) {
          return
      }else {
         // 验证验证码是否正确
        this.$axios({
          url: api.captCha,
          params: {
            phone: this.userInfo.phone,
            captcha: this.userInfo.captcha
          }
        })
          .then(res => {
            if (res.data.code == 200) {
              // 注册账户
              getRegister();
            } else if(res.data.code == 503) {
                this.captcha = '验证码输入错误'
            }else{
              this.captcha = '您操作有误'
            }
          })
          .catch(err => {
            this.captcha = '验证码过期'
          });
      }
    },
    login() {
      this.$router.push("/login");
    },
    // 发送验证码
    getup() {
      if(this.userInfo.phone==""){
        Dialog.alert({
          message: "请填写手机号"
        });
        return
      }else{
        this.flag = true;
        this.$axios({
          url: api.sent,
          params: {
            phone: this.userInfo.phone
          }
        })
          .then(res => {
            if (res.data.code == 200) {
              this.timer = setInterval(() => {
                this.time--;
                this.content = `还有${this.time}秒`;
                if (this.time <= 0) {
                  this.content = "再次获取验证码";
                  this.time = 60;
                  clearInterval(this.timer);
                  this.flag = false;
                }
              }, 1000);
            }else{
              Dialog.alert({
                message: "服务器崩溃，请刷新重试！！"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });

      }
    },
    // 注册账户
    getRegister() {
      this.$axios({
        url: api.Register,
        params: this.userInfo
      })
        .then(res => {
          if (res.data.code == 200) {
            Dialog.alert({
                message: "注册成功"
              });
              this.$router.push('/login')
          }else{
             Dialog.alert({
                message: "注册失败"
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
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
  padding: 1.2rem 0.76rem 0;

  [class*=van-hairline]::after {
    border: none;
  }

  .van-cell {
    padding-top: 0.6rem;
    height 1.76rem
  }

  .van-cell:not(:last-child)::after {
    border-bottom: 1px solid #ccc;
  }

  .van-button--primary {
    background-color: #ff9900;
    border: none;
    border-radius: 0.1rem;
  }

  .van-button--large {
    height: 0.8rem;
    line-height: 0.8rem;
    margin-top: 0.8rem;
  }

  .agreement {
    display: flex;
    margin-top: 0.5rem;
    font-size: 0.28rem;

    p {
      margin-left: 0.2rem;
    }
  }

  .clickup {
    color: red;
    border: none;
  }
}
</style>