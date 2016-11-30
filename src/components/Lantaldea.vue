<template lang="pug">
form.form
  .columns
    .column.is-one-third
      label.label izena
      p.control
        input.input(v-model="current.title",type="text", placeholder="title")
    .column.is-one-third
      label.label eposta
      p.control
        input.input(v-model="current.email",type="text", placeholder="eposta")
    .column.is-one-third
      p.control
        label.label postazerrenda
        span.select.is-fullwidth
          select(v-model="current.postazerrenda")
            option(v-bind:value="null") -- zerrenda --
            option(v-for="postazerrenda in postazerrendak", v-bind:value="postazerrenda.id")
              | {{ postazerrenda.email }}
  label.label azalpena
  p.control
    textarea.textarea(v-model="current.description")
  label.label Kideak
  p.control
    multiselect(
      v-model="current.kideak",
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
      postazerrendak: [],
      current: {
        kideak: []
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
        axios.get(process.env.API_URL + '/postazerrenda').then((res) => {
          vm.postazerrendak = res.data
          axios.get(process.env.API_URL + '/lantaldea/' + this.$route.params.id)
          .then(function (res) {
            if (res.data) {
              vm.current = res.data
              vm.current.postazerrenda = vm.current.postazerrenda ? vm.current.postazerrenda.id : null
            }
          })
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
        axios.put(process.env.API_URL + '/lantaldea/' + vm.current.id, vm.current)
        .then(function (res) {
          vm.getItems()
          vm.isSaving = false
        })
      } else {
        axios.post(process.env.API_URL + '/lantaldea', vm.current)
        .then(function (res) {
          vm.$router.push({ name: 'lantaldea', params: { id: res.data.id } })
          vm.isSaving = false
        })
      }
    },
    cancel: function () {
      this.$router.push({ name: 'lantaldeak' })
    },
    remove: function () {
      var vm = this
      if (window.confirm('seguru?')) {
        axios.delete(process.env.API_URL + '/lantaldea/' + vm.current.id)
        .then(function (res) {
          vm.$router.push({ name: 'lantaldeak' })
        })
      }
    }
  }
}
</script>
