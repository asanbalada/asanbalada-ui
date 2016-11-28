<template lang="pug">
  #app
    head-bar
    section.section
      .container
        router-view
</template>

<script>
import HeadBar from './components/HeadBar'

export default {
  name: 'app',
  data () {
    return {
      api: process.env.API_URL
    }
  },
  components: {
    HeadBar
  }
}
</script>

<style lang="sass">
@import "./assets/style.sass"
</style>
