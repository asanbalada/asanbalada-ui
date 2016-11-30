<template lang="pug">
#baliabideak
  .columns
    .column.is-one-third
      .columns
        .column
          router-link.button.is-success.is-fullwidth(:to="{ name: 'baliabidea', params: { id: 'berria' }}") berria
        .column
          p.control.has-addons
            input.input(placeholder="bilatu", type="text", v-model="search")
            span.button(v-on:click="search = ''") X
  table.table
    thead
      tr
        th izena
        th ekintzak
    tbody
      tr(v-for="item in items")
        td {{ item.title }}
        td
          router-link.button.is-small(:to="{ name: 'baliabidea', params: { id: item.id }}") edit
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
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
    getItems: function () {
      var vm = this
      axios.get(process.env.API_URL + '/baliabidea').then((res) => {
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
