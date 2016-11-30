<template lang="pug">
form.form
  .columns
    .column.is-half
      label.label izena
      p.control
        input.input(v-model="current.izena",type="text", placeholder="Izena")
    .column.is-half
      label.label abizenak
      p.control
        input.input(v-model="current.abizenak",placeholder="Abizenak")
  .columns
    .column.is-half
      label.label telefonoa
      p.control
        input.input(v-model="current.telefonoa",placeholder="telefonoa")
    .column.is-half
      label.label eposta
      p.control
        input.input(v-model="current.eposta",placeholder="eposta")
  .columns
    .column.is-half
      label.label type
      p.control
        span.select
          select(v-model="current.mota")
            option(v-for="mota in motak") {{ mota }}
    .column.is-half
      .eragilea-kolektiboak(v-if="current.mota==='norbanakoa'")
        label.label Kolektiboak
        p.control
          multiselect(
            v-model="current.kolektiboak",
            :options="itemsIn('kolektiboa')",
            :close-on-select="true",
            :clear-on-select="false",
            placeholder="Select one",
            label="izena",
            track-by="id",
            :multiple="true"
          )
  p.control
    label.label bio
    textarea.textarea(v-model="current.bio")

  p.control
    label.label postazerrendak
    multiselect(
      v-model="current.postazerrendak",
      :options="postazerrendak",
      :close-on-select="true",
      :clear-on-select="false",
      placeholder="Select one",
      label="email",
      track-by="id",
      :multiple="true"
    )
  .columns
    .column.is-half
      p.control
        label.label lantaldeak
        multiselect(
          v-model="current.lantaldeak",
          :options="lantaldeak",
          :close-on-select="true",
          :clear-on-select="false",
          placeholder="Select one",
          label="title",
          track-by="id",
          :multiple="true"
          )
    .column.is-half
      p.control
        label.label baliabideak
        multiselect(
          v-model="current.baliabideak",
          :options="baliabideak",
          :close-on-select="true",
          :clear-on-select="false",
          placeholder="Select one",
          label="title",
          track-by="id",
          :multiple="true"
          )
  .columns
    .column.is-half
      label.label twitter
      p.control
        input.input(v-model="current.twitter",placeholder="twitter")
    .column.is-half
      label.label facebook
      p.control
        input.input(v-model="current.facebook",placeholder="facebook")
  hr
  .columns
    .column.is-half
      span.button.is-success.is-fullwidth(v-on:click="save()", v-bind:class="{ 'is-loading': isSaving }") GORDE
    .column.is-one-querter
      span.button.is-fullwidth(v-on:click="cancel()") EZEZTATU
    .column.is-one-querter
      span.button.is-danger.is-fullwidth(v-on:click="remove()") EZABATU
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import Multiselect from 'vue-multiselect'

export default {
  components: { Multiselect },
  data () {
    return {
      filter: null,
      current: {
        kolektiboak: [],
        postazerrendak: [],
        mota: '',
        baliabideak: []
      },
      isSaving: false,
      motak: process.env.ERAGILE_MOTAK,
      postazerrendak: [],
      lantaldeak: [],
      baliabideak: [],
      eragileak: []
    }
  },
  created: function () {
    this.getItems()
  },
  methods: {
    getItems: function () {
      var vm = this
      if (this.$route.params.id !== 'berria') {
        axios.get(process.env.API_URL + '/eragilea/' + this.$route.params.id)
        .then(function (res) {
          if (res.data) vm.current = res.data
        })
      }
      axios.get(process.env.API_URL + '/eragilea').then((res) => {
        vm.eragileak = res.data
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
    save: function () {
      var vm = this
      vm.isSaving = true
      if (vm.current.id) {
        axios.put(process.env.API_URL + '/eragilea/' + vm.current.id, vm.current)
        .then(function (res) {
          vm.current = res.data
          vm.isSaving = false
        })
      } else {
        axios.post(process.env.API_URL + '/eragilea', vm.current)
        .then(function (res) {
          vm.$router.push({ name: 'eragilea', params: { id: res.data.id } })
          vm.isSaving = false
        })
      }
    },
    cancel: function () {
      this.$router.push({ name: 'eragileak' })
    },
    remove: function () {
      if (window.confirm('seguru?')) {
        var vm = this
        axios.delete(process.env.API_URL + '/eragilea/' + vm.current.id)
        .then(function (res) {
          vm.$router.push({ name: 'eragileak' })
        })
      }
    },
    itemsIn: function (filter) {
      if (filter) return _.filter(this.eragileak, { mota: filter })
      return this.eragileak
    }
  }
}
</script>
