<template>
<div class="hero">
  <div class="heroBox">
    <form class="pure-form">
      <fieldset>
        <legend id='enlist'>ENLIST TO LEAVE A COMMENT</legend>
        <input placeholder="FIRST NAME" v-model="firstName">
        <input placeholder="LAST NAME" v-model="lastName">
        <input placeholder="LIGHTSABER COLOR" v-model="lightsaberColor">
      </fieldset>
      <fieldset>
        <input placeholder="USERNAME" v-model="username">
        <input type="password" placeholder="PASSWORD" v-model="password">
      </fieldset>
      <fieldset>
        <button type="submit" class="login-button" @click.prevent="register">JOIN</button>
      </fieldset>
    </form>
    <p v-if="error" class="error">{{error}}</p>
    <form id='loginstuff' class="pure-form space-above">
      <fieldset>
        <legend>LOGIN</legend>
        <input placeholder="USERNAME" v-model="usernameLogin">
        <input type="password" placeholder="PASSWORD" v-model="passwordLogin">
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
        this.$root.$data.loggedIn = true;
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    },
 }
}
</script>

<style>

#enlist {
  margin-top: 15px;
  margin-bottom: 30px;
  text-decoration: underline;
  letter-spacing: 3px;
  font-size: 1.6em;
}

button:active {
  background-color: #fffb00;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

.hero {
  display: flex;
  justify-content: center;
}

.heroBox{
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  border: 5px outset gold;
  background-color: #595959; /*lighter gray */
  color: white;
  margin-bottom: 30px;
}

input {
  font-size: 0.6em;
  font-family: 'Dela Gothic One', cursive;
  height: 30px;
  letter-spacing: 2px;
  width: 200px;
  margin-left: 5px;
  margin-right: 5px;
}

#loginstuff{
  margin-top: 30px;
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

@media only screen and (min-width: 300px) and (max-width: 750px) {
  .heroBox {
    width: 90%;
  }
}

</style>
