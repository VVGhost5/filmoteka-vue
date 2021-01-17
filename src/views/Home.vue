<template>
<div class="container">
  <section class="filters container">
    <div class="filters__wrapper">
<filterGenres :genres="genres"/>
<filterRating />
<sort />
<button class="filters__button" v-on:click="applyChanges">Apply</button>
    </div>

        </section>
<section class="gallery container library">
<moviesList v-bind:movies="popularMovies" v-on:add-to-library="addToLibrary"></moviesList>
<h2 v-if="!popularMovies.length">Nothing was found! </h2>
</section>
</div>
</template>

<script>
import moviesList from '../components/moviesList';
import filterGenres from '../components/filter-genres';
import filterRating from '../components/filter-rating';
import sort from '../components/sort';
import EventBus from './../event-bus'

export default {
  props: ['popularMovies', 'genres'],
  components: {moviesList, filterGenres, filterRating, sort},
  methods: {
      addToLibrary(id) {
        this.$emit('add-to-library', id);
      },
      applyChanges() {
        EventBus.$emit('apply-changes');
      }
    },
}
</script>

<style>
.filters {
  width: 100%;
  height: auto;
  padding: 10px 0 10px;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
  background-color: #f3f6f6;
}

.filters__wrapper {
  display: block;
}

.filters__button {
  display: block;
  width: 30%;
  height: 25px;
  margin: 15px auto 0 auto;
outline: none;
border: 1px solid black;
border-radius: 4px;
background-color: transparent;
}

.gallery {
  flex-grow: 1;
}

.library {
  padding: 14px 0;
}
@media (min-width: 768px) {
  .library {
    padding: 28px 0;
  }

  .filters__wrapper {
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  width: 90%;
}

.filters__button {
  width: 15%;
}

}
</style>