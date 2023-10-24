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
              <div id="g_id_onload"
                   data-client_id="878288378696-8gb7jntrjdqljjk9fjfdc2io3ojtrrpg.apps.googleusercontent.com"
                   data-context="signin"
                   data-ux_mode="popup"
                   data-callback="handleCredentialResponse"
                   data-itp_support="true">
              </div>

              <div class="g_id_signin"
                   data-type="standard"
                   data-shape="rectangular"
                   data-theme="outline"
                   data-text="signin_with"
                   data-size="large"
                   data-logo_alignment="left">
              </div>
            </div>
        </q-page>
      </q-page-container>
      </q-layout>
    </div>
  </div>
</template>

<script>
// https://developers.google.com/identity/gsi/web/tools/configurator
import { defineComponent } from 'vue'

window.handleCredentialResponse = (response) => {
  window.loginlayoutvuecomponent.loginCallback(response)
}

export default defineComponent({
  name: 'LoginLayout',
  setup () {
    return { }
  },
  data () {
    return {
    }
  },
  methods: {
    loginCallback (resp) {
      console.log('Callback inside vue component', resp)
      // this.$router.push('/playlists')
      // this.tmpCallListPlaylists2(resp)
      this.tmpCallTokenStuff()
    },
    tmpCallTokenStuff () {
      console.log('initTokenClient')
      const TTT = this
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: '878288378696-8gb7jntrjdqljjk9fjfdc2io3ojtrrpg.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/youtube',
        callback: (tokenResponse) => {
          TTT.$gapi.client.setApiKey('AIzaSyDt0sTDwR7F_ugYRH4q8RqfjlrahbCS09I')
          TTT.$gapi.client.load('youtube', 'v3', TTT.postLoad)
          console.log('xxx')
        }
      })
      client.requestAccessToken()
    },
    postLoad () {
      console.log('PostLoad')
    },
    tmpCallListPlaylists2 (auth) {
      const TTT = this
      console.log('gapi', this.$gapi)
      this.$gapi.client.init({
        apiKey: 'AIzaSyDt0sTDwR7F_ugYRH4q8RqfjlrahbCS09I',
        // Your API key will be automatically added to the Discovery Document URLs.
        discoveryDocs: ['https://people.googleapis.com/$discovery/rest'],
        // clientId and scope are optional if auth is not required.
        clientId: auth.clientId,
        scope: 'profile'
      }).then(function () {
        // 3. Initialize and make the API request.
        return TTT.$gapi.client.people.people.get({
          resourceName: 'people/me',
          'requestMask.includeField': 'person.names'
        })
      }).then(function (response) {
        console.log(response.result)
      }, function (reason) {
        console.log('Error: ' + reason.result.error.message)
      })
    },
    tmpCallListPlaylists (auth) {
      console.log('calling list pl', auth)
      const config = {
        method: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/playlists',
        data: { },
        params: {
          part: 'snippet,contentDetails',
          mine: true
        },
        headers: {
          Authorization: 'Bearer ' + auth.credential
        }
      }
      console.log('config', config)
      this.$axios(config).then(
        (response) => {
          console.log('RESP', response)
        })
    }
  },
  mounted: function () {
    window.loginlayoutvuecomponent = this
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
