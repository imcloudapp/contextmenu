<template>
  <div>
    <transition enter-active-class="pull_down" leave-active-class="pull_up" @after-leave="destroy">
      <div class="contextmenu" :class="size||''" v-show="visibled" :style="style" @click.stop>
        <template v-for="(item,i) in items">
          <hr :key="i" v-if="item.line" />
          <span class="item" @click="item.click();close()" :key="i" v-else>{{item.text}}</span>
        </template>
      </div>
    </transition>
    <div class="contextmenu_mask" v-show="visibled" @click="close" @contextmenu.prevent="close"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      size: "",
      items: [],
      event: null,
      visibled: false
    };
  },
  computed: {
    // 计算弹出位置
    style() {
      if (!this.event) return {};
      let e = this.event;
      if (!e) return {};
      let x =
          e.pageX + 300 > document.documentElement.clientWidth
            ? e.pageX - 170
            : e.pageX,
        y = e.pageY;
      return { left: x + "px", top: y + "px" };
    }
  },
  created() {
    // 窗口变化时关闭菜单
    window.addEventListener("resize", this.close);
  },
  methods: {
    close() {
      this.visibled = false;
    },
    destroy() {
      window.removeEventListener("resize", this.close);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    }
  }
}
</script>

<style lang="less" scoped>
.contextmenu {
  background: #fff;
  position: absolute;
  left: 50%;
  top: 40%;
  font-size: 14px;
  min-width: 170px;
  z-index: 1002;
  padding: 10px 0;
  border-radius: 5px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
  .item {
    display: block;
    padding: 8px 18px;
    text-align: left;
    color: #666;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      background: #97b2ff;
      color: #fff;
    }
  }
  hr {
    border: 0;
    background: #e5e5e5;
    height: 1px;
    margin: 8px 0;
  }
  &.small {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
    padding: 5px 0;
    min-width: 100px;
    font-size: 14px;
    .item {
      padding: 5px 18px;
    }
  }
}
.contextmenu_mask {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1001;
  left: 0;
  top: 0;
  cursor: default;
}

.pull_down {
  -webkit-animation-name: pullDown;
  animation-name: pullDown;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.pull_up {
  -webkit-animation-name: pullUp;
  animation-name: pullUp;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

@keyframes pullDown {
  0% {
    -webkit-transform: scale3d(0, 0, 0);
    transform: scale3d(0, 0, 0);
  }
  50% {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-transform: scale3d(1, 0, 1);
    transform: scale3d(1, 0, 1);
    -webkit-transform-origin: center top;
    transform-origin: center top;
  }
  100% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

@keyframes pullUp {
  0% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  50% {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-transform: scale3d(1, 0, 1);
    transform: scale3d(1, 0, 1);
    -webkit-transform-origin: center top;
    transform-origin: center top;
  }
  100% {
    -webkit-transform: scale3d(0, 0, 0);
    transform: scale3d(0, 0, 0);
  }
}
</style>
