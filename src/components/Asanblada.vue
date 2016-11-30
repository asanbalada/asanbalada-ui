<template lang="pug">
#asanblada
  .columns
    .column.is-one-third
      .columns
        .column.is-half
          span.button.is-success.is-fullwidth(v-on:click="save()", v-bind:class="{ 'is-loading': isSaving }") GORDE
        .column.is-one-quarter
          span.button(v-on:click="cancel()") EZEZTATU
        .column.is-one-quarter
          span.button.is-danger(v-on:click="remove()") EZABATU
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
        :lantaldeak="lantaldeak",
        v-on:input="updateProposamena(key, arguments[0])"
        v-on:delete="deleteProposamena(key)",
        v-on:send="showModal(proposamena)",
        style="margin-bottom:10px"
        )
      span.is-fullwidth.button.is-primary(v-on:click="proposamenBerria()") PROPOSAMEN BERRIA
      eposta-modal(:show="showEpostaModal", v-on:hide="closeModal()", :proposamena="proposamena", :selected="selected")
</template>

<script>
import axios from 'axios'
import EpostaModal from './widgets/EpostaModal'
import moment from 'moment'
import _ from 'lodash'
import Multiselect from 'vue-multiselect'
import Pikaday from './widgets/Pikaday'
import ProposamenaItemForm from './proposamena/item-form'

export default {
  name: 'asanblada',
  components: {
    ProposamenaItemForm,
    Multiselect,
    Pikaday,
    EpostaModal
  },
  data () {
    return {
      eragileak: [],
      proposamena: null,
      selected: [],
      showEpostaModal: false,
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
      isSaving: false,
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
    showModal: function (proposamena) {
      this.proposamena = proposamena
      var selected = _.flatten([proposamena.antolatzaileak, proposamena.lagunak])
      this.selected = selected
      this.showEpostaModal = true
    },
    closeModal: function () {
      this.proposamena = null
      this.showEpostaModal = false
      this.getAsanblada()
    },
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
          vm.getAsanblada()
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
      vm.isSaving = true
      if (vm.current.id) {
        axios.put(process.env.API_URL + '/asanblada/' + vm.current.id, vm.current)
        .then(function (res) {
          vm.getAsanblada()
          vm.isSaving = false
        })
      } else {
        axios.post(process.env.API_URL + '/asanblada', vm.current)
        .then(function (res) {
          vm.$router.push({ name: 'asanblada', params: { id: res.data.id } })
          vm.getAsanblada()
          vm.isSaving = false
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
