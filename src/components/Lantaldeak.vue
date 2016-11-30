<template lang="pug">
#lantaldeak
  .columns
    .column.is-one-third
      .columns
        .column
          router-link.button.is-success.is-fullwidth(:to="{ name: 'lantaldea', params: { id: 'berria' }}") berria
        .column
          p.control.has-addons
            input.input(placeholder="bilatu", type="text", v-model="search")
            span.button(v-on:click="search = ''") X
  table.table
    thead
      tr
        th izena
        th eposta
        th kideak
        th ekintzak
    tbody
      tr(v-for="item in items")
        td {{ item.title }}
        td
          a(:href="mailTo(item.email)") {{ item.email }}
        td {{ item.kideak.length }}
        td
          router-link.button.is-small(:to="{ name: 'lantaldea', params: { id: item.id }}") edit
</template>

<script>
import axios from 'axios'
import Multiselect from 'vue-multiselect'
import _ from 'lodash'

export default {
  components: { Multiselect },
  data () {
    return {
      items: [],
      originalItems: [],
      search: null
    }
  },
  created: function () {
    this.getItems()
  },
  methods: {
    mailTo: function (email) {
      return 'mailto:' + email
    },
    clearCurrent: function () {
      this.current = {
        kideak: []
      }
    },
    getItems: function () {
      var vm = this
      axios.get(process.env.API_URL + '/lantaldea').then((res) => {
        vm.items = res.data
        vm.originalItems = res.data
      })
    }
  },
  watch: {
    search: function (newVal) {
      if (newVal) {
        var search = _.filter(this.items, function (o) {
          var searchString = _.toLower(o.title) + ' ' + _.toLower(o.description)
          var s = _.toLower(newVal)
          if (searchString.search(s) >= 0) {
            return true
          } else {
            return false
          }
        })
        this.items = search
      } else {
        this.items = this.originalItems
      }
    }
  }
}
</script>
