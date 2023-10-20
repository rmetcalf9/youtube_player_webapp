<template>
  <q-page>
    <MyVideoPlayer
      ref="myVideoPlayer"
      considerWatchedThreashhold="10001"
      @consideredwatched="markVidWatched"
      @ended="onEnded"
    />
    <q-btn
      @click="$refs.myVideoPlayer.play()"
      color="primary"
      label="Play"
    />
    <q-btn
      @click="$refs.myVideoPlayer.pause()"
      color="primary"
      label="Pause"
    />
    <q-btn
      @click="onNext"
      color="primary"
      label="Next"
    />
    {{ playlist }} {{ playlistCounter }}
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import MyVideoPlayer from '../components/MyVideoPlayer.vue'


export default defineComponent({
  name: 'IndexPage',
  components: {
    MyVideoPlayer
  },
  data() {
    return {
      playlist: [
        { vid_src: 'https://www.youtube.com/watch?v=LdV-zF43iFA'},
        { vid_src: 'https://www.youtube.com/watch?v=wUnnXwLTbnA'},
        { vid_src: 'https://www.youtube.com/watch?v=_X1kF8pzT74'},
        { vid_src: 'https://www.youtube.com/watch?v=XcvTcGTLLVM'}
      ],
      playlistCounter: undefined
    };
  },
  methods: {
    markVidWatched (src) {
      console.log('TODO Mark this video as watched', src)
    },
    onEnded () {
      this.onNext()
    },
    onNext() {
      if (typeof (this.playlistCounter) === 'undefined') {
        this.playlistCounter = -1
      }
      this.playlistCounter += 1
      if (this.playlistCounter >= this.playlist.length) {
        this.playlistCounter = 0
      }
      console.log('PLAYING', this.playlist[this.playlistCounter].vid_src)
      this.$refs.myVideoPlayer.playSrc('video/youtube', this.playlist[this.playlistCounter].vid_src)
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
