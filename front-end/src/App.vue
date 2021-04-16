<template>
  <div id="app">
    <div class="menu">
      <div class="title">
        <h1>STAR WARS</h1>
      </div>
      <div class='menu-options'>
        <router-link to="/">HOME</router-link>
        <router-link to="/browse">BROWSE</router-link>
        <router-link to="/Testimony">FORUMS</router-link>
      </div>
    </div>

    <router-view/>
    <div class='footer'>
      <div class='footer-content'>
        <p>Pair Programmed by Jaxson Ruff and Riley Ross</p>
        <a class='footer-link' href='https://github.com/ruffjaxson/CP4'>GitHub Repository</a>
      </div>
    </div>
  </div>
</template>

<style>

html {
  padding: 0px;
  margin: 0px;
}
template {
  background-color: blue;
}

h1 {
  font-family: 'Dela Gothic One', cursive;
  margin: 10px;
}


.menu{
  display: flex;
  flex-direction: column;
  color: #FFE81F; /* Yellow */
  background-color: #000000;  /* Black */

  width: 100%;

}
.title{

  display: flex;
  justify-content: center;
  font-size: 1.7em;
}
a {
  color: #FFE81F;
}
.menu-options{

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 20px;
  grid-area: side;
  display: flex;
  justify-content: center;
  padding-bottom: 25px;
  font-family: 'Dela Gothic One', cursive;
  font-size: 0.9em;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #333333;
  color: white;
  font-family: 'Unica One', cursive;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  height: 130px;
  color: white;
  text-align: center;
  font-family: 'Unica One', cursive;
  font-size: 1.3em;

}
.footer-link:visited {
  color: white;
}


.footer-link {
  text-decoration: underline;
  color: white;
}
</style>
