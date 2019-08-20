<template>
  <b-container fluid class="h-100">
    <h1>{{ title }} w/ {{ listType }}</h1>
    <b-list class="list">
      <b-list-item v-for="(item, index) in items" :key="item.name"
        >{{ index + 1 }} - {{ item.name }}</b-list-item
      >
    </b-list>
  </b-container>
</template>

<style scoped src="./list.scss"></style>
<script lang="ts" src="./list.ts"></script>
