<template>
  <div class="reg">
    <p class="headline">用户注册</p>
    <mt-field
      :placeholder="unameHolder"
      v-model="uname"
      class="myinput"
      label="用户名："
      @blur.native.capture="uname1"
    ></mt-field>
    <mt-field
      :placeholder="upwdHolder1"
      v-model="upwd"
      class="myinput"
      type="password"
      label="密码："
      @blur.native.capture="pwd"
    ></mt-field>
    <mt-field
      :placeholder="upwdHolder2"
      v-model="checked"
      class="myinput"
      type="password"
      label="确认密码："
      @blur.native.capture="check"
    ></mt-field>
    <mt-button class="mybtn" @click="reg">注册</mt-button>
    <mt-button class="mybtn" @click="reset">重置</mt-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      unameHolder: " 请输入用户名",
      upwdHolder1: " 请输入密码",
      upwdHolder2: " 再次输入密码",
      uname: "",
      upwd: "",
      checked: ""
    };
  },
  methods: {
    //用户名验证
    uname1() {
      var u = this.uname;
      var reg = /^\w{3,12}$/i;
      if (!reg.test(u)) {
        this.$toast("用户名格式不正确");
        this.uname = "";
        return;
      }
      var url = "loginCheck";
      var obj = { uname: u };
      this.axios.get(url, { params: obj }).then(result => {
        if (result.data.code < 0) {
          this.$toast("用户名已存在");
          this.uname = "";
        } else {
          this.$toast("用户名可以试用")
        }
      });
    },
    //密码验证
    pwd() {
      var p = this.upwd;
      var reg = /^\w{3,12}$/i;
      if (!reg.test(p)) {
        this.$toast("密码格式不正确");
        this.upwd = "";
        return;
      }
    },
    //密码确认
    check() {
      var p2 = this.checked;
      var p = this.upwd;
      if (p2 !== p) {
        this.$toast("两次密码不一致");
        this.checked = "";
        return;
      }
    },
    //注册按钮
    reg() {
      var u = this.uname;
      var p = this.upwd;
      var url = "reg";
      var obj = { uname: u, upwd: p };
      this.axios.get(url, { params: obj }).then(result => {
        //2.code>0跳转H
        if (result.data.code > 0) {
          this.$messagebox("提示", "注册成功，3秒后跳转主页");
          setTimeout(() => {
            this.$router.push("/index");
          }, 3000);
        } else {
          this.$messagebox("提示", "注册失败");
          this.upwd = "";
          this.checked = "";
        }
      });
    },
    //重置按钮
    reset() {
      this.uname = "";
      this.upwd = "";
      this.checkd = "";
    }
  }
};
</script>
<style scoped>
.reg {
  margin-top: 30%;
  text-align: center;
}
p {
  padding: 8px 0;
  font-size: 16px;
}
.headline {
  font-size: 22px;
  text-align: center;
  padding: 20px;
}
.mybtn {
  width: 60%;
  margin-top: 25px;
  height: 35px;
  background: #357eb8 !important;
  color: #fff !important;
  font-size: 16px;
}
</style>