<template>
  <ul class="gallery-list library-gallery">
    <movieItem
      v-for="movie of movies"
      v-bind:movie="movie"
      v-bind:key="movie.id"
    />
  </ul>
</template>

<script>
import movieItem from "./movieItem";
export default {
  props: ["movies"],
  components: { movieItem },
};
</script>

<style>
.gallery-list {
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
@media screen and (min-width: 768px) {
  .gallery-list {
    justify-content: space-between;
  }
}

@media (min-width: 768px) {
  .library-gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 28px;
  }
}
</style>
