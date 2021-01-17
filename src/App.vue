<template>
  <div id="app">
    <div class="container wrapper">
      <button @:click="applyChanges">Apply</button>
<Header />
<main>
<router-view v-if="!loading" :popularMovies="filteredMovies" :likedMovies="likedMovies" :genres="genres" />
<Loader v-if="loading" />
</main>
<Footer />
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
import Footer from "@/components/footer";
import api from './api-service';
  import EventBus from './event-bus';
  import  Loader from './components/loader';

export default {

  data() {
    return {
      popularMovies: [],
      filteredMovies: [],
      likedMovies: [],
      genres: [],
      loading: true,
    }
  },

name: "app",
components: {Header, Footer, Loader },
methods: {
  addToLibrary(id) {
let addedMovie = this.popularMovies.find(el => el.id === id);
addedMovie.isAddedToLibrary = true;
this.likedMovies.push(addedMovie);
  },

  deleteFromLibrary(id) {
    let deletedMovie = this.popularMovies.find(el => el.id === id);
    deletedMovie.isAddedToLibrary = false;
this.likedMovies = this.likedMovies.filter(el => el.id !== id);
  },

  filterByGenre(value) {
    console.log(value);
    if (value === "none") {
      this.filteredMovies = this.popularMovies;
      return;
    }
    this.filteredMovies = this.popularMovies.filter(el => el.genre_ids.find(el => el === value));
  },

  filterByRating(value) {
    this.filteredMovies = this.popularMovies.filter(el => el.vote_average >= value);
  },

  sortMovies(value) {
    switch(value) {
      case "sort-old-new":
        console.log(this.filteredMovies[0].release_date);
      this.filteredMovies = [...this.filteredMovies].sort((a, b) => a.release_date.slice(0,4) - b.release_date.slice(0,4));
      break;

      case "sort-new-old": 
      this.filteredMovies = [...this.filteredMovies].sort((a, b) => b.release_date.slice(0,4) - a.release_date.slice(0,4));
      break;

      case "sort-high-low": 
      this.filteredMovies = [...this.filteredMovies].sort((a, b) => b.vote_average - a.vote_average);
      break;

      case "sort-low-high": 
      this.filteredMovies = [...this.filteredMovies].sort((a, b) => a.vote_average - b.vote_average);
      break;

      case "default": 
      this.filteredMovies = this.popularMovies;
      break;

      default: return;
    }
  },

  applyChanges() {

  },
},

mounted() {
api.getPopularMovies().then(res => res.map(el => el = {...el, isAddedToLibrary: false})).then(arr => (this.popularMovies = [...arr], this.filteredMovies = [...arr], this.loading = false));
api.getGenres().then(res => this.genres = [...res]);
 EventBus.$on('add-to-gallery', id => {
    this.addToLibrary(id);
  }),

   EventBus.$on('delete-from-gallery', id => {
    this.deleteFromLibrary(id);
  }),

  EventBus.$on('filter-genre', value => {
    this.filterByGenre(value);
  }),

  EventBus.$on('filter-rating', value => {
    this.filterByRating(value);
  }),

  EventBus.$on('sort-movies', value => {
    this.sortMovies(value);
  })
},

}
</script>

<style>

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
}

.container {
  margin: 0 auto;
  width: 320px;
}

@media (min-width: 768px) {
  .container {
    width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    width: 1024px;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
}

ul,
ol {
  list-style: none;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

a {
  text-decoration: none;
}

.visually-hidden {
  position: absolute;
  white-space: nowrap;
  width: 1px;
  height: 1px;
  overflow: hidden;
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  margin: -1px;
}

.clearfix {
  content: '';
  display: table;
  clear: both;
}

body {
  display: flex;
  align-items: flex-start;
}

header {
  flex-grow: 1;
}

main {
  flex-grow: 100;
}

footer {
  flex-grow: 1;
}

.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

</style>
