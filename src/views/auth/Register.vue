<template>
  <div class="row">
    <div class="col-12 col-md-6 mx-auto mt-5 mb-5">
      <div class="card">
          <div class="card-header">S'inscrire</div>
        <form @submit.prevent="register" @keydown="form.onKeydown($event)">
          <div class="row">
            <div class="col-12 col-md-6">
              <!-- Name -->
              <input
                v-model="form.nom"
                class="form-control"
                type="text"
                name="nom"
                placeholder="Nom"
              />
            </div>
            <div class="col-12 col-md-6">
              <!-- Name -->
              <input
                v-model="form.prenom"
                class="form-control"
                type="text"
                name="prenom"
                placeholder="Prenom"
              />
            </div>
          </div>

          <!-- Email -->
          <input
            v-model="form.email"
            class="form-control"
            type="email"
            name="email"
            placeholder="Email"
          />

          <!-- Password -->
          <input
            v-model="form.password"
            class="form-control"
            type="password"
            name="password"
            placeholder="Mot de passe"
          />

          <!-- Password Confirmation -->
          <input
            v-model="form.password_confirmation"
            class="form-control"
            type="password"
            name="password_confirmation"
            placeholder="Mot de passe confirmation"
          />

          <div class="row">
            <div class="col-12 col-md-4">
              <select
                v-model="form.pays"
                name="pays"
                class="form-control">
                <option v-for="c in countries" :key="c.id" :value="c.value">{{c.value}}</option>
              </select>
            </div>
            <div class="col-12 col-md-8">
              <input
                v-model="form.tel"
                type="tel"
                name="tel"
                class="form-control"
                placeholder="Telephone" />
            </div>
          </div>

          <p class="theader">Je veux</p>
          <hr />
          <div class="row">
            <div class="col-12 col-md-6">
              <button
                type="button"
                v-bind:class="{selectedT: (selectedType=='freelancer')}"
                @click="selectedType='freelancer'"
                class="btn btn-block chbtn"
              >Travailler comme freelancer</button>
            </div>
            <div class="col-12 col-md-6">
              <button
                type="button"
                v-bind:class="{selectedT: (selectedType=='client')}"
                @click="selectedType='client'"
                class="btn btn-block chbtn"
              >Poster des projets</button>
            </div>
          </div>
          <div class="row" v-if="selectedType=='freelancer'">
            <input
              v-model="form.username"
              type="text"
              name="username"
              class="form-control"
              placeholder="Username" />
          </div>

          <div class="row mt-4">
            <label class="control control-checkbox">
              J'accepte les termes et conditions
              <input name="terms" type="checkbox" />
              <div class="control_indicator"></div>
            </label>
          </div>

          <!-- Submit Button -->
          <button class="rbtn btn btn-block mt-2">register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    form: {
      nom: "",
      prenom: "",
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      pays: "",
      tel: ""
    },
    mustVerifyEmail: false,
    countries: [
      { id: 1, value: "Maroc" },
      { id: 2, value: "France" }
    ],
    selectedType: ""
  }),

  methods: {
    async register() {
        //register logic
    }
  }
};
</script>

<style lang="scss" scoped>
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
    margin-bottom: 20px;
    text-align: center !important;
    border: none !important;
    border-bottom: 1px solid rgba(125, 60, 255, 0.5) !important;
    margin-top: 20px;
  }
}
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
