<template>
  <transition name="panel">
    <div class="bg-box" v-if="$store.state.isShowPopAbout" transiton="panel">
      <div class="bg">
        <span class="close-btn" @click="close">
          <i class="iconfont icon-x"></i>
        </span>
        <div class="aboutLogo-box">
          <div class="aboutLogo"></div>
          <span>轻念起始页</span>
        </div>
        <div class="content">
          <p class="version">2.0</p>
          <p class="about">
            这里是贺之杭的轻念起始页(〃'▽'〃)
            <br />个人独自开发（详见更新日志）
            <br />如果你喜欢这个主页，可以
            <a @click="juanzhu">捐助我</a>。Have a nice day!
            <br />
            <br />
          </p>
          <div class="changeLog">
            <p>
              起始页已上线
              <span>{{day}}</span> 天
              <br />最后更新：2020.6.13
            </p>2020.6.13
            <br />
            <span class="tag">新增</span>适配移动设备
            <br />
            <span class="tag">新增</span>本地天气
            <br />
            <span class="tag">新增</span>注册/登录
            <br />
            <span class="tag">新增</span>自定义导航标签
            <br />
            <span class="tag">新增</span>一言功能的开关
            <br />
            <span class="tag">新增</span>在新标签页显示搜索结果功能
            <br />
            <span class="tag">新增</span>自动清空搜索栏功能
            <br />
            <span class="tag">新增</span>历史记录
            <br />
            <span class="tag gaijin">改进</span>一言现在可以右键(PC)/长按(移动)复制
            <br />
            <span class="tag gaijin">改进</span>添加常用链接;交互细节调整
            <br />
            <span class="tag gaijin">改进</span>UI美化
            <br />
            <span class="tag gaijin">改进</span>动画优化
            <br />
            <span class="tag" style="margin-left:10px"></span>2.0上线
            <br />
            <br />2020.6.7
            <br />
            <span class="tag" style="margin-left:10px"></span>上线
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
      today: new Date().getTime()
    };
  },
  methods: {
    close() {
      this.$store.commit("isShowPopAbout", false);
    },
    juanzhu() {
      this.$store.commit("isShowPopAbout", false);
      this.$store.commit("isShowPopJuanzhu", true);
    }
  },
  computed: {
    day() {
      let s1 = "2020-06-07";
      s1 = new Date(s1.replace(/-/g, "/"));
      let day = this.today - s1.getTime();
      let time = parseInt(day / (1000 * 60 * 60 * 24));
      return time + 1;
    }
  }
};
</script>

<style lang="less" scoped>
.aboutLogo-box {
  position: relative;
  top: 60px;
  left: calc(50% - 117.5px);
  width: 235px;
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .aboutLogo {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    background-image: url(http://www.qnets.cn:8082/img/search_logo.jpg);
  }
  span {
    font-size: 30px;
    font-weight: 300;
    color: rgba(99, 187, 208, 0.9);
  }
}
.content {
  text-align: center;
  .version {
    margin: 20px 0 11px 0;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
  }
  .about {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
    margin-top: -5px;
    margin-bottom: 12px;
    a {
      color: rgba(99, 187, 208, 0.9);
      transition: all 0.25s;
    }
    a:hover {
      color: rgba(99, 187, 208, 0.6);
    }
  }
  .changeLog {
    border-top: solid 1px rgba(99, 187, 208, 0.6);
    color: rgba(255, 255, 255, 0.7);
    font-size: 11px;
    height: 220px;
    line-height: 18px;
    margin: 0 5%;
    overflow: auto;
    text-align: left;
    p {
      margin: 12px 0;
    }
    .tag {
      margin: 0 5px 0 15px;
      color: rgba(99, 187, 208, 0.9);
    }
    .gaijin {
      color: rgba(164, 186, 128, 0.9);
    }
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
      .aboutLogo-box {
        left: calc(50% - 100px);
        width: 200px;
        height: 47px;
        .aboutLogo {
          width: 47px;
          height: 47px;
        }
      }
      .content {
        left: 5%;
        width: 90%;
        .version{
            margin-top: 10px;
        }
      }
    }
  }
}
</style>