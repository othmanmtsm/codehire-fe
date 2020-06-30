<template>
  <div class="container">
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>Admin Dashboard</v-toolbar-title>
      </v-toolbar>
      <v-tabs vertical>
        <v-tab>
          <v-icon left>mdi-account</v-icon>Freelancers
        </v-tab>
        <v-tab>
          <v-icon left>mdi-account</v-icon>Clients
        </v-tab>
        <v-tab>
          <v-icon left>share</v-icon>Skills
        </v-tab>
        <v-tab>
          <v-icon left>mdi-access-point</v-icon>Categories
        </v-tab>
        <v-tab-item>
          <v-card>
            <v-card-title>
              Freelancers
              <v-spacer></v-spacer>
              <v-text-field
                v-model="freelancerSearch"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <!-- users table -->
            <v-data-table
              :headers="Freelancersheaders"
              :items="freelancers"
              :search="freelancerSearch"
              show-expand
            >
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <v-dialog v-model="editFreelancerdialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        depressed
                        small
                        @click="setFreelancer(item)"
                        v-bind="attrs"
                        v-on="on"
                        :loading="savingF"
                      >edit</v-btn>
                    </template>

                    <v-card>
                      <v-card-title class="headline grey lighten-2" primary-title>Edit freelancer</v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-text-field label="name" v-model="freelancer.name"></v-text-field>
                        <v-text-field label="username" v-model="freelancer.username"></v-text-field>
                        <v-text-field label="name" v-model="freelancer.hourly_rate" type="number"></v-text-field>
                        <v-text-field label="title" v-model="freelancer.title"></v-text-field>
                        <v-text-field label="email" v-model="freelancer.email"></v-text-field>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="saveFreelancer">save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="deleteFreelancerdialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="secondary" depressed small v-bind="attrs" v-on="on">delete</v-btn>
                    </template>

                    <v-card>
                      <v-card-title class="headline grey lighten-2" primary-title>Delete Freelancer</v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-card-title>Are you sure you want to delete {{ item.name }} ?</v-card-title>
                        <v-card-subtitle>Deleted data cannot be restored</v-card-subtitle>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="secondary"
                          text
                          @click="deleteFreelancer(item.id)"
                          :loading="deletingF"
                        >delete</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </td>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card>
            <v-card-title>
              Freelancers
              <v-spacer></v-spacer>
              <v-text-field
                v-model="clientSearch"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <!-- clients table -->
            <v-data-table
              :headers="Clientsheaders"
              :items="clients"
              :search="clientSearch"
              show-expand
            >
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <v-dialog v-model="editClientdialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        depressed
                        small
                        @click="setClient(item)"
                        v-bind="attrs"
                        v-on="on"
                        :loading="savingC"
                      >edit</v-btn>
                    </template>

                    <v-card>
                      <v-card-title class="headline grey lighten-2" primary-title>Edit client</v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-text-field label="name" v-model="client.name"></v-text-field>
                        <v-text-field label="organisation" v-model="client.organisation"></v-text-field>
                        <v-text-field
                          label="number of employees"
                          v-model="client.nbemployees"
                          type="number"
                        ></v-text-field>
                        <v-text-field label="email" v-model="client.email" type="email"></v-text-field>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="saveClient">save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="deleteClientdialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="secondary" depressed small v-bind="attrs" v-on="on">delete</v-btn>
                    </template>

                    <v-card>
                      <v-card-title class="headline grey lighten-2" primary-title>Delete Client</v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-card-title>Are you sure you want to delete {{ item.name }} ?</v-card-title>
                        <v-card-subtitle>Deleted data cannot be restored</v-card-subtitle>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="secondary"
                          text
                          @click="deleteClient(item.id)"
                          :loading="deletingC"
                        >delete</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </td>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card-title>
            Skills
             <v-dialog v-model="addSkillModel" width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      depressed
                      icon
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>add</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>add skill</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                      <v-text-field
                        v-model="skill"
                        label="skill name"
                      ></v-text-field>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click="addSkil" color="primary" text>add</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="skillSearch"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <!-- clients table -->
          <v-data-table :headers="skillsHeader" :items="skills" :search="skillSearch" show-expand>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <v-dialog v-model="editSkillModel" width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      depressed
                      small
                      v-bind="attrs"
                      v-on="on"
                      @click="setSkill(item.skill_name)"
                    >edit</v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>Edit skill</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                      <v-text-field
                        v-model="skill"
                      >
                      </v-text-field>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click="saveSkill(item.id)" color="primary" text>save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="deleteSkillModel" width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="secondary"
                      depressed
                      small
                      v-bind="attrs"
                      v-on="on"
                    >delete</v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>delete skill</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                      <v-card-title>Are you sure you want to delete {{ item.skill_name }}</v-card-title>
                      <v-card-subtitle>Deleted data cannot be restored</v-card-subtitle>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click="deleteSkill(item.id)" color="primary" text>delete</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </td>
            </template>
          </v-data-table>
        </v-tab-item>
        <v-tab-item>
          <v-card-title>
            Categories
             <v-dialog v-model="addCatModel" width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      depressed
                      icon
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>add</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>add category</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                      <v-text-field
                        v-model="category.name"
                        label="category name"
                      ></v-text-field>
                      <v-text-field
                        v-model="category.icon"
                        label="icon"
                      ></v-text-field>
                    </v-card-text>
                    <a href="https://material.io/resources/icons/?icon=attach_file&style=baseline">Icons reference</a>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click="addCat" color="primary" text>add</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="catSearch"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <!-- clients table -->
          <v-data-table :headers="catHeaders" :items="categories" :search="catSearch" show-expand>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <v-dialog v-model="editCatModel" width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      depressed
                      small
                      v-bind="attrs"
                      v-on="on"
                      @click="setCat(item)"
                    >edit</v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>delete skill</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                      <v-text-field
                        v-model="category.name"
                      ></v-text-field>
                      <v-text-field
                        v-model="category.icon"
                      ></v-text-field>
                      <a href="https://material.io/resources/icons/?icon=attach_file&style=baseline">Icons reference</a>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click="saveCat(item.id)" color="primary" text>save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="delCatModel" width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="secondary"
                      depressed
                      small
                      v-bind="attrs"
                      v-on="on"
                    >delete</v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>delete skill</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                      <v-card-title>Are you sure you want to delete {{ item.name }} ?</v-card-title>
                      <v-card-subtitle>Deleted data cannot be restored</v-card-subtitle>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click="deleteCat(item)" color="primary" text>delete</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </td>
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      skills: [],
      skill: '',
      addSkillModel: false,
      editSkillModel: false,
      deleteSkillModel: false,
      delCatModel: false,
      categories: [],
      category: {
        name: '',
        icon: ''
      },
      catSearch: '',
      addCatModel: false,
      editCatModel: false,
      catHeaders: [
        {
          text: "ID",
          value: "id",
          align: "start"
        },
        {
          text: "Category label",
          value: "name"
        },
        {
          text: "Category icon",
          value: "icon"
        }
      ],
      freelancer: {
        id: null,
        name: "",
        username: "",
        hourly_rate: null,
        title: "",
        email: ""
      },
      Freelancersheaders: [
        {
          text: "Full Name",
          align: "start",
          value: "name"
        },
        { text: "username", value: "username" },
        { text: "Hourly Rate", value: "hourly_rate" },
        { text: "Title", value: "title" },
        { text: "Email", value: "email" }
      ],
      freelancers: [],
      freelancerSearch: "",
      editFreelancerdialog: false,
      deleteFreelancerdialog: false,
      savingF: false,
      deletingF: false,
      Clientsheaders: [
        {
          text: "Full Name",
          align: "start",
          value: "name"
        },
        { text: "Organisation", value: "organisation" },
        { text: "Employees Number", value: "nbemployees" },
        { text: "Projects Number", value: "nbprojects" },
        { text: "Email", value: "email" }
      ],
      clients: [],
      clientSearch: "",
      client: {
        name: "",
        organisation: "",
        email: "",
        nbemployees: null
      },
      deleteClientdialog: false,
      deletingC: false,
      savingC: false,
      editClientdialog: false,
      skillsHeader: [
        {
          text: "ID",
          value: "id",
          align: "start"
        },
        {
          text: "Skill label",
          value: "skill_name"
        }
      ],
      skillSearch: ""
    };
  },
  created() {
    axios
      .get("dashboard/freelancers")
      .then(res => {
        this.freelancers = res.data;
      })
      .catch(err => {
        console.log(err.response.data);
      });

    axios
      .get("dashboard/clients")
      .then(res => {
        this.clients = res.data;
      })
      .catch(err => {
        console.log(err.response.data);
      });

    axios.get("skills").then(res => {
      this.skills = res.data;
    });

    axios.get("categories").then(res => {
      this.categories = res.data;
    });
  },
  methods: {
    setFreelancer(f) {
      this.freelancer.id = f.id;
      this.freelancer.name = f.name;
      this.freelancer.username = f.username;
      this.freelancer.email = f.email;
      this.freelancer.title = f.title;
      this.freelancer.hourly_rate = f.hourly_rate;
    },
    saveFreelancer() {
      this.savingF = true;
      axios
        .post(
          `dashboard/freelancers/${this.freelancer.id}?_method=put`,
          this.freelancer
        )
        .then(() => {
          this.editFreelancerdialog = false;
          this.savingF = false;
        });
    },
    setClient(c) {
      this.client.id = c.id;
      this.client.name = c.name;
      this.client.email = c.email;
      this.client.organisation = c.organisation;
      this.client.nbemployees = c.nbemployees;
    },
    saveClient() {
      this.savingC = true;
      axios
        .post(`dashboard/clients/${this.client.id}?_method=put`, this.client)
        .then(() => {
          this.savingC = false;
          this.editClientdialog = false;
        })
        .catch(err => {
          console.log(err.response.data);
        });
    },
    deleteFreelancer(id) {
      this.deletingF = true;
      axios
        .post(`dashboard/freelancers/${id}?_method=delete`)
        .then(() => {
          this.deleteFreelancerdialog = false;
          this.deletingF = false;
        })
        .catch(err => {
          console.log(err.response.data);
        });
    },
    deleteClient(id) {
      this.deletingC = true;
      axios.post(`client/${id}?_method=delete`)
            .then(()=>{
              this.deleteClientdialog = false;
              this.deletingC = false;
            })
            .catch(err=>{
              console.log(err.response.data);
            })
      
    },
    addSkil() {
      axios.post('skills', {skill: this.skill})
            .then(()=>{
              this.addSkillModel = false;
              this.skill='';
            })
            .catch(err=>{
              console.log(err.response.data);
            })
    },
    setSkill(s) {
      this.skill = s; 
    },
    saveSkill(id) {
      axios.post(`skills/${id}?_method=put`,{skill: this.skill})
            .then(()=>{
              this.editSkillModel = false;
            })
    },
    deleteSkill(id) {
      axios.post(`skills/${id}?_method=delete`)
            .then(()=>{
              this.deleteSkillModel = false;
            })
            .catch(err=>{
              console.log(err.response.data);
            });
    },
    addCat() {
      axios.post('categories', this.category)
            .then(()=>{
              this.addCatModel = false;
            })
            .catch(err=>{
              console.log(err.response.data);
            });
    },
    setCat(cat) {
      this.category.name = cat.name;
      this.category.icon = cat.icon;
    },
    saveCat(id) {
      axios.post(`categories/${id}?_method=put`,this.category)
            .then(()=>{
              this.editCatModel = false;
            })
            .catch(err=>{
              console.log(err.response.data);
            });
    },
    deleteCat(cat) {
      axios.post(`categories/${cat.id}?_method=delete`)
            .then(()=>{
              this.delCatModel = false;
              this.categories.splice(this.categories.indexOf(cat), 1);
            })
            .catch(err=>{
              console.log(err.response.data);
            });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>