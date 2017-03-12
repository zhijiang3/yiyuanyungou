<template>
  <ul class="bottomNav">
    <li><router-link to="/home"><i class="glyphicon glyphicon-home"></i>主页</router-link></li>
    <li><router-link to="/postshop"><i class="glyphicon glyphicon-bullhorn"></i>发布商品</router-link></li>
    <li><router-link :to="{ name: 'myShopping', params: { userId: 1 } }"><i class="glyphicon glyphicon-bell"></i>我的云购</router-link></li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      touch: {
        start: {
          y: 0
        },
        end: {
          y: 0
        }
      }
    };
  },
  methods: {
    addEvents() {
      this._touch();
    },
    _touch() {
      document.addEventListener("touchstart", function(e) {

      });

      document.addEventListener("touchmove", function(e) {

      });

      document.addEventListener("touchend", function(e) {

      });
    }
  },
  created() {
    this.addEvents();
  }
};
</script>

<style scoped>
  .bottomNav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #c52f30;
  }

  .bottomNav a {
    float: left;
    width: 33.33%;
    display: block;
    text-align: center;
    padding: 10px 0;
    color: #ffffff;
    font-size: 14px;
    border-top: 2px solid transparent;
  }

  .bottomNav li i.glyphicon:before {
    margin-right: 5px;
  }

  .bottomNav li a:active {
    background-color: #cc4444;
  }

  .bottomNav .router-link-active {
    color: #c52f30;
    background-color: #fff;
    border-top: 2px solid #c52f30;
  }
</style>