<template>
<div>
  <div class='main-container'>
    <h1>FIND YOUR CHARACTER</h1>
    <div class="search">
      <form class="pure-form">
        <i class="fa-search"></i><input v-model="searchText" placeholder="NARROW YOUR SEARCH" style="width:300px;"/>
      </form>
    </div>
  </div>
  <hr style="width:80%;">
  <InfoList :items="items" />
</div>
</template>

<script>
// @ is an alias to /src
import InfoList from "../components/InfoList.vue"

export default {
  name: 'Home',
  components: {
    InfoList
  },
  data() {
    return {
      searchText: '',
    }
  },
  computed: {
    items() {
      return this.$root.$data.items.filter(item => item.name.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
    }
  },
}
</script>

<style scoped>

.search {
  font-family: 'Unica One', cursive;
  margin-top: 30px;
}

input {
  font-family: 'Unica One', cursive;
  height: 1.5em;

}

.main-container {
  padding-top: 40px;
}

hr {
  margin-top: 50px;
}


</style>
