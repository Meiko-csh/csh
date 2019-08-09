<template>
  <div class="we">
    <head1></head1>
    <div class="fandian">
      <img :src="require('../../assets/fandian.jpg')" class="imgs1" />
      <div class="wenzi1">
        <h1>关于我们</h1>
        <p>北京柒捌饭店深受休闲旅客和商务人士的青睐,</p>
        <p>提供北京奢华的住宿体验，包含豪华的住宿、环</p>
        <p>球美食、齐全的设施以及个性化服务。</p>
      </div>
    </div>
    <div class="weizhi">
      <div class="weizhi1">
        <div class="title1">地理位置</div>
        <img :src="require('../../assets/weizhi.jpg')" class="imgs2" />
        <div class="dili" :class="wz">
          <p>北京丽晶酒店地理位置优越，方便您探索首</p>
          <p>都北京最具标志性的历史和文化景点，以及</p>
          <p>现代都市景观。</p>
          <ul>
            <li>距离紫禁城1.5公里</li>
            <li>距离海淀区2.8公里</li>
            <li>距离北京首都国际机场28公里</li>
            <li>距离王府井1公里</li>
          </ul>
        </div>
        <span @click="remo">+</span>
      </div>
      <div class="weizhi1">
        <div class="title1">餐饮</div>
        <img :src="require('../../assets/xia.png')" class="imgs2" />
        <div class="dili" :class="wz1">
          <p>酒店的五家国际风格餐厅，荣膺北京奢华就</p>
          <p style="margin-bottom:30px;">餐选择，给您提供饕餮之享。</p>
          <ul>
            <li>金宝99 –国际风格的餐吧</li>
            <li>
              柒捌 - 全天候茶点、下午茶、高档
              <br />白酒
              迪卡博 - 现代意大利美食
            </li>
          </ul>
        </div>
        <span @click="remo1">+</span>
      </div>
    </div>
  </div>
</template>

<script>
import head1 from "./head.vue";
export default {
  data() {
    return {
      wz: { remove: false, re: true },
      wz1: {
        remove: false,
        re: true
      }
    };
  },
  methods: {
    remo() {
      if (this.wz.remove == false) {
        this.wz.remove = true;
        this.wz.re = false;
      } else {
        this.wz.remove = false;
        this.wz.re = true;
      }
    },
    remo1() {
      if (this.wz1.remove == false) {
        this.wz1.remove = true;
        this.wz1.re = false;
      } else {
        this.wz1.remove = false;
        this.wz1.re = true;
      }
    }
  },
  components: {
    head1
  }
};
</script>
<style scoped>
.imgs1 {
  height: 260px;
  width: 100%;
}
.wenzi1 {
  width: 100%;
  height: 250px;
  padding-top: 45px;

  padding-bottom: 10px;
  background: #fff;
}
.wenzi1 > h1 {
  text-align: center;
  color: rgba(0, 0, 0, 0.7);
  font-size: 2.25em;
  font-weight: 300;
  margin-bottom: 15px;
}
.wenzi1 > p {
  text-align: center;
  color: rgba(0, 0, 0, 0.7);
}
.weizhi {
  width: 100%;
  background: #e6e3e3;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.weizhi > .weizhi1 {
  padding-top: 20px;
  margin-bottom: 20px;
}
.imgs2 {
  width: 305px;
  height: 174px;
}
.title1 {
  font-size: 1.625em;
  color: #383838;
  margin-bottom: 12px;
  font-weight: 300;
  margin-top: 20px;
}
.dili {
  font-weight: 400;
  color: #686868;
}
.dili > p {
  margin-bottom: 5px;
}
.dili > ul {
  margin-left: 27px;
}

.re {
  height: 170px;
  transition: all 0.3s linear;
  overflow: hidden;
}
.remove {
  height: 0;
  transition: all 0.3s linear;
  overflow: hidden;
}
</style>
