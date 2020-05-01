<template>
  <div class="lgn">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-5">
          <div class="authform card">
            <div class="card-header">Login</div>
            <v-alert
              v-if="invalidUser"
              border="left"
              close-text="Close Alert"
              color="red"
              dark
              dismissible
              outlined
            >
              Invalid username and/or password
            </v-alert>
            <form @submit.prevent="submit">
              <!-- Email -->
              <input
                v-model="form.email"
                :class="{'input-err': form.errors.get('email')}"
                class="form-control"
                type="email"
                name="email"
                placeholder="Email"
              />
              <div class="text-danger field-err">
                {{form.errors.get('email')}}
              </div>
              <!-- Password -->
              <input
                v-model="form.password"
                :class="{'input-err': form.errors.get('password')}"
                class="form-control"
                type="password"
                name="password"
                placeholder="Password"
              />
              <div class="text-danger field-err">
                {{form.errors.get('password')}}
              </div>
              <!-- Submit Button -->
                <v-btn type="submit" class="mt-4" block color="#7d3cff" dark>
                  <v-progress-circular 
                    v-if="form.submitting"
                    indeterminate
                    color="#fff"
                    width="3"
                    size="25"
                  ></v-progress-circular>
                  Connecter
                </v-btn>
            </form>
          </div>
        </div>
        <div class="col-12 col-md-7 mt-5 mt-5" id="svgcontainer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import lottie from "lottie-web";
import * as animationData from "../../assets/images/LoginAnim.json";
import { mapActions } from "vuex";

class Errors{
  constructor(){
    this.errors = {};
  }
  get(field){
    if (this.errors[field]) {
      return this.errors[field][0];
    }
  }
  record(data){
    this.errors = data.errors;
  }
}

export default {
  data: () => ({
    form: {
      email: "",
      password: "",
      errors: new Errors(),
      submitting: false
    },
    invalidUser: false
  }),
  methods: {
    ...mapActions({
      signIn: "auth/signIn",
    }),
    submit() {
      this.form.submitting = true;
      this.signIn(this.form).then(() => {
        this.$router.replace({
          name: "home",
        });
      })
      .catch(err=>{
        if (err.response.status == 422) {
          this.form.errors.record(err.response.data);
        }else if (err.response.status == 401) {
          this.invalidUser = true;
        }
        this.form.submitting = false;
      });
    },
  },
  mounted() {
    lottie.loadAnimation({
      container: document.getElementById("svgcontainer"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData.default,
    });
  },
};
</script>

<style lang="scss" scoped>

.lgn {
  height: 95vh;
  background-image: url("/dist/images/login-bg.svg");
  background-position: 0 100px;
  background-repeat: no-repeat;
  overflow: hidden;
  padding-top: 60px;
}
.authform {
  margin-top: 10%;
}
.card {
  box-shadow: 0 1px 1px rgba(125, 60, 255, 0.4);
  text-align: center !important;
  padding: 3rem;
  border-radius: 20px;
  .card-header {
    background-color: #ffffff !important;
    font-family: "PT Sans", sans-serif;
    font-weight: 900;
    font-size: 30px;
    color: #42366d;
  }
  .form-control {
    text-align: center !important;
    border: none !important;
    border-bottom: 1px solid rgba(125, 60, 255, 0.5) !important;
    margin-top: 20px;
  }
}
.field-err{
  font-weight: lighter;
}
.input-err{
  background: #ff000021;
}
</style>
