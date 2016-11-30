<template lang="pug">
#eragileak
  .columns
    .column.is-one-third
      .columns
        .column
          router-link.button.is-success.is-fullwidth(:to="{ name: 'eragilea', params: { id: 'berria' }}") berria
        .column
          p.control.has-addons
            input.input(placeholder="bilatu", type="text", v-model="search")
            span.button(v-on:click="search = ''") X
    .column.is-two-thirds
      .tabs.is-toggle
        ul
          li(v-bind:class="{ 'is-active': isActive(null) }")
            a(v-on:click="filter = null") denak
          li(v-for="mota in motak", v-bind:class="{ 'is-active': isActive(mota) }")
            a(v-on:click="filter = mota") {{ mota }}
  table.table
    thead
      tr
        th izena
        th abizenak
        th eposta
        th telefonoa
        th mota
        th ekintzak
    tbody
      tr(v-for="item in itemsIn(filter)")
        td {{ item.izena }}
        td {{ item.abizenak }}
        td
          a(:href="mailTo(item.eposta)") {{ item.eposta }}
        td {{ item.telefonoa }}
        td {{ item.mota }}
        td
          router-link.button.is-small(:to="{ name: 'eragilea', params: { id: item.id }}") edit
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  data () {
    return {
      motak: process.env.ERAGILE_MOTAK,
      items: [],
      originalItems: [],
      filter: null,
      search: null
    }
  },
  created: function () {
    this.getItems()
  },
  watch: {
    search: function (newVal) {
      if (newVal) {
        var search = _.filter(this.originalItems, function (o) {
          var searchString = _.toLower(o.fullName) + ' ' +
          _.toLower(o.eposta) + ' ' +
          _.toLower(o.bio)
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
  },
  methods: {
    isActive: function (value) {
      return (this.filter === value)
    },
    mailTo: function (email) {
      return 'mailto:' + email
    },
    itemsIn: function (filter) {
      if (filter) return _.filter(this.items, { mota: filter })
      return this.items
    },
    getItems: function () {
      var vm = this
      axios.get(process.env.API_URL + '/eragilea').then((res) => {
        vm.items = res.data
        vm.originalItems = res.data
      })
    }
  }
}
</script>
