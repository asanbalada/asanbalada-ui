<template lang="pug">
#asanbladak
  .columns
    .column.is-one-third
      .columns
        .column
          router-link.button.is-success.is-fullwidth(:to="{ name: 'asanblada', params: { id: 'berria' }}") berria
        .column
          p.control.has-addons
            input.input(placeholder="bilatu", type="text", v-model="search")
            span.button(v-on:click="search = ''") X
    .column.is-two-thirds
      .columns
        .column.is-4
          .control.has-addons
            span.select
              select(v-model="filters.lantaldea")
                option(v-bind:value="null") -- lantaldea --
                option(v-for="lantaldea in lantaldeak", v-bind:value="lantaldea.id") {{ lantaldea.title }}
            span.button(v-on:click="filters.lantaldea = lantaldea") X
        .column.is-4
          pikaday(:options="dateTimeSelectOptions", v-model="filters.date")
  table.table
    thead
      tr
        th data
        th lantaldea
        th ekintzak
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
      items: [],
      originalItems: [],
      lantaldeak: [],
      search: null,
      filters: {
        date: null,
        lantaldea: null
      },
      dateTimeSelectOptions: {
        firstDay: 1,
        timepicker: false
      }
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
        vm.originalItems = res.data
      })
      axios.get(process.env.API_URL + '/lantaldea').then((res) => {
        vm.lantaldeak = res.data
      })
    },
    filter: function () {
      var filtered = this.originalItems
      if (this.filters.lantaldea) filtered = _.filter(filtered, { lantaldeak: [{ id: this.filters.lantaldea }] })
      if (this.filters.date) {
        var me = moment(this.filters.date)
        filtered = _.filter(filtered, function (o) {
          return moment(o.date).isSame(me)
        })
      }
      this.items = filtered
    }
  },
  watch: {
    'filters.lantaldea': function () {
      this.filter()
    },
    'filters.date': function () {
      this.filter()
    },
    search: function (newVal) {
      this.filter()
      if (newVal) {
        var search = _.filter(this.items, function (o) {
          var searchString = _.toLower(o.content)
          var s = _.toLower(newVal)
          if (searchString.search(s) >= 0) {
            return true
          } else {
            return false
          }
        })
        this.items = search
      }
    }
  }
}
</script>
