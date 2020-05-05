<template>
    <div class="row">
    <div class="col-12 col-md-6 mx-auto mt-5 mb-5">
        <div class="card">
            <v-form @submit.prevent="submitF" @keydown="form.onKeydown($event)">
                <div class="card-header">Configurer votre profil</div>
                <label class="float-left mt-3">Avatar : </label>
                <input
                    type="file"
                    @change="uploadAvatar"
                    class="form-control-file"
                    required
                />
                <div id="preview">
                    <img width="200" v-if="imageUrl" :src="imageUrl" />
                </div>

                <v-text-field
                    label="Username"
                    color="rgba(125, 60, 255, 0.5)"
                    name="username"
                    v-model="form.username"
                ></v-text-field>

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
                    <div class="col-12 col-sm-4 cat-container">
                        <div 
                            :class="{'selected-cat': (form.categories.includes(1))}" 
                            class="cat"
                            @click="(form.categories.includes(1))?form.categories.splice(form.categories.indexOf(1),1):form.categories.push(1)"
                        >
                            <div class="cat-icon">
                                <v-icon size="60" :color="form.categories.includes(1)?'#7d3cff':'#ffffff'">code</v-icon>
                            </div>
                            <div class="cat-text">
                                Programmation
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-4 cat-container">
                        <div 
                            :class="{'selected-cat': (form.categories.includes(2))}" 
                            class="cat"
                            @click="(form.categories.includes(2))?form.categories.splice(form.categories.indexOf(2),1):form.categories.push(2)"                  
                        >
                            <div class="cat-icon">
                                <v-icon size="60" :color="form.categories.includes(2)?'#7d3cff':'#ffffff'">web</v-icon>
                            </div>
                            <div class="cat-text">
                                UI/UX Design
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-4 cat-container">
                        <div 
                            :class="{'selected-cat': (form.categories.includes(3))}" 
                            class="cat"
                            @click="(form.categories.includes(3))?form.categories.splice(form.categories.indexOf(3),1):form.categories.push(3)"                  
                        >
                            <div class="cat-icon">
                                <v-icon size="60" :color="form.categories.includes(3)?'#7d3cff':'#ffffff'">stay_current_portrait</v-icon>
                            </div>
                            <div class="cat-text">
                                Mobile dev
                            </div>
                        </div>
                    </div>
                </div>

                <v-btn type="submit" class="mt-4" block color="#7d3cff" dark>
                    <v-progress-circular 
                        v-if="submitting"
                        indeterminate
                        color="#fff"
                        width="3"
                        size="25"
                    ></v-progress-circular>
                    submit
                </v-btn>
            </v-form>
        </div>
    </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
    data() {
        return {
            form:{
                avatar: null,
                username: '',
                skills: [],
                categories: []
            },
            imageUrl: null,
            skills_list: null,
            submitting: false
        }
    },
    methods: {
        uploadAvatar(e){
            const file = e.target.files[0];
            this.form.avatar = file;
            this.imageUrl = URL.createObjectURL(file);
        },
        submitF() {
            this.submitting = true;
            let bodyFormData = new FormData();
            bodyFormData.append('avatar',this.form.avatar);
            bodyFormData.append('username',this.form.username);

            if(this.form.skills.length > 0)
                bodyFormData.append('skills',this.form.skills);

            if (this.form.categories.length > 0)
                bodyFormData.append('categories',this.form.categories);
            
            axios.post(`freelancer/${this.user.id}/profile`,bodyFormData,{headers:{'Content-Type': 'multipart/form-data'}})
            .then(()=>{
                this.$router.replace({
                    name: 'home'
                });
            })
            .then(err=>console.dir(err));
        }
    },
    computed:{
    ...mapGetters({
      user: 'auth/user'
    })
  },
  created(){
      axios.get('skills')
      .then(res=>this.skills_list=res.data)
      .catch(err=>console.dir(err));
  }
}
</script>

<style lang="scss" scoped>
#preview{
    img{
        border-radius: 6px;
        border: 1px solid #7d3cff;
    }
}
.cat-container{
    padding: 0;
    .cat{
        height: 120px;
        background: #7d3cff;
        margin: 10px;
        padding-top: 5%;
        border-radius: 5px;
        cursor: pointer;
        .cat-text{
            font-size: 15px;
            color: #ffffff;
        }
        border: 2px solid #ffffff;
    }
    .selected-cat{
        background:#ffffff !important;
        .cat-text{
            color: #7d3cff !important;
        }
        border: 2px solid #7d3cff;
    }
}

</style>