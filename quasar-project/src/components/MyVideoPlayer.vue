<template>
  <div class="wholePage">
    <VideoPlayer
        class="wholePage"
        ref="videoPlayer"
        :options="playerOptions"
        @play="onPlay"
        @pause="onPause"
        @ended="onEnded"
    />
  </div>
</template>

<script>
// npm install video.js @videojs-player/vue videojs-youtube --save
// https://github.com/videojs/videojs-youtube
// https://docs.videojs.com/
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import 'videojs-youtube/dist/Youtube.min.js'

export default {
  name: 'MyVideoPlayer',
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    VideoPlayer
  },
  data() {
    return {
      player: null,
      playerOptions: {
        autoplay: false,
        controls: true,
        techOrder: ['youtube'],
        sources: [
          {
            type: 'video/youtube',
            src: 'https://www.youtube.com/watch?v=W3s2YdgaS5E',
          }
        ]
      }
    };
  },
  mounted() {
  },
  beforeUnmount() {
  },
  methods: {
    onEnded() {
      console.log('onEnded')
    },
    onPlay() {
      console.log('onPlay')
    },
    onPause() {
      console.log('onPause')
    },
  }
}
</script>

<style lang="scss" scoped>
.wholePage {
  width: 100%;
  max-width: 1200px;
  min-height: inherit;
  margin: auto;
  height: 100%;
  display: flex;
  flex-flow: column;
}
</style>
