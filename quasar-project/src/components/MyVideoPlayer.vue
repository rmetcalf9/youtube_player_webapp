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
    />{{ stats.milisecondsWatched }} {{ calcWatchDuration }} {{ considerWatchedThreashhold }}
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
    },
    considerWatchedThreashhold: {
      type: Number,
      default() {
        return 10000
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
        milisecondsWatched: 0,
        vidplaying: undefined
      },
      playerOptions: {
        autoplay: false,
        controls: true,
        techOrder: ['youtube'],
        sources: [
          {
            type: 'video/youtube',
            src: undefined,
          }
        ]
      },
      calcWatchDuration: {
        currentlyPlaying: false,
        lastStatePlaying: false,
        lastTime: undefined,
        playMonitorRunning: false,
        playMonitor: undefined,
        consideredWatched: false
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

      if (this.calcWatchDuration.consideredWatched) {
        return
      }
      if (this.stats.milisecondsWatched > this.considerWatchedThreashhold) {
        this.calcWatchDuration.consideredWatched = true
        this.emitConsiderWatched()
      }
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
    emitConsiderWatched() {
      this.$emit('consideredwatched', {src: this.stats.vidplaying})
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
      if (event.type === 'ended') {
        if (!this.calcWatchDuration.consideredWatched) {
          this.calcWatchDuration.consideredWatched = true
          this.emitConsiderWatched()
        }
        this.$emit('ended')
      }
    },
    play() {
      this.player.value.play()
    },
    pause() {
      this.player.value.pause()
    },
    playSrc(type, src) {
      this.stopPlayMonitor()
      this.stats = {
        milisecondsWatched: 0,
        vidplaying: {
          type: type,
          src: src,
        }
      }
      this.calcWatchDuration = {
        currentlyPlaying: false,
        lastStatePlaying: false,
        lastTime: undefined,
        playMonitorRunning: false,
        playMonitor: undefined,
        consideredWatched: false
      }

      this.player.value.src([this.stats.vidplaying])
      this.player.value.play()
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
