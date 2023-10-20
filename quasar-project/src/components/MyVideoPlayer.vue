<template>
  <div class="wholePage">
    <VideoPlayer
        class="wholePage"
        ref="videoPlayer"
        :options="playerOptions"
        @ready="handleEvent($event)"
        @play="handleEvent($event)"
        @pause="handleEvent($event)"
        @ended="handleEvent($event)"
        @loadeddata="handleEvent($event)"
        @waiting="handleEvent($event)"
        @playing="handleEvent($event)"
        @canplay="handleEvent($event)"
        @canplaythrough="handleEvent($event)"
    />
  </div>
</template>

<script>
// npm install video.js @videojs-player/vue videojs-youtube --save
// https://github.com/videojs/videojs-youtube
// https://docs.videojs.com/
import { defineComponent } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import 'videojs-youtube/dist/Youtube.min.js'

// import { shallowRef } from 'vue'
// type VideoJsPlayer = ReturnType<typeof videojs>

export default defineComponent({
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
  setup() {
    // const player = shallowRef<VideoJsPlayer>()
    // const handleMounted = (payload: any) => {
    //  player.value = payload.player
    //  console.log('Basic player mounted', payload)
    //}
    // return { player, handleMounted }
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
    handleEvent(event) {
      console.log('TODO handle event', event)
    }
  }
})
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
