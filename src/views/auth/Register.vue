<template>
  <div class="row">
    <div class="col-12 col-md-6 mx-auto mt-5 mb-5">
      <div class="card">
          <div class="card-header">S'inscrire</div>
        <v-form @submit.prevent="register" @keydown="form.onKeydown($event)">
          <div class="row">
            <div class="col-12 col-md-6">
              
              <!-- Name -->
              <v-text-field
                label="Nom"
                color="rgba(125, 60, 255, 0.5)"
                name="nom"
                v-model="form.nom"
              ></v-text-field>
            </div>
            <div class="col-12 col-md-6">
              <!-- Name -->
              <v-text-field
                label="Prenom"
                color="rgba(125, 60, 255, 0.5)"
                name="prenom"
                v-model="form.prenom"
              ></v-text-field>
            </div>
          </div>

          <!-- Email -->
          <v-text-field
            label="Email"
            color="rgba(125, 60, 255, 0.5)"
            name="email"
            v-model="form.email"
          ></v-text-field>

          <!-- Password -->
          <v-text-field
                label="Mot de passe"
                color="rgba(125, 60, 255, 0.5)"
                name="password"
                v-model="form.password"
                type="password"
          ></v-text-field>

          <!-- Password Confirmation -->
          <v-text-field
            label="Confirmer votre mot de passe"
            color="rgba(125, 60, 255, 0.5)"
            name="confirm"
            v-model="password_confirmation"
            type="password"
          ></v-text-field>

          <v-text-field
                label="Adresse"
                color="rgba(125, 60, 255, 0.5)"
                name="adresse"
                v-model="form.addresse"
                type="text"
          ></v-text-field>
              <v-text-field
                label="Telephone"
                color="rgba(125, 60, 255, 0.5)"
                name="tel"
                v-model="form.tel"
                type="tel"
              ></v-text-field>

          <p class="theader">Je veux</p>
          <hr />
          <div class="row">
            <div class="col-12 col-md-6">
              <button
                type="button"
                v-bind:class="{selectedT: (form.role=='1')}"
                @click="form.role='1'"
                class="btn btn-block chbtn"
              >Travailler comme freelancer</button>
            </div>
            <div class="col-12 col-md-6">
              <button
                type="button"
                v-bind:class="{selectedT: (form.role=='2')}"
                @click="form.role='2'"
                class="btn btn-block chbtn"
              >Poster des projets</button>
            </div>
          </div>

          <div class="row mt-4">
            <label class="control control-checkbox">
              J'accepte les termes et conditions
              <input name="terms" type="checkbox" />
              <div class="control_indicator"></div>
            </label>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="rbtn btn btn-block mt-2">
            <v-progress-circular 
                v-if="submitting"
                indeterminate
                color="#fff"
                width="3"
                size="25"
            ></v-progress-circular>
            register
          </button>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    form: {
      nom: "",
      prenom: "",
      email: "",
      password: "",
      addresse: "",
      tel: "",
      role: ""
    },
    mustVerifyEmail: false,
    password_confirmation: "",
    submitting: false
  }),

  methods: {
    ...mapActions({
      signUp: "auth/signUp",
    }),
    async register() {
      this.submitting = true;
      this.signUp(this.$data.form)
      .then(()=>{
          this.$router.push({
            name: 'profile.setup',
            params: {
              role: this.$data.form.role
            }
          })
      })
      .catch(err=>console.dir(err.response.data.message))
    }
  }
};
</script>

<style lang="scss" scoped>
.chbtn {
  background-color: #7d3cff;
  color: #ffffff;
}
.rbtn {
  background-color: #7d3cff;
  color: #ffffff;
  border-radius: 40px;
}
.selectedT {
  background-color: #ffffff;
  color: #7d3cff;
  border: 1px solid #7d3cff;
}
.theader {
  font-family: "PT Sans", sans-serif;
  font-weight: 900;
  font-size: 20px;
  color: #42366d;
  margin-top: 10px;
}
.control {
  font-family: arial;
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 5px;
  padding-top: 3px;
  cursor: pointer;
  font-size: 16px;
}
.control input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.control_indicator {
  position: absolute;
  top: 2px;
  left: 0;
  height: 20px;
  width: 20px;
  background: #e6e6e6;
  border: 0px solid #000000;
  border-radius: 0px;
}
.control:hover input ~ .control_indicator,
.control input:focus ~ .control_indicator {
  background: #cccccc;
}

.control input:checked ~ .control_indicator {
  background: #7d3cff;
}
.control:hover input:not([disabled]):checked ~ .control_indicator,
.control input:checked:focus ~ .control_indicator {
  background: #0e6647;
}
.control input:disabled ~ .control_indicator {
  background: #e6e6e6;
  opacity: 0.6;
  pointer-events: none;
}
.control_indicator:after {
  box-sizing: unset;
  content: "";
  position: absolute;
  display: none;
}
.control input:checked ~ .control_indicator:after {
  display: block;
}
.control-checkbox .control_indicator:after {
  left: 8px;
  top: 4px;
  width: 3px;
  height: 8px;
  border: solid #ffffff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.control-checkbox input:disabled ~ .control_indicator:after {
  border-color: #7b7b7b;
}
</style>
