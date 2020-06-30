<template>
  <div class="container">
    <div class="row">
      <v-card class="mt-5 mx-auto">
        <v-card-title>
          My projects
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table 
            :headers="headers" 
            :items="projects" 
            :search="search" 
            show-expand
        >
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <v-btn
                        depressed
                        color="primary"
                        link
                        :to="{ name: 'timetracker', params:{id: item.id} }"
                    >
                        timetracker
                    </v-btn>
                </td>
            </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      headers: [
        {
          text: "Project title",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Due date", value: "date" },
        { text: "Min Payment", value: "paymin" },
        { text: "Max Payment", value: "paymax" },
        { text: "Amount", value: "amount" },
        { text: "Duration", value: "duration" },
        { text: "Status", value: "status" }
      ],
      projects: [],
      search: ''
    };
  },
  created () {
      axios.get('myprojects')
            .then(res=>{
                this.projects = res.data;
            })
  },
};
</script>

<style lang="scss" scoped></style>
