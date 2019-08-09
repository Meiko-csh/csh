<template>
  <div class="add_list">
    <p class="headline">菜品添加</p>
    <mt-field :placeholder="titleHolder" v-model="title" class="myinput" label="菜名："></mt-field>
    <mt-field :placeholder="priceHolder" v-model="price" class="myinput" label="价格："></mt-field>
    <div>
      <p style="float:left; margin-left:40px;">图片：</p>
      <input
        @change="fileChange($event)"
        type="file"
        id="upload_file"
        multiple
        style="display: none"
      />
      <div class="add" @click="chooseType">
        <div id="tj" class="add-image" align="center">
          <!--按钮中的图片是一个icon字体图标-->
          <i class="icon-camera"></i>
          <p class="font13">添加图片</p>
        </div>
      </div>
    </div>
    <div>
      <span style="margin-left:-151px;margin-right:59px;">菜品类型：</span>
      <select v-model="value" style="width:80px;margin-right:-16px;">
        <option value="0">热菜</option>
        <option value="1">凉菜</option>
        <option value="2">饮品</option>
        <option value="3">烧烤</option>
        <option value="4">主食</option>
      </select>
    </div>
    <mt-button class="mybtn" @click="login">添加</mt-button>
    <mt-button class="mybtn" @click="reset">重置</mt-button>
  </div>
</template>
<script>
var img_u;
export default {
  data() {
    return {
      titleHolder: "请输入菜名",
      priceHolder: "请输入菜品价格",
      typeHolder: "请输入菜品类型",
      title: "",
      price: "",
      showFace: false,
      imgList: [],
      size: 0,
      limit: 6, //限制图片上传的数量
      tempImgs: [],
      value: 0
    };
  },
  methods: {
    login() {
      var title = this.title;
      var price = this.price;
      var img_url = img_u;
      var type = this.value;
      var obj = { title, price, img_url, type };
      var url = "add_list";
      this.axios.get(url, { params: obj }).then(result => {
        if (result.data.code == 1) {
          this.$toast("添加成功");
          this.$router.push("/admin");
        }
      });
    },
    reset() {
      this.title = "";
      this.price = "";
      var tj = document.getElementById("tj");
      tj.innerHTML = `
          <i class="icon-camera"></i> 
          <p class="font13">添加图片</p>
         `;
    },
    chooseType() {
      document.getElementById("upload_file").click();
    },
    fileChange(el) {
      if (!el.target.files[0].size) return;
      this.fileList(el.target);
      el.target.value = "";
    },
    fileList(fileList) {
      let files = fileList.files;
      for (let i = 0; i < files.length; i++) {
        //判断是否为文件夹
        if (files[i].type != "") {
          this.fileAdd(files[i]);
        } else {
          //文件夹处理
          this.folders(fileList.items[i]);
        }
      }
    },
    //文件夹处理
    folders(files) {
      let _this = this;
      //判断是否为原生file
      if (files.kind) {
        files = files.webkitGetAsEntry();
      }
      files.createReader().readEntries(function(file) {
        for (let i = 0; i < file.length; i++) {
          if (file[i].isFile) {
            _this.foldersAdd(file[i]);
          } else {
            _this.folders(file[i]);
          }
        }
      });
    },
    foldersAdd(entry) {
      let _this = this;
      entry.file(function(file) {
        _this.fileAdd(file);
      });
    },
    fileAdd(file) {
      if (this.limit !== undefined) this.limit--;
      if (this.limit !== undefined && this.limit < 0) return;
      //总大小
      this.size = this.size + file.size;
      //判断是否为图片文件
      if (file.type.indexOf("image") == -1) {
        this.$dialog.toast({ mes: "请选择图片文件" });
      } else {
        let reader = new FileReader();
        var image = new Image();
        let _this = this;
        img_u = file.name;
        reader.readAsDataURL(file);
        reader.onload = function() {
          file.src = this.result;
          image.onload = function() {
            let width = image.width;
            let height = image.height;
            file.width = width;
            file.height = height;
            _this.imgList.push({
              file
            });
          };
          var src = file.src;

          var tj = document.getElementById("tj");
          tj.innerHTML = `<img src="${src}">`;
        };
      }
    },
    delImg(index) {
      this.size = this.size - this.imgList[index].file.size; //总大小
      this.imgList.splice(index, 1);
      if (this.limit !== undefined) this.limit = 6 - this.imgList.length;
    }
  }
};
</script>
<style scoped>
* {
  margin: 0px;
  padding: 0px;
}
#tj > img {
  height: 82px;
  width: 82px;
}
.add_list {
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
.app-bg >>> img {
  width: 100%;
  height: 100%;
  -webkit-transform: scale(1.03);
  -moz-transform: scale(1.03);
  -ms-transform: scale(1.03);
  -o-transform: scale(1.03);
  transform: scale(1.03);
}
textarea {
  padding: 10px;
}

.text-length {
  font-size: 14px;
  z-index: 999;
  width: 100%;
  text-align: right;
  margin-bottom: 10px;
  color: #e4e4e4;
}

.warning {
  color: #fe9900;
}

.add-img {
  width: 100%;
  padding: 10px;
}

.add-img p {
  color: #999;
}

.mui-content {
  padding-bottom: 60px;
}

.mui-content .idea {
  margin-top: 8px;
  background-color: #ffffff;
}

.good-item {
  text-align: center;
  width: 33%;
  max-width: 100%;
  overflow: hidden;
  padding-right: 10px;
  padding-bottom: 10px;
  float: left;
}

.good-item span {
  font-size: 15px;
  height: 30px;
  line-height: 30px;
  border-radius: 50px;
  display: block;
  width: 100%;
  color: #333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border: 1px solid #cccccc;
}
.mui-table {
  padding-top: 10px;
  color: #333;
  padding-left: calc(0.5% + 10px);
}

.h-line-behind {
  line-height: 40px;
  padding-left: 10px;
}

.question {
  border: 0;
  margin-bottom: 10px;
}

.add {
  display: inline-block;
  margin-bottom: 20px;
}

.add-image {
  margin-right: 85px;
  width: 80px;
  top: 20px;
  height: 80px;
  border: 1px dashed rgba(0, 0, 0, 0.2);
}

.add-image .icon-camera {
  font-size: 24px;
}

.good-item .choose {
  color: #fff;
  background-color: #87582e;
  color: #fff;
  border: 0;
}

.mui-btn-block {
  border: 0;
  border-radius: 0;
  background-color: #87582e;
  color: #fff;
  margin-bottom: 0;
  bottom: 0;
}

.mui-buttom {
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 999;
}

/*九宫格*/
.img-list {
  overflow: hidden;
}

.img-list > li {
  float: left;
  width: 32%;
  text-align: center;
  padding-top: 31%;
  margin-left: 1%;
  margin-top: 1%;
  position: relative;
}

.img-list > li > div {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.img-list > li > div .app-bg {
  width: 100%;
  height: 100%;
}

.mui-fullscreen {
  z-index: 9999;
}
.del {
  position: absolute;
  width: 18px;
  top: 0;
  right: 0;
  z-index: 999;
}
</style>