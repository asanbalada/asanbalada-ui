<template lang="pug">
form.form
  .columns
    .column.is-half
      label.label izena
      p.control
        input.input(v-model="current.title",type="text", placeholder="title", v-if="!isNew()", disabled)
        input.input(v-model="current.title",type="text", placeholder="title", v-if="isNew()")
    .column.is-half
      label.label domeinua
      p.control
        input.input(v-model="current.domain",placeholder="domain", v-if="!isNew()", disabled)
        input.input(v-model="current.title",type="text", placeholder="title", v-if="isNew()")
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


  .columns
    .column.is-half
      span.button.is-success.is-fullwidth(v-on:click="save()") SAVE
    .column.is-one-querter
      span.button.is-fullwidth(v-on:click="cancel()") CANCEL
    .column.is-one-querter
      span.button.is-danger.is-fullwidth(v-on:click="remove()") DELETE
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
        kideak: []
      }
    }
  },
  created: function () {
    this.getItems()
  },
  methods: {
    isNew: function () {
      return this.$route.params.id === 'berria'
    },
    getItems: function () {
      var vm = this
      if (this.$route.params.id !== 'berria') {
        axios.get(process.env.API_URL + '/postazerrenda/' + this.$route.params.id)
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
      if (vm.current.id) {
        axios.put(process.env.API_URL + '/postazerrenda/' + vm.current.id, vm.current)
        .then(function (res) {

        })
      } else {
        axios.post(process.env.API_URL + '/postazerrenda', vm.current)
        .then(function (res) {
          vm.$router.push({ name: 'postazerrenda', params: { id: res.data.id } })
        })
      }
    },
    cancel: function () {
      this.$router.push({ name: 'postazerrendak' })
    },
    remove: function () {
      var vm = this
      if (window.confirm('seguru?')) {
        axios.delete(process.env.API_URL + '/postazerrenda/' + vm.current.id)
        .then(function (res) {
          vm.$router.push({ name: 'postazerrendak' })
        })
      }
    }
  }
}
</script>
