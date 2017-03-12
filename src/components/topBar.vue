<template>
  <div class="topBar">
    <div class="mask" v-if="popupShow" @click.stop="controlShow()"></div>
    <h2 class="title" v-text="routerTitle"></h2>
    <p class="option" @click.stop="controlShow(true)"><i class="glyphicon glyphicon-option-vertical"></i></p>

    <ul class="popup" v-show="popupShow">
      <li><a href="javscript:void(0);">登录</a></li>
      <li><a href="javscript:void(0);">注册</a></li>
      <li><a href="javscript:void(0);">我的购物车</a></li>
    </ul>
    
  </div>
</template>

<script>
  export default {
    name: 'topBar',
    data () {
        return {
          popupShow: false
        }
    },
    props: {
      routerTitle: {
        type: String
      }
    },
    methods: {
      controlShow (parem) {
        this.popupShow = parem;
      }
    },
    mounted() {
      var _self = this;
    }
  }
</script>

<style scoped>

  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  .topBar {
    color: #fff;
    background-color: rgb(198,47,47);
    position: relative;
    z-index: 9;
  }

  .topBar .title {
    height: 50px;
    line-height: 50px;
    font-weight: normal;
    margin: 0;
    font-size: 16px;
    padding-left: 20px;
  }

  .topBar .option {
    position: absolute;
    top: 15px;
    right: 20px;
    margin: 0;
  }

  .popup {
    width: 160px;
    position: absolute;
    z-index: 2;
    top:15px;
    right: 25px;
  }

  .popup li a {
    color: #fff;
    display: block;
    padding: 10px 10px;
    background-color: rgb(47,47,47);
    border-bottom: 1px solid rgb(60,60,60);
  }

  .popup li a:active {
    background-color: #585858;
  }

  .popup li:last-child a {
    border: none;
  }
</style>