<template>
  <div class="container">
      <div class="row">
        <v-text-field
            label="Titre"
            color="rgba(125, 60, 255, 0.5)"
            name="titre"
            v-model="form.titre"
        ></v-text-field>
        <quill-editor
            class="borderless"
            ref="myQuillEditor"
            v-model="content"
            :options="editorOption"
        />
        <v-btn @click="save">Enregistrer</v-btn>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import "quill/dist/quill.snow.css";
import { quillEditor } from "vue-quill-editor";
export default {
    components: {
        quillEditor,
    },
    data() {
        return {
            editorOption: {
                theme: "snow"
            },
            form: {},
            content: ''
        }
    },
    watch: {
        content() {
            this.form.description = JSON.stringify(this.$refs.myQuillEditor.quill.getContents());
        }
    },
  created() {
      axios.get(`project/${this.$route.params.id}`)
            .then(res=>{
                this.form = res.data;
                this.$refs.myQuillEditor.quill.setContents(JSON.parse(res.data.description));
            })
            .catch(err=>console.log(err))
  },
  methods: {
      save() {
          axios.post(`project/${this.$route.params.id}?_method=put`,this.form)
                .then(res=>console.dir(res.data))
      }
  },
};
</script>

<style lang="scss" scoped>
</style>