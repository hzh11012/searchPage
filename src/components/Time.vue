<template>
  <div class="time-box">
    <h1 v-cloak @click="searchOrTag">{{currentTime}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: "", //定义一个定时器的变量
      currentTime: "" // 获取当前时间
    };
  },
  methods: {
    searchOrTag() {
      this.$emit("searchOrTag");
    }
  },
  created() {
    var that = this;
    this.timer = setInterval(function() {
      let m =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let h =
        new Date().getHours() < 10
          ? "0" + new Date().getHours()
          : new Date().getHours();
      that.currentTime = h + ":" + m;
    }, 0);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>

<style lang="less" scoped>
.time-box {
  position: absolute;
  width: 100px;
  left: 50%;
  margin-left: -50px;
  top: 100px;
  text-align: center;
  transition: all 0.25s;
  user-select: none;
  h1 {
    margin: 24px 0;
    color: #fff;
    font-size: 36px;
    font-weight: 300;
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.35);
    cursor: pointer;
    transition: all 0.25s;
  }
}

@media screen and (max-width: 650px) {
  .time-box {
    top: 80px;
    h1 {
      font-size: 27px;
    }
  }
}
</style>