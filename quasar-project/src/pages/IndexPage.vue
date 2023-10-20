<template>
  <q-page>
    <MyVideoPlayer
      ref="myVideoPlayer"
      :stats="player_stats"
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
      player_stats: {}
    };
  },
  methods: {
    ttty () {
      console.log('ttt')
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
