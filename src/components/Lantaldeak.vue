<template lang="pug">
#lantaldeak
  router-link.button.is-success(:to="{ name: 'lantaldea', params: { id: 'berria' }}") berria
  table.table
    thead
      tr
        th izena
        th kideak
        th actions
    tbody
      tr(v-for="item in items")
        td {{ item.title }}
        td {{ item.kideak.length }}
        td
          router-link.button.is-small(:to="{ name: 'lantaldea', params: { id: item.id }}") edit
</template>

<script>
import axios from 'axios'
import Multiselect from 'vue-multiselect'

export default {
  components: { Multiselect },
  data () {
    return {
      items: []
    }
  },
  created: function () {
    this.getItems()
  },
  methods: {
    clearCurrent: function () {
      this.current = {
        kideak: []
      }
    },
    getItems: function () {
      var vm = this
      axios.get(process.env.API_URL + '/lantaldea').then((res) => {
        vm.items = res.data
      })
    }
  }
}
</script>
