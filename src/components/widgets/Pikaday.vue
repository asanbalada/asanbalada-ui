<template lang="pug">
.control.is-horizontal
  .control.is-grouped
    .control.has-addons
      input.pikaday.input(type="text", v-model="dateString", style="width:100px;", placeholder="YYYY-MM-DD")
      input.input(v-if="options.timepicker", type="text", v-model="hours", v-on:input="update()", style="width:35px", placeholder="00")
      input.input(v-if="options.timepicker", type="text", v-model="minutes", v-on:input="update()", style="width:35px", placeholder="00")
      span.button(v-on:click="clear()") X
</template>

<script>
import Pikaday from 'pikaday'
import moment from 'moment'

export default {
  props: ['options', 'value'],
  data () {
    return {
      picker: null,
      cloned: null,
      hours: null,
      minutes: null,
      changed: false
    }
  },
  computed: {
    dateString: function () {
      return this.cloned && moment(this.cloned).format(this.options.displayFormat || 'YYYY-MM-DD') || ''
    }
  },
  watch: {
    value: function (newVal) {
      if (newVal) {
        this.changed = true
        this.cloned = newVal
        this.hours = moment(newVal).hours()
        this.minutes = moment(newVal).minutes()
        this.picker.setDate(newVal)
      }
    }
  },
  methods: {
    update: function () {
      let vm = this
      vm.cloned = moment(vm.picker.getDate()).hours(vm.hours).minutes(vm.minutes).toDate()
      vm.$emit('input', vm.cloned)
    },
    clear: function () {
      let vm = this
      vm.cloned = null
      this.hours = null
      this.minutes = null
      vm.$emit('input', vm.cloned)
    }
  },
  mounted () {
    let vm = this
    let options = this.options
    options.onSelect = function () {
      if (!vm.changed) {
        if (vm.hours === null) vm.hours = 0
        if (vm.minutes === null) vm.minutes = 0
        vm.cloned = moment(vm.picker.getDate()).hours(parseInt(vm.hours)).minutes(parseInt(vm.minutes)).toDate()
        vm.$emit('input', vm.cloned)
      } else {
        vm.changed = false
      }
    }
    options.field = this.$el.getElementsByClassName('pikaday')[0]
    this.picker = new Pikaday(options)
    this.cloned = this.value
    if (this.value) {
      vm.hours = moment(this.value).hours()
      vm.minutes = moment(this.value).minutes()
      vm.changed = true
      this.picker.setDate(this.value)
    }
  }
}
</script>
