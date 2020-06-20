<template>
  <transition name="panel">
    <div class="bg-box" v-if="$store.state.isShowPopFankui" transiton="panel">
      <div class="bg">
        <span class="close-btn" @click="close">
          <i class="iconfont icon-x"></i>
        </span>
        <div class="title">反馈</div>
        <div class="content">
          <p class="pAbout">
            如需反馈问题、提供建议、或者与作者谈笑风生，请加入QQ群：
            <a
              target="_blank"
              href="https://jq.qq.com/?_wv=1027&k=ddNPtvSP"
            >46540701</a>
            <br />建议先阅读下面的常见问题解答喔
          </p>
          <div class="feedbackItem">
            <span class="titleBold">为什么按下回车无法搜索/同时打开两次搜索结果？</span>
            <div class="pTitleS">1. 可能是你安装的浏览器扩展冲突了，可以把扩展都关掉逐个排查； 2. 可能是你的浏览器没有开启“允许弹出窗口”权限，打开就行啦。</div>
          </div>
          <div class="feedbackItem">
            <span class="titleBold">为什么搜索栏会鬼畜/按下回车搜索打开的是空白页？</span>
            <div class="pTitleS">你的浏览器内核版本过低，建议换到最新版本的Chrome浏览器或Chromium内核的Edge浏览器就可以啦。</div>
          </div>
          <div class="feedbackItem">
            <span class="titleBold">每次打开网站捷径页都要点击「时间」，有更快捷的方法吗？</span>
            <div class="pTitleS">在页面空白处直接单击鼠标右键即可。</div>
          </div>
          <div class="feedbackItem">
            <span class="titleBold">搜索栏周围有一圈黑边？</span>
            <div class="pTitleS">请尝试关闭你显示器的HDR模式。</div>
          </div>
          <div class="feedbackItem">
            <span class="titleBold">每次重启浏览器都要重新登录账号啊？</span>
            <div class="pTitleS">可能是因为浏览器开启了“退出时清理浏览痕迹”或者没有允许起始页的Cookie权限，把权限打开就会自动登录啦。</div>
          </div>
          <div class="feedbackItem">
            <span class="titleBold">为什么无法把起始页设置成浏览器主页？</span>
            <div class="pTitleS">大概率是杀毒软件的锅。看看杀毒软件的设置里是不是把浏览器主页锁定成别的了？</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    close() {
      this.$store.commit("isShowPopFankui", false);
    }
  }
};
</script>

<style lang="less" scoped>
.pAbout {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 12px;
  a {
    text-decoration: none;
    color: rgba(99, 187, 208, 0.9) !important;
    transition: all 0.25s;
  }
  a:hover {
    color: rgba(99, 187, 208, 0.6) !important;
  }
}
.feedbackItem {
  position: relative;
  top: 5px;
  margin-top: 15px;
  .titleBold {
    color: rgba(255, 255, 255, 0.8);
    font-size: 15px;
    font-weight: 700;
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
    }
  }
}
</style>