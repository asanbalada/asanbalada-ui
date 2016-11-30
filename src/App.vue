<template lang="pug">
  #app
    head-bar
    section.section
      .container
        router-view
    footer.footer
      .container
        .content.has-text-centered
          p(style="font-weight:bold;") ASANBALADA
            span(style="color:hotpink;margin:0 10px;") ♥
            a(href="https://gitlab.com/asanbalada/asanbalada", style="color:#4a4a4a;") software librea
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
