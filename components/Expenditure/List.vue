<template>
  <template
    v-for="(item, index) in items"
    :key="index"
  >
    <v-list-item
      v-if=!item.children
      :title="item.name"
    ></v-list-item>
    <v-list-group
      v-else
      no-action
      sub-group
    >
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props">
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item>
      </template>

      <ExpenditureList :items="item.children" />

    </v-list-group>
  </template>
</template>

<script setup lang="ts">
  const props = defineProps<{
    items: []
  }>()
</script>
