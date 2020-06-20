<template>
  <footer>
    <span class="footer-box">
      <a class="links" href="http://www.qnets.cn/" title="轻念 | 念念不忘" target="_blank">© 2020 轻念网络</a>
      丨
      <a
        class="links"
        title="关于「轻念起始页」"
        @click="$store.commit('isShowPopAbout',true)"
      >关于</a>
    </span>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
footer {
  box-sizing: border-box;
  position: absolute;
  bottom: 10px;
  width: 200px;
  font-size: 12px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
  .footer-box {
    box-sizing: border-box;
    display: inline-block;
    padding: 3px 10px;
    border-radius: 6px;
    backdrop-filter: blur(10px);
    .links {
      text-decoration: none;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      transition: all 0.25s;
    }
  }
}
</style>