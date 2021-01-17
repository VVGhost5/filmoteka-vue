<template>
  <div class="filter">
    <label for="filter-genres">Filter by genres</label>
    <select
      v-model="filteredGenre"
      @change="filterGenres(filteredGenre)"
      name="filter-genres"
      id="filter-genres"
    >
      <option value="none" v-bind:key="0">None</option>
      <option
        v-bind:genres="genres"
        v-bind:key="genre.id"
        v-for="genre of genres"
        v-bind:value="genre.id"
      >
        {{ genre.name }}
      </option>
    </select>
  </div>
</template>

<script>
import EventBus from "./../event-bus";

export default {
  props: ["genres"],
  methods: {
    filterGenres(value) {
      EventBus.$emit("filter-genre", value);
    },
  },
  data() {
    return {
      filteredGenre: "none",
    };
  },
};
</script>

<style scoped>
.filter {
  width: 100%;
  margin-bottom: 20px;
}

@media (min-width: 768px) {
  .filter {
    width: 25%;
    margin-bottom: 10px;
  }
}
</style>
