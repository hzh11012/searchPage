<template>
  <div class="search-box" @contextmenu.prevent="contextmenu" @click="isFocus(false)">
    <div class="search"  @click.stop="isFocus(true)" :class="$store.state.isfocus?'search-click':''">
      <div class="search-btn">
        <div class="water"></div>
      </div>
      <input
        :style="$store.state.isfocus?'width: 500px;':''"
        ref="searchinput"
        class="search-txt"
        size="30"
        placeholder="Search"
        autocomplete="off"
        type="text"
        v-model="value"
        @keydown.enter="search"
      />
    </div>
    <transition name="engine">
      <div class="engine-box" v-show="$store.state.isfocus" transiton="engine">
        <div
          class="engine-item"
          :class="$store.state.searchurl == 'https://www.baidu.com/s?ie=utf-8&word='?'active':''"
          @click.stop="changeEngine(0)"
        >
          <i class="iconfont icon-baidu"></i>
        </div>
        <div
          class="engine-item"
          :class="$store.state.searchurl == 'https://cn.bing.com/search?q='?'active':''"
          @click.stop="changeEngine(1)"
        >
          <i class="iconfont icon-biying"></i>
        </div>
        <div
          class="engine-item"
          :class="$store.state.searchurl == 'https://www.google.com/search?q='?'active':''"
          @click.stop="changeEngine(2)"
        >
          <i class="iconfont icon-google"></i>
        </div>
      </div>
    </transition>
    <transition name="hitokoto">
      <div
        class="hitokoto"
        :class="historySerch != ''?'on':''"
        @click.stop
        @contextmenu.prevent
        @contextmenu.stop="copy"
        v-show="$store.state.isfocus&&$store.state.isHitokoto"
        transiton="hitokoto"
      >
        <p class="content" id="content">「 {{content.hitokoto}} 」</p>
        <p class="author" id="author">-- {{content.from_who}}</p>
      </div>
    </transition>
    <history-box @clearHistory="clearHistory" @click="historySousuo" :historySerch="historySerch"></history-box>
  </div>
</template>

<script>
import historyBox from "./History.vue";
export default {
  data() {
    return {
      value: "",
      isActive: 0,
      content: {
        hitokoto: "",
        from: "",
        from_who: ""
      },
      historySerch: []
    };
  },
  methods: {
    isFocus(is) {
      if (this.$store.state.isClear) {
        this.value = "";
      }
      this.$store.commit("isFocus", is);
    },
    contextmenu() {
      this.$emit("contextmenu");
    },
    historySousuo(value) {
      this.value = value;
      this.search();
    },
    search() {
      if (this.$store.state.isBlank) {
        let src = this.$store.state.searchurl + this.value;
        window.open(src);
      } else {
        window.location.href = this.$store.state.searchurl + this.value;
      }

      if (this.$store.state.isHistory) {
        this.historySerch = JSON.parse(localStorage.getItem("historySerch"));
        if (this.historySerch == null) {
          let li = [];
          li.unshift({ value: this.value });
          localStorage.setItem("historySerch", JSON.stringify(li));
          this.historySerch = JSON.parse(localStorage.getItem("historySerch"));
        } else {
          if (!this.historySerch.find(v => v.value === this.value)) {
            if (this.historySerch.length > 4) {
              this.historySerch.pop();
            }
            let li = this.historySerch;
            li.unshift({ value: this.value });
            localStorage.setItem("historySerch", JSON.stringify(li));
          }
        }
      }
    },
    changeEngine(index) {
      if (index == 0) {
        this.$store.commit(
          "changeSearchUrl",
          "https://www.baidu.com/s?ie=utf-8&word="
        );
      } else if (index == 1) {
        this.$store.commit("changeSearchUrl", "https://cn.bing.com/search?q=");
      } else {
        this.$store.commit(
          "changeSearchUrl",
          "https://www.google.com/search?q="
        );
      }
    },
    //获取一言
    async getHitokoto() {
      const { data: data } = await this.$http.get(
        "https://v1.hitokoto.cn/?c=d&c=i&encode=json"
      );
      if (data.from_who == null) {
        this.content.from_who = data.from;
        this.content.hitokoto = data.hitokoto;
      } else {
        this.content.hitokoto = data.hitokoto;
        this.content.from_who = data.from_who;
      }
    },
    //右键复制句子
    copy() {
      let hitokoto = document.getElementById("content").innerText;
      let from = document.getElementById("author").innerText;
      let oInput = document.createElement("input");
      oInput.value = hitokoto + from;
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand("Copy");
      alert("复制成功!\n" + oInput.value);
      document.body.removeChild(oInput);
    },
    //清空历史记录
    clearHistory() {
      this.historySerch = [];
      localStorage.removeItem("historySerch");
    }
  },
  created() {
    
    if (localStorage.getItem("historySerch") !== null) {
      this.historySerch = JSON.parse(localStorage.getItem("historySerch"));
    }
    this.getHitokoto();
  },
  components: {
    historyBox
  }
};
</script>

<style lang="less" scoped>
.search-box {
  position: absolute;
  z-index: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  user-select: none;
  .search {
    box-sizing: border-box;
    position: absolute;
    top: 200px;
    border-radius: 30px;
    height: 44px;
    background: rgba(0, 0, 0, 0.35);
    box-shadow: rgba(0, 0, 0, 0.2) 0 0 10px;
    backdrop-filter: blur(10px);
    padding: 5px;
    display: flex;
    justify-content: center;
    transition: all 0.25s;
    .search-txt {
      flex-basis: 50%;
      outline: none;
      border: none;
      background: none;
      flex: 1;
      padding: 0;
      font-size: small;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.8);
      line-height: 44px;
      width: 44px;
      transition: all 0.25s;
      margin-left: 15px;
      margin-right: 15px;
    }
    .search-btn {
      position: relative;
      width: 34px;
      height: 34px;
      background: rgba(99, 187, 208, 0.8);
      border-radius: 50%;
      overflow: hidden;
      .water {
        position: absolute;
        width: 46px;
        height: 46px;
        background: rgba(255, 255, 255, 0.8);
        top: 0;
        left: 50%;
        transform: translate(-50%, -55%);
        border-radius: 40%;
        animation: water 8s linear infinite;
      }
    }
    .search-btn-left {
      position: relative;
      width: 34px;
      height: 34px;
      border-radius: 50%;
    }
  }
  .search-click {
    color: #fff;
    background-color: rgba(30, 30, 30, 0.9) !important;
    input::-webkit-input-placeholder {
      /* WebKit browsers 适配谷歌 */
      color: rgba(0, 0, 0, 0);
    }
    input:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 适配火狐 */
      color: rgba(0, 0, 0, 0);
    }
    input::-moz-placeholder {
      /* Mozilla Firefox 19+ 适配火狐 */
      color: rgba(0, 0, 0, 0);
    }
    input:-ms-input-placeholder {
      /* Internet Explorer 10+  适配ie*/
      color: rgba(0, 0, 0, 0);
    }
  }
  .search:hover {
    background-color: rgba(30, 30, 30, 0.6);
    .search-txt {
      width: 500px;
    }
  }
  .engine-box {
    position: absolute;
    top: 280px;
    height: 44px;
    width: 300px;
    display: flex;
    justify-content: space-around;
    transition: all 0.25s ease-out;
    .engine-item {
      width: 44px;
      background: rgba(0, 0, 0, 0.15);
      border-radius: 15px;
      display: flex;
      align-items: center;
      box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.15),
        -6px -6px -12px rgba(255, 255, 255, 0.1);
      justify-content: center;
      transition: all 0.25s;
      i::before {
        font-size: 20px;
        background-image: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.25) 30%,
          rgba(255, 255, 255, 0.45) 50%
        );
        background-size: 200% 200%;
        background-position: 100% 100%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: background 0.5s linear;
      }
      .icon-baidu::before {
        background-image: linear-gradient(
          135deg,
          #11659a 50%,
          rgba(255, 255, 255, 0.65) 50%
        );
      }
      .icon-biying::before {
        background-image: linear-gradient(
          135deg,
          #ffb900 50%,
          rgba(255, 255, 255, 0.65) 50%
        );
      }
      .icon-google::before {
        background-image: linear-gradient(
          135deg,
          #ee3f4d 50%,
          rgba(255, 255, 255, 0.65) 50%
        );
      }
    }
    .engine-item:hover i::before {
      background-position: 0% 0%;
    }
    .active {
      border-radius: 50%;
      transform: scale(1.1);
      background: rgba(0, 0, 0, 0.4);
    }
  }
  .hitokoto {
    position: absolute;
    top: 100%;
    margin-top: -200px;
    width: 100%;
    text-align: center;
    transition: all 0.25s ease-out;
    padding: 0 150px;
    p {
      font-size: small;
      margin: 13px 0;
      color: rgba(255, 255, 255, 0.9);
    }
    .content {
      text-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    }
    .author {
      opacity: 0;
      transition: opacity 0.25s ease-out;
    }
  }
  .hitokoto::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    transition: opacity 0.25s ease-out;
    backdrop-filter: blur(30px);
    opacity: 0;
  }
  .hitokoto:hover::before {
    opacity: 1;
  }
  .hitokoto:hover {
    .author {
      opacity: 1;
    }
  }
}

//水的动画
@keyframes water {
  100% {
    transform: translate(-50%, -55%) rotate(360deg);
  }
}

//v-show过渡效果
.engine-enter-active,
.engine-leave-active {
  transition: all 0.25s ease;
}
.engine-enter,
.engine-leave-active {
  transform: translateY(-60px);
  opacity: 0;
}

.hitokoto-enter-active,
.hitokoto-leave-active {
  transition: all 0.25s ease;
}
.hitokoto-enter,
.hitokoto-leave-active {
  opacity: 0;
}

@media screen and (max-width: 650px) {
  .search-box {
    .search {
      top: 170px !important;
    }
    .search-click {
      .search-txt {
        width: 60vw !important;
      }
    }
    .engine-box {
      top: 240px;
      width: 60%;
      height: 34px;
      .engine-item {
        width: 34px;
      }
    }
    .hitokoto {
      top: 550px;
      font-size: 0.7em;
      padding: 0 50px;
    }
    .on{
      transition: all 0.25s ease-out;
      opacity: 0;
      display: none;
    }
  }
}
</style>