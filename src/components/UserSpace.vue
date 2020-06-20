<template>
  <transition name="panel">
    <div class="bg-box" v-if="$store.state.isShowPopSpace" transiton="panel">
      <div class="bg">
        <span class="close-btn" @click="close">
          <i class="iconfont icon-x"></i>
        </span>
        <div class="title">欢迎你，{{$store.state.userInfo.nickname}}</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    close() {
      this.$store.commit("isShowPopSpace", false);
    }
  }
};
</script>

<style lang="less" scoped>
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
      .title{
        left: 10%;
        width: 70%;
      }
    }
  }
}
</style>