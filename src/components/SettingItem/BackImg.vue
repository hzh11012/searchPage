<template>
  <transition name="panel">
    <div class="bg-box" v-if="$store.state.isShowPopBg" transiton="panel">
      <div class="bg">
        <span class="close-btn" @click="close">
          <i class="iconfont icon-x"></i>
        </span>
        <div class="title">背景图像偏好</div>
        <div class="content">
          <div class="pTitleS">默认</div>
          <div
            class="bgPreviewBox"
            @click="selectThume(item,0)"
            v-for="item in defultWallpaper"
            :key="item.id"
            :title="item.title"
          >
            <div class="bgPreBoxInner" :style="{backgroundImage:'url('+item.href+')'}">
              <span class="bgPreBoxMask"></span>
              <i v-show="item.href == $store.state.imgurl" class="iconfont icon-dui"></i>
            </div>
          </div>
          <div class="pTitleS">必应</div>
          <div
            class="bgPreviewBox"
            @click="selectThume(biyingWallpaper,0)"
            :title="biyingWallpaper.copyrights"
          >
            <div class="bgPreBoxInner" :style="{backgroundImage:'url('+biyingWallpaper.href+')'}">
              <span class="bgPreBoxMask"></span>
              <i v-show="biyingWallpaper.href == $store.state.imgurl" class="iconfont icon-dui"></i>
            </div>
          </div>
          <div class="bgCusBoxR">
            <span class="titleBold">好康的壁纸，每日更新。</span>
            <div class="pTitleS pWallpaperInfo">{{this.biyingWallpaper.copyright}}</div>
            <div class="pTitleS">
              图像来源：
              <a href="https://cn.bing.com/" target="_blank" class="links1">必应</a>
              &nbsp;&nbsp;
              <a
                :href="biyingWallpaper.href"
                target="_blank"
                class="links1"
              >点此下载</a>
            </div>
          </div>
          <div class="pTitleS">动态</div>
          <div
            class="bgPreviewBox"
            @click="selectThume(item,1)"
            v-for="item in liveWallpaper"
            :key="item.id"
            :title="item.title"
          >
            <div class="bgPreBoxInner" :style="{backgroundImage:'url('+item.href+')'}">
              <span class="bgPreBoxMask"></span>
              <i v-show="item.href == $store.state.imgurl" class="iconfont icon-dui"></i>
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
      defultWallpaper: [
        {
          title:
            "东库特尼的埃尔克河，加拿大不列颠哥伦比亚省 (© Carson Ganci / First Light / age fotostock)",
          href: "http://www.qnets.cn:8082/img/bg1.jpg"
        },
        {
          title:
            "瓦尔内明德的灯塔，德国梅克伦堡-前波美拉尼亚州罗斯托克市 (© Sandra Kreuzinger / Moment Open / Getty Images)",
          href: "http://www.qnets.cn:8082/img/bg2.jpg"
        },
        {
          title:
            "孚日山脉的针叶林，法国 (© Radomir Jakubowski / Minden Pictures)",
          href: "http://www.qnets.cn:8082/img/bg3.jpg"
        },
        {
          title: "布莱顿码头，阿德莱德布莱顿 (© Darryl Leach / Alamy)",
          href: "http://www.qnets.cn:8082/img/bg4.jpg"
        },
        {
          title:
            "Loughrigg Tarn的日出，英国英格兰湖区安布尔塞德 (© John Finney photography / Getty Images",
          href: "http://www.qnets.cn:8082/img/bg5.jpg"
        },
        {
          title:
            "缅因州达马里斯科塔地区的佩马基德灯塔 (© Tom Whitney / Adobe Stock)",
          href: "http://www.qnets.cn:8082/img/bg6.jpg"
        }
      ],
      biyingWallpaper: {
        href: "",
        copyright: ""
      },
      liveWallpaper: [
        {
          title:
            "Old bridge (© Arseniy Chebynkin / DerDenniis / Wallpaper Engine)",
          href: "http://www.qnets.cn:8082/img/live1.png",
          videourl: "http://www.qnets.cn:8082/video/Live_Wallpaper_1.mp4"
        },
        {
          title: "Cabin by the lake (© HoHoHO / Wallpaper Engine)",
          href: "http://www.qnets.cn:8082/img/live2.png",
          videourl: "http://www.qnets.cn:8082/video/Live_Wallpaper_2.mp4"
        }
      ]
    };
  },
  methods: {
    async getBing() {
      const { data: data } = await this.$http.get(
        "http://123.57.37.150:2019/bing?idx=0&n=1"
      );
      this.biyingWallpaper.href = "https://cn.bing.com" + data.images[0].url;
      this.biyingWallpaper.copyright = data.images[0].copyright;
    },
    close() {
      this.$store.commit("isShowPopBg", false);
    },
    selectThume(item, id) {
      if (id == 1) {
        this.$store.commit("isShowVideo", true);
        this.$store.commit("imgurl", item.href);
        this.$store.commit("videourl", item.videourl);
      } else {
        this.$store.commit("isShowVideo", false);
        this.$store.commit("imgurl", item.href);
      }
    }
  },
  created() {
    this.getBing();
  }
};
</script>

<style lang="less" scoped>
.bgPreviewBox {
  position: relative;
  display: inline-block;
  margin-top: 10px;
  margin-right: 6px;
  left: 0;
  width: 135px;
  height: 90px;
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.25s ease-out;
  .bgPreBoxInner {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: transparent;
    transition: all 0.25s;
    background-position: center;
    background-size: cover;
    .bgPreBoxMask {
      position: absolute;
      width: 100%;
      height: 100%;
      transition: all 0.25s;
      background-position: center;
      background-size: cover;
    }
    i {
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -16px;
      margin-top: -16px;
      font-size: 32px !important;
      color: rgba(255, 255, 255, 0.85);
    }
  }
  .bgPreBoxInner:hover {
    .bgPreBoxMask {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
}
.bgCusBoxR {
  position: absolute;
  display: inline-block;
  margin-left: 20px;
  margin-top: 8px;
  transition: all 0.25s ease-out;
  .titleBold {
    color: white;
    font-size: 15px;
    font-weight: 700;
  }
  .links1 {
    text-decoration: none;
    color: rgba(99, 187, 208, 0.75);
    cursor: pointer;
    transition: all 0.25s;
  }
  .links1:hover {
    color: rgba(99, 187, 208, 1);
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
        .bgPreviewBox {
          width: calc(50% - 10px);
          height: 23vw;
        }
        .bgCusBoxR {
          margin-left: 5px;
          margin-right: 10px;
          .pWallpaperInfo {
            display: none;
          }
        }
      }
    }
  }
}
</style>