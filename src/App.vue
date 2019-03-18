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