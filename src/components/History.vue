<template>
  <transition name="history">
    <div class="history-box" @click.stop v-if='$store.state.isHistory' v-show="$store.state.isfocus" transiton="history">
      <div
        @click="click(item.value)"
        v-for="(item,index) in historySerch"
        :key="index"
      >{{item.value}}</div>
      <div @click="clearHistory" class="clearHistory" v-show="historySerch != ''">
        <i class="iconfont icon-x"></i>
        清除历史记录
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["historySerch"],
  methods: {
    click(value) {
      this.$emit("click", value);
    },
    clearHistory() {
      this.$emit("clearHistory");
    }
  }
};
</script>


<style lang="less" scoped>
.history-box {
  position: absolute;
  width: 574px;
  top: 340px;
  font-size: small;
  overflow: hidden;
  border-radius: 15px;
  transition: all 0.25s;
  backdrop-filter: blur(20px);
  div {
    box-sizing: border-box;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-right: 20px;
    text-indent: 20px;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.1);
    color: rgba(255, 255, 255, 0.8);
    border-bottom: solid 1px transparent;
    transition: all 0.25s;
    i {
      font-size: small;
    }
  }
  .clearHistory {
    color: rgba(255, 255, 255, 0.5) !important;
    font-size: 11px !important;
  }
  div:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
}


.history-enter-active,
.history-leave-active {
  transition: all 0.25s ease;
}
.history-enter,
.history-leave-active {
  transform: scaleY(0);
  opacity: 0;
}

@media screen and (max-width: 600px) {
  .history-box{
    top: 300px;
    width: 80%;
  }
}
</style>