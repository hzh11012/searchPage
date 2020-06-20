<template>
  <transition name="panel">
    <div class="bg-box" v-if="$store.state.isShowPopEngine" transiton="panel">
      <div class="bg">
        <span class="close-btn" @click="close">
          <i class="iconfont icon-x"></i>
        </span>
        <div class="title">搜索引擎偏好</div>
        <div class="content">
          <div class="titleBold">主搜索引擎</div>
          <div class="serachEngList">
            <div
              class="searchEngListItem"
              @click="selectEngine(item)"
              v-for="(item,index) in mainEngine"
              :key="index"
            >
              <div class="searchEngName">
                {{item.title}}
                <span class="searchEngUrl">{{item.src}}</span>
                <i class="iconfont icon-dui" v-show="item.src == $store.state.searchurl"></i>
              </div>
            </div>
          </div>
          <div class="titleBold">次搜索引擎</div>
          <div class="serachEngList">
            <div
              class="searchEngListItem"
              @click="selectEngine(item)"
              v-for="(item,index) in secondaryEngine"
              :key="index"
            >
              <div class="searchEngName">
                {{item.title}}
                <span class="searchEngUrl">{{item.src}}</span>
                <i class="iconfont icon-dui" v-show="item.src == $store.state.searchurl"></i>
              </div>
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
    return {
      mainEngine: [
        { title: "百度", src: "https://www.baidu.com/s?ie=utf-8&word=" },
        { title: "必应", src: "https://cn.bing.com/search?q=" },
        { title: "谷歌", src: "https://www.google.com/search?q=" }
      ],
      secondaryEngine: [
        { title: "多吉搜索", src: "https://www.dogedoge.com/results?q=" },
        { title: "Magi", src: "https://magi.com/search?q=" },
        { title: "LooKao", src: "https://lookao.com/search?q=" },
        { title: "DuckDuckGo", src: "https://duckduckgo.com/?q=" },
        { title: "秘迹搜索", src: "https://mijisou.com/?q=" },
        { title: "搜狗搜索", src: "https://www.sogou.com/web?query=" },
        { title: "360搜索", src: "https://www.so.com/s?q=" }
      ]
    };
  },
  methods: {
    close() {
      this.$store.commit("isShowPopEngine", false);
    },
    selectEngine(item) {
      this.$store.commit("changeSearchUrl", item.src);
    }
  }
};
</script>

<style lang="less" scoped>
.titleBold {
  color: white;
  font-family: microsoft yahei, sans-serif;
  font-size: 15px;
  font-weight: 700;
}
.serachEngList {
  margin-top: 10px;
  margin-bottom: 20px;
  .searchEngListItem {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    padding: 10px 30px;
    border-bottom: solid 1px rgba(255, 255, 255, 0.1);
    cursor: pointer;
    transition: all 0.25s;
    .searchEngName {
      color: rgba(255, 255, 255, 0.9);
      position: relative;
      .searchEngUrl {
        position: absolute;
        left: 100px;
        color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
      }
      .iconfont {
        position: absolute;
        right: 0;
        color: rgba(99, 187, 208, 0.9);
      }
    }
  }
  .searchEngListItem:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
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
        .serachEngList {
          .searchEngListItem {
            padding: 10px 20px;
            .searchEngUrl {
              left: 85px;
              width: calc(100% - 105px);
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
}
</style>