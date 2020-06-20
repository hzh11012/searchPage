<template>
  <transition name="panel">
    <div class="bg-box" v-if="$store.state.isShowPopJuanzhu" transiton="panel">
      <div class="bg">
        <span class="close-btn" @click="close">
          <i class="iconfont icon-x"></i>
        </span>
        <div class="title">捐助我</div>
        <div class="content">
          <p class="pAbout">
            我是一名在校大学生，每月高昂的服务器费用均由我从生活费中自费。
            <br />如果你喜欢我的网站，简单的捐赠是对我最大的物质和精神支持~爱你们！
          </p>
          <img src="http://www.qnets.cn:8082/img/zfb.png" class="imgQRC" />
          <img src="http://www.qnets.cn:8082/img/wx.png" class="imgQRC wx" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    close() {
      this.$store.commit("isShowPopJuanzhu", false);
    }
  }
};
</script>

<style lang="less" scoped>
.pAbout {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 12px;
}
.wx {
  left: 50%;
}
.imgQRC {
  filter: brightness(0.8);
  position: absolute;
  width: 50%;
  height: auto;
}

::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.3);
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