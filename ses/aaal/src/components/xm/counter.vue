<template>
  <div>
    <button @click="change(-1)">-</button>
    <span>{{n}}</span>
    <button @click="change(+1)">+</button>
  </div>
</template>

<script>
var sum = 0;
export default {
  props: ["menus_id", "sum", "count"],
  data() {
    return {
      n: 0
    };
  },

  methods: {
    change(i) {
      if (i == -1) {
        if (this.n >= 1) {
          this.n += i;
          var uid = window.sessionStorage.getItem("data");
          var url = "index_moveList";
          var mid = this.menus_id;
          var obj = { mid, uid };
          this.axios.get(url, { params: obj }).then(result => {
            if (result.data.code == 1) {
              this.$toast("删除成功");
              sum -= this.sum;
              this.$emit("listensum", sum);
            }
          });
        }
      } else if (i == 1) {
        this.n += i;
        var url = "index_addList";
        var mid = this.menus_id;
        var uid = window.sessionStorage.getItem("data");
        var obj = { mid, uid };
        this.axios.get(url, { params: obj }).then(result => {
          if (result.data.code == 1) {
            this.$toast("添加成功");
            sum += this.sum;
            this.$emit("listensum", sum);
          }
        });
      }
    }
  },
  created() {
    var count = this.props;
  },
};
</script>

<style scoped>
button {
  width: 25px;
}
span {
  margin-top: 5px;
  display: inline-block;
  width: 30px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
</style>
