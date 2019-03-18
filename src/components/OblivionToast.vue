<template>
  <transition-group name="slide" class="toast-container" tag="div">
    <div
      class="toast-item"
      v-for="(toast) in toastList"
      :key="`toast_${toast.id}`"
      @click="$store.dispatch('closeToast', toast.id)"
    >
      {{ toast.text }}
    </div>
  </transition-group>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState({
        toastList: state => state.toast.toastList,
      })
    },
  }
</script>

<style scoped>

  .slide-enter-active {
    transition: ease-in-out .5s;
  }

  .slide-leave-active {
    transition: ease-in-out .5s;
    position: absolute;
    white-space: nowrap;
  }

  .slide-enter, .slide-leave-to {
    transform: translateX(calc(-100% - 10px));
  }

  .slide-move {
    transition: transform 1s;
  }

  .toast-container {
    display: flex;
    flex-direction: column;
    position: fixed;
    color: #783f25;
    top: 10px;
    left: 10px;
  }

  .toast-item {
    user-select: none;
    cursor: pointer;
    background-color: wheat;
    padding: 8px 12px;
    margin-bottom: 8px;
    margin-right: auto;
  }

</style>