<template lang="pug">
#postazerrendak
  .columns
    .column.is-one-third
      .columns
        //- .column
        //-   router-link.button.is-success.is-fullwidth(:to="{ name: 'postazerrenda', params: { id: 'berria' }}") berria
        .column
          p.control.has-addons
            input.input(placeholder="bilatu", type="text", v-model="search")
            span.button(v-on:click="search = ''") X
  table.table
    thead
      tr
        th izena
        th lantaldea
        th ekintzak
    tbody
      tr(v-for="item in items")
        td {{ item.email }}
        td {{ showLantaldea(item) }}
        td
          router-link.button.is-small(:to="{ name: 'postazerrenda', params: { id: item.id }}") edit
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
    showLantaldea: function (lantaldea) {
      return lantaldea ? lantaldea.title : '---'
    },
    getItems: function () {
      var vm = this
      axios.get(process.env.API_URL + '/postazerrenda').then((res) => {
        vm.items = res.data
        vm.originalItems = res.data
      })
    }
  },
  watch: {
    search: function (newVal) {
      if (newVal) {
        var search = _.filter(this.items, function (o) {
          var searchString = _.toLower(o.title) + ' ' + _.toLower(o.description) + ' ' + _.toLower(o.domain)
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
