<template>
  <div class="hhtml">
    <div class="dd-header">
      <img src="../../assets/logo.png" alt class="img1"/>
      <span>我的订单</span>
      <div @click="fh">
        <img style="height:30px;width:30px;" src="../../assets/fh.png" class="img1" />
      </div>
    </div>
    <div class="bbody"></div>
    <div v-for="(item,i) of list" :key="i" class="dd-body">
      <div class="dd-body-img">
        <img :src="`http://127.0.0.1:3000/${item.img_url}`" />
      </div>
      <span>{{item.title}}</span>
      <span>￥{{item.price}}</span>
      <div class="btn">
        <button @click="change(-1,item)">-</button>
        <span>{{item.count}}</span>
        <button @click="change(+1,item)">+</button>
      </div>
    </div>
    <div class="dd-footer">
      <div style="font-size:20px;">
        总价：
        <span>{{sum}}</span>
      </div>
      <mt-button @click="down" class="dd-btn">下单</mt-button>
    </div>
  </div>
</template>

<script>
var sum = 0;
var n = 0;
import Counter from "./counter.vue";
export default {
  components: {
    counter: Counter
  },
  data() {
    return {
      list: [],
      sum: 0,
      n: 0
    };
  },
  methods: {
    fh() {
      this.$router.go(-1); //返回上一层
    },
    down() {
      this.$messagebox
        .confirm(`请确认支付￥` + this.sum)
        .then(action => {
          this.$router.push("/pay");
        })
        .catch(err => {
        });
    },
    change(i, item) {
      if (i == -1) {
        if (item.count >= 1) {
          var uid = window.sessionStorage.getItem("data");
          var url = "index_moveList";
          var mid = item.mid;
          var obj = { mid, uid };
          this.axios.get(url, { params: obj }).then(result => {
            if (result.data.code == 1) {
              this.$toast("删除成功");
              sum -= this.sum;
              this.load();
            }
          });
        }
      } else if (i == 1) {
        var url = "index_addList";
        var mid = item.mid;
        var uid = window.sessionStorage.getItem("data");
        var obj = { mid, uid };
        this.axios.get(url, { params: obj }).then(result => {
          if (result.data.code == 1) {
            this.$toast("添加成功");
            sum = this.sum-sum;
            this.load();
          
            
          }
        });
      }
    },
    load(){
    
    var url = "list_sel";
    var uid = sessionStorage.getItem("data");
    var obj = { uid };
    
    this.axios.get(url, { params: obj }).then(result => {
      this.list = result.data.data;
       sum = 0;
      for (var i = 0; i <= this.list.length - 1; i++) {
        sum += this.list[i].price*this.list[i].count;
        console.log(sum,1);
      }
        this.sum = sum;
        console.log(sum);
      
          
    }
    );

    }
  },
  created() {
    this.load();
   
   
  }
};
</script>

<style scoped>
.hhtml{
  position: relative;
}
.bbody{
  margin-top:60px; 
}
.dd-header {
  width: 100%;
  height: 50px;
  background: white;
  font-family: "楷体";
  font-size: 30px;
  line-height: 30px;
  display: flex;
  position: fixed;
  top:0;
  justify-content: space-between;
  align-items: center;
}
.dd-header  .img1 {
  height: 35px;
  width: 35px;
  margin: 0 10px;
}
.dd-header > span {
  display: inline-block;
}
.dd-body {
  height: 150px;
  width: 100%;
  display: flex;
  background: rgb(180, 176, 176);
  margin-top: 10px;
  border-radius: 10px;
  justify-content: space-between;
  /*文字和图片在一行中居中*/
  align-items: center;
}
.dd-body-img > img {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin-left: 10px;
}
.dd-footer {
  width: 100%;
  display: flex;
  position: fixed;
  height: 70px;
  background: rgba(255, 255, 255, 0.7);
  margin-top: 10px;
  z-index: 999;
  bottom: 0;
  justify-content: space-between;
  align-items: center;
}
.dd-btn {
  height: 50%;

}
.btn > button {
  width: 25px;
  margin-right: 10px;
}
.btn > span {
  margin-top: 5px;
  display: inline-block;
  width: 30px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
</style>
