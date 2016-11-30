<template lang="pug">
.modal.is-active(v-if="event")
  .modal-background
  .modal-card
    header.modal-card-head
      p.modal-card-title
        span.tag {{ event.uuid }}
        | {{ event.title }}
      span.delete(v-on:click="close()")
    section.modal-card-body
      p hasi: {{ formatDate(event.start) }}
      p bukatu: {{ formatDate(event.end) }}
      p mota: {{ event.type }}
      p egoera: {{ event.status }}
      br
      p {{ event.content }}

    footer.modal-card-foot
      a.button(v-on:click="close()") Itxi
</template>

<script>
// import _ from 'lodash'
import moment from 'moment'

export default {
  name: 'event-modal',
  props: ['event'],
  data () {
    return {
      active: false
    }
  },
  watch: {
    event: function (newVal) {
      if (newVal) {
        this.active = true
      } else {
        this.active = false
      }
    }
  },
  created: function () {
    this.active = this.event
  },
  methods: {
    close: function () {
      this.$emit('hide')
    },
    formatDate: function (date) {
      return moment(date).format('YYYY-MM-DD HH:mm')
    }
  }
}
</script>

<style>
</style>
