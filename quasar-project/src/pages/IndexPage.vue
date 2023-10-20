<template>
  <q-page>
    <MyVideoPlayer
    />
    <q-btn
      @click="onPressBtn"
      color="primary"
      label="Test Button"
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
    };
  },
  methods: {
    onPressBtn () {
      console.log('onpressbtn')
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
