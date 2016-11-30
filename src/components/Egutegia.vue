<template lang="pug">
#egutegia
  event-modal(:event="event", v-on:hide="event = null")
  full-calendar(v-on:eventClick="showEvent",:lang="lang", :weekNames="weekNames", :monthNames="monthNames", :firstDay="firstDay", :events="events")
</template>

<script>
import axios from 'axios'
// import _ from 'lodash'
import fullCalendar from 'vue-fullcalendar'
import EventModal from './widgets/EventModal'

export default {
  components: { fullCalendar, EventModal },
  data () {
    return {
      monthNames: ['urtarrila', 'otsaila', 'martxoa', 'apirila', 'maiatza', 'ekaina', 'uztaila', 'abuztua', 'iraila', 'urria', 'azaroa', 'abendua'],
      weekNames: ['asl', 'asr', 'asz', 'osg', 'osl', 'lar', 'iga'],
      titleFormat: 'YYYY/MM',
      firstDay: 1,
      lang: 'en',
      events: [],
      event: null
    }
  },
  created: function () {
    this.getItems()
  },
  methods: {
    getItems: function () {
      var vm = this
      axios.get(process.env.API_URL + '/proposamena').then((res) => {
        vm.events = res.data
      })
    },
    showEvent: function (ev, js, pos) {
      console.log(ev, js, pos)
      this.event = ev
    }
  }
}
</script>
