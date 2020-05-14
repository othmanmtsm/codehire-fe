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
                    label="Nom de votre organisation"
                    color="rgba(125, 60, 255, 0.5)"
                    name="organisation"
                    v-model="form.organisation"
                ></v-text-field>

                <v-text-field
                    label="Nombre d'employees"
                    color="rgba(125, 60, 255, 0.5)"
                    name="nb_emp"
                    v-model="form.nb_emp"
                    type="number"
                ></v-text-field>

                <v-btn type="submit" class="mt-4" block color="#7d3cff" dark>
                    <v-progress-circular 
                        v-if="submitting"
                        indeterminate
                        color="#fff"
                        width="3"
                        size="25"
                    ></v-progress-circular>
                    Continuer
                </v-btn>

            </v-form>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                form:{
                    avatar: null,
                    organisation: '',
                    nb_emp: 0
                },
                imageUrl: null,
                submitting: false
            }
        },
        methods: {
            uploadAvatar(e){
                const file = e.target.files[0];
                this.form.avatar = file;
                this.imageUrl = URL.createObjectURL(file);
            },
            submitF(){
                this.submitting = true;
                let bodyFormData = new FormData();
                bodyFormData.append('avatar',this.form.avatar);
                if (this.form.organisation != '') {
                    bodyFormData.append('organisation',this.form.organisation);
                }
                if (this.form.nb_emp != 0) {
                    bodyFormData.append('nb_emp',this.form.nb_emp);
                }
                axios.post(`client/${this.user.id}?_method=put`,bodyFormData,{headers:{'Content-Type': 'multipart/form-data'}})
                    .then(()=>{
                        this.$router.replace({
                            name: 'project.new',
                            params: {
                                first: true
                            }
                        });
                    })
                    .catch(err=>console.log(err));
            }
        },
        computed:{
        ...mapGetters({
            user: 'auth/user'
        })
    }
}
</script>

<style lang="scss" scoped>

</style>