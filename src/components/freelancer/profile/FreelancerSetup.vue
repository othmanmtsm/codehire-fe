<template>
  <div class="row">
    <div class="col-12 col-md-6 mx-auto mt-5 mb-5">
      <div class="card">
        <v-form @submit.prevent="submitF" @keydown="form.onKeydown($event)">
          <div class="card-header">Configurer votre profil</div>
          <label class="float-left mt-3">Avatar :</label>
          <input type="file" @change="uploadAvatar" class="form-control-file" required />
          <div id="preview">
            <img width="200" v-if="imageUrl" :src="imageUrl" />
          </div>

          <v-text-field
            label="Username"
            color="rgba(125, 60, 255, 0.5)"
            name="username"
            v-model="form.username"
          ></v-text-field>

          <v-text-field
            label="Title"
            color="rgba(125, 60, 255, 0.5)"
            name="title"
            v-model="form.title"
          ></v-text-field>

          <v-text-field label="Hourly Rate" value="28.00" suffix="DH/hr" v-model="form.hourlyrate"></v-text-field>

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

          <div class="row">
            <div v-for="cat in categories" :key="cat.id" class="col-12 col-sm-4 cat-container">
              <div
                :class="{'selected-cat': (form.categories.includes(cat.id))}"
                class="cat"
                @click="(form.categories.includes(cat.id))?form.categories.splice(form.categories.indexOf(cat.id),1):form.categories.push(cat.id)"
              >
                <div class="cat-icon">
                  <v-icon
                    size="60"
                    :color="form.categories.includes(cat.id)?'#7d3cff':'#ffffff'"
                  >{{cat.icon}}</v-icon>
                </div>
                <div class="cat-text">{{cat.name}}</div>
              </div>
            </div>
          </div>

          <v-btn type="submit" class="mt-4" block color="#7d3cff" dark>
            <v-progress-circular v-if="submitting" indeterminate color="#fff" width="3" size="25"></v-progress-circular>submit
          </v-btn>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      form: {
        avatar: null,
        username: "",
        title: "",
        hourlyrate: "",
        skills: [],
        categories: []
      },
      imageUrl: null,
      skills_list: null,
      submitting: false,
      categories: []
    };
  },
  methods: {
    uploadAvatar(e) {
      const file = e.target.files[0];
      this.form.avatar = file;
      this.imageUrl = URL.createObjectURL(file);
    },
    submitF() {
      this.submitting = true;
      let bodyFormData = new FormData();
      bodyFormData.append("avatar", this.form.avatar);
      bodyFormData.append("hourlyrate", this.form.hourlyrate);
      bodyFormData.append("username", this.form.username);
      bodyFormData.append("title", this.form.title);

      if (this.form.skills.length > 0)
        bodyFormData.append("skills", this.form.skills);

      if (this.form.categories.length > 0)
        bodyFormData.append("categories", this.form.categories);

      axios
        .post(`freelancer/${this.user.id}/profile`, bodyFormData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(() => {
          this.$router.replace({
            name: "home"
          });
        })
        .then(err => console.dir(err));
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  created() {
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

<style lang="scss" scoped>
#preview {
  img {
    border-radius: 6px;
    border: 1px solid #7d3cff;
  }
}
</style>