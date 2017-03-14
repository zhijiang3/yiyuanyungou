<template>
  <div id="app">
    <top-bar :routerTitle="routerTitle"></top-bar>
    <transition
      name="router-view"
      appear
      mode="out-in">
      <router-view
        v-if="dataLoading"
        @routerTitleEvent="showTopBarTitle"
        :globalData="globalData"></router-view>
    </transition>
    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      routerTitle: "首页",
      dataLoading: false,
      globalData: {}
    };
  },
  components: {
    "top-bar": require("@/components/topBar.vue"),
    "bottom-nav": require("@/components/bottomNav.vue")
  },
  created() {
    var self = this;
    let urls = [ "./static/json/banner.json", "./static/json/user.json", "./static/json/commodity.json", "./static/json/mixin.json" ]

    let requests = urls.map(function(url) {
      return self.axios.get(url);
    })

    this.axios.all(requests).then(

      this.axios.spread(function(...rest) {
        
        rest.forEach(function(item, index, arr) {
          let start = item.config.url.lastIndexOf("/") + 1;
          let end = item.config.url.lastIndexOf(".json");

          self.$set(self.globalData, item.config.url.slice(start, end), item.data);
        });
        
        self.dataLoading = true;
      })
    ).catch(function(err) {
      console.log("Error: " + err);
    });;
  },
  methods: {
    showTopBarTitle(routerTitle) {
      this.routerTitle = routerTitle;
    }
  }
}
</script>

<style>
@import "assets/css/base.css";

* {
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-tap-highlight-color: transparent;
}

body {
  padding-bottom: 41px;
  min-height: 100%;
  background-color: rgb(243, 243, 243);
}

#app {
  overflow: hidden;
}

.router-view-enter-active {
  transition: all 0.6s;
  transform: translateX(0);
}

.router-view-leave-active {
  transition: all 0.3s;
  transform: translateY(-100%);
}

.router-view-leave {
  transform: translateY(0);
}

.router-view-enter {
  transform: translateX(100%);
}

</style>