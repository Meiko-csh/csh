<template>
  <div>
    <!-- 一楼导航栏 -->
    <heading class="head"></heading>
    <div style="height:54.5px;"></div>
    <!-- 二楼轮播图 -->
    <mt-swipe class="n1">
      <mt-swipe-item v-for="(item,i) of carousel" :key="i">
        <img :src="`http://127.0.0.1:3000/${item.c_img_url}`" />
      </mt-swipe-item>
    </mt-swipe>
    <!--三楼 面板栏-->
    <div class="jg">
      <!-- 九宫格一层 -->
      <div class="jg-item">
        <div @click="hg" id="d1">
          <img src="../../assets/主菜.png" />
          <span>主菜</span>
        </div>
        <div @click="td" id="d2">
          <img src="../../assets/凉菜.png" alt />
          <span>凉菜</span>
        </div>
        <div @click="qgs" id="d3">
          <img src="../../assets/烧烤.png" alt />
          <span>烧烤</span>
        </div>
        <div @click="kjr" id="d4">
          <img src="../../assets/酒水.png" alt />
          <span>酒水</span>
        </div>
        <div @click="zs" id="d5">
          <img src="../../assets/主食.png" alt />
          <span>主食</span>
        </div>
      </div>
    </div>
    <!-- 面板 -->
    <div style="background-color:rgba(75, 75, 75, 0.1); width:100%; float:left">
      <div id="c1" class="cp-no" style="height:100%;width:100%;display:block;">
        <div class="cp-list" v-for="(item,i) of list" :key="i">
          <div class="list-top">
            <img :src="`http://127.0.0.1:3000/${item.img_url}`" @click="jump(item)" />
            <span>{{item.title}}</span>
          </div>
          <div class="list-bottom">
            <span class="price">￥{{item.price}}</span>
          </div>
          <div class="list-bottom1">
            <button class="btn-1"  @click="add(item)">加入购物车</button>
          </div>
        </div>
      </div>
      <div id="c2" class="cp-no" style="height:100%;width:100%">
        <div class="cp-list" v-for="(item,i) of list" :key="i">
          <div class="list-top">
            <img :src="`http://127.0.0.1:3000/${item.img_url}`"  @click="jump(item)" />
            <span>{{item.title}}</span>
          </div>
          <div class="list-bottom">
            <span class="price">￥{{item.price}}</span>
          </div>
          <div class="list-bottom1">
            <button class="btn-1"  @click="add(item)">加入购物车</button>
          </div>
        </div>
      </div>
      <div id="c3" class="cp-no" style="height:100%;width:100%">
        <div class="cp-list" v-for="(item,i) of list" :key="i">
          <div class="list-top">
            <img :src="`http://127.0.0.1:3000/${item.img_url}`"  @click="jump(item)" />
            <span>{{item.title}}</span>
          </div>
          <div class="list-bottom">
            <span class="price">￥{{item.price}}</span>
          </div>
          <div class="list-bottom1">
            <button class="btn-1"  @click="add(item)">加入购物车</button>
          </div>
        </div>
      </div>
      <div id="c4" class="cp-no" style="height:100%;width:100%">
        <div class="cp-list" v-for="(item,i) of list" :key="i">
          <div class="list-top">
            <img :src="`http://127.0.0.1:3000/${item.img_url}`"  @click="jump(item)" />
            <span>{{item.title}}</span>
          </div>
          <div class="list-bottom">
            <span class="price">￥{{item.price}}</span>
          </div>
          <div class="list-bottom1">
            <button class="btn-1" @click="add(item)">加入购物车</button>
          </div>
        </div>
      </div>
      <div id="c5" class="cp-no" style="height:100%;width:100%">
        <div class="cp-list" v-for="(item,i) of list" :key="i">
          <div class="list-top">
            <img :src="`http://127.0.0.1:3000/${item.img_url}`"  @click="jump(item)" />
            <span>{{item.title}}</span>
          </div>
          <div class="list-bottom">
            <span class="price">￥{{item.price}}</span>
          </div>
          <div class="list-bottom1">
            <button class="btn-1" @click="add(item)">加入购物车</button>
          </div>
        </div>
      </div>
    </div>
    <div class="iconfont icon-gouwu gwc" @click="jump2"></div>
    <div style="clear:both"></div>
    <footed class="gd"></footed>
  </div>
</template>
<script>
import { Header, Swipe, SwipeItem } from "mint-ui";
import Heading from "./head.vue";
import Footed from "./footer.vue";
import cartVue from "./cart.vue";
import Counter from "./counter.vue";
export default {
  components: {
    "mt-swipe": Swipe,
    "mt-swipe-item": SwipeItem,
    heading: Heading,
    footed: Footed,
    counter: Counter
  },
  data() {
    return {
      carousel: [],
      list: []
      // mid: a,
    };
  },
  methods: {
    add(item) {
      var url = "index_addList";
      var mid = item.mid;
      var uid = window.sessionStorage.getItem("data");
      if(uid===null){
        this.$router.push("/login");
        return;
      }else{
      var obj = { mid, uid };
      this.axios.get(url, { params: obj }).then(result => {
        if (result.data.code == 1) {
          this.$toast("添加成功");
        }
      });}
    },
    jump2() {
      this.$router.push("/cart");
    },
    jump(item) {
      this.$router.push({ path: "details", query: { id: item.mid } });
    },
    hg() {
      var c1 = document.getElementById("c1");
      var d1 = document.getElementById("d1");
      c1.style.display = "block";
      c2.style.display = "none";
      c3.style.display = "none";
      c4.style.display = "none";
      c5.style.display = "none";
      d1.style.borderBottom ="2px solid red";
      d2.style.borderBottom ="none"
      d3.style.borderBottom ="none"
      d4.style.borderBottom ="none"
      d5.style.borderBottom ="none"
      var url = "sel";
      var type = 0;
      var obj = { type };
      this.axios.get(url, { params: obj }).then(result => {
        this.list = result.data.data;
      });
    },
    td() {
      var c2 = document.getElementById("c2");
      var d2 = document.getElementById("d2");
      c1.style.display = "none";
      c2.style.display = "block";
      c3.style.display = "none";
      c4.style.display = "none";
      c5.style.display = "none";
      d1.style.borderBottom ="none";
      d2.style.borderBottom ="2px solid red"
      d3.style.borderBottom ="none"
      d4.style.borderBottom ="none"
      d5.style.borderBottom ="none"
      var url = "sel";
      var type = 1;
      var obj = { type };
      this.axios.get(url, { params: obj }).then(result => {
        this.list = result.data.data;
      });
    },
    qgs() {
      var c3 = document.getElementById("c3");
      var d3 = document.getElementById("d3");
      c1.style.display = "none";
      c2.style.display = "none";
      c3.style.display = "block";
      c4.style.display = "none";
      c5.style.display = "none";
      d1.style.borderBottom ="none";
      d2.style.borderBottom ="none"
      d3.style.borderBottom ="2px solid red"
      d4.style.borderBottom ="none"
      d5.style.borderBottom ="none"
      var url = "sel";
      var type = 2;
      var obj = { type };
      this.axios.get(url, { params: obj }).then(result => {
        this.list = result.data.data;
      });
    },
    kjr() {
      var c4 = document.getElementById("c4");
      var d4 = document.getElementById("d4");
      c1.style.display = "none";
      c2.style.display = "none";
      c3.style.display = "none";
      c4.style.display = "block";
      c5.style.display = "none";
      d1.style.borderBottom ="none";
      d2.style.borderBottom ="none"
      d3.style.borderBottom ="none"
      d4.style.borderBottom ="2px solid red"
      d5.style.borderBottom ="none"
      var url = "sel";
      var type = 3;
      var obj = { type };
      this.axios.get(url, { params: obj }).then(result => {
        this.list = result.data.data;
      });
    },
    zs() {
      var c5 = document.getElementById("c5");
      var d5 = document.getElementById("d5");
      c1.style.display = "none";
      c2.style.display = "none";
      c3.style.display = "none";
      c4.style.display = "none";
      c5.style.display = "block";
      d1.style.borderBottom ="none";
      d2.style.borderBottom ="none"
      d3.style.borderBottom ="none"
      d4.style.borderBottom ="none"
      d5.style.borderBottom ="2px solid red"
      var url = "sel";
      var type = 4;
      var obj = { type };
      this.axios.get(url, { params: obj }).then(result => {
        this.list = result.data.data;
      });
    },
    toggle(e) {
      e.stopPropagation();
      if (this.bClass.down) {
        this.bClass.down = false;
        this.bClass.fade = true;
      } else {
        this.bClass.down = true;
        this.bClass.fade = false;
      }
    },
    window() {
      if (this.bClass.down) {
        this.bClass.down = false;
        this.bClass.fade = true;
      }
    }
  },
  created() {
    var url = "carousel";
    this.axios.get(url).then(result => {
      this.carousel = result.data.data;
    });
    var url = "sel";
    var type = 0;
    var obj = { type };
    this.axios.get(url, { params: obj }).then(result => {
      this.list = result.data.data;
    });
  }
};
</script>
<style scoped>
#d1{
  border-bottom:2px solid red;
}
.icon-gouwu {
  color: #bbb;
  font-size: 45px;
}
.btn-1 {
  border: none;
  background: dodgerblue;
  height: 30px;
  width: 100%  ;
  margin-top: 20px;
  transition-duration: 0.6s;
  background-image: url(../../assets/gw.png);
  background-size: 25px;
  background-repeat: no-repeat;
  background-position: 5px, 0px;
  color: white;
}
.btn-1:hover {
  box-shadow: 0 12px 16px 0 rgba(214, 214, 214, 0.24),
    0 17px 50px 0 rgba(0, 0, 255, 0.19);
}
.cp-list {
  background: rgba(255, 255, 255);
  float: left;
  width: 42.5%;
  padding: 2.4%;
  border-radius: 10px;
  margin-left: 1.8%;
  font-family: "楷体";
  margin-top: 6px;
}
.list-top {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.cp-list > .list-top > img {
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50%;
}
.list-bottom {
  text-align: center;
}
.list-bottom1 {
  text-align: center;
}
.gwc {
  width: 50px;
  height: 50px;
  position: fixed;
  right: 20px;
  bottom: 10%;
}
.gd {
  width: 100%;
}
.mint-swipe {
  height: 200px;
  width: 100%;
}
img {
  width: 100%;
  height: 100%;
}

.jg > .jg-item > div > img {
  height: 50px;
  width: 50px;
}
.jg > .jg-item > div {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.jg > .jg-item > div > span {
  font-size: 10px;
  font-family: "楷体";
}
.jg-item {
  display: flex;
  justify-content: space-between;
}
.jg {
  padding: 20px;
}
.jg > .jg-item > div > img {
  height: 50px;
  width: 50px;
}
.jg > .jg-item > div {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.jg > .jg-item > div > span {
  font-size: 10px;
  font-family: "楷体";
}
.jg-item {
  display: flex;
  justify-content: space-between;
}
.cp-no {
  display: none;
}
#c1 {
  float: left;
}
</style>