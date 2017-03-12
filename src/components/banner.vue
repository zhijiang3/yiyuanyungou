<template>
  <div id="banner" @mouseenter="stopPlay()" @mouseleave="autoPlay()">

    <div class="item-inner clearfix transitionTime" :style=" 'transform: translateX(' + active * -bodyWidth + 'px);' ">
      <div class="item" v-for="(item, index) in banner">
        <router-link class="pic" :to="item.link"><img :src="'../../static/img/banner/' + item.img"></router-link>
      </div>
    </div>

    <ul class="list">
      <li class="transitionTime" :class="{ active: index == active }" @click.stop="moveTo(index)" v-for="(item, index) in banner.length"></li>
    </ul>

    <p class="btn left" v-show="active != 0" @click.stop="_moveLeft()"><i class="icon glyphicon glyphicon-chevron-left"></i></p>
    <p class="btn right" v-show="active != (banner.length - 1)" @click.stop="_moveRight()"><i class="icon glyphicon glyphicon-chevron-right"></i></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner: [],
      bodyWidth: document.documentElement.clientWidth || document.body.clientWidth,
      active: 0,
      speed: 3500,
      timer: null,
      touch: {
        start: {
          x: 0
        },
        end: {
          x: 0
        }
      }
    }
  },
  props: {
    globalData: {
      type: Object
    }
  },
  methods: {
    initBanner() {
      this.banner = this.globalData.banner;
      this.autoPlay();
      this.initEvents();
    },
    initEvents() {
      this._resize();
      this._touch();
    },
    moveTo(index) {
      this.active = index;
    },
    autoPlay() {
      var self = this;

      clearInterval(this.timer);
      this.timer = setInterval(function() {
        self._canMove("right") ? self._moveRight() : self.active = 0;
      }, this.speed);
    },
    stopPlay() {
      clearInterval(this.timer);
    },
    _findBanner(node, id) {

      while(node.parentNode != null) {
        if (node.getAttribute("id") == id) {
          return true;
        }

        node = node.parentNode;
      }

      return false;
    },
    _canMove(dir) {
      switch (dir) {
        case "left":
          return (this.active > 0);
          break;
        case "right":
          return (this.active < this.banner.length - 1);
          break;
      }

      return false;
    },
    _moveLeft() {
      this._canMove("left") ? this.active-- : this.active = 0;
    },
    _moveRight() {
      this._canMove("right") ? this.active++ : this.active = this.banner.length - 1;
    },
    _resize() {
      var self = this;

      window.addEventListener("resize", function() {
        setTimeout(function() {
          self.bodyWidth = document.documentElement.clientWidth || document.body.clientWidth;
        }, 400);
      });
    },
    _touch() {
      let self = this;
      let itemInner = document.querySelectorAll("#banner div.item-inner")[0];

      document.addEventListener("touchstart", function(e) {
        if (self._findBanner(e.target, "banner")){
          self.stopPlay();
          self.touch.start.x = e.touches[0].pageX;
        }
      });

      document.addEventListener("touchmove", function(e) {
        if (self._findBanner(e.target, "banner")) {
          e.preventDefault();
          self.stopPlay();

          let delta_x = e.changedTouches[0].pageX - self.touch.start.x;
          let translateX = (self.active * -self.bodyWidth);

          if (delta_x > 0) {
            if (self._canMove("left")) {
              translateX = translateX + delta_x;
            } 
          } else {
            if (self._canMove("right")) {
              translateX = translateX + delta_x;
            }
          }

          itemInner.style.transform = 'translateX(' + translateX + 'px)';
        }
      }, false);

      document.addEventListener("touchend", function(e) {
        if (self._findBanner(e.target, "banner")) {
          self.touch.end.x = e.changedTouches[0].pageX;

          let delta_x = self.touch.end.x - self.touch.start.x;

          if (delta_x > self.bodyWidth * 0.45) {
            self._moveLeft();
          } else if (delta_x < -self.bodyWidth * 0.45) {
            self._moveRight();
          } else {
            itemInner.style.transform = 'translateX(' + (self.active * -self.bodyWidth) + 'px)';
          }

          self.autoPlay();
        }
      });

    }
  },
  mounted() {
    this.initBanner();
  }
}
</script>

<style scoped>

  .transitionTime {
    transition-duration: 0.4s;
  }

  .clearfix:after {
    content: " ";
    display: block;
    overflow: hidden;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  #banner {
    position: relative;
    overflow: hidden;
    width: 100%;
    z-index: 1;
  }

  #banner .item {
    position: relative;
  }

  #banner .item-inner {
    width: 500%;
    transition-property: transform;
  }

  #banner .item {
    width: 20%;
    float: left;
  }

  #banner .btn {
    position: absolute;
    top: 0;
    bottom: 0;
    font-size: 2.2em;
    width: 20%;
    color: #ffffff;
    opacity: 0.5;
    cursor: pointer;
  }
  
  #banner .btn:hover,
  #banner .btn:active {
    opacity: 1;
  }

  #banner .btn .icon {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 50%;
    height: 42px;
    margin-top: -21px;
    padding: 0 10px;
  }
  
  #banner .left,
  #banner .left .icon {
    left: 0;
  }

  #banner .right,
  #banner .right .icon {
    right: 0;
  }

  #banner .item .pic,
  #banner .item .pic img {
    display: block;
    width: 100%;
  }
  
  #banner .list {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10px;
  }

  #banner .list li{
    display: inline-block;
    margin-right: 5px;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    transition-property: width;
    background-color: #999;
    cursor: pointer;
  }
  
  #banner .list li:active {
    background: rgba(153, 153, 153, 0.3);
  }

  #banner .list .active {
    background-color: #c62f2f;
    width: 25px;
  }
</style>