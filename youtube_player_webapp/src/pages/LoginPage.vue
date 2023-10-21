<template>
    <div class="flex flex-center">
      <div class="q-py-lg">
        <q-layout
          view="lhh LpR lff"
          container
          style="height: 653px; width: 375px;"
          class="shadow-2 rounded-borders q-pt-xl">

        <q-page-container >
          <q-page
            class="flex flex-center">
            <div class='q-px-xl q-pt-lg text-justify' style='color: white; font-weight: 500'>
              Youtube Playlist Player
            </div>
              <div class="row justify-center">
                <div class='col-12 q-py-sm q-px-lg'>
                  <q-btn
                    unelevated
                    rounded
                    class="full-width"
                    style="height:50px;"
                    text-color='grey-8'
                    color="white"
                    @click="googleLoginUser()"
                    >
                    <q-icon
                      left
                      class='fa-google-g-new'
                      name='fab fa-google' />
                    <q-space />
                    Sign in with Google
                    <q-space />
                  </q-btn>
                </div>
              </div>

          </q-page>
        </q-page-container>
        </q-layout>

      </div>
    </div>

</template>

<script>
// https://github.com/wiktorcie/quasar2-firebase-auth/blob/main/src/pages/SocialAuth.vue

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageSocialAuth',
  setup () {
    return { }
  },
  methods: {
    googleLoginUser () {
      console.log('TODO launch google login', this.$gapi)
    }
  }

})
</script>

<style lang='sass'>
.q-page
  background: #1A2980  /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #26D0CE, #1A2980)  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #26D0CE, #1A2980) /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

.fa-google-g-new
  background: conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg) 72% 54%/151% 151% no-repeat
  -webkit-background-clip: text
  background-clip: text
  color: transparent
  -webkit-text-fill-color: transparent

</style>
