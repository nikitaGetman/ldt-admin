<template>
  <div>This is animal {{ id }}</div>
</template>

<script>
export default {
  name: 'AnimalCard',
  props: {
    id: { type: String, required: true }
  }
}
</script>

<style></style>
