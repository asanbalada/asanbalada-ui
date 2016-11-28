<template lang="pug">
.asanbladak
  router-link.button.is-success(:to="{ name: 'asanblada', params: { id: 'berria' }}") berria
  .columns
    .column.is-fullwidth
      table.table
        thead
          tr
            th data
            th lantaldea
            th actions
        tbody
          tr(v-for="item in items")
            td {{ formatDate(item.date) }}
            td {{ formatLantaldeak(item.lantaldeak) }}
            td
              router-link.button.is-small(:to="{ name: 'asanblada', params: { id: item.id }}") edit
              a.button.is-small(:href="download(item)") akta
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import Multiselect from 'vue-multiselect'
import Pikaday from './widgets/Pikaday'
import ProposamenaItemForm from './proposamena/item-form'

export default {
  name: 'asanbladak',
  components: {
    ProposamenaItemForm,
    Multiselect,
    Pikaday
  },
  data () {
    return {
      items: []
    }
  },
  created: function () {
    this.getItems()
  },
  methods: {
    download: function (item) {
      return process.env.API_URL + '/asanblada/' + item.id + '/export'
    },
    formatLantaldeak: function (lantaldeak) {
      var result = []
      _.each(lantaldeak, function (o) {
        result.push(o.title)
      })
      return result.join(', ')
    },
    formatDate: function (date) {
      return moment(date).format('YYYY-MM-DD')
    },
    getItems: function () {
      var vm = this
      axios.get(process.env.API_URL + '/asanblada').then((res) => {
        vm.items = res.data
      })
    }
  }
}
</script>
