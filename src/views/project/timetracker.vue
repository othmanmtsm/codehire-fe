<template>
  <div class="container">
    <div class="row">
      <div class="col-6 mx-auto">
        <v-card>
          <v-card-title>{{ parseInt(hours) }} Hours</v-card-title>
          <v-card-subtitle>{{ parseInt(minutes) }} minutes</v-card-subtitle>
          <v-card-actions>
            <v-btn @click="startTimer" depressed color="primary">start</v-btn>
            <v-btn @click="stopTimer" depressed color="secondary">stop</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-12">
        <h5>Tasks Management</h5>
      </div>
        <div class="col-12 col-md-4">
            <v-card flat>
                <v-card-title>To Do</v-card-title>
                <v-card-text>
                    <draggable class="list-group" :list="todo" group="tasks">
                        <div
                            class="list-group-item task"
                            v-for="(element) in todo"
                            :key="element.task"
                            @dblclick="deleteTask('todo',element)"
                        >
                        {{ element.task }}
                        </div>
                    </draggable>
                </v-card-text>
                <v-card-actions>
                    <v-text-field
                        v-model="todoText"
                        label="add task"
                        @keypress.enter="addTask('todo')"
                    ></v-text-field>
                </v-card-actions>
            </v-card>
        </div>
        <div class="col-12 col-md-4">
            <v-card flat>
                <v-card-title>Doing</v-card-title>
                <v-card-text>
                    <draggable class="list-group" :list="doing" group="tasks">
                        <div
                            class="list-group-item task"
                            v-for="(element) in doing"
                            :key="element.task"
                            @dblclick="deleteTask('doing',element)"
                        >
                        {{ element.task }}
                        </div>
                    </draggable>
                </v-card-text>
                <v-card-actions>
                  <v-text-field
                      v-model="doingText"
                      label="add task"
                      @keypress.enter="addTask('doing')"
                  ></v-text-field>
                </v-card-actions>
            </v-card>
        </div>
        <div class="col-12 col-md-4">
            <v-card flat>
                <v-card-title>Done</v-card-title>
                <v-card-text>
                    <draggable class="list-group" :list="done" group="tasks">
                        <div
                            class="list-group-item task"
                            v-for="(element) in done"
                            :key="element.task"
                            @dblclick="deleteTask('done',element)"
                        >
                        {{ element.task }}
                        </div>
                    </draggable>
                </v-card-text>
                <v-card-actions>
                  <v-text-field
                    v-model="doneText"
                    label="add task"
                    @keypress.enter="addTask('done')"
                ></v-text-field>
                </v-card-actions>
            </v-card>
        </div>
        <v-btn @click="saveTasks">save tasks</v-btn>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import draggable from 'vuedraggable';
import { mapGetters } from 'vuex';

export default {
    components: {
        draggable,
    },
  data() {
    return {
      project: {},
      time: 0,
      hours: 0,
      interval: null,
      counting: false,
      apiInterval: null,
      minutes: 0,
      todo: [],
      doing: [],
      done: [],
      todoText: '',
      doingText: '',
      doneText: ''
    };
  },
  watch: {
    time(newValue) {
      this.hours = newValue / 3600;
      this.minutes = newValue / 60;
    },
    counting(newValue) {
      if (newValue == true) {
        this.apiInterval = setInterval(() => {
          axios.post(`project/${this.$route.params.id}/settimer`, {hours: this.hours})
                .then(res=>console.log(res.data))
                .catch(err=>console.log(err.response.data))
        }, 30*60000);
      } else {
        clearInterval(this.apiInterval);
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    startTimer() {
      this.counting = true;
      this.interval = setInterval(() => {
        this.time++;
      }, 1000);
    },
    stopTimer() {
      this.counting = false;
      clearInterval(this.interval);
    },
    saveTasks() {
        axios.post(`project/${this.$route.params.id}/task`, {
            todo: this.todo,
            doing: this.doing,
            done: this.done
        })
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err.response.data);
        })
    },
    addTask(t) {
      if (t=='todo') {
        let task = {
          freelancer_id: this.user.id,
          project_id: parseInt(this.$route.params.id),
          task: this.todoText,
          stage: 'todo'
        }
        this.todo.push(task);
        this.todoText = '';
      }
      if (t=='doing') {
        let task = {
          freelancer_id: this.user.id,
          project_id: parseInt(this.$route.params.id),
          task: this.doingText,
          stage: 'doing'
        }
        this.doing.push(task);
        this.doingText = '';
      }
      if (t=='done') {
        let task = {
          project_id: parseInt(this.$route.params.id),
          freelancer_id: this.user.id,
          task: this.doneText,
          stage: 'done'
        }
        this.done.push(task);
        this.doneText = '';
      }
    },
    deleteTask(stage,element){
      axios.post(`project/${this.$route.params.id}/task?_method=delete`, element)
            .then(()=>{
              if (stage=='todo') {
                this.todo.splice(this.todo.indexOf(element),1);
              }else if (stage=='doing') {
                this.doing.splice(this.doing.indexOf(element),1);
              }else if (stage=='done') {
                this.done.splice(this.done.indexOf(element),1);
              }
            })
            .catch(err=>console.log(err.response.data));
    }
  },
  created () {
    axios.get(`project/${this.$route.params.id}/gettimer`)
        .then(res=>{
            this.time = res.data * 3600;
        })
        .catch(err=>{
            console.log(err.response.data);
        });

    axios.get(`project/${this.$route.params.id}/task`)
            .then(res=>{
                console.log(res.data);
                
                this.todo = res.data.filter(t=>{
                    return t.stage == 'todo';
                });
                this.doing = res.data.filter(t=>{
                    return t.stage == 'doing';
                });
                this.done = res.data.filter(t=>{
                    return t.stage == 'done';
                }); 
            })
            .catch(err=>{
                console.log(err.response.data);
            })
  },
};
</script>

<style lang="scss" scoped>
.task{
  cursor: pointer;
}
</style>