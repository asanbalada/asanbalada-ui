<template lang="pug">
#eragileak
  router-link.button.is-success(:to="{ name: 'eragilea', params: { id: 'berria' }}") berria
  hr
  .columns
    .column.is-one-third
      p.control.has-addons
        input.input(placeholder="search", type="text", v-model="search")
        span.button(v-on:click="search = ''") clear
    .column.is-two-thirds
      .tabs
        ul
          li(v-bind:class="{ 'is-active': isActive(null) }")
            a(v-on:click="filter = null") Denak
          li(v-bind:class="{ 'is-active': isActive('kolektiboa') }")
            a(v-on:click="filter = 'kolektiboa'") Kolektiboa
          li(v-bind:class="{ 'is-active': isActive('norbanakoa') }")
            a(v-on:click="filter = 'norbanakoa'") Norbanakoa
  table.table
    thead
      tr
        th izena
        th abizenak
        th eposta
        th telefonoa
        th mota
        th actions
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
import Multiselect from 'vue-multiselect'

export default {
  components: { Multiselect },
  data () {
    return {
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
          var fullName = _.toLower(o.fullName)
          var eposta = _.toLower(o.eposta)
          var s = _.toLower(newVal)
          if (fullName.search(s) >= 0) {
            return true
          } else if (eposta.search(s) >= 0) {
            return true
          } else if (o.telefonoa && o.telefonoa.search(s) >= 0) {
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
    clearCurrent: function () {
      this.current = {
        kolektiboak: [],
        postazerrendak: [],
        baliabideak: [],
        mota: ''
      }
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
      axios.get(process.env.API_URL + '/postazerrenda').then((res) => {
        vm.postazerrendak = res.data
      })
      axios.get(process.env.API_URL + '/lantaldea').then((res) => {
        vm.lantaldeak = res.data
      })
      axios.get(process.env.API_URL + '/baliabidea').then((res) => {
        vm.baliabideak = res.data
      })
    },
    edit: function (id) {
      this.current = _.clone(_.find(this.items, { id: id }))
    },
    save: function () {
      var vm = this
      if (vm.current.id) {
        axios.put(process.env.API_URL + '/eragilea/' + vm.current.id, vm.current)
        .then(function (res) {
          vm.clearCurrent()
          vm.getItems()
        })
      } else {
        axios.post(process.env.API_URL + '/eragilea', vm.current)
        .then(function (res) {
          vm.clearCurrent()
          vm.getItems()
        })
      }
    },
    create: function () {
      this.current = {}
    },
    cancel: function () {
      this.current = {}
    },
    remove: function () {
      var vm = this
      axios.delete(process.env.API_URL + '/eragilea/' + vm.current.id)
      .then(function (res) {
        _.remove(this.items, {id: vm.current.id})
        vm.current = {}
        vm.getItems()
      })
    }
  }
}
</script>
