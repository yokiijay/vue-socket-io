<template>
  <div class="App">
    <div class="chat-area">
      <ul>
        <li v-for="(item,index) in list" :key="index">{{item}}</li>
      </ul>
    </div>
    <div class="send-area">
      <input type="text" v-model="input" />
      <button @click="handleSend">发送消息</button>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'App',
  data(){
    return {
      list: [],
      input: ''
    }
  },
  methods: {
    handleSend(){
      this.socket.emit('message', this.input)
      this.input = ''
    }
  },
  mounted(){
    const myIp = window.location.host.split(':')[0]
    this.socket = io.connect(`http://${myIp}:5500`)
    this.socket.on('message', db=>{
      this.list = db
    })

    window.onkeydown = ev =>{
      if(ev.code==='Enter'){
        this.handleSend()
      }
    }
  }
}
</script>

<style>
html,body { height: 100%; width: 100%; }
</style>

<style lang="less" scoped>
.App {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: whitesmoke;
}
.chat-area {
  flex: 1;
  display: grid;
  place-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  text-align: center;

  ul,li {
    list-style-type: none;
    padding: none;
    margin: none;
  }

  li {
    font-size: 22px;
    margin: 10px 0;
  }
}
.send-area {
  display: flex;
  padding: 16px;
  
  input {
    flex: 1;
    height: 10vh;
    background: white;
    border: none;
    border-radius: 8px;
    outline: none;
    font-size: 24px;
    padding: 0 15px;
  }

  button {
    padding: 0 20px;
    border: none;
    margin-left: 10px;
    border-radius: 8px;
    background: royalblue;
    color: white;
    outline: none;
    cursor: pointer;
  }
}
</style>
