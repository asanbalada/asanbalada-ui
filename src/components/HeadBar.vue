<template lang="pug">
.header
  .nav.has-shadow
    .container
      .nav-left
        router-link.nav-item.is-brand(to="/")
          strong ASANBALADA
        router-link.nav-item.is-tab(
          :to="{ name: 'eragileak' }",
          v-bind:class="{ 'is-active': $route.name === 'eragileak' || $route.name === 'eragilea' }"
        ) eragileak
        router-link.nav-item.is-tab(
          :to="{ name: 'asanbladak' }"
          v-bind:class="{ 'is-active': $route.name === 'asanbladak' || $route.name === 'asanblada' }"
        ) asanbladak
        router-link.nav-item.is-tab(
          :to="{ name: 'proposamenak' }"
          v-bind:class="{ 'is-active': $route.name === 'proposamenak' || $route.name === 'proposamena' }"
        ) proposamenak
        router-link.nav-item.is-tab(
          :to="{ name: 'lantaldeak' }"
          v-bind:class="{ 'is-active': $route.name === 'lantaldeak' || $route.name === 'lantaldea' }"
          ) lantaldeak
        router-link.nav-item.is-tab(
          :to="{ name: 'postazerrendak' }"
          v-bind:class="{ 'is-active': $route.name === 'postazerrendak' || $route.name === 'postazerrenda' }"
        ) postazerrendak
        router-link.nav-item.is-tab(
          :to="{ name: 'baliabideak' }"
          v-bind:class="{ 'is-active': $route.name === 'baliabideak' || $route.name === 'baliabidea' }"
        ) baliabideak
        router-link.nav-item.is-tab(
          :to="{ name: 'epostak' }"
          v-bind:class="{ 'is-active': $route.name === 'epostak' || $route.name === 'eposta' }"
        ) epostak
        router-link.nav-item.is-tab(
          :to="{ name: 'metadatak' }"
          v-bind:class="{ 'is-active': $route.name === 'metadatak' || $route.name === 'metadata' }"
        ) metadata
        router-link.nav-item.is-tab(
          :to="{ name: 'egutegia' }"
          v-bind:class="{ 'is-active': $route.name === 'egutegia' }"
        ) egutegia
</template>

<script>
export default {}
</script>

<style>
</style>
