<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <v-stepper v-model="currentStep">
          <v-stepper-header>
            <v-stepper-step editable :complete="currentStep > 1" step="1">Donnez un titre</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable :complete="currentStep > 2" step="2">Decrire votre projet</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable :complete="currentStep > 3" step="3">Category / skills</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step editable step="4">Payment</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card>
                <div class="row">
                  <div class="col-6 mx-auto text-center">
                    <h3>Donnez un titre a votre projet</h3>
                    <v-text-field
                      label="Titre"
                      color="rgba(125, 60, 255, 0.5)"
                      name="titre"
                      v-model="form.titre"
                    ></v-text-field>
                  </div>
                </div>
                <v-btn @click="nextStep">next</v-btn>
              </v-card>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card>
                <h3>Donnez une description a votre projet</h3>
                <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" />
                <v-btn @click="nextStep">next</v-btn>
              </v-card>
            </v-stepper-content>
            <v-stepper-content step="3">
              <v-card class="container">
                <h3>Choisir une category</h3>
                <div class="row text-center">
                  <div
                    v-for="cat in categories"
                    :key="cat.id"
                    class="col-12 col-sm-4 cat-container"
                  >
                    <div
                      :class="{ 'selected-cat': form.category == cat.id }"
                      class="cat"
                      @click="setCat(cat.id)"
                    >
                      <div class="cat-icon">
                        <v-icon
                          size="60"
                          :color="form.category == cat.id ? '#7d3cff' : '#ffffff'"
                        >{{cat.icon}}</v-icon>
                      </div>
                      <div class="cat-text">{{cat.name}}</div>
                    </div>
                  </div>
                </div>
                <h3>Choisir skills :</h3>
                <v-select
                  v-model="form.skills"
                  :items="skills_list"
                  label="Skills"
                  item-text="skill_name"
                  item-value="id"
                  color="rgba(125, 60, 255, 0.5)"
                  item-color="rgba(125, 60, 255, 0.5)"
                  dense
                  chips
                  multiple
                ></v-select>
                <v-btn @click="nextStep">next</v-btn>
              </v-card>
            </v-stepper-content>
            <v-stepper-content step="4">
              <v-card class="container">
                <div class="row">
                  <div class="col-12 col-md-6">
                    <h3>Choisir deadline</h3>
                    <v-date-picker v-model="form.date_lim" :landscape="$vuetify.breakpoint.smAndUp"></v-date-picker>
                  </div>
                  <div class="col-12 col-md-6">
                    <v-text-field
                      label="min payment"
                      color="rgba(125, 60, 255, 0.5)"
                      name="pay_min"
                      type="number"
                      v-model="form.pay_min"
                    ></v-text-field>
                    <v-text-field
                      label="max payment"
                      color="rgba(125, 60, 255, 0.5)"
                      name="pay_max"
                      type="number"
                      v-model="form.pay_max"
                    ></v-text-field>
                    <div class="row">
                      <div class="col-12 col-md-6">
                        <button
                          type="button"
                          v-bind:class="{selectedT: (form.payment=='1')}"
                          @click="form.payment='1'"
                          class="btn btn-block chbtn"
                        >Payer par heure</button>
                      </div>
                      <div class="col-12 col-md-6">
                        <button
                          type="button"
                          v-bind:class="{selectedT: (form.payment=='2')}"
                          @click="form.payment='2'"
                          class="btn btn-block chbtn"
                        >Payer prix fixe</button>
                      </div>
                    </div>
                  </div>
                </div>
                <v-btn color="primary" @click="submitF">Post</v-btn>
                <v-dialog v-model="postModel" width="500">
                  <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>Project posted</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                      Head to your dashboard to manage your projects and see the bidders.
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-btn link :to="{name: 'settings.projects'}">Continue</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "quill/dist/quill.snow.css";
import { quillEditor } from "vue-quill-editor";

export default {
  components: {
    quillEditor
  },
  data() {
    return {
      first: null,
      currentStep: 1,
      form: {
        titre: "",
        description: undefined,
        category: -1,
        skills: [],
        date_lim: new Date().toISOString().substr(0, 10),
        pay_min: 0,
        pay_max: 0,
        payment: ""
      },
      editorOption: {
        theme: "snow"
      },
      content: "",
      skills_list: null,
      categories: [],
      postModel: false
    };
  },
  watch: {
    content() {
      this.form.description = JSON.stringify(
        this.$refs.myQuillEditor.quill.getContents()
      );
    }
  },
  methods: {
    nextStep() {
      if (this.currentStep < 4) {
        this.currentStep++;
      }
    },
    setCat(cat) {
      this.form.category = cat;
    },
    submitF() {
      console.log(this.form);
      axios
        .post("project", this.form)
        .then(() => {
          this.postModel = true;
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this.first = this.$route.params.first;
    axios
      .get("skills")
      .then(res => (this.skills_list = res.data))
      .catch(err => console.dir(err));
    axios.get("categories").then(res => {
      this.categories = res.data;
    });
  }
};
</script>

<style lang="scss">
.ql-container.ql-snow {
  border: none;
}
.ql-editor {
  font-size: 20px;
  min-height: 25vh;
}
.chbtn {
  background-color: #7d3cff;
  color: #ffffff;
}
.selectedT {
  background-color: #ffffff;
  color: #7d3cff;
  border: 1px solid #7d3cff;
}
</style>
