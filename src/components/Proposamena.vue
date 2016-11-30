<template lang="pug">
form.form
  proposamena-item-form(
    :proposamena="current",
    :proposamenak="proposamenak",
    :baliabideak="baliabideak",
    :eragileak="eragileak",
    :lantaldeak="lantaldeak",
    v-on:delete="remove()",
    v-on:send="showModal()",
    :collapse="false",
    style="margin-bottom:10px"
    )
  hr
  .columns
    .column.is-half
      span.button.is-success.is-fullwidth(v-on:click="save()", v-bind:class="{ 'is-loading': isSaving }") GORDE
    .column.is-one-querter
      span.button.is-fullwidth(v-on:click="cancel()") EZEZTATU
  eposta-modal(:selected="dest",:show="showEpostaModal", v-on:hide="closeModal()", :proposamena="current")
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import Multiselect from 'vue-multiselect'
import ProposamenaItemForm from './proposamena/item-form'
import EpostaModal from './widgets/EpostaModal'

export default {
  components: { Multiselect, ProposamenaItemForm, EpostaModal },
  data () {
    return {
      eragileak: [],
      proposamenak: [],
      lantaldeak: [],
      baliabideak: [],
      showEpostaModal: false,
      dest: [],
      current: {},
      isSaving: false
    }
  },
  created: function () {
    this.getItems()
    this.getEragileak()
    this.getProposamenak()
    this.getLantaldeak()
    this.getBaliabideak()
  },
  methods: {
    showModal: function () {
      this.showEpostaModal = true
      var dest = _.flatten([this.current.antolatzaileak, this.current.lagunak])
      this.dest = dest
    },
    closeModal: function () {
      this.showEpostaModal = false
      this.getItems()
    },
    getItems: function () {
      var vm = this
      if (this.$route.params.id !== 'berria') {
        axios.get(process.env.API_URL + '/proposamena/' + vm.$route.params.id)
        .then(function (res) {
          if (res.data) vm.current = res.data
        })
      }
      axios.get(process.env.API_URL + '/eragilea').then((res) => {
        vm.eragileak = res.data
      })
    },
    save: function () {
      var vm = this
      vm.isSaving = true
      if (vm.current.id) {
        axios.put(process.env.API_URL + '/proposamena/' + vm.current.id, vm.current)
        .then(function (res) {
          vm.getItems()
          vm.isSaving = false
        })
      } else {
        axios.post(process.env.API_URL + '/proposamena', vm.current)
        .then(function (res) {
          vm.$router.push({ name: 'proposamena', params: { id: res.data.id } })
          vm.isSaving = false
        })
      }
    },
    cancel: function () {
      this.$router.push({ name: 'proposamenak' })
    },
    remove: function () {
      var vm = this
      if (window.confirm('seguru?')) {
        axios.delete(process.env.API_URL + '/proposamena/' + vm.current.id)
        .then(function (res) {
          vm.$router.push({ name: 'proposamenak' })
        })
      }
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
    }
  }
}
</script>
