<template>
  <div>
    <div
      class="video-box" :style="'height:'+ bodyHeight + 'px'"
      :class="$store.state.isfocus?'isfocus':''"
      v-show="$store.state.isShowVideo"
    >
      <video
        id="videoBG"
        :src="$store.state.videourl"
        :poster="$store.state.imgurl"
        autoplay
        loop
        muted
      ></video>
    </div>
    <div
      :class="$store.state.isfocus?'isfocus':''"
      v-show="!($store.state.isShowVideo)"
      class="img-box"
      :style="{backgroundImage:'url('+ $store.state.imgurl +')',height:+ bodyHeight + 'px'}"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bodyHeight: ""
    };
  },
  mounted() {
    this.bodyHeight = document.documentElement.clientHeight;
  }
};
</script>

<style lang="less" scoped>
.video-box,
.img-box {
  position: fixed;
  width: 100%;
  display: block;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  object-fit: cover;
  transition: all 0.25s;
}
.video-box {
  #videoBG {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.isfocus {
  filter: blur(10px);
  transform: scale(1.1);
}

@media screen and (max-width: 767px) {
  #videoBG {
    display: none;
  }
  .video-box {
    background-image: url(http://qnets.cn:8082/img/live2.png);
  }
}
</style>