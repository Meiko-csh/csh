<template>
  <div class="admin">
    <div class="page-head">
      <div>管理员</div>
      <span class="addt" @click="tianjia">添加</span>
    </div>
    <!--面板-->
    <mt-tab-container v-model="admin">
      <mt-tab-container-item id="message">
        <div class="cart-item" v-for="(item,i) of list1" :key="i">
          <!--左侧头像和菜名，价格-->
          <div class="rootstyle">
            <img :src="`http://127.0.0.1:3000/${item.img_url}`" class="imgulr" />
            <div class="prices">
              <span v-text="item.title"></span>
              <span v-text="`价格：¥${item.price}`"></span>
            </div>
          </div>
          <button class="delete" @click="del1(item)">删 除</button>
        </div>
        <div class="air"></div>
      </mt-tab-container-item>
      <!--订单-->
      <mt-tab-container-item id="order">
        <div class="cart-item" v-for="(item,i) of list2" :key="i">
          <!--左侧头像和菜名，价格-->
          <div class="rootstyle">
            <div class="prices">
              <span v-text="`${item.cid}号订单`"></span>
              <span v-text="`菜品数量：${item.count}`"></span>
              <span v-text="`第${item.uid}桌`"></span>
              <span v-text="`菜品名：${item.title}`"></span>
            </div>
          </div>
          <button class="delete" @click="del2(item)">完 成</button>
        </div>
        <div class="air"></div>
      </mt-tab-container-item>
      <mt-tab-container-item id="user">
        <div class="cart-item" v-for="(item,i) of list3" :key="i">
          <!--用户id-->
          <div class="rootstyle">
            <div>
              <img :src="require('../../assets/logo.png')" class="imgulr" />
            </div>
            <div class="prices">
              <span v-text="`id：${item.uid}`"></span>
              <span v-text="`姓名：${item.uname}`"></span>
            </div>
          </div>
          <button class="delete" @click="del3(item)">删 除</button>
        </div>
        <div class="air"></div>
      </mt-tab-container-item>
    </mt-tab-container>
    <!--底部导航条-->
    <mt-tabbar v-model="admin" class="tabb" fixed>
      <div @click="message" class="cla" :class="moren">
        <mt-tab-item id="message" class="iconfont icon-fan but">
          <span>菜单</span>
        </mt-tab-item>
      </div>
      <div @click="order" class="cla" :class="more">
        <mt-tab-item id="order" class="iconfont icon-dingdan but">
          <span>订单</span>
        </mt-tab-item>
      </div>
      <div @click="user" class="cla" :class="mor">
        <mt-tab-item id="user" class="iconfont icon-wode but">
          <span>用户列表</span>
        </mt-tab-item>
      </div>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      admin: "message",
      list1: [],
      list2: [],
      list3: [],
      moren: {
        fade: true
      },
      more: {
        fade: false
      },
      mor: {
        fade: false
      }
    };
  },
  methods: {
    message() {
      var url = "admin";
      var obj = { adminSel: "xm_menus" };
      this.axios.get(url, { params: obj }).then(result => {
        this.list1 = result.data.data;
      });
      if (this.moren.fade == false) {
        this.moren.fade = true;
        this.more.fade = false;
        this.mor.fade = false;
      }
    },
    order() {
      var url = "admin";
      var obj = { adminSel: "xm_cart" };
      this.axios.get(url, { params: obj }).then(result => {
        this.list2 = result.data.data;
        for (let i = this.list2.length - 1; i >= 0; i--) {
          if (this.list2[i].cid === null) {
            this.list2.splice(i, 1);
          }
        }
      });
      if (this.more.fade == false) {
        this.more.fade = true;
        this.moren.fade = false;
        this.mor.fade = false;
      }
    },
    user() {
      var url = "admin";
      var obj = { adminSel: "xm_user" };
      this.axios.get(url, { params: obj }).then(result => {
        this.list3 = result.data.data;
      });
      if (this.mor.fade == false) {
        this.mor.fade = true;
        this.moren.fade = false;
        this.more.fade = false;
      }
    },
    //管理员删除
    del1(item) {
      //管理员删除
      var url = "del_list";
      var id = item.mid;
      var obj = { adminSel: "xm_menus", id: id };
      this.$messagebox
        .confirm("是否删除")
        .then(action => {
          this.axios.get(url, { params: obj }).then(result => {
            if (result.data.code == 1) {
              this.message();
            }
          });
        })
        .catch(err => {
          return;
        });
    },
    //订单
    del2(item) {
      var url = "del_list";
      var id = item.cid;
      var obj = { adminSel: "xm_cart", id: id };
      this.$messagebox
        .confirm("是否完成")
        .then(action => {
          this.axios.get(url, { params: obj }).then(result => {
            if (result.data.code == 1) {
              this.order();
            }
          });
        })
        .catch(err => {
          return;
        });
    },
    del3(item) {
      //管理员删除
      var url = "del_list";
      var id = item.uid;
      var obj = { adminSel: "xm_user", id: id };
      this.$messagebox
        .confirm("是否删除")
        .then(result => {
          this.axios.get(url, { params: obj }).then(result => {
            if (result.data.code == 1) {
              this.user();
            }
          });
        })
        .catch(err => {
          return;
        });
    },
    tianjia() {
      this.$router.push("/add_list");
    }
  },
  created() {
    this.message();
  }
};
</script>
<style scoped>
.page-head {
  display: flex;
  width: 100%;
  align-items: center;
  background-color: #3e3a39;
  height: 48px;
  color: #fff;
  font-size: 18px;
  position: relative;
}
.page-head > div {
  position: absolute;
  left: 43%;
}
.air {
  height: 70px;
  width: 100%;
}
.tabb {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-around;
}
.cla {
  width: 100%;
}
.fade {
  background-color: rgba(200, 200, 200, 200);
  border-radius: 5px;
}
.down {
  border-radius: 5px;
}
.but {
  font-size: 30px;
}
span {
  font-size: 15px;
}
.rootstyle {
  padding: 5px;
  display: flex;
}
.imgulr {
  width: 70px;
  height: 70px;
}
/**删除按钮**/
.delete {
  width: 70px;
  height: 30px;
  background-image: linear-gradient(top, #27b1f6 0%, #0aa1ed 100%);
  border: 0px solid #27b1f6;
  color: white;
  margin-right: 3px;
}
/**面板内容样式**/
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.3px solid gray;
}
.prices {
  display: flex;
  flex-direction: column;
  margin-left: 5px;
}
.addt {
  position: absolute;
  right: 10px;
  font-size: 14px;
}
</style>