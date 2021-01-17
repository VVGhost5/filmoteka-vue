<template>
  <header class="header">
    <nav class="header__nav">
      <div class="logo">
        <img src="@/images/icon-filmoteka.png" />
        <a href="hakaton-js">
          <i class="fa fa-film"></i>
          <span class="span">Filmoteka</span>
        </a>
      </div>
      <ul class="site-navigation">
        <li class="site-navigation__item home-wrapper-js">
          <router-link to="/" class="site-navigation__link home-js"
            >Home</router-link
          >
        </li>
        <li class="site-navigation__item library-wrapper-js">
          <router-link to="/library" class="site-navigation__link library-js"
            >My library</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<style>
.header {
  color: #372c48;
  font-size: 20px;
  font-family: Roboto-Medium, sans-serif;
  background: #76c0ba;
}

.header__nav {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.site-navigation {
  display: flex;
}
.site-navigation__item:not(:last-of-type) {
  margin-right: 25px;
}

.site-navigation__link {
  display: block;
  color: #372c48;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  position: relative;
  transition: all 0.2s linear;
  margin: 0 auto;
}

.logo {
  margin-left: 20px;
  margin-right: 60px;
  padding: 24px 0 24px 20px;
  letter-spacing: 1px;
}

@media (min-width: 768px) {
  .logo {
    display: flex;
    margin-right: 376px;
    padding: 24px 0 24px 34px;
  }

  .span {
    margin-left: 10px;
    text-decoration: none;
    font-size: 20px;
    font-weight: 400;
    color: #372c48;
  }
}

@media (min-width: 1024px) {
  .logo {
    margin-left: 2px;
    margin-right: 596px;
  }
}

@media (min-width: 768px) {
}

@media (max-width: 767px) {
  .span {
    display: none;
  }
}
</style>
