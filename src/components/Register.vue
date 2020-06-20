<template>
  <transition name="panel">
    <div class="bg-box" v-if="$store.state.isShowPopRegister" transiton="panel">
      <div class="bg">
        <span class="close-btn" @click="close">
          <i class="iconfont icon-x"></i>
        </span>
        <div class="ptitle">注册</div>
        <div class="tips">温馨提示：手机号验证服务由网易云提供</div>
        <div class="res-box">
          <div class="res">
            <div>手机号</div>
            <div class="input">
              <input
                type="tel"
                placeholder="请输入常用手机号"
                maxlength="11"
                oninput="value = value.replace(/[^0-9]/g,'')"
                v-model="phone"
              />
            </div>
            <div>密码</div>
            <div class="input">
              <input type="password" placeholder="请输入密码" v-model="password" />
            </div>
            <div>验证码</div>
            <div class="input">
              <input
                type="tel"
                maxlength="4"
                oninput="value = value.replace(/[^0-9]/g,'')"
                placeholder="请输入验证码"
                v-model="email"
              />
            </div>

            <div class="btn-box">
              <button class="btn" @click="getEmail">验证码</button>
              <button class="btn" @click="zhuce">注册</button>
            </div>
            <div class="message">{{message}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      password: "",
      email: "",
      message: ""
    };
  },
  methods: {
    close() {
      this.phone = "";
      this.password = "";
      this.email = "";
      this.message = "";
      this.$store.commit("isShowPopRegister", false);
    },
    async getEmail() {
      if (this.phone == "") {
        this.message = "手机号不能为空";
      } else if (this.phone.length < 11) {
        this.message = "手机号格式错误";
      } else {
        try {
          const { data } = await this.$http.get(
            "http://123.57.37.150:3000/captcha/sent?phone=" + this.phone
          );
          if (data.code == 200) {
            this.message = "验证码发送成功";
          } else {
            this.message = "手机号错误";
          }
        } catch (error) {
          this.message = "手机号错误";
        }
      }
    },
    async zhuce() {
      if (this.phone != "" && this.password != "" && this.email != "") {
        try {
          const { data } = await this.$http.get(
            "http://123.57.37.150:3000/captcha/verify?phone=" +
              this.phone +
              "&captcha=" +
              this.email
          );
          if (data.code == 200) {
            //TODO
            const { data } = await this.$http.post(
              "http://123.57.37.150:2022/api/register",
              {
                phone: this.phone,
                password: this.password
              }
            );
            if (data.code == 200) {
              this.message = "注册成功";
            } else if (data.code == 422) {
              this.message = "手机号已注册";
            }
            console.log(data);
          } else {
            this.message = "验证码错误";
          }
        } catch (error) {
          this.message = "验证码错误";
        }
      } else {
        this.message = "请输入";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.bg {
  width: 400px !important;
  .ptitle {
    position: absolute;
    width: 100%;
    left: 0;
    font-size: 25px;
    top: 70px;
    text-align: center;
  }
  .tips {
    position: absolute;
    width: 100%;
    left: 0;
    color: rgba(255, 255, 255, 0.3);
    font-size: 12px;
    top: 120px;
    text-align: center;
    padding: 0 20px;
  }
  .res-box {
    position: absolute;
    width: 100%;
    top: 170px;
    display: flex;
    justify-content: center;
    .res {
      width: 70%;
      .input {
        height: 44px;
        display: flex;
        align-items: center;
        input {
          outline: none;
          width: 100%;
          height: 30px;
          border: none;
          border-radius: 15px;
          padding: 0 10px;
          background-color: rgba(0, 0, 0, 0.3);
          color: white;
        }
      }
      .btn-box {
        margin-top: 30px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .btn {
          height: 30px;
          width: 60px;
          border-radius: 15px;
          background-color: rgba(255, 255, 255, 0.3);
          cursor: pointer;
        }
      }
      .message {
        margin-top: 30px;
        text-align: center;
      }
    }
  }
}

input::-webkit-input-placeholder {
  /* WebKit browsers 适配谷歌 */
  color: rgba(255, 255, 255, 0.3);
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 适配火狐 */
  color: rgba(255, 255, 255, 0.3);
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ 适配火狐 */
  color: rgba(255, 255, 255, 0.3);
}
input:-ms-input-placeholder {
  /* Internet Explorer 10+  适配ie*/
  color: rgba(255, 255, 255, 0.3);
}

button {
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
}

@media screen and (max-width: 650px) {
  .bg-box {
    .bg {
      width: 90% !important;
      .close-btn {
        top: 10px;
        right: 10px;
      }
      .title,
      .content {
        left: 10%;
        width: 80%;
      }
    }
  }
}
</style>