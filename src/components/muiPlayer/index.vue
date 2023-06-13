<template>
  <div :id="container" />
</template>

<script>
import "mui-player/dist/mui-player.min.css";
import MuiPlayer from "mui-player";

export default {
  props: {
    src: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    container: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  mounted() {
    new MuiPlayer({
      container: "#" + this.container,
      title: this.title,
      src: this.src,
      pageHead: false,
      height: "200px",
      autoFit: false,
      themeColor: "#409EFF"
    });
  }
};
</script>