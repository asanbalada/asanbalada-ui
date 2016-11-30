<template lang="pug">
#baliabideak
  .columns
    .column.is-one-quarter
      p.control.has-addons
        input.input(placeholder="bilatu", type="text", v-model.trim="search")
        span.button(v-on:click="search = ''") X
    .column.is-three-quarters
      .columns
        .column.is-3
          .control.has-addons
            span.select
              select(v-model="filters.type")
                option(v-bind:value="null") -- mota --
                option(v-for="mota in motak", v-bind:value="mota") {{ mota }}
            span.button(v-on:click="filters.type = null") X
        .column.is-3
          .control.has-addons
            span.select
              select(v-model="filters.status")
                option(v-bind:value="null") -- egoera --
                option(v-for="egoera in egoerak", v-bind:value="egoera") {{ egoera }}
            span.button(v-on:click="filters.status = null") X
        .column.is-3
          pikaday(:options="dateTimeSelectOptions", v-model="filters.start")
        .column.is-3
          pikaday(:options="dateTimeSelectOptions", v-model="filters.end")
  table.table
    thead
      tr
        th(v-on:click="sort('uuid')")
          | uuid
          small(v-if="orders.uuid === 'asc'") ▲
          small(v-if="orders.uuid === 'desc'") ▼
        th(v-on:click="sort('title')")
          | izena
          small(v-if="orders.title === 'asc'") ▲
          small(v-if="orders.title === 'desc'") ▼
        th(v-on:click="sort('type')")
          | mota
          small(v-if="orders.type === 'asc'") ▲
          small(v-if="orders.type === 'desc'") ▼
        th(v-on:click="sort('status')")
          | egoera
          small(v-if="orders.status === 'asc'") ▲
          small(v-if="orders.status === 'desc'") ▼
        th(v-on:click="sort('start')")
          | hasi
          small(v-if="orders.start === 'asc'") ▲
          small(v-if="orders.start === 'desc'") ▼
        th(v-on:click="sort('end')")
          | bukatu
          small(v-if="orders.end === 'asc'") ▲
          small(v-if="orders.end === 'desc'") ▼
        th ekintzak
    tbody
      tr(v-for="item in items")
        td
          span.tag {{ item.uuid }}
        td {{ item.title }}
        td {{ item.type }}
        td
          span.tag(v-bind:class="{ 'is-success': item.status ==='onartua', 'is-danger': item.status ==='baztertua' }") {{ item.status }}
        td {{ formatDate(item.start) }}
        td {{ formatDate(item.end) }}
        td
          router-link.button.is-small(:to="{ name: 'proposamena', params: { id: item.id }}") edit
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'
import Pikaday from './widgets/Pikaday'

export default {
  name: 'proposamenak',
  components: { Pikaday },
  data () {
    return {
      items: [],
      originalItems: [],
      filters: {
        type: null,
        status: null,
        start: null,
        end: null
      },
      orders: {
        start: null,
        end: null,
        title: null,
        uuid: null,
        type: null,
        status: null
      },
      dateTimeSelectOptions: {
        firstDay: 1,
        timepicker: true
      },
      search: null,
      motak: process.env.PROPOSAMEN_MOTAK,
      egoerak: process.env.PROPOSAMEN_EGOERAK
    }
  },
  created: function () {
    this.getItems()
  },
  methods: {
    getItems: function () {
      var vm = this
      axios.get(process.env.API_URL + '/proposamena').then((res) => {
        vm.items = res.data
        vm.originalItems = res.data
      })
    },
    filter: function () {
      var filtered = this.originalItems
      if (this.filters.type) filtered = _.filter(filtered, { type: this.filters.type })
      if (this.filters.status) filtered = _.filter(filtered, { status: this.filters.status })
      if (this.filters.start) {
        var ms = moment(this.filters.start)
        filtered = _.filter(filtered, function (o) {
          return moment(o.start).isSameOrAfter(ms)
        })
      }
      if (this.filters.end) {
        var me = moment(this.filters.end)
        filtered = _.filter(filtered, function (o) {
          return moment(o.start).isSameOrBefore(me)
        })
      }
      this.items = filtered
    },
    formatDate: function (date) {
      return date ? moment(date).format('YYYY-MM-DD HH:mm') : null
    },
    sort: function (column) {
      var vm = this
      switch (this.orders[column]) {
        case 'asc':
          this.orders[column] = 'desc'
          break
        case 'desc':
          this.orders[column] = null
          break
        default:
          this.orders[column] = 'asc'
      }

      var filters = []
      var values = []
      _.each(this.orders, function (val, key) {
        if (val) {
          filters.push(key)
          values.push(val)
        }
      })
      vm.items = _.orderBy(vm.items, filters, values)
    }
  },
  watch: {
    'filters.type': function () {
      this.filter()
    },
    'filters.status': function (newVal) {
      this.filter()
    },
    'filters.start': function () {
      this.filter()
    },
    'filters.end': function () {
      this.filter()
    },
    search: function (newVal) {
      this.filter()
      if (newVal) {
        var search = _.filter(this.items, function (o) {
          var searchString = _.toLower(o.title) + '' + _.toLower(o.uuid)
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
