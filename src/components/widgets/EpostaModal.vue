<template lang="pug">
.modal(v-bind:class="{ 'is-active': active }")
  .modal-background
  .modal-card
    header.modal-card-head
      p.modal-card-title epostaz bidali
      span.delete(v-on:click="close()")
    section.modal-card-body(style="min-height:200px;")
      p.control
        label.label hartzaileak
          multiselect(
            v-model="dest",
            :options="eragileak",
            :close-on-select="true",
            :clear-on-select="false",
            placeholder="Select one",
            :multiple="true",
            label="fullName",
            track-by="id"
          )
      p.control
        label.label eposta txantiloia
        span.select.is-fullwidth
          select(v-model="eposta")
            option(v-for="eposta in epostak", v-bind:value="eposta.id")
              | {{ eposta.title }}
      p.control
        label.label oharrak
        textarea.textarea(v-model="oharrak")
    footer.modal-card-foot
      a.button.is-primary(v-on:click="send()", v-bind:class="{ 'is-disabled': isDisabled(), 'is-loading': isLoading }") Bidali
      a.button(v-on:click="close()") Ezeztatu
</template>

<script>
import axios from 'axios'
import Multiselect from 'vue-multiselect'
import _ from 'lodash'

export default {
  name: 'eposta-modal',
  props: ['show', 'selected', 'proposamena'],
  components: { Multiselect },
  data () {
    return {
      eragileak: [],
      epostak: [],
      eposta: null,
      oharrak: null,
      isLoading: false,
      dest: [],
      active: false,
      proposamenaClone: null
    }
  },
  watch: {
    show: function (newVal) {
      this.active = newVal
    },
    selected: function (newVal) {
      this.dest = newVal
    },
    proposamena: function (newVal) {
      if (newVal) this.proposamenaClone = newVal.id
    }
  },
  created: function () {
    this.getData()
    this.active = this.show || false
    this.dest = this.selected || []
    if (this.proposamena) this.proposamenaClone = this.proposamena.id
  },
  methods: {
    isDisabled: function () {
      return !(this.dest.length && this.eposta)
    },
    send: function () {
      var vm = this
      vm.isLoading = true
      axios.post(process.env.API_URL + '/eposta/' + this.eposta + '/send', {
        dest: _.map(this.dest, 'id'),
        oharrak: this.oharrak,
        proposamena: this.proposamenaClone
      }).then(function () {
        vm.isLoading = false
        vm.$emit('hide')
      })
    },
    close: function () {
      this.$emit('hide')
    },
    getData: function () {
      var vm = this
      axios.get(process.env.API_URL + '/eposta').then((res) => {
        vm.epostak = res.data
      })
      axios.get(process.env.API_URL + '/eragilea').then((res) => {
        vm.eragileak = res.data
      })
    }
  }
}
</script>

<style>
</style>
