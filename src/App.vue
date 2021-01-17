<template>
  <div id="app">
    <div class="container wrapper">
      <Header />
      <main>
        <router-view
          v-if="!loading"
          :popularMovies="filteredMovies"
          :likedMovies="likedMovies"
          :genres="genres"
        />
        <Loader v-if="loading" />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
import Footer from "@/components/footer";
import api from "./api-service";
import EventBus from "./event-bus";
import Loader from "./components/loader";

export default {
  data() {
    return {
      popularMovies: [],
      filteredMovies: [],
      likedMovies: [],
      genres: [],
      loading: true,
      filter: {
        filteredByGenre: "",
        filteredByRating: "",
        sortedValue: "",
      },
    };
  },

  name: "app",
  components: { Header, Footer, Loader },
  methods: {
    //Add movie depend on id
    addToLibrary(id) {
      let addedMovie = this.popularMovies.find((el) => el.id === id);
      addedMovie.isAddedToLibrary = true;
      this.likedMovies.push(addedMovie);
    },
    //Delete movie depend on id
    deleteFromLibrary(id) {
      let deletedMovie = this.popularMovies.find((el) => el.id === id);
      deletedMovie.isAddedToLibrary = false;
      this.likedMovies = this.likedMovies.filter((el) => el.id !== id);
    },
    //Filter movies by genre
    filterByGenre(value, movies) {
      if (!value) {
        return movies;
      }
      if (value === "none") {
        return (movies = this.popularMovies);
      }
      return (movies = movies.filter((el) =>
        el.genre_ids.find((el) => el === value)
      ));
    },
    //Filter movies by rating
    filterByRating(value, movies) {
      if (value.trim() === "") {
        return movies;
      }
      return (movies = movies.filter((el) => el.vote_average >= value));
    },
    //Sort movies depend on value of sorting
    sortMovies(value, movies) {
      if (value.trim() === "") {
        return movies;
      }
      switch (value) {
        case "sort-old-new":
          return (movies = movies.sort(
            (a, b) => a.release_date.slice(0, 4) - b.release_date.slice(0, 4)
          ));

        case "sort-new-old":
          return (movies = movies.sort(
            (a, b) => b.release_date.slice(0, 4) - a.release_date.slice(0, 4)
          ));

        case "sort-high-low":
          return (movies = movies.sort(
            (a, b) => b.vote_average - a.vote_average
          ));

        case "sort-low-high":
          return (movies = movies.sort(
            (a, b) => a.vote_average - b.vote_average
          ));

        case "default":
          return (movies = this.popularMovies);

        default:
          return;
      }
    },
    //Apply all changes chosen in filters
    applyChanges(
      genreFunc,
      ratingFunc,
      sortFunc,
      genreValue,
      ratingValue,
      sortValue
    ) {
      this.filteredMovies = sortFunc(
        sortValue,
        ratingFunc(ratingValue, genreFunc(genreValue, this.popularMovies))
      );
    },
  },

  mounted() {
    api
      .getPopularMovies()
      .then((res) => res.map((el) => (el = { ...el, isAddedToLibrary: false })))
      .then(
        (arr) => (
          (this.popularMovies = [...arr]),
          (this.filteredMovies = [...arr]),
          (this.loading = false)
        )
      );
    api.getGenres().then((res) => (this.genres = [...res]));
    EventBus.$on("add-to-gallery", (id) => {
      this.addToLibrary(id);
    }),
      EventBus.$on("delete-from-gallery", (id) => {
        this.deleteFromLibrary(id);
      }),
      EventBus.$on("filter-genre", (value) => {
        this.filter.filteredByGenre = value;
      }),
      EventBus.$on("filter-rating", (value) => {
        this.filter.filteredByRating = value;
      }),
      EventBus.$on("sort-movies", (value) => {
        this.filter.sortedValue = value;
      }),
      EventBus.$on("apply-changes", () => {
        this.applyChanges(
          this.filterByGenre,
          this.filterByRating,
          this.sortMovies,
          this.filter.filteredByGenre,
          this.filter.filteredByRating,
          this.filter.sortedValue
        );
      });
  },
};
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
  content: "";
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
