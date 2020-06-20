<template>
  <transition name="panel">
    <div class="bg-box" v-show="$store.state.isShowPopChanggui" transiton="panel">
      <div class="bg">
        <span class="close-btn" @click="close">
          <i class="iconfont icon-x"></i>
        </span>
        <div class="title">常规设置</div>
        <div class="content">
          <div class="titleBold setGroupCaption">搜索</div>
          <div class="setGroup">
            <div class="setOptBox">
              <span class="setOptCaption">自动清空搜索栏</span>
              <label class="switch">
                <input type="checkbox" v-model="clear" />
              </label>
            </div>
            <div class="setOptBox">
              <span class="setOptCaption">在新标签页显示搜索结果</span>
              <label class="switch">
                <input type="checkbox" v-model="blank" />
              </label>
            </div>
            <div class="setOptBox">
              <span class="setOptCaption">历史记录</span>
              <label class="switch">
                <input type="checkbox" v-model="history" />
              </label>
            </div>
          </div>
          <div class="titleBold setGroupCaption">通用</div>
          <div class="setGroup">
            <div class="setOptBox">
              <span class="setOptCaption">
                「
                <a href="https://hitokoto.cn/" class="links">一言</a>
                」功能
              </span>
              <label class="switch">
                <input type="checkbox" v-model="hitokoto" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    close() {
      this.$store.commit("isShowPopChanggui", false);
    }
  },
  computed: {
    clear: {
      get() {
        return this.$store.state.isClear;
      },
      set(newVal) {
        this.$store.commit("isClear", newVal);
      }
    },
    blank: {
      get() {
        return this.$store.state.isBlank;
      },
      set(newVal) {
        this.$store.commit("isBlank", newVal);
      }
    },
    history: {
      get() {
        return this.$store.state.isHistory;
      },
      set(newVal) {
        this.$store.commit("isHistory", newVal);
      }
    },
    hitokoto: {
      get() {
        return this.$store.state.isHitokoto;
      },
      set(newVal) {
        this.$store.commit("isHitokoto", newVal);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.titleBold {
  color: white;
  font-size: 15px;
  font-weight: 700;
}
.setGroupCaption {
  margin-left: 10px;
  padding-bottom: 5px;
}
.setGroup {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 3px;
  padding-left: 20px;
  padding-right: 5px;
  margin-bottom: 15px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 5px;
  .setOptBox {
    position: relative;
    padding-bottom: 25px;
    .setOptCaption {
      position: relative;
      top: 8px;
      color: white;
      font-size: small;
      transition: all 0.25s;
      .links {
        text-decoration: none;
        color: rgba(99, 187, 208, 0.9) !important;
        transition: all 0.25s;
      }
      .links:hover {
        color: rgba(99, 187, 208, 0.6) !important;
      }
    }
    .switch {
      position: absolute;
      top: 0;
      right: 0;
      display: block;
      width: 60px;
      height: 34px;
      transform: scale(0.6);
    }
  }
}
input[type="checkbox"] {
  position: relative;
  width: 50px;
  height: 28px;
  -webkit-appearance: none;
  background-color: #444;
  outline: none;
  border-radius: 14px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  transition: all 0.25s;
}
input:checked[type="checkbox"] {
  background-color: rgba(99, 187, 208, 0.9);
}
input[type="checkbox"]::before {
  content: "";
  position: absolute;
  width: 28px;
  height: 28px;
  left: 0;
  border-radius: 14px;
  background-color: white;
  transform: scale(1.1);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.25s;
}
input:checked[type="checkbox"]::before {
  left: 28px;
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
      .content {
        .setGroup {
          .setOptBox {
            .setOptCaption {
              display: inline-block;
              width: calc(100% - 70px);
            }
          }
        }
      }
    }
  }
}
</style>