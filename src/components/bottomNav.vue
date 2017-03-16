<template>
  <transition
    name="bottom-bar"
    enter-class="b-e"
    leave-class="b-l"
    enter-active-class="b-e-a"
    leave-active-class="b-l-a">
    <ul class="bottomNav" v-show="isShow">
      <li><router-link tag="a" to="/home"><i class="glyphicon glyphicon-home"></i>主页</router-link></li>
      <li><router-link tag="a" to="/postshop"><i class="glyphicon glyphicon-bullhorn"></i>发布商品</router-link></li>
      <li><router-link tag="a" :to="{ name: 'myShopping' }"><i class="glyphicon glyphicon-bell"></i>我的云购</router-link></li>
    </ul>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      CY: 0,
      newDY: 0,
      isShow: true
    };
  },
  methods: {
    addEvents() {
      this._touch();
    },
    _touch() {
      var self = this;

      document.addEventListener("touchstart", function(e) {

        self.CY = e.touches[0].clientY;
      });

      document.addEventListener("touchmove", function(e) {

        var MY = e.changedTouches[0].clientY;

        self.newDY = self.CY - MY;
        self.newDY = Math.max(0, self.newDY);

        if (self.newDY > 0) {
          self.isShow = false;
          self.CY = MY;
        } else {
          if (!self.isShow) {
            self.isShow = true;
          }
        }
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
    z-index: 9;
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

  .b-e {
    transform: translateY(100%);
  }

  .b-l {
    transform: translateY(0%);
  }

  .b-l-a {
    transform: translateY(100%);
  }

  .b-l-a,
  .b-e-a {
    transition: transform 0.3s;
  }
</style>