<template>
  <div class="filter">
    <label class="filter__label" for="input"
      >Filter by rating (Ignore movies with rating
      <span class="filter__span">{{ value }}</span> - 10</label
    >
    <input
      class="filter__input"
      @change="filterRating(value)"
      v-model="value"
      id="input"
      step="0.1"
      value="0"
      min="0"
      max="10"
      type="range"
    />
  </div>
</template>

<script>
import EventBus from "./../event-bus";

export default {
  data() {
    return {
      value: 0,
    };
  },
  methods: {
    filterRating(value) {
      EventBus.$emit("filter-rating", value);
    },
  },
};
</script>

<style scoped>
.filter {
  width: 90%;
  margin: 0 auto 20px auto;
}
.filter__label {
  display: block;
}

.filter__span {
  display: inline-block;
  width: 20px;
}

@media (min-width: 768px) {
  .filter {
    width: 40%;
    margin-bottom: 10px;
  }
}
</style>
