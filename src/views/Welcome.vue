<template>
  <div>
    <div class="container" id="header">
      <div class="row">
        <div class="col-12 col-md-5 mt-5">
          <h1 id="title">
            Embaucher Un Développeur <br />Pour Votre Prochain Projet
          </h1>
          <p id="titles">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br />Illo
            optio dicta.
          </p>
          <button class="btn pbtn">Client</button>
          <button class="btn sbtn">Freelancer</button>
        </div>
        <div class="col-12 col-md-7">
          <img src="@/assets/images/home_ill.svg" alt="" srcset="" />
        </div>
      </div>
    </div>
    <hr id="header-hr" />
    <section id="steps">

    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#header {
  padding: 30px;
}
#title {
  font-family: "PT Sans Narrow", sans-serif;
  font-weight: 900;
  font-size: 40px;
  color: #42366d;
  margin-top: 16%;
}
#titles {
  color: rgba(66, 54, 109, 0.8);
  font-family: "PT Sans", sans-serif;
  font-style: italic;
}
.pbtn {
  font-family: "PT Sans Narrow", sans-serif;
  font-weight: bold;
  font-size: 30px;
  background-color: #7d3cff;
  color: #ffffff;
  width: 10rem;
  height: 60px;
  margin-right: 10px;
  padding-top: 0;
}
.sbtn {
  font-family: "PT Sans Narrow", sans-serif;
  font-weight: bold;
  font-size: 30px;
  color: #7d3cff;
  border: 2px solid #7d3cff;
  width: 10rem;
  height: 60px;
  padding-top: 0;
}
#header-hr{
  box-shadow: 0 2px 6px 0 rgba(244, 247, 246, 0.5);
  margin: 0;
}
#steps{
  background: #f7f8fb;
  height: 30vh;
}
</style>
