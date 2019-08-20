<template>
  <b-container class="content">
    <b-row>
      <h4 class="content">
        <strong>
          Test query, store, and rendering performance
        </strong>
      </h4>
    </b-row>
    <b-row>
      <b-col class="content">
        <users-list title="test" list-type="user"></users-list>
      </b-col>
      <b-col class="content">
        <users-list title="test2" list-type="todos"></users-list>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts" src="./remote.ts"></script>
