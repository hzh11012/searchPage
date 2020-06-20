<template>
  <div class="weather">
    <span v-cloak>{{weatherInfo.city}}</span>
    <div>
      <img
        class="wea-img"
        :src="'http://www.qnets.cn:8082/weatherImg/'+ weatherInfo.wea_img +'.png'"
      />
    </div>
    <span v-cloak>{{weatherInfo.tem}}°</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weatherInfo: {
        city: "",
        tem: "",
        wea_img: "yun"
      }
    };
  },
  methods: {
    async getWeather() {
      const { data: data } = await this.$http.get(
        "https://tianqiapi.com/api?version=v6&appid=32962214&appsecret=Za6oI3Ag&vue=1"
      );
      this.weatherInfo.city = data.city;
      this.weatherInfo.tem = data.tem;
      this.weatherInfo.wea_img = data.wea_img;
    }
  },
  created() {
    this.getWeather();
  }
};
</script>


<style lang="less" scoped>
.weather {
  position: absolute;
  left: 10px;
  bottom: 10px;
  display: flex;
  color: #fff;
  transition: all .25s ease-out;
  .wea-img {
    width: 22px;
    margin: 0 5px;
  }
}

@media screen and (max-width: 650px) {
  .weather {
    bottom: 100%;
    transform: translateY(calc(100% + 10px));
  }
}
</style>