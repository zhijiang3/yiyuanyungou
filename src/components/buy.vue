<template>
  <div id="buy">
    <div class="mask" @click.stop="close"></div>
    <div class="box">
      <div class="header">
        <h2 class="title" v-text="commodity.title"></h2>
        <p class="pic"><img :src=" '/static/img/commodity/' + commodity.img "></p>
        <p class="close" @click.stop="close"><i class="glyphicon glyphicon-remove-circle"></i></p>
      </div>
      <div class="content">
        <div class="progressBar">
          <span class="progressBarInner blueBg" v-setWidth="{ price: commodity.price, rest: commodity.rest, count: count }"></span>
          <span class="progressBarInner" v-setWidth="{ price: commodity.price, rest: commodity.rest }"></span>
        </div>
        <div class="rest clearfix">
          <p class="left">剩余：<span v-text="commodity.rest"></span> - <span class="blue" v-text="count"></span></p>
          <p class="right">总需：<span v-text="commodity.price"></span></p>
        </div>
        <div class="count clearfix">
          <p class="left">购买数量：</p>
          <p class="fn right">
            <i @click.stop="minus" :class="{ disabled: count <= 0 }" class="glyphicon glyphicon-minus"></i>
            <input class="countInput blue" type="text" v-model="count">
            <i @click.stop="plus" :class="{ disabled: count >= commodity.rest }" class="glyphicon glyphicon-plus"></i>
          </p>
        </div>
      </div>
      <div class="footer">
        <p class="submit" @click.stop="submit">提交</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 1,
      commodity: {},
      user: {},
      mixin: {}
    };
  },
  props: {
    id: {
      type: Number
    },
    globalData: {
      type: Object
    },
    userId: {
    }
  },
  methods: {
    init() {
      this._findCommodity();
      this._findUser();
      this._findMixin();
      document.body.style.overflow = "hidden";
    },
    close() {
      this.$emit("closeBuy");
      document.body.style.overflow = "auto";
    },
    plus() {
      this.count++;
    },
    minus() {
      this.count--;
    },
    submit() {
      // 修改参数然后发送数据更改
      this.$emit("updateData");
      this.close();
    },
    _findCommodity() { // 根据id查找产品
      this.commodity = this.globalData.commodity.filter(item => item.commodityId == this.id)[0];
      console.log(this.commodity);
    },
    _findUser() { // 根据id查找用户
      this.user = this.globalData.user.filter(item => item.userId == this.userId)[0];
      console.log(this.user);
    },
    _findMixin() { // 根据商品和用户id查找购买记录
      this.mixin = this.globalData.mixin
        .filter(item => item.commodityId == this.id)[0]
        .busers.filter(item => item.userId == this.userId)[0];
      console.log(this.mixin);
    }
  },
  watch: {
    count(newCount) {
      newCount = Number(newCount);

      if (newCount < 0 || isNaN(newCount)) {
        this.count = 0;
        return ;
      }

      if (newCount <= this.commodity.rest) {
        this.count = newCount;
      } else {
        this.count = this.commodity.rest;
      }
    }
  },
  directives: {
    setWidth(el, binding) { // 设置进度条指令
      var rest = binding.value.rest;
      var price = binding.value.price;
      var count = binding.value.count || 0;

      var result = (1 - (rest - count) / price) * 100;
      el.style.width = result.toFixed(2) + "%";
    }
  },
  created() {
    this.init();
  }
};
</script>

<style scoped>

  .clearfix:after {
    content: " ";
    height: 0;
    clear: both;
    visibility: hidden;
    overflow: hidden;
    display: block;
  }

  #buy {
    position: relative;
    z-index: 10;
  }

  .mask {
    background: transparent;
    background: rgba(0, 0, 0, 0.35);
    position: fixed;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0
  }

  .box {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    padding: 10px 15px 0;
    background-color: #ffffff;
  }

  .box .left {
    float: left;
  }

  .box .right {
    float: right;
  }

  .box .glyphicon {
    font-size: 20px;
  }

  .box .header {
    min-height: 80px;
  }

  .box .header .pic {
    position: absolute;
    left: 15px;
    top: -15px;
    width: 95px;
    height: 95px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #cccccc;
    background-color: #ffffff;
  }

  .box .header .pic img {
    display: block;
  }

  .box .header .title {
    margin: 0 20px 0 95px;
    padding: 0 10px;
    font-size: 14px;
    color: #333;
    font-weight: normal;
  }

  .box .content .progressBar,
  .box .content .progressBar .progressBarInner {
    height: 10px;
    border-radius: 10px;
    display: block;
  }

  .box .content .progressBar {
    position: relative;
    background-color: #cccccc;
    margin: 0 auto 5px;
  }

  .box .content .progressBar .progressBarInner {
    position: absolute;
    transition: width 0.3s;
    background-color: #c62f2f;
    max-width: 100%;
    min-width: 2%;
  }

  .box .header .close {
    position: absolute;
    right: 15px;
    top: 10px;
    color: #aaaaaa;
  }

  .box .content .rest {
    font-size: 12px;
  }
  
  .box .content .rest,
  .box .content .count .left {
    color: #999;
  }

  .box .content .count .left {
    font-size: 14px;
  }

  .box .content .count {
    margin: 10px 0;
    padding: 5px 0;
    line-height: 30px;
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
  }

  .box .content .fn .countInput {
    border: 0;
    width: 60px;
    text-align: center;
    padding: 6px 0;
    outline: 0;
  }

  .box .content .fn .glyphicon:not(.disabled):active,
  .box .header .close:active {
    color: #c62f2f;
  }

  .box .content .fn .glyphicon {
    cursor: pointer;
    color: #666666;
    border: 1px solid #cccccc;
    border-radius: 4px;
    padding: 5px;
    font-size: 14px;
  }

  .box .content .fn .disabled {
    color: #cccccc;
    border: 1px solid transparent;
  }

  .blue {
    color: #539ddb;
  }

  .blueBg {
    background-color: #539ddb !important;
  }

  .box .footer .submit {
    text-align: center;
    border-radius: 4px 4px 0 0;
    background: #c62f2f;
    color: #ffffff;
    padding: 8px;
  }
</style>