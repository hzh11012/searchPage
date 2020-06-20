<template>
  <transition name="panel">
    <div class="bg-box" v-if="$store.state.isShowPopLogin" transiton="panel">
      <div class="bg">
        <span class="close-btn" @click="close">
          <i class="iconfont icon-x"></i>
        </span>
        <div class="ptitle">登录</div>
        <div class="res-box">
          <div class="res">
            <div>手机号</div>
            <div class="input">
              <input
                type="tel"
                placeholder="请输入手机号"
                maxlength="11"
                oninput="value = value.replace(/[^0-9]/g,'')"
                v-model="phone"
              />
            </div>
            <div>密码</div>
            <div class="input">
              <input type="password" placeholder="请输入密码" v-model="password" />
            </div>
            <div class="btn-box">
              <button class="btn" @click="login">登录</button>
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
      message: "",
      userInfo: {
        nickname: "",
        tags: [{ title: "", url: "" }]
      }
    };
  },
  methods: {
    close() {
      this.$store.commit("isShowPopLogin", false);
    },
    async login() {
      if (this.phone != "" && this.password != "") {
        const { data } = await this.$http.post(
          "http://123.57.37.150:2022/api/login",
          {
            phone: this.phone,
            password: this.password
          }
        );
        if (data.code == 422) {
          this.message = data.message;
        } else {
          const { data: data1 } = await this.$http.post(
            "http://123.57.37.150:2022/api/userinfos",
            {
              uid: data.user
            }
          );
          const userInfo = {
            nickname: data1.info[0].nickname,
            tag: data1.tag
          };
          this.$store.commit("userInfo", userInfo);
          this.$store.commit("isLogin", true);
          localStorage.setItem("token", JSON.stringify(data.token));
          localStorage.setItem("_id", JSON.stringify(data.user));
          this.message = "登录成功";
          setTimeout(() => {
            this.$router.go(0);
          }, 500);
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