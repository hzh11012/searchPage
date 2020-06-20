import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowVideo: false, //是否动态壁纸
    imgurl: 'http://www.qnets.cn:8082/img/bg1.jpg', //静态壁纸 url
    videourl: '', //动态壁纸 url
    isfocus: true, //是否壁纸 放大+毛玻璃效果
    searchurl: 'https://www.baidu.com/s?ie=utf-8&word=', //搜索引擎 默认百度
    isShowSetting: false, //是否显示设置dialog
    isShowUser: false, //是否显示用户dialog
    isShowPopBg: false, //是否展示Pop-背景图片偏好面板
    isShowPopFankui: false, //是否展示Pop-反馈面板
    isShowPopJuanzhu: false, //是否展示Pop-捐助面板
    isShowPopEngine: false, //是否展示Pop-搜索引擎面板
    isShowPopChanggui: false, //是否展示Pop-常规面板
    isShowPopAbout: false, //是否 展示Pop-关于面板
    isClear: true, //是否自动清空搜索栏
    isBlank: false, //是否在新标签页显示搜索结果
    isHistory: false, //是否历史记录
    isHitokoto: true, //是否启用一言功能
    isShowPopRegister: false, //是否展示Pop-注册面板
    isShowPopLogin: false, //是否展示Pop-登录面板
    isShowPopSpace: false, //是否展示Pop-个人中心面板
    userInfo: {
      nickname: ''
    },
    isLogin: false, //是否登录
    isShowAdd: false, //是否 展示添加网站 面板
    isShowEdit: false, //是否 展示修改网站 面板
    isShowMenu: false, //是否 展示 添加网站面板的右键菜单面板
  },
  mutations: {
    isShowMenu(state, isShowMenu) {
      state.isShowMenu = isShowMenu;
    },
    isShowEdit(state, isShowEdit) {
      state.isShowEdit = isShowEdit;
    },
    isShowAdd(state, isShowAdd) {
      state.isShowAdd = isShowAdd;
    },
    isLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
    isShowVideo(state, isShow) {
      state.isShowVideo = isShow;
      localStorage.setItem('isShowVideo', JSON.stringify(state.isShowVideo));
    },
    imgurl(state, imgurl) {
      state.imgurl = imgurl;
      localStorage.setItem('imgUrl', JSON.stringify(state.imgurl));
    },
    videourl(state, videourl) {
      state.videourl = videourl;
      localStorage.setItem('videoUrl', JSON.stringify(state.videourl));
    },
    isFocus(state, isFocus) {
      state.isfocus = isFocus;
    },
    changeSearchUrl(state, url) {
      state.searchurl = url;
      localStorage.setItem('searchUrl', JSON.stringify(state.searchurl));
    },
    isShowSetting(state, isShowSetting) {
      state.isShowSetting = isShowSetting;
    },
    isShowUser(state, isShowUser) {
      state.isShowUser = isShowUser;
    },
    isShowPopBg(state, isShowPopBg) {
      state.isShowPopBg = isShowPopBg;
    },
    isShowPopFankui(state, isShowPopFankui) {
      state.isShowPopFankui = isShowPopFankui;
    },
    isShowPopJuanzhu(state, isShowPopJuanzhu) {
      state.isShowPopJuanzhu = isShowPopJuanzhu;
    },
    isShowPopEngine(state, isShowPopEngine) {
      state.isShowPopEngine = isShowPopEngine;
    },
    isShowPopChanggui(state, isShowPopChanggui) {
      state.isShowPopChanggui = isShowPopChanggui;
    },
    isShowPopRegister(state, isShowPopRegister) {
      state.isShowPopRegister = isShowPopRegister;
    },
    isShowPopLogin(state, isShowPopLogin) {
      state.isShowPopLogin = isShowPopLogin;
    },
    isShowPopSpace(state, isShowPopSpace) {
      state.isShowPopSpace = isShowPopSpace;
    },
    isShowPopAbout(state, isShowPopAbout) {
      state.isShowPopAbout = isShowPopAbout;
    },
    isClear(state, isClear) {
      state.isClear = isClear;
      localStorage.setItem('isClear', JSON.stringify(state.isClear));
    },
    isBlank(state, isBlank) {
      state.isBlank = isBlank;
      localStorage.setItem('isBlank', JSON.stringify(state.isBlank));
    },
    isHistory(state, isHistory) {
      state.isHistory = isHistory;
      localStorage.setItem('isHistory', JSON.stringify(state.isHistory));
    },
    isHitokoto(state, isHitokoto) {
      state.isHitokoto = isHitokoto;
      localStorage.setItem('isHitokoto', JSON.stringify(state.isHitokoto));
    },
    userInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {
  },
  modules: {
  }
})
