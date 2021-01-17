<template>
<div class="container">
  <section class="filters container">
    <div class="filters__wrapper">
<filterGenres :genres="genres"/>
<filterRating />
<sort />
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

export default {
  props: ['popularMovies', 'genres'],
  components: {moviesList, filterGenres, filterRating, sort},
  methods: {
      addToLibrary(id) {
        this.$emit('add-to-library', id);
      }
    },
}
</script>

<style>
.filters {
  width: 100%;
  height: 67px;
  padding: 10px 0 10px;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
  background-color: #f3f6f6;
}

.filters__wrapper {
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  width: 80%;
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
}
</style>