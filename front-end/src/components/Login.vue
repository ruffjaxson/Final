<template>
<div class="hero">
  <div class="heroBox">
    <form class="pure-form">
      <fieldset>
        <legend>Join the Ranks</legend>
        <input placeholder="first name" v-model="firstName">
        <input placeholder="last name" v-model="lastName">
        <input placeholder="lightsaber color" v-model="lightsaberColor">
      </fieldset>
      <fieldset>
        <input placeholder="username" v-model="username">
        <input type="password" placeholder="password" v-model="password">
      </fieldset>
      <fieldset>
        <button type="submit" class="login-button" @click.prevent="register">JOIN</button>
      </fieldset>
    </form>
    <p v-if="error" class="error">{{error}}</p>
    <form class="pure-form space-above">
      <fieldset>
        <legend>Login</legend>
        <input placeholder="username" v-model="usernameLogin">
        <input type="password" placeholder="password" v-model="passwordLogin">
      </fieldset>
      <fieldset>
        <button type="submit" class="login-button" @click.prevent="login">LOGIN</button>
      </fieldset>
    </form>
    <p v-if="errorLogin" class="error">{{errorLogin}}</p>
  </div>
</div>
</template>



<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      lightsaberColor: '',
      usernameLogin: '',
      passwordLogin: '',
      error: '',
      errorLogin: '',
    }
  },

  methods: {
   async register() {
     this.error = '';
     this.errorLogin = '';
     if (!this.firstName || !this.lastName || !this.lightsaberColor || !this.username || !this.password)
       return;
     try {
       let response = await axios.post('/api/users', {
         firstName: this.firstName,
         lastName: this.lastName,
         lightsaberColor: this.lightsaberColor,
         username: this.username,
         password: this.password,
       });
       this.$root.$data.user = response.data.user;
     } catch (error) {
       this.error = error.response.data.message;
       this.$root.$data.user = null;
     }
   },
   async login() {
      this.error = '';
      this.errorLogin = '';
      if (!this.usernameLogin || !this.passwordLogin)
        return;
      try {
        let response = await axios.post('/api/users/login', {
          username: this.usernameLogin,
          password: this.passwordLogin,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    },
 }
}
</script>

<style>

.heroBox{
  display: flex;
  flex-direction: column;
  border: 5px outset gold;
  background-color: #595959; /*lighter gray */
  color: white;
}

input {
  font-size: 1.2em;
  height: 30px;
  width: 200px;
  margin-left: 5px;
  margin-right: 5px;
}

legend {
  font-size: 1.3em;
  font-family: 'Dela Gothic One', cursive;
  letter-spacing: 2px;

}
fieldset {
  border: none;
}
.login-button {
  border: 5px outset gold;
  background-color: #333333;
  color: white;
  font-family: 'Dela Gothic One', cursive;
  letter-spacing: 2px;
}

</style>
