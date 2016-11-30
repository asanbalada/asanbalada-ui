<template lang="pug">
form.form
  .columns
    .column.is-half
      label.label izena
      p.control
        input.input(v-model="current.title",type="text", placeholder="title")
    .column.is-half
      p.control
        label.label mota
        input.input(v-model="current.type", type="text", placeholder="mota")
  label.label azalpena
  p.control
    textarea.textarea(v-model="current.description")
  label.label erabilpena
  p.control
    textarea.textarea(v-model="current.usage")
  label.label Arduradunak
  p.control
    multiselect(
      v-model="current.arduradunak",
      :options="eragileak",
      :close-on-select="true",
      :clear-on-select="false",
      placeholder="Select one",
      label="fullName",
      track-by="id",
      :multiple="true"
    )
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
import Multiselect from 'vue-multiselect'

export default {
  components: { Multiselect },
  data () {
    return {
      eragileak: [],
      current: {
        arduradunak: []
      },
      isSaving: false
    }
  },
  created: function () {
    this.getItems()
  },
  methods: {
    getItems: function () {
      var vm = this
      if (this.$route.params.id !== 'berria') {
        axios.get(process.env.API_URL + '/baliabidea/' + this.$route.params.id)
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
        axios.put(process.env.API_URL + '/baliabidea/' + vm.current.id, vm.current)
        .then(function (res) {
          vm.getItems()
          vm.isSaving = false
        })
      } else {
        axios.post(process.env.API_URL + '/baliabidea', vm.current)
        .then(function (res) {
          vm.$router.push({ name: 'baliabidea', params: { id: res.data.id } })
          vm.isSaving = false
        })
      }
    },
    cancel: function () {
      this.$router.push({ name: 'baliabideak' })
    },
    remove: function () {
      var vm = this
      if (window.confirm('seguru?')) {
        axios.delete(process.env.API_URL + '/baliabidea/' + vm.current.id)
        .then(function (res) {
          vm.$router.push({ name: 'baliabideak' })
        })
      }
    }
  }
}
</script>
