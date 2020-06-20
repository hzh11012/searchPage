<template>
  <div class="home" :style="'height:'+ bodyHeight + 'px'" @contextmenu.prevent>
    <wall-paper></wall-paper>
    <transition name="opacity">
      <search-page v-show="showSearch" @contextmenu="searchOrTag" transiton="opacity"></search-page>
    </transition>
    <transition name="opacity">
      <tag-page v-show="!showSearch" @click="searchOrTag" transiton="opacity"></tag-page>
    </transition>
    <time-date @searchOrTag="searchOrTag"></time-date>
    <footers></footers>
    <bg-pop></bg-pop>
    <fk-pop></fk-pop>
    <jz-pop></jz-pop>
    <engine-pop></engine-pop>
    <cg-pop></cg-pop>
    <register-pop></register-pop>
    <login-pop></login-pop>
    <space-pop></space-pop>
    <about-pop></about-pop>
  </div>
</template>

<script>
import timeDate from "../components/Time.vue";
import wallPaper from "../components/Wallpaper.vue";
import searchPage from "../components/Search.vue";
import footers from "../components/Footer.vue";
import tagPage from "../components/Tag.vue";
import bgPop from "../components/SettingItem/BackImg.vue";
import fkPop from "../components/SettingItem/Fankui.vue";
import jzPop from "../components/SettingItem/Juanzhu.vue";
import enginePop from "../components/SettingItem/Engine.vue";
import cgPop from "../components/SettingItem/Changgui.vue";
import registerPop from "../components/Register.vue";
import loginPop from "../components/Login.vue";
import spacePop from "../components/UserSpace.vue";
import aboutPop from "../components/About.vue";
export default {
  components: {
    timeDate,
    wallPaper,
    searchPage,
    footers,
    tagPage,
    bgPop,
    fkPop,
    jzPop,
    enginePop,
    cgPop,
    registerPop,
    loginPop,
    spacePop,
    aboutPop
  },
  data() {
    return {
      showSearch: true,
      bodyHeight: ""
    };
  },
  methods: {
    searchOrTag() {
      this.showSearch = !this.showSearch;
      this.$store.commit("isShowUser", false);
      this.$store.commit("isShowEdit", false);
      this.$store.commit("isShowSetting", false);
      this.$store.commit("isShowAdd", false);
      this.$store.commit("isShowMenu", false);
    }
  },
  created() {
    let isShowVideo = JSON.parse(localStorage.getItem("isShowVideo"));
    let imgUrl = JSON.parse(localStorage.getItem("imgUrl"));
    let videoUrl = JSON.parse(localStorage.getItem("videoUrl"));
    let searchUrl = JSON.parse(localStorage.getItem("searchUrl"));
    let isClear = JSON.parse(localStorage.getItem("isClear"));
    let isBlank = JSON.parse(localStorage.getItem("isBlank"));
    let isHistory = JSON.parse(localStorage.getItem("isHistory"));
    let isHitokoto = JSON.parse(localStorage.getItem("isHitokoto"));

    if (isShowVideo == null) {
      localStorage.setItem(
        "isShowVideo",
        JSON.stringify(this.$store.state.isShowVideo)
      );
    } else {
      this.$store.commit("isShowVideo", isShowVideo);
    }

    if (imgUrl == null) {
      localStorage.setItem("imgUrl", JSON.stringify(this.$store.state.imgurl));
    } else {
      this.$store.commit("imgurl", imgUrl);
    }

    if (videoUrl == null) {
      localStorage.setItem(
        "videoUrl",
        JSON.stringify(this.$store.state.videourl)
      );
    } else {
      this.$store.commit("videourl", videoUrl);
    }

    if (searchUrl == null) {
      localStorage.setItem(
        "searchUrl",
        JSON.stringify(this.$store.state.searchurl)
      );
    } else {
      this.$store.commit("changeSearchUrl", searchUrl);
    }

    if (isClear == null) {
      localStorage.setItem(
        "isClear",
        JSON.stringify(this.$store.state.isClear)
      );
    } else {
      this.$store.commit("isClear", isClear);
    }
    if (isBlank == null) {
      localStorage.setItem(
        "isBlank",
        JSON.stringify(this.$store.state.isBlank)
      );
    } else {
      this.$store.commit("isBlank", isBlank);
    }
    if (isHistory == null) {
      localStorage.setItem(
        "isHistory",
        JSON.stringify(this.$store.state.isHistory)
      );
    } else {
      this.$store.commit("isHistory", isHistory);
    }
    if (isHitokoto == null) {
      localStorage.setItem(
        "isHitokoto",
        JSON.stringify(this.$store.state.isHitokoto)
      );
    } else {
      this.$store.commit("isHitokoto", isHitokoto);
    }
  },
  mounted() {
    this.bodyHeight = document.documentElement.clientHeight;
  }
};
</script>

<style lang="less" scoped>
.home {
  position: absolute;
  width: 100%;
}

.opacity-enter-active,
.opacity-leave-active {
  transition: all 0.25s ease;
}
.opacity-enter,
.opacity-leave-active {
  opacity: 0;
}
</style>
