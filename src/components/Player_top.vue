<template>
  <div class="list">
     <ul>
       <li></li>
     </ul>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        musicInfo: {},
        url: '',
        playing: false,
        lyrics: {}
      }
    },
    methods: {
      toggleState () {
        let audio = this.$refs['audio']
        if (this.playing) {
          audio.pause()
        } else {
          audio.play()
        }
        this.playing = !this.playing
      }
    },
    mounted () {
      this.$http.get('song/detail', {
        params: {
          ids: this.$route.params.id
        }
      }).then(res => {
        this.musicInfo = res.data.songs[0]
      })
      this.$http.get('music/url', {
        params: {
          id: this.$route.params.id
        }
      }).then(res => {
        this.url = res.data.data[0].url
      })
      this.$http.get('lyric', {
        params: {
          id: this.$route.params.id
        }
      }).then(res => {
        console.log(res.body.lrc.lyric)
      })
    }
  }
</script>
<style>
  
</style>