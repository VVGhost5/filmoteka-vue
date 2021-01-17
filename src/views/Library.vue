<template>
  <div class="container">
    <section class="gallery container library">
      <moviesList v-bind:movies="likedMovies"></moviesList>
      <h2 v-if="!likedMovies.length">You didn't add any movie</h2>
    </section>
  </div>
</template>

<script>
import moviesList from "../components/moviesList";

export default {
  props: ["likedMovies"],
  components: { moviesList },
};
</script>

<style>
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
