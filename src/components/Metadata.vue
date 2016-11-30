<template lang="pug">
form.form
  .message.is-warning
    .message-body
      | Kontuan izan hau ez dela pasahitzak gordetzeko lekurik onena
  p.control
    label.label izena
    input.input(v-model="current.title",type="text", placeholder="title")
  label.label azalpena
  p.control
    input.input(v-model="current.description")
  p.control
    label.label body
    textarea.textarea(v-model="current.content")
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

export default {
  data () {
    return {
      current: {},
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
        axios.get(process.env.API_URL + '/metadata/' + this.$route.params.id)
        .then(function (res) {
          if (res.data) vm.current = res.data
        })
      }
    },
    save: function () {
      var vm = this
      vm.isSaving = true
      if (vm.current.id) {
        axios.put(process.env.API_URL + '/metadata/' + vm.current.id, vm.current)
        .then(function (res) {
          vm.getItems()
          vm.isSaving = false
        })
      } else {
        axios.post(process.env.API_URL + '/metadata', vm.current)
        .then(function (res) {
          vm.$router.push({ name: 'metadata', params: { id: res.data.id } })
          vm.isSaving = false
        })
      }
    },
    cancel: function () {
      this.$router.push({ name: 'metadatak' })
    },
    remove: function () {
      var vm = this
      if (window.confirm('seguru?')) {
        axios.delete(process.env.API_URL + '/metadata/' + vm.current.id)
        .then(function (res) {
          vm.$router.push({ name: 'metadatak' })
        })
      }
    }
  }
}
</script>
