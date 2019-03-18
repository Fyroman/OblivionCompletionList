<template>
  <div>
    <router-view/>

    <oblivion-toast/>
  </div>
</template>

<script>
  import OblivionToast from './components/OblivionToast'
  export default{
    components: {
      OblivionToast,
    }
  }
</script>

<style>
  #app {
    font-family: 'Kingthings Petrock', 'Felipa', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  body {
    background: #FAEBD7 url(//en.uesp.net/w/extensions/UespCustomCode/files/Parchment_bg.jpg) 0 0 repeat;
  }
</style>
