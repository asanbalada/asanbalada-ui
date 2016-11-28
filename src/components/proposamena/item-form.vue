<template lang="pug">
.card.is-fullwidth.proposamena-item-form
  header.card-header
    p.card-header-title(v-on:click="toggle()", style="cursor:pointer;") {{ title }}
  .card-content(v-if="display")
    .content
      .columns
        .column.is-half
          p.control
            label.label proposamena
            input.input(v-on:input="update()", type="text", v-model="item.title")
          .columns
            .column.is-half
              p.control
                label.label mota
                span.select.is-fullwidth
                  select(v-on:input="update()", type="text", v-model="item.type")
                    option(v-for="mota in motak") {{ mota }}
            .column.is-half
              p.control
                label.label egoera
                span.select.is-fullwidth
                  select(v-on:input="update()", type="text", v-model="item.status")
                    option(v-for="egoera in egoerak") {{ egoera }}
          p.control
            label.label baliabideak
            multiselect(
              v-model="item.baliabideak",
              :options="baliabideak",
              :close-on-select="true",
              :clear-on-select="false",
              placeholder="Select one",
              label="title",
              track-by="id",
              :multiple="true",
              v-on:input="update()"
            )
          p.control
            label.label edukia
            textarea.textarea(v-on:input="update()", v-model="item.content")
        .column.is-half
          label.label hasi
          p.control
            pikaday(:options="dateTimeSelectOptions", v-model="item.start")
          label.label bukatu
          p.control
            pikaday(:options="dateTimeSelectOptions", v-model="item.end")

          p.control
            label.label antolatzailea
            multiselect(
              v-model="item.antolatzaileak",
              :options="eragileak",
              :close-on-select="true",
              :clear-on-select="false",
              placeholder="Select one",
              label="fullName",
              track-by="id",
              :multiple="true",
              v-on:input="update()"
            )

          p.control
            label.label laguna
            multiselect(
              v-model="item.lagunak",
              :options="eragileak",
              :close-on-select="true",
              :clear-on-select="false",
              placeholder="Select one",
              label="fullName",
              track-by="id",
              :multiple="true",
              v-on:input="update()"
            )
          p.control
            label.label ref
            multiselect(
              v-model="item.refs",
              :options="proposamenak",
              :close-on-select="true",
              :clear-on-select="false",
              placeholder="Select one",
              label="title",
              track-by="id",
              :multiple="true",
              v-on:input="update()"
            )
  footer.card-footer(v-if="display")
    a.card-footer-item.is-danger(v-on:click="remove()") ezabatu
</template>

<script>
import Multiselect from 'vue-multiselect'
import Pikaday from '../widgets/Pikaday'
// import _ from 'lodash'

export default {
  name: 'proposamena-item-form',
  props: ['proposamena', 'eragileak', 'proposamenak', 'baliabideak'],
  components: { Multiselect, Pikaday },
  data () {
    return {
      item: {},
      title: '',
      display: true,
      motak: process.env.PROPOSAMEN_MOTAK,
      egoerak: process.env.PROPOSAMEN_EGOERAK,
      dateTimeSelectOptions: {
        firstDay: 1,
        timepicker: true
      }
    }
  },
  watch: {
    proposamena: function (newVal) {
      this.item = newVal
      this.title = this.item.title
      if (this.item.id) this.display = false
    }
  },
  created: function () {
    this.item = this.proposamena
    this.title = this.proposamena.title
    if (this.item.id) this.display = false
  },
  methods: {
    toggle: function () {
      this.display = !this.display
    },
    remove: function () {
      this.$emit('delete')
    },
    update: function () {
      this.title = this.item.title
      this.$emit('input', this.item)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
