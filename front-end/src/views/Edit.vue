<template>
<div>
  <div class='main-container'>
    <h1 id="selector">SELECT THE CONVERSATION THAT CONTAINS YOUR COMMENT:</h1>
    <div id="conversations">
      <button class="conversation" v-for="conversation in conversations" :key="conversation._id" @click="selectconversation(conversation)">{{conversation.name}}</button>
    </div>
    <div class='topForm'>
      <h2 id='edit-title'>EDIT YOUR COMMENT</h2>
      <hr class='small-hr'>


      <div class="edit">
        <div class="form">
          <input v-model="findName" placeholder="SEARCH BY NAME">
          <div class="suggestions" v-if="suggestions.length > 0">
            <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectComment(s)">{{s.userName}}
            </div>
          </div>
        </div>

        <div class="upload" v-if="findComment">
          <input v-model="findComment.userName">
          <p></p>
          <textarea id="editText" v-model="findComment.message"></textarea>
        </div>
        <div class="actions" v-if="findComment">
          <button id="submit" class="conversation" @click="editComment(findComment)">EDIT</button>
        </div>
      </div>


    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'edit',
  data() {
    return {
      conversations: [],
      comments: [],

      findName: "",
      findComment: null,
      name: '',
      userName: '',
      message: '',
      today: '',
    }
  },
  computed: {
    suggestions() {
      let comments = this.comments.filter(comment => comment.userName.toLowerCase().startsWith(this.findName.toLowerCase()));

      return comments;
    }
  },
  created() {
    console.log("tryna call");
    this.getconversations();
    console.log("after tried call");
  },
  methods: {
    async getconversations() {
      console.log("entering conversations");
      try {
        console.log("inside try");
        const response = await axios.get("/api/arguments");
        this.conversations = response.data;
        console.log(this.conversations);
        console.log("finishsed try");
      } catch (error) {
        console.log(error);
      }
    },
    selectconversation(conversation) {
      this.conversation = conversation;
      this.getComments();
    },
    async getComments() {
      try {
        let response = await axios.get(`/api/arguments/${this.conversation._id}/comments`);
        this.comments = response.data;
        return true;
      } catch (error) {
          console.log(error);
        }
    },
    selectComment(comment) {
      this.findName = "";
      this.findComment = comment;
    },
    async editComment(comment) {
      try {
        await axios.put(`/api/arguments/${this.conversation._id}/comments/` + comment._id, {
          userName: this.findComment.userName,
          message: this.findComment.message,
        });
        this.findComment = null;
        this.getComments();
        return true;
      } catch (error) {
        console.log(error);
      }
    },

  }
}

</script>

<style scoped>

#edit-title {
  font-size: 1.5em;
}

#editText{
  width: 40%;
  font-family: 'Dela Gothic One', cursive;

}

#submit {
  width: 100px;
  height: 50px;
  font-size: 0.8em;
  text-decoration: none;
}

#selector {
  margin-top: 50px;
  color: white;
  font-size: 1.5em;
  letter-spacing: 3px;
  font-family: 'Dela Gothic One', cursive;

}

.suggestions {
  width: 200px;
  border: 1px solid #ccc;
  color: black;
  background-color: white;
}

 h4 {
  font-style: italic;
  font-size: 0.75em;
}

.suggestion {
  min-height: 20px;
  color: black;
  border: 1px outset black;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

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

#submit {
  width: 100px;
  height: 50px;
  font-size: 0.8em;
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
  font-size: 0.7em;
  height: 30px;
  width: 200px;
  font-family: 'Dela Gothic One', cursive;
  word-spacing: 3px;


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
