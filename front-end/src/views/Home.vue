<template>
<div>
  <div class='main-container'>
  </div>
  <div class='home-title'> <h1>ROSTER</h1></div>
  <hr>
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

.home-title {
  margin-top: 50px;
  font-family: 'Unica One', cursive;
}

hr {
  width: 80%;
  margin-top: 50px;

}

</style>
