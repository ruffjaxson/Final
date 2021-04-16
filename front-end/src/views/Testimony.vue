<template>
<div>
  <div class='main-container'>
    <div id="conversations">
      <button class="conversation" v-for="conversation in conversations" :key="conversation._id" @click="selectconversation(conversation)">{{conversation.name}}</button>
    </div>

    <div class='topForm' v-if="user">
      <h2>{{user.firstName}} {{user.lastName}} </h2>
      <button class='conversation' @click="logout">LOGOUT</button>
      <h2>ENTER YOUR COMMENT</h2>
      <hr class='small-hr'>
      <form @submit.prevent="addComment">
        <!-- <input class='nameHolder' v-model="name" placeholder="NAME"> -->
        <p></p>
        <textarea class="commentInput" v-model="message" placeholder="YOUR COMMENT, IF YOU WILL"></textarea>
        <br />
        <button id="submit" class='conversation' type="submit">SUBMIT</button>
      </form>
      <router-link id='edit-comment' class='conversation' to="/Edit">EDIT COMMENT</router-link>
    </div>
    <Login v-else/>

    <div class='displayComments'>
      <div v-for="comment in comments" v-bind:key="comment.id">
        <div class="comment">
          <div class="message">
            <p>{{comment.message}}</p>
            <p><i>-- {{comment.user}}</i></p>
            <form v-if="user" @submit.prevent="deleteComment">
              <button class='edit-delete' @click="deleteComment(comment)">DELETE COMMENT</button>
            </form>
          </div>
        </div>
      </div>
  </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import Login from '@/components/Login.vue';
export default {
  name: 'testimony',
  components: {
    Login,
  },
  data() {
    return {
      conversations: [],

      name: '',
      comments: [],
      // userName: '',
      message: '',
      today: '',
      error: '',
    }
  },
  async created() {
    this.getconversations();
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
    async getconversations() {
      //console.log("entering conversations");
      try {
        //console.log("inside try");
        const response = await axios.get("/api/arguments");
        this.conversations = response.data;
        //console.log(this.conversations);
        //console.log("finishsed try");
      } catch (error) {
        //console.log(error);
      }
    },
    selectconversation(conversation) {
      this.conversation = conversation;
      this.getComments();
    },
    async addComment() {
          try {
            await axios.post(`/api/arguments/${this.conversation._id}/comments`, {
              message: this.message,
              date: new Date().toLocaleString()
            });
            // this.name = "";
            this.message = "";
            this.today = "";
            this.getComments();
          } catch (error) {
            //console.log(error);
          }
        },

        async getComments() {
          try {
            const response = await axios.get(`/api/arguments/${this.conversation._id}/comments`);
            this.comments = response.data;
          } catch (error) {
            //console.log(error);
          }
        },


        async deleteComment(comment) {
          try {
            await axios.delete(`/api/arguments/${this.conversation._id}/comments/${comment._id}`);
            //console.log("Before delete");
            this.getComments();
            //console.log("After delete");
          } catch (error) {
            //console.log(error);
          }
        },
        async logout() {
          try {
            await axios.delete("/api/users");
            this.$root.$data.user = null;
          } catch (error) {
            this.$root.$data.user = null;
          }
        },
  }
}

</script>

<style scoped>

.main-container{
  background-color: #333333;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.small-hr {
  width: 30%
}

.topForm {
  width: 85%;
  color: white;
  font-family: 'Dela Gothic One', cursive;
  margin-bottom: 100px;
}

.displayComments {
  width: 80%;
  color: white;
  padding-bottom: 15px;
}

.commentInput {
  font-size: 0.9em;
  border: 4px solid white;
  font-size: 0.8em;
  width: 100%;
  max-width: 500px;
  height: 100px;
  font-family: 'Dela Gothic One', cursive;
  margin: 10px 0px 20px 0px;
}

.nameHolder {
  font-family: 'Dela Gothic One', cursive;
  font-size: 1.05em;
  margin: 20px 0px 0px 0px;
}

.conversation {
  font-family: 'Dela Gothic One', cursive;
  background-color: #595959; /*lighter gray */
  color: white;
  margin: 10px;
  border: 5px outset gold;
  height: 75px;
  width: 30%;
  font-size: 1.25em;
  letter-spacing: 3px;
}

#edit-comment {
  width: 200px;
  height: 50px;
  font-size: 0.8em;
  padding: 8px;
  text-decoration: none;
}

#submit {
  width: 100px;
  height: 50px;
  font-size: 0.8em;
  text-decoration: none;
}

#conversations {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 35px 0px 30px 0px;
}

.edit-delete {
  margin: 0px;
  height: 20px;
  font-size: 8px;
}

p {
  margin-bottom: 5px;
}

input {
  font-size: 1.2em;
  height: 30px;
  width: 200px;
}

.main-container {
  color: black;
}

h2 {
  font-size: 0.8em;
  letter-spacing: 1.8px;
}

.message {
  width: 85%;
}

.comment {
  display: flex;
  justify-content: center;
  margin: 8px;
  background-color: #595959;
  border: 3px solid black;
  padding: 20px;
}



.submit {
  margin-bottom: 20px;
}
button {
  margin-top: 20px;
  font-size: 1.2em;
}

.footer {
  color: white !important;
}
</style>
