<template lang="pug">
#postazerrendak
  //- router-link.button.is-success(:to="{ name: 'postazerrenda', params: { id: 'berria' }}") berria
  table.table
    thead
      tr
        th izena
        th lantaldea
        th kideak
        th actions
    tbody
      tr(v-for="item in items")
        td {{ item.email }}
        td {{ showLantaldea(item) }}
        td {{ item.kideak.length }}
        td
          router-link.button.is-small(:to="{ name: 'postazerrenda', params: { id: item.id }}") edit
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
    showLantaldea: function (lantaldea) {
      return lantaldea ? lantaldea.title : '---'
    },
    getItems: function () {
      var vm = this
      axios.get(process.env.API_URL + '/postazerrenda').then((res) => {
        vm.items = res.data
      })
      axios.get(process.env.API_URL + '/eragilea').then((res) => {
        vm.eragileak = res.data
      })
    }
  }
}
</script>
