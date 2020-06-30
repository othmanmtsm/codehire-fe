<template>
  <div class="container">
    <div class="messaging">
      <div class="inbox_msg">
        <div class="inbox_people">
          <div class="headind_srch">
            <div class="recent_heading">
              <h4>Recent</h4>
            </div>
            <div class="srch_bar">
              <div class="stylish-input-group">
                <input type="text" class="search-bar" placeholder="Search" />
                <span class="input-group-addon">
                  <button type="button">
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div class="inbox_chat">
            <!-- contacts -->
            <div
                v-for="(contact, index) in contacts"
                :key="contact.id"
                @click="selectContact(index, contact)"
                :class="{'active_chat': index == selectedIndex}"
                class="chat_list"
            >
              <div class="chat_people">
                <div class="chat_img">
                  <v-avatar><img :src="`${storage}/${contact.avatar}`" alt="sunil" /></v-avatar>
                </div>
                <div class="chat_ib">
                  <h5>
                    {{ `${contact.prenom} ${contact.nom}` }}
                  </h5>
                  <p>
                    online
                  </p>
                </div>
              </div>
            </div>
            <!-- end contacts -->
          </div>
        </div>
        <div class="mesgs">
          <div ref="msgs" class="msg_history">
            <!-- MESSAGES -->
            <div v-if="selectedContact">
                <div
                    v-for="message in messages"
                    :key="message.id" 
                    :class="(message.to == selectedContact.id)?'outgoing_msg':'received_msg'"
                >
                    <div :class="(message.to == selectedContact.id)?'sent_msg':'received_withd_msg'">
                    <p v-if="message.type == 'text'">
                        {{ message.text }}
                    </p>
                    <v-chip
                      v-if="message.type=='file'"
                      link
                      :href="`${storage}/${message.text}`"
                      :color="(message.to == selectedContact.id)?'primary':''"
                    >
                      attachment
                    </v-chip>
                    <span class="time_date mb-3">{{ message.created_at }}</span>
                    </div>
                </div>
            </div>
          </div>
          <div class="type_msg">
            <div class="input_msg_write">
              <v-text-field @keydown.enter="send" placeholder="Message..." v-model="message" class="write_msg"></v-text-field>
              <button class="msg_send_btn" type="button">
                <v-icon
                    color="#fff"
                    small
                >send</v-icon>
              </button>
              <v-chip
                link
                class="attachment_btn"
                color="transparent"
                data-toggle="modal"
                data-target="#attachmentModal"
              >
                <v-icon>attach_file</v-icon>
              </v-chip>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="attachmentModal" ref="attachmentModal" tabindex="-1" role="dialog" aria-labelledby="attachmentModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
              <v-file-input
                @change="uploadAtt"
                hide-input
                :clearable="false"
              ></v-file-input>
              <v-btn @click="sendAtt" block>upload</v-btn>
              <p color="green" v-if="uploaded">uploaded !!</p>
        </div>
        <div class="modal-footer">
          <v-btn depressed data-dismiss="modal">Close</v-btn>
          <v-btn depressed color="primary" data-dismiss="modal" @click="send">Send</v-btn>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
// import { Echo, Pusher } from 'laravel-echo';
import { mapGetters } from 'vuex';
import io from 'socket.io-client';

export default {
    data() {
        return {
            selectedContact: null,
            messages: [],
            contacts: [],
            storage: `${process.env.VUE_APP_API_LINK}storage`,
            message: '',
            attachment: null,
            selectedIndex: 0,
            socket: {},
            uploaded: false
        }
    },
    created () {
      this.socket = io();
      axios.get('/contacts')
              .then(res => {
                  this.contacts = res.data;
              });
    },
    mounted () {
      this.socket.emit('join',this.user.id);
      this.socket.on('message', data=>{
        if (data.to == this.user.id) {
          this.messages.push(data);
        }
      })
    },
    computed: {
        ...mapGetters({
            user: 'auth/user'
        })
    },
    methods: {
        send() {

            if (this.message == '' || !this.selectedContact) {
                return;
            }
            
            axios.post('/conversation/send',{
                contact_id: this.selectedContact.id,
                text: this.message,
                type: this.attachment?'file':'text'
            }).then(res=>{
                this.socket.emit('message', {id: this.selectedContact.id, message: this.message, type: res.data.type, created_at: res.data.created_at});
                this.message = '';
                this.messages.push(res.data);
                this.attachment = null;
                this.$refs.msgs.scrollTop = this.$refs.msgs.scrollHeight; 
                this.uploaded = false;
            })

            
        },
        selectContact(i, c){
            this.selectedIndex = i;
            axios.get(`/conversation/${c.id}`)
                    .then(res=>{
                        this.messages = res.data;
                        this.selectedContact = c;
                        this.$refs.msgs.scrollTop = this.$refs.msgs.scrollHeight; 
                    })
                    .catch(err=>{
                      console.log(err.response.data);
                    })
        },
        uploadAtt (file) {
          // this.$refs.attachmentModal.modal('show');
          console.log(file);
          this.attachment = file;
        },
        sendAtt () {
          let bodyFormData = new FormData();
          bodyFormData.append('file',this.attachment);
          axios.post('conversation/sendAttachment', bodyFormData)
                .then(res=>{
                  this.message = res.data;
                  this.uploaded = true;
                })
        }
    },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1170px;
  margin: auto;
}
img {
  max-width: 100%;
}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%;
  border-right: 1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.top_spac {
  margin: 20px 0 0;
}

.recent_heading {
  float: left;
  width: 40%;
}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%;
}
.headind_srch {
  padding: 10px 29px 10px 20px;
  overflow: hidden;
  border-bottom: 1px solid #c4c4c4;
}

.recent_heading h4 {
  color: #7d3cff;
  font-size: 21px;
  margin: auto;
}
.srch_bar input {
  border: 1px solid #cdcdcd;
  border-width: 0 0 1px 0;
  width: 80%;
  padding: 2px 0 4px 6px;
  background: none;
}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon {
  margin: 0 0 0 -27px;
}

.chat_ib h5 {
  font-size: 15px;
  color: #464646;
  margin: 0 0 8px 0;
}
.chat_ib h5 span {
  font-size: 13px;
  float: right;
}
.chat_ib p {
  font-size: 14px;
  color: #989898;
  margin: auto;
}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people {
  overflow: hidden;
  clear: both;
}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
  cursor: pointer;
}
.inbox_chat {
  height: 550px;
  overflow-y: scroll;
}

.active_chat {
  background: #ebebeb;
}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
}
.received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg {
  width: 57%;
}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

.sent_msg p {
  background: #7d3cff none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0;
  color: #fff;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.outgoing_msg {
  overflow: hidden;
}
.sent_msg {
  float: right;
  width: 46%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {
  border-top: 1px solid #c4c4c4;
  position: relative;
}
.msg_send_btn {
  background: #7d3cff none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
  z-index: 2;
}
.attachment_btn{
  position: absolute;
  right: 40px;
  top: 11px;
  width: 33px;
  padding: 0;
  margin: 0;
  color: red;
}
.messaging {
  padding: 0 0 50px 0;
}
.msg_history {
  height: 516px;
  overflow-y: auto;
}
</style>