<template>
  <b-container class="content">
    <b-row>
      <b-col class="content">
        <h1>
          <strong>This is the render test page</strong>
        </h1>
      </b-col>
    </b-row>
    <b-row>
      <b-container class="content">
        <b-row v-for="(moreSquares, indexX) in squares" :key="indexX">
          <b-col
            v-for="(itemY, indexY) in moreSquares"
            :key="indexY"
            v-bind:class="{
              flash: itemY.isFlashed,
              'no-flash': !itemY.isFlashed
            }"
            class="square"
          ></b-col>
        </b-row>
      </b-container>
    </b-row>
  </b-container>
</template>

<style scoped src="./render.scss"></style>
<script lang="ts" src="./render.ts"></script>
