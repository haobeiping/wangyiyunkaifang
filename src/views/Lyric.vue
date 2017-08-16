<template>
  <div class="player">
    <div class="body">
      <header class="header">
        <h1>{{musicInfo.name}}</h1>
        <div>
          <template v-for="ar in musicInfo.ar">{{ar.name}} </template>
        </div>
      </header>
       
      <div class="pic">
        <router-link :to="{name: 'Player'}">
        <img :style="{'animation-play-state': playing ? 'running' : 'paused'}" v-if="musicInfo.al" :src="musicInfo.al.picUrl" alt="">
        </router-link>
      </div>
    </div>
   
    <div v-if="musicInfo.al"  :style="{'backgroundImage': 'url(' + musicInfo.al.picUrl + ')'}" class="bg">
      <div class="mask"></div>
    </div>
    <audio ref="audio" :src="url"></audio>
    <div class="Progressbar">
      <p class="start">00:00</p>
      <input type="range" value="0"/>
      <p class="end">04:31</p>
    </div>
    <div class="control">
        <button>上一首</button>
        <button @click="toggleState">{{playing ? '暂停' : '播放'}}</button>
        <button>下一首</button>
      </div>
  </div>
</template>
<style scoped>
  .control{
    height: 100px;
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
  }
  .pic{
    border: 30px solid #000;
    border-radius: 50%;
    height: 150px;
    width: 150px;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .pic > img{
    animation: rotate 6s infinite linear;
  }
  @keyframes rotate {
    from {
        transform: rotateZ(0deg);
    }
    to {
        transform: rotateZ(360deg);
    }
  }
  .pic img{
    height: 100%;
    width: 100%;
  }
  .player{
    height: 100%;
  }
  .body{
    position: relative;
    z-index: 10;
    height: 100%;
  }
  .bg, .bg > .mask{
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
  }
  .bg{
    background-size: cover;
    filter: blur(30px)
  }
  .bg > .mask{
    background-color: #000;
    opacity: .4;
  }
  .header{
    padding: 10px;
    color: #f1f1f1;
    box-shadow: 0 0 4px #aaa;
  }
  .header > h1{
    margin: 0px 0 8px 0;
    font-size: 16px;
    font-weight: normal;
  }
  .header > div{
    font-size: 12px;
  }
  .Progressbar{
    position: absolute;
    bottom: 130px;
    position: relative;
  }
  .Progressbar .start{
    font-size: 12px;
    position: absolute;
    top: -8px;
    left: 10px;
  }
  .Progressbar input{
    position: absolute;
    top: 0px;
    left: 45px;
    width: 75%;
  }
  .Progressbar .end{
    position: absolute;
    top: -8px;
    right:10px;
    font-size: 12px;
  }
</style>
<script>
  export default{
    data () {
      return {
        musicInfo: {},
        url: '',
        playing: false
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
      })
    }
  }
</script>