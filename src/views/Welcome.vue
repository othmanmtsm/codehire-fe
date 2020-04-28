<template>
<div>
  <div id="header">
      <div class="row">
        <div class="container">
          <h1 id="title">Embaucher Un Développeur
              <br>Pour Votre Prochain Projettt</h1>
          <p id="titles">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br>Illo optio dicta reprehenderit inventore autem nam ut consequatur.
          </p>
          <button class="btn pbtn">Client</button>
          <button class="btn sbtn">Freelancer</button>
        </div>
      </div>
  </div>
</div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
#header{
  height: 100vh;
  background-image: url('../assets/images/home_header.svg');
  background-size: 100rem;
  background-position: 20rem -24rem;
  background-repeat: no-repeat;
  overflow: hidden;
}
#title{
  font-family: 'PT Sans Narrow', sans-serif;
  font-weight:900;
  font-size: 50px;
  color: #42366D;
  margin-top: 16%;
}
#titles{
  color: rgba(66, 54, 109, .8);
  font-family: 'PT Sans', sans-serif;
  font-style: italic;
}
.pbtn{
  font-family: 'PT Sans Narrow', sans-serif;
  font-weight:bold;
  font-size: 35px;
  background-color: #7D3CFF;
  color: #ffffff;
  width:12rem;
  height: 4rem;
  margin-right: 10px;
  padding-top: 0;
}
.sbtn{
  font-family: 'PT Sans Narrow', sans-serif;
  font-weight:bold;
  font-size: 35px;
  color: #7D3CFF;
  border: 2px solid #7D3CFF;
  width:12rem;
  height: 4rem;
  padding-top: 0;
}
</style>