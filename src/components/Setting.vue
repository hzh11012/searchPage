<template>
  <div class="setting-box">
    <div class="user" title="用户">
      <i class="iconfont icon-user" @click.stop="user"></i>
    </div>
    <div class="setting" title="设置">
      <i class="iconfont icon-setting" @click.stop="setting"></i>
    </div>
    <transition name="setting">
      <div v-show="$store.state.isShowUser"  class="setting-dialog" transiton="setting">
        <div class="item" v-if="!$store.state.isLogin" @click.stop='$store.commit("isShowPopLogin", true),$store.commit("isShowUser", false)'>登录</div>
        <div class="item" v-if="!$store.state.isLogin" @click.stop='$store.commit("isShowPopRegister", true),$store.commit("isShowUser", false)'>注册</div>
        <div class="item" v-if="$store.state.isLogin" @click.stop='$store.commit("isShowPopSpace", true),$store.commit("isShowUser", false)'>个人中心</div>
        <div class="item" v-if="$store.state.isLogin" @click.stop='tuichu()'>退出</div>
      </div>
    </transition>
    <transition name="setting">
      <div v-show="$store.state.isShowSetting" class="setting-dialog" transiton="setting">
        <div class="item" @click.stop='$store.commit("isShowPopChanggui", true),$store.commit("isShowSetting", false)'>常规设置</div>
        <div class="item" @click.stop='$store.commit("isShowPopEngine", true),$store.commit("isShowSetting", false)'>搜索引擎偏好</div>
        <div class="item" @click.stop='$store.commit("isShowPopBg", true),$store.commit("isShowSetting", false)'>背景图像偏好</div>
        <div class="item" @click.stop='$store.commit("isShowPopJuanzhu", true),$store.commit("isShowSetting", false)'>捐助我</div>
        <div class="item" @click.stop='$store.commit("isShowPopFankui", true),$store.commit("isShowSetting", false)'>反馈</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    user() {
      this.$store.commit("isShowUser", !this.$store.state.isShowUser);
      this.$store.commit("isShowSetting", false);
    },
    setting() {
      this.$store.commit("isShowSetting", !this.$store.state.isShowSetting);
      this.$store.commit("isShowUser", false);
    },
    tuichu(){
      this.$store.commit("isLogin", false);
      localStorage.removeItem("token");
      localStorage.removeItem("_id");
      this.$store.commit("isShowUser", false);
      setTimeout(() => {
        this.$router.go(0);
      }, 0);
    }
  }
};
</script>

<style lang="less" scoped>
.setting-box {
  position: absolute;
  right: 40px;
  top: 30px;
  display: flex;
  .user,
  .setting {
    padding: 0 9px;
    i {
      color: rgba(255, 255, 255, 0.6);
      font-size: 26px;
      cursor: pointer;
    }
    i:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }
  .setting-dialog {
    position: absolute;
    right: 0px;
    z-index: 1;
    top: 40px;
    width: 160px;
    background: rgb(30, 30, 30);
    backdrop-filter: blur(30px);
    color: rgba(255, 255, 255, 0.8);
    overflow: hidden;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 10px;
    transform-origin: right top;
    .item {
      padding-left: 20px;
      padding-top: 12px;
      padding-bottom: 12px;
      font-size: 11px;
      transition: all 0.25s;
      user-select: none;
    }
    .item:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
}

.setting-enter-active,
.setting-leave-active {
  transition: all 0.25s ease;
}
.setting-enter,
.setting-leave-active {
  transform-origin: right top;
  transform: scale(0.5);
  opacity: 0;
}


@media screen and (max-width: 650px) {
  .setting-box {
    right: 10px;
    top: 10px;
  }
}
</style>