<template>
<div class="wrapper">
  <div class="items">
    <div class="item" v-for="item in items" :key="item.id">
      <div class="info">
        <h2>{{item.name}}</h2>
        <div class="image">
          <img :src="'/images/items/'+item.image" style="height:250px;" >
        </div>
        <p>Height: {{item.height}} cm</p>
        <p>Mass: {{item.mass}} kg</p>
        <p>Gender: {{item.gender}}</p>
        <p>Skin color: {{item.skin_color}}</p>
        <p>Eye color: {{item.eye_color}}</p>
        <p>Birth year: {{item.birth_year}}</p>
      </div>
    </div>
  </div>
</div>
</template>


<script>
export default {
  name: 'InfoList',
  props: {
    items: Array
  },

}
</script>

<style scoped>
.items {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.item{
  margin: 35px;
  padding: 15px;
  border: 2px solid white;
  background-color: #595959; /*lighter gray */
  font-family: 'Unica One', cursive;
  font-size: 1.2em;
}

p {
  font-size: 0.9em;
  margin: 5px !important;
}

</style>
