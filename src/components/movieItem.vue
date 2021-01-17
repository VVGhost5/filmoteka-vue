<template>
<li class="gallery-item library-gallery__item">
  <div class="gallery-item-block">
<img :src="baseURL + movie.backdrop_path" :alt="movie.original_title" :width="'100%'" :height="'100%'"
                        class="gallery-item__image library-gallery__image" />
        <p class="gallery-item__name library-gallery__name">{{movie.title}}<span class="gallery-item__date">
                        ({{movie.release_date.slice(0, 4)}})</span></p>
        <p class="gallery-item__rating library-gallery__rating">{{movie.vote_average}}</p>
         <div v-if="movie.isAddedToLibrary" class="liked"></div>
  </div>
        <div class="gallery-item__overlay">
        <button v-if="!movie.isAddedToLibrary" @click="addToGallery(movie.id)" class="gallery-item__button">Add to library</button>
        <button v-if="movie.isAddedToLibrary" @click="deleteFromGallery(movie.id)" class="gallery-item__button">Delete from library</button>
        </div>
       
</li>
</template>

<script>
import EventBus from './../event-bus'

export default {
    props: ["movie"],
    methods: {
      addToGallery(id) {
        EventBus.$emit('add-to-gallery', id)
      },
      deleteFromGallery(id) {
        EventBus.$emit('delete-from-gallery', id)
      },
    },
    data() {
      return {
baseURL: "https://image.tmdb.org/t/p/w500",
      }
    }
}
</script>

<style>
.gallery-item {
  position: relative;
  width: 300px;
  height: 156px;
  border-radius: 16px;
  background-image: url(../images/no-movie.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: grey;
}

.gallery-item-block {
height: 100%;
}

@media screen and (max-width: 767px) {
  .gallery-item:not(:last-child) {
    margin-bottom: 10px;
  }
}
@media screen and (min-width: 768px) {
  .gallery-item {
    width: 344px;
    height: 156px;
  }
  .gallery-item:not(:last-child) {
    margin-bottom: 15px;
  }
}
@media screen and (min-width: 1024px) {
  .gallery-item {
    width: 465px;
    height: 244px;
  }
  .gallery-item:not(:last-child) {
    margin-bottom: 20px;
  }
  .gallery-item__image {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 13px;
  }
  .gallery-item__name {
    font-size: 12px;
    line-height: 1.2;
    font-weight: 500;
    color: #ffffff;
    position: absolute;
    bottom: 10px;
    left: 10px;
    font-family: "Roboto", "Arial", sans-serif;
  }
}
@media screen and (min-width: 1024px) and (min-width: 768px) {
  .gallery-item__name {
    font-size: 14px;
  }
}
@media screen and (min-width: 1024px) and (min-width: 1024px) {
  .gallery-item__name {
    bottom: 21px;
    left: 14px;
    font-size: 20px;
  }
}
@media screen and (min-width: 1024px) {
  .gallery-item__rating {
    font-size: 13px;
    line-height: 1.35;
    font-weight: 500;
    color: black;
    position: absolute;
    top: 10px;
    right: 10px;
    font-family: "Roboto", "Arial", sans-serif;
    text-align: center;
    width: 31px;
    height: 17px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: inset 0px 0px 2.79px 0.21px rgba(0, 0, 0, 0.35), inset 0px 0px 2.64px 1.36px rgba(0, 0, 0, 0.35);
  }
}
@media screen and (min-width: 1024px) and (min-width: 768px) {
  .gallery-item__rating {
    font-size: 15px;
    border-radius: 10px;
    width: 37px;
    height: 20px;
  }
}
@media screen and (min-width: 1024px) and (min-width: 1024px) {
  .gallery-item__rating {
    font-size: 20px;
    width: 49px;
    height: 27px;
  }
}

.library-gallery__item {
  position: relative;
}
.library-gallery__item:not(:last-of-type) {
  margin-bottom: 10px;
}
@media (min-width: 768px) {
  .library-gallery__item:not(:nth-last-child(-n+2)) {
    margin-bottom: 20px;
  }
}
.library-gallery__image {
  width: 298px;
  height: 156px;
  border-radius: 10px;
  object-fit: cover;
  margin: 0 auto;
}
@media (min-width: 768px) {
  .library-gallery__image {
    width: 344px;
  }
}
@media (min-width: 1024px) {
  .library-gallery__image {
    width: 466px;
    height: 244px;
  }
}
.library-gallery__name {
  font-size: 12px;
  line-height: 1.2;
  font-weight: 500;
  color: #ffffff;
  position: absolute;
  bottom: 10px;
  left: 20px;
  font-family: "Roboto", "Arial", sans-serif;
}
@media screen and (min-width: 768px) {
  .library-gallery__name {
    font-size: 14px;
    left: 20px;
  }
}
@media screen and (min-width: 1024px) {
  .library-gallery__name {
    bottom: 21px;
    left: 14px;
    font-size: 20px;
  }
}
.library-gallery__rating {
  font-size: 13px;
  line-height: 1.35;
  font-weight: 500;
  color: black;
  position: absolute;
  top: 10px;
  right: 20px;
  font-family: "Roboto", "Arial", sans-serif;
  text-align: center;
  width: 31px;
  height: 17px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: inset 0px 0px 2.79px 0.21px rgba(0, 0, 0, 0.35), inset 0px 0px 2.64px 1.36px rgba(0, 0, 0, 0.35);
}
@media screen and (min-width: 768px) {
  .library-gallery__rating {
    font-size: 15px;
    border-radius: 10px;
    width: 37px;
    height: 20px;
    right: 10px;
  }
}
@media screen and (min-width: 1024px) {
  .library-gallery__rating {
    font-size: 20px;
    width: 49px;
    height: 27px;
  }
}
.library-gallery:not(:last-of-type) {
  margin-bottom: 10px;
}
@media (min-width: 768px) {
  .library-gallery:not(:nth-last-child(-n+2)) {
    margin-bottom: 20px;
  }
}

.is-active {
  background-color: #77c1bb;
  color: white;
  border-bottom: 2px solid #77c1bb;
}

.liked {
  position: relative;
  z-index: 10;
  width: 8%;
  height: 17%;
  background-color: transparent;
  background-image: url(../images/heart.svg);
  background-repeat: no-repeat;
  background-size: contain;
  left: 88%;
  top: -25%;
}

.gallery-item__overlay {
  position: absolute;
  display: flex;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  transition: all 200ms linear;
}

.gallery-item:hover .gallery-item__overlay {
  opacity: 1;
  box-shadow: 10px 10px 0px 0 rgb(149, 225, 211);
}

.gallery-item__button {
  display: block;
  border: 1px solid white;
  border-radius: 5px;
  color: white;
margin: auto auto;
background-color: transparent;
width: 40%;
height: 30px;
cursor: pointer;
outline: none;
}

.gallery-item__button:hover {
  color: rgb(149, 225, 211);
  border: 1px solid rgb(149, 225, 211);
}

.gallery-item__notification {
   font-size: 14px;
   padding-top: 5px;
  border: 1px solid white;
  border-radius: 5px;
  color: white;
margin: auto auto;
background-color: transparent;
width: 40%;
height: 30px;
outline: none;
}
</style>