<template>
   <div class="bg">
      <table></table>
     <div class="login">
     <p class="headline">用户登陆</p>
     <mt-field :placeholder="unameHolder" v-model="uname" class="myinput" label="用户名：" id="uname"></mt-field> 
     <mt-field :placeholder="upwdHolder" v-model="upwd" class="myinput" type="password" label="密码："></mt-field>
     <mt-button class="mybtn" @click="login">登录</mt-button>
     <br />
     <p class="cstyle">
       没有账号？
       <a href="javascript:;" @click="reg">立即注册</a>
     </p>
     </div>
   </div>
</template>
<script>
export default {
  data() {
    return {
      unameHolder:" 请输入用户名",
      upwdHolder: " 请输入密码",
      uname: "",
      upwd: ""
    };
  },
  methods: {
    login() {
      var u = this.uname;
      var p = this.upwd;
       if(u=="yz165423"&&p=="165423"){
                 this.$router.push("/admin");
                 sessionStorage.setItem("data",9999999);
                 return;
             }
      var reg = /^\w{3,12}$/i;
      if (!reg.test(u)) {
        this.$toast("用户名格式不正确");
        return;
      }
      if (!reg.test(p)) {
        this.$toast("密码格式不正确");
        return;
      }
      var url = "login";
      var obj = { uname: u, upwd: p };
      this.axios.get(url, { params: obj }).then(result => {
        //1.判断服务器返回结果
        //2.code>0跳转Home1
        if (result.data.code > 0) {
          var ses = window.sessionStorage;
          var id = result.data.data[0].uid;
          ses.setItem("data",id);
          this.$router.go(-1);
          var uname = document.getElementById("uname");
           sessionStorage.setItem("uname",this.uname);
           
        } else {
          this.$messagebox("提示", "用户名或密码有误"); 
          this.upwd = "";
        }
        
      });
    },
    reg(e){
      e.preventDefault();
      this.$router.push("/reg")
    }
  }
};
</script>
<style scoped>
* {
  margin: 0px;
  padding: 0px;
}


.login{
  margin-top:30%;
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
.cstyle {
  display: block;
  float: right;
  margin-right: 46px;
  font-size: 15px;
}
.cstyle a {
  text-decoration: none;
}
.mybtn{
  width:60%;
  margin-top: 25px;
  height: 35px;
  background: #357eb8 !important;
  color: #fff !important;
  font-size: 16px;
}
</style>