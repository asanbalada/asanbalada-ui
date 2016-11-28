<template lang="pug">
.columns
  .column.is-one-third
    .columns
      .column.is-half
        span.button.is-success.is-fullwidth(v-on:click="save()") SAVE
      .column.is-one-quarter
        span.button(v-on:click="cancel()") CANCEL
      .column.is-one-quarter
        span.button.is-danger(v-on:click="remove()") DELETE
    label.label data
    p.control
      pikaday(:options="dateSelectOptions", v-model="current.date")
    p.control
      label.label lantaldea
      multiselect(
        v-model="current.lantaldeak",
        :options="lantaldeak",
        :close-on-select="true",
        :clear-on-select="false",
        placeholder="Select one",
        :multiple="true",
        label="title",
        track-by="id"
      )
    p.control
      label.label partaideak
      multiselect(
        v-model="current.partaideak",
        :options="eragileak",
        :close-on-select="true",
        :clear-on-select="false",
        placeholder="Select one",
        :multiple="true",
        label="fullName",
        track-by="id"
      )
    p.control
      label.label azalpena
      textarea.textarea(v-model="current.content")
  .column.is-two-thirds
    proposamena-item-form(
      v-for="(proposamena, key) in current.proposamenak",
      :proposamena="proposamena",
      :proposamenak="proposamenak",
      :baliabideak="baliabideak",
      :eragileak="eragileak",
      v-on:input="updateProposamena(key, arguments[0])"
      v-on:delete="deleteProposamena(key)",
      style="margin-bottom:10px"
      )
    span.is-fullwidth.button.is-success(v-on:click="proposamenBerria()") Proposamen berria
</template>

<script>
import axios from 'axios'
// import _ from 'lodash'
import moment from 'moment'
import Multiselect from 'vue-multiselect'
import Pikaday from './widgets/Pikaday'
import ProposamenaItemForm from './proposamena/item-form'

export default {
  name: 'asanblada',
  components: {
    ProposamenaItemForm,
    Multiselect,
    Pikaday
  },
  data () {
    return {
      eragileak: [],
      proposamenak: [],
      lantaldeak: [],
      baliabideak: [],
      current: {
        date: null,
        lantaldeak: [],
        proposamenak: [],
        partaideak: [],
        content: null
      },
      dateSelectOptions: {
        firstDay: 1,
        displayFormat: 'YYYY-MM-DD'
      }
    }
  },
  created: function () {
    this.getAsanblada()
    this.getEragileak()
    this.getProposamenak()
    this.getLantaldeak()
    this.getBaliabideak()
  },
  methods: {
    getAsanblada: function () {
      var vm = this
      if (this.$route.params.id !== 'berria') {
        axios.get(process.env.API_URL + '/asanblada/' + this.$route.params.id)
        .then(function (res) {
          if (res.data) vm.current = res.data
        })
      }
    },
    formatDate: function (date) {
      return moment(date).format('YYYY-MM-DD')
    },
    deleteProposamena: function (key) {
      var vm = this
      if (window.confirm('seguru?')) {
        var proposamena = this.current.proposamenak[key]

        axios.delete(process.env.API_URL + '/proposamena/' + proposamena.id)
        .then(function () {
          vm.$router.push({ name: 'asanbladak' })
        })
      }
    },
    updateProposamena: function (key, val) {
      this.current.proposamenak.splice(key, 1, val)
    },
    clearCurrent: function () {
      this.current = {
        date: null,
        lantaldeak: [],
        proposamenak: [],
        partaideak: [],
        content: null
      }
    },
    proposamenBerria: function () {
      this.current.proposamenak.push({})
    },
    getEragileak: function () {
      var vm = this
      axios.get(process.env.API_URL + '/eragilea').then((res) => {
        vm.eragileak = res.data
      })
    },
    getProposamenak: function () {
      var vm = this
      axios.get(process.env.API_URL + '/proposamena').then((res) => {
        vm.proposamenak = res.data
      })
    },
    getLantaldeak: function () {
      var vm = this
      axios.get(process.env.API_URL + '/lantaldea').then((res) => {
        vm.lantaldeak = res.data
      })
    },
    getBaliabideak: function () {
      var vm = this
      axios.get(process.env.API_URL + '/baliabidea').then((res) => {
        vm.baliabideak = res.data
      })
    },
    save: function () {
      var vm = this
      if (vm.current.id) {
        axios.put(process.env.API_URL + '/asanblada/' + vm.current.id, vm.current)
        .then(function (res) {

        })
      } else {
        axios.post(process.env.API_URL + '/asanblada', vm.current)
        .then(function (res) {
          vm.$router.push({ name: 'asanblada', params: { id: res.data.id } })
        })
      }
    },
    create: function () {
      this.current = {}
    },
    cancel: function () {
      this.$router.push({ name: 'asanbladak' })
    },
    remove: function () {
      if (window.confirm('seguru?')) {
        var vm = this
        axios.delete(process.env.API_URL + '/asanblada/' + vm.current.id)
        .then(function (res) {
          vm.$router.push({ name: 'asanbladak' })
        })
      }
    }
  }
}
</script>
