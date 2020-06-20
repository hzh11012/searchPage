<template>
  <div class="tag-box" @click="click">
    <div class="tag-defult">
      <span @click.stop class="tag-item" v-for="(item,index) in tags" :key="index">
        <a target="_blank" :href="item.href">
          <i class="iconfont" :class="item.icon"></i>
          <span>{{item.title}}</span>
        </a>
      </span>
    </div>
    <div class="tag-add">
      <div
        @click.stop="openurl(item.url)"
        @contextmenu="menu(item)"
        style="background-color: rgba(0, 0, 0, 0.6)"
        class="add-item"
        v-for="item in tagArr"
        :key="item._id"
      >
        <span class="item-title" v-text="item.title"></span>
      </div>
      <div @click.stop="addTag" class="add-item" v-for="item in 8-tagArr.length" :key="item._id">
        <i class="iconfont icon-jia"></i>
      </div>
    </div>
    <transition name="panel">
      <div class="menu" id="menu" v-show="$store.state.isShowMenu" transiton="panel">
        <div class="menu-item" @click.stop="editTag">编辑</div>
        <div class="menu-item" @click.stop="deleteTag">删除</div>
      </div>
    </transition>
    <transition name="panel">
      <div
        class="add-div"
        id="add-div"
        v-show="$store.state.isShowAdd"
        @click.stop
        transiton="panel"
      >
        <div class="popCaptionS">添加网站捷径</div>
        <span class="btnCloseS" @click="closeAdddiv">
          <i class="iconfont icon-x"></i>
        </span>
        <input class="inputCustom" v-model="url" placeholder="网址" type="text" />
        <input class="inputCustom inputCustom1" v-model="title" placeholder="标题" type="text" />
        <div class="add-btn" @click="add">添加</div>
      </div>
    </transition>
    <transition name="panel">
      <div
        class="add-div"
        id="edit-div"
        v-show="$store.state.isShowEdit"
        @click.stop
        transiton="panel"
      >
        <div class="popCaptionS">添加网站捷径</div>
        <span class="btnCloseS" @click="closeEditdiv">
          <i class="iconfont icon-x"></i>
        </span>
        <input class="inputCustom" v-model="url" placeholder="网址" type="text" />
        <input class="inputCustom inputCustom1" v-model="title" placeholder="标题" type="text" />
        <div class="add-btn" @click="edit">修改</div>
      </div>
    </transition>
    <weather></weather>
    <setting></setting>
  </div>
</template>

<script>
import weather from "./Weather";
import setting from "./Setting";
export default {
  data() {
    return {
      tags: [
        {
          href: "https://cn.bing.com/translator/",
          title: "翻译",
          icon: "icon-fanyi"
        },
        {
          href: "https://cn.bing.com/maps/",
          title: "地图",
          icon: "icon-ditu"
        },
        {
          href: "https://cn.bing.com/images/",
          title: "图片",
          icon: "icon-tupian"
        },
        {
          href: "https://mail.qq.com/",
          title: "QQ邮箱",
          icon: "icon-qqyouxiang"
        },
        {
          href: "https://email.163.com/",
          title: "网易邮箱",
          icon: "icon-163youxiang"
        },
        {
          href: "https://github.com/",
          title: "Github",
          icon: "icon-git"
        },
        {
          href: "https://tieba.baidu.com/",
          title: "百度贴吧",
          icon: "icon-tieba"
        },
        {
          href: "https://www.bilibili.com/",
          title: "Bilibili",
          icon: "icon-bilibili"
        },
        {
          href: "https://www.youku.com/",
          title: "优酷",
          icon: "icon-youku"
        },
        {
          href: "https://www.iqiyi.com/",
          title: "爱奇艺",
          icon: "icon-aiqiyi"
        },
        {
          href: "https://www.jd.com/",
          title: "京东",
          icon: "icon-jingdong"
        },
        {
          href: "https://www.taobao.com/",
          title: "淘宝",
          icon: "icon-taobao"
        },
        {
          href: "https://www.tmall.com/",
          title: "天猫",
          icon: "icon-tianmao"
        },
        {
          href: "https://music.163.com/",
          title: "云音乐",
          icon: "icon-wangyiyun"
        },
        {
          href: "https://pan.baidu.com/",
          title: "百度网盘",
          icon: "icon-wangpan"
        }
      ],
      title: "",
      url: "",
      tagArr: [],
      select: {}
    };
  },
  methods: {
    click() {
      this.$emit("click");
    },
    closeAdddiv() {
      this.$store.commit("isShowAdd", false);
    },
    closeEditdiv() {
      this.$store.commit("isShowEdit", false);
    },
    //打开添加面板
    addTag() {
      this.$store.commit("isShowAdd", true);
      this.$store.commit("isShowEdit", false);
      this.$store.commit("isShowMenu", false);
      let add = document.getElementById("add-div");
      var e = e || window.event;
      var oX = e.clientX;
      var oY = e.clientY;
      if (document.body.clientWidth - oX < 300) {
        add.style.left = oX - (330 - document.body.clientWidth + oX) + "px";
      } else if (oX < 300) {
        add.style.left = 30 + "px";
      } else {
        add.style.left = oX - 150 + "px";
      }
      add.style.top = oY - 178 + "px";
    },
    //打开修改面板
    editTag() {
      this.title = this.select.title;
      this.url = this.select.url;
      this.$store.commit("isShowEdit", true);
      this.$store.commit("isShowAdd", false);
      this.$store.commit("isShowMenu", false);
      let edit = document.getElementById("edit-div");
      var e = e || window.event;
      var oX = e.clientX;
      var oY = e.clientY;
      if (document.body.clientWidth - oX < 300) {
        edit.style.left = oX - (330 - document.body.clientWidth + oX) + "px";
      } else if (oX < 300) {
        edit.style.left = 30 + "px";
      } else {
        edit.style.left = oX - 150 + "px";
      }
      edit.style.top = oY - 178 + "px";
    },
    //添加数据
    async add() {
      let uid = JSON.parse(localStorage.getItem("_id"));
      if (uid != null) {
        if (this.title != "" && this.url != "") {
          await this.$http.post("http://123.57.37.150:2022/api/addtag", {
            uid: uid,
            title: this.title,
            url: this.url
          });
          this.$store.commit("isShowAdd", false);
          const { data } = await this.$http.post(
            "http://123.57.37.150:2022/api/userinfos",
            {
              uid: uid
            }
          );
          this.tagArr = data.tag;
        } else {
          console.log("不能为空");
        }
      } else {
        this.$store.commit("isShowPopLogin", true);
        this.$store.commit("isShowAdd", false);
      }
      this.title='';
      this.url='';
    },
    //修改数据
    async edit() {
      let uid = JSON.parse(localStorage.getItem("_id"));
      if (this.title != "" && this.url != "") {
        await this.$http.put(
          "http://123.57.37.150:2022/api/updatetag/" + this.select._id,
          { title: this.title, url: this.url }
        );
        this.$store.commit("isShowEdit", false);
        const { data } = await this.$http.post(
          "http://123.57.37.150:2022/api/userinfos",
          {
            uid: uid
          }
        );
        this.tagArr = data.tag;
      } else {
        console.log("不能为空");
      }
    },
    openurl(url) {
      if (url.substr(0, 7) == "http://") {
        window.open(url);
      } else if (url.substr(0, 8) == "https://") {
        window.open(url);
      } else {
        window.open("http://" + url);
      }
    },
    async gets() {
      const _id = JSON.parse(localStorage.getItem("_id"));
      const token = JSON.parse(localStorage.getItem("token"));
      if (token == null) {
        this.$store.commit("isLogin", false);
      } else {
        this.$store.commit("isLogin", true);
        const { data } = await this.$http.post(
          "http://123.57.37.150:2022/api/userinfos",
          {
            uid: _id
          }
        );
        const userInfo = {
          nickname: data.info[0].nickname
        };
        this.$store.commit("userInfo", userInfo);
        this.tagArr = data.tag;
      }
    },
    menu(item) {
      this.select = item;
      this.$store.commit("isShowMenu", true);
      this.$store.commit("isShowEdit", false);
      this.$store.commit("isShowAdd", false);
      let menu = document.getElementById("menu");
      var e = e || window.event;
      var oX = e.clientX;
      var oY = e.clientY;
      if (document.body.clientWidth - oX < 140) {
        menu.style.left = oX - (170 - document.body.clientWidth + oX) + "px";
      } else {
        menu.style.left = oX + "px";
      }
      menu.style.top = oY + "px";
    },
    //删除数据
    async deleteTag() {
      let uid = JSON.parse(localStorage.getItem("_id"));
      await this.$http.delete(
        "http://123.57.37.150:2022/api/deltag/" + this.select._id
      );
      this.$store.commit("isShowMenu", false);
      const { data } = await this.$http.post(
        "http://123.57.37.150:2022/api/userinfos",
        {
          uid: uid
        }
      );
      this.tagArr = data.tag;
    }
  },
  created() {
    this.gets();
  },
  components: {
    weather,
    setting
  }
};
</script>

<style lang="less" scoped>
.tag-box {
  position: absolute;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  user-select: none;
  .tag-defult {
    position: absolute;
    top: 200px;
    width: 660px;
    overflow: hidden;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    .tag-item {
      display: flex;
      justify-content: center; /* 水平居中 */
      align-items: center; /* 垂直居中 */
      width: 20%;
      height: 44px;
      transition: all 0.25s;
      a {
        outline: none;
        padding: 12px 0px;
        color: rgba(255, 255, 255, 0.8);
        font-size: small;
        text-decoration: none;
        display: flex;
        align-items: center; /* 垂直居中 */
        width: 100%;
        transition: all 0.25s;
        .iconfont {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.5);
          padding: 0 5px 0 25px;
          transition: all 0.25s;
        }
      }
    }
    .tag-item:hover {
      background-color: rgba(0, 0, 0, 0.3);
      a {
        color: rgba(99, 187, 208, 0.8);
        .iconfont {
          color: rgba(99, 187, 208, 0.8);
        }
      }
    }
  }
  .tag-add {
    position: absolute;
    width: 850px;
    bottom: 150px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    transition: all 0.25s;
    .add-item {
      position: relative;
      width: 100px;
      height: 70px;
      margin: 3px;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      cursor: pointer;
      transition: all 0.25s;
      .iconfont {
        position: absolute;
        font-size: 32px;
        color: rgba(255, 255, 255, 0.3);
        top: 50%;
        left: 50%;
        margin-left: -16px;
        margin-top: -16px;
        transition: all 0.25s;
      }
      .item-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        width: 80%;
        color: rgba(255, 255, 255, 0.8);
      }
    }
    .add-item:hover {
      background-color: rgba(27, 27, 27, 0.65);
      .iconfont {
        color: rgba(255, 255, 255, 0.6);
      }
      .item-title {
        color: rgba(255, 255, 255, 0.3);
      }
    }
    .add-item:active {
      background-color: rgba(27, 27, 27, 1);
    }
  }
  .menu {
    position: absolute;
    width: 140px;
    background-color: rgb(30, 30, 30);
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 10px 15px;
    transition: all 0.25s;
    .menu-item {
      padding-left: 20px;
      padding-top: 12px;
      padding-bottom: 12px;
      color: rgba(255, 255, 255, 0.8);
      font-size: 11px;
      transition: all 0.25s;
    }
  }
  .add-div {
    position: absolute;
    width: 300px;
    height: 156px;
    background-color: rgb(30, 30, 30);
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 10px 15px;
    transition: all 0.25s;
    .popCaptionS {
      position: relative;
      left: 10%;
      top: 15px;
      color: rgba(255, 255, 255, 0.8);
      font-size: small;
    }
    .btnCloseS {
      position: absolute;
      top: 12px;
      right: 20px;
      cursor: pointer;
      .iconfont {
        color: rgba(255, 255, 255, 0.6);
        transition: all 0.25s;
      }
      .iconfont:hover {
        color: rgba(99, 187, 208, 0.9);
      }
    }
    .inputCustom {
      height: 25px;
      border: none;
      outline: none;
      border-radius: 20px;
      color: white;
      position: relative;
      margin-top: 25px;
      left: 10%;
      padding: 0 15px;
      width: 80%;
      transition: all 0.25s;
      background-color: rgba(255, 255, 255, 0.05);
    }
    .inputCustom:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    .inputCustom1 {
      margin-top: 10px;
    }
    .add-btn {
      position: absolute;
      margin-top: 10px;
      right: 10%;
      padding: 5px 20px;
      font-size: 11px;
      border-radius: 20px;
      color: #fff;
      font-weight: 700;
      background-color: rgba(99, 187, 208, 0.8);
      transition: all 0.25s;
      cursor: pointer;
    }
    .add-btn:hover {
      background-color: rgba(99, 187, 208, 0.6);
    }
  }
}

input::-webkit-input-placeholder {
  /* WebKit browsers 适配谷歌 */
  color: rgba(255, 255, 255, 0.3);
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 适配火狐 */
  color: rgba(255, 255, 255, 0.3);
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ 适配火狐 */
  color: rgba(255, 255, 255, 0.3);
}
input:-ms-input-placeholder {
  /* Internet Explorer 10+  适配ie*/
  color: rgba(255, 255, 255, 0.3);
}

@media screen and (max-width: 650px) {
  .tag-box {
    .tag-defult {
      width: 95%;
      top: 170px;
      .tag-item {
        a {
          font-size: 11px;
          .iconfont {
            padding: 0 5px;
          }
          span {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
    .tag-add {
      width: 90%;
      bottom: 90px;
      .add-item {
        width: 20%;
      }
    }
  }
}

@media screen and (max-width: 900px) and (min-width: 650px) {
  .tag-box {
    .tag-add {
      width: 500px;
      .add-item {
        width: 20%;
      }
    }
  }
}
@media screen and (max-width: 500px) {
  .tag-box {
    .tag-add {
      .add-item {
        width: calc(25% - 6px);
      }
    }
  }
}

@media screen and (max-height: 660px) {
  .tag-box {
    .tag-add {
      bottom: 110px;
    }
  }
}
@media screen and (max-height: 600px) {
  .tag-box {
    .tag-add {
      bottom: 50px;
    }
  }
}
@media screen and (max-height: 540px) and (min-width: 600px) {
  .tag-box {
    .tag-add {
      display: none;
    }
  }
}
</style>