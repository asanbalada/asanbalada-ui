<template lang="pug">
#baliabideak
  router-link.button.is-success(:to="{ name: 'baliabidea', params: { id: 'berria' }}") berria
  table.table
    thead
      tr
        th izena
        th actions
    tbody
      tr(v-for="item in items")
        td {{ item.title }}
        td
          router-link.button.is-small(:to="{ name: 'baliabidea', params: { id: item.id }}") edit
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
      eragileak: [],
      current: {
        arduradunak: []
      }
    }
  },
  created: function () {
    this.getItems()
  },
  methods: {
    clearCurrent: function () {
      this.current = {
        arduradunak: []
      }
    },
    getItems: function () {
      var vm = this
      axios.get(process.env.API_URL + '/baliabidea').then((res) => {
        vm.items = res.data
      })
      axios.get(process.env.API_URL + '/eragilea').then((res) => {
        vm.eragileak = res.data
      })
    },
    edit: function (id) {
      this.current = _.clone(_.find(this.items, { id: id }))
      this.current.postazerrenda = this.current.postazerrenda ? this.current.postazerrenda.id : null
    },
    save: function () {
      var vm = this
      if (vm.current.id) {
        axios.put(process.env.API_URL + '/baliabidea/' + vm.current.id, vm.current)
        .then(function (res) {
          vm.clearCurrent()
          vm.getItems()
        })
      } else {
        axios.post(process.env.API_URL + '/baliabidea', vm.current)
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
      axios.delete(process.env.API_URL + '/baliabidea/' + vm.current.id)
      .then(function (res) {
        _.remove(this.items, {id: vm.current.id})
        vm.current = {}
        vm.getItems()
      })
    }
  }
}
</script>
