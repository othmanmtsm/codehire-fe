<template>
<div class="lgn">
<div class="container">
  <div class="row">
    <div class="col-12 col-md-5">
      <div class="authform card">
          <div class="card-header">Login</div>
        <form @submit.prevent="submit">
          <!-- Email -->
              <input v-model="form.email" class="form-control" type="email" name="email" placeholder="Email">


          <!-- Password -->
              <input v-model="form.password" class="form-control" type="password" name="password" placeholder="Password">

              <!-- Submit Button -->
              <button class="btn lbtn">
                login
              </button>

              <!-- GitHub Login Button -->
              <!-- <login-with-github /> -->

          <!-- Remember Me -->
          <div class="form-group mt-2 row">
            <!-- <div class="col-6">
              <checkbox name="remember">
                remember_me
              </checkbox>
            </div> -->
            <div class="col-6">
              <!-- <router-link class="small ml-auto my-auto">
                forgot_password
              </router-link> -->
            </div>
          </div>


        </form>
      </div>
    </div>
    <div class="col-12 col-md-7 mt-5 mt-5" id="svgcontainer">
      <!-- <img class="mt-5" src="/dist/images/login.svg"> -->
    </div>
  </div>
</div>
</div>
</template>

<script>
import lottie from 'lottie-web'
import * as animationData from '../../assets/images/LoginAnim.json'
import { mapActions } from 'vuex';

export default {

  data: () => ({
    form: {
      email: '',
      password: ''
    }
  }),
  methods: {
    ...mapActions({
      signIn: 'auth/signIn'
    }),
    submit () {
      this.signIn(this.form).then(()=>{
        this.$router.replace({
          name: 'home'
        })
      });
    }
  },
  mounted(){
    lottie.loadAnimation({
      container: document.getElementById('svgcontainer'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData.default
    });
  }
}
</script>


<style lang="scss" scoped>
.lgn{
  height: 95vh;
  background-image: url('/dist/images/login-bg.svg');
  background-position: 0 100px;
  background-repeat: no-repeat;
  overflow: hidden;
  padding-top: 60px;
}
.authform{
  margin-top: 20%;
}
.lbtn{
  background-color: #7D3CFF;
  color: #ffffff;
}
.card {
  box-shadow: 0 1px 1px rgba(125, 60, 255,0.4);
  text-align: center !important;
  padding: 3rem;
  border-radius: 20px;
  .card-header{
    background-color: #ffffff !important;
    font-family: 'PT Sans', sans-serif;
    font-weight:900;
    font-size: 30px;
    color: #42366D;
  }
  .form-control{
    margin-bottom: 20px;
    text-align: center !important;
    border: none !important;
    border-bottom: 1px solid rgba(125, 60, 255, 0.5) !important;
    margin-top: 20px;
  }
}
</style>
