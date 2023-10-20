<template>
  <div class="wholePage">
    <VideoPlayer
        class="wholePage"
        ref="videoPlayer"
        :options="playerOptions"
        @mounted="handleMounted"
        @ready="handleEvent($event)"
        @play="handleEvent($event)"
        @pause="handleEvent($event)"
        @ended="handleEvent($event)"
        @loadeddata="handleEvent($event)"
        @waiting="handleEvent($event)"
        @playing="handleEvent($event)"
        @canplay="handleEvent($event)"
        @canplaythrough="handleEvent($event)"
    />{{ stats.milisecondsWatched }} {{ calcWatchDuration }}
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

import videojs from 'video.js';

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
    const player = {
      value: undefined
    }
    const handleMounted = (payload) => {
      player.value = payload.player
    }

    return {player, handleMounted}
  },
  data() {
    return {
      stats: {
        milisecondsWatched: 0
      },
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
      },
      calcWatchDuration: {
        currentlyPlaying: false,
        lastStatePlaying: false,
        lastTime: undefined,
        playMonitorRunning: false,
        playMonitor: undefined
      }
    };
  },
  mounted() {
    this.startPlayMonitorIfNeeded()
  },
  unmount() {
    this.stopPlayMonitor()
  },
  methods: {
    startPlayMonitorIfNeeded() {
      if (this.playMonitorRunning) {
        return
      }
      this.playMonitorRunning = true
      this.playMonitor = setInterval(() => {
        this.updateWatchDuration()
      }, 1000)
    },
    stopPlayMonitor() {
      clearInterval(this.playMonitor)
      this.playMonitorRunning = false
    },
    updateWatchDuration() {
      const curTime = Date.now()
      if (this.calcWatchDuration.currentlyPlaying) {
        if (this.calcWatchDuration.lastStatePlaying) {
          this.stats.milisecondsWatched += (curTime - this.calcWatchDuration.lastTime)
        }
      } else {
        // not currently playing
        if (this.calcWatchDuration.lastStatePlaying) {
          this.stats.milisecondsWatched += (curTime - this.calcWatchDuration.lastTime)
        }
      }
      this.calcWatchDuration.lastTime = curTime
      this.calcWatchDuration.lastStatePlaying = this.calcWatchDuration.currentlyPlaying
    },
    isPlayingEventType(eventType) {
      if (eventType === 'playing') {
        return true
      }
      if (eventType === 'play') {
        return true
      }
      return false
    },
    handleEvent(event) {
      if (this.isPlayingEventType(event.type)) {
        this.calcWatchDuration.currentlyPlaying = true
        this.startPlayMonitorIfNeeded()
      } else {
        this.calcWatchDuration.currentlyPlaying = false
        this.stopPlayMonitor()
      }
      this.updateWatchDuration()
      console.log('TODO handle event', event)
    },
    play() {
      this.player.value.play()
    },
    pause() {
      this.player.value.pause()
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
