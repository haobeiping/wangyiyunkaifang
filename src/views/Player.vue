<template>
  <div class="player">
    <div class="body">
      <header class="header">
          <h1 style="font-size:20px">{{musicInfo.name}}</h1>
          <img src="../images/分享.png" height="200" width="200" alt="">
          <div>
            <template v-for="ar in musicInfo.ar">{{ar.name}} </template>
          </div> 
      </header>
      <div class="pic"  v-show="show"  @click="show = false , stop=true" >
        <img :style="{'animation-play-state': playing ? 'running' : 'paused'}" v-if="musicInfo.al" :src="musicInfo.al.picUrl" >
      </div>
      <transition name="fade">
      <div class="Lyrics_list" v-show="stop"  @click="show = true , stop=false"  >
          <ul>
            <li>{{lyrics}}</li>
          </ul>                   
      </div>
      </transition>
    </div>
      <router-link :to="{name: 'Lyric'}">
       <div v-if="musicInfo.al"  :style="{'backgroundImage': 'url(' + musicInfo.al.picUrl + ')'}" class="bg">
        <div class="mask"></div>
        </div>
      </router-link>
      <audio type="range" value=0 ref="audio" :src="url"></audio>
      <div id="time">  
      </div>
      <div class="Progressbar">
        <p class="start">00:00</p>
        <input type="range" value="0"/>
        <p class="end">04:31</p>
      </div>
      <div class="control">
        <span class="glyphicon glyphicon-step-backward"></span>
        <span v-if="!playing" class="glyphicon glyphicon-play" @click="toggleState" ></span>
        <span v-else class="glyphicon glyphicon-pause"   @click="toggleState"></span>
        <span class="glyphicon glyphicon-step-forward"></span>
        <span class="glyphicon glyphicon-list  list_box"></span>
      </div>   
  </div>
</template>
<style scoped>
.active{
  color:red;
}
.Lyrics_list{
    width: 50%;
    top: 20%;
    position: absolute;
    left: 50%;
    transform: translate( -50%);
    height: 360px;
    overflow: hidden
  }
  .control{
    margin-bottom: -16px;
    height: 100px;
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    z-index: 999;
  }
  .control span{
    color: #bfbfbf;
    font-size: 16px;
    padding-left: 30px;
  }
  .left{
    position: relative;
  }
  .left img{
    width: 30px;
    height: 30px;
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .pic{
    border: 25px solid #000;
    border-radius: 50%;
    height: 180px;
    width: 180px;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  header{
    position: relative;
    overflow: hidden;
  }
   header>img{
    position: absolute;
    top: 20px;
    right: 20px;
    width: 30px;
    height: 30px;
   }
  .pic > img{
    animation: rotate 8s infinite linear;
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
  input[type=range] {
      -webkit-appearance: none;
      width: 300px;
      border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
  }
  input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
  }    
  input[type=range]::-webkit-slider-runnable-track {
    height: 5px;
    border-radius: 1px; /*将轨道设为圆角的*/
    
  }
  input[type=range]:focus {
      outline: none;
  }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 10px;
    width: 10px;
    margin-top: -2px; /*使滑块超出轨道部分的偏移量相等*/
    background: #ffffff; 
    border-radius: 50%; /*外观设置为圆形*/
    border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
    box-shadow: 0 .125em .125em #3b4547; /*添加底部阴影*/
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
    color: #E3DDD8;
    font-size: 12px;
    position: absolute;
    top: -4px;
    left: 10px;
  }
  .Progressbar input{
    color: #6D6F6D;
    position: absolute;
    top: 0px;
    left: 45px;
    width: 77%;
  }
  .Progressbar .end{
    color: #E3DDD8;
    position: absolute;
    top: -4px;
    right:10px;
    font-size: 12px;
  }
  .list_box{
    margin-right:20px; 
    float: right;
  }
  .fade-enter-active, .fade-leave-active {
  transition: opacity .1s
}
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
</style>
<script>
  export default{
    data () {
      return {
        lys: true,
        stop: false,
        show: true,
        musicInfo: {},
        url: '',
        playing: false,
        lyrics: ''
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
        this.lyrics = res.body.lrc.lyric
        console.log(this.lyrics)
      })
    }
  }
</script>