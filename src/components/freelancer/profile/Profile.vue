<template>
  <div class="user-pg">
    <div class="container">
      <div class="row">
        <div class="col-12" id="user-header">
          <div class="row">
            <div class="col-3 text-center">
              <div id="profile-img">
                <v-avatar
                  size="200"
                >
                  <img
                    :src="avatar + '/' + freelancer.avatar"
                    alt=""
                    srcset=""
                  />
                </v-avatar>
              </div>
              <div id="username">
                <p>{{ freelancer.username }}</p>
              </div>
              <div id="since">
                  <p>Member since {{freelancer.member_since}}</p>
              </div>
            </div>
            <div class="col-6">
              <div class="freelancer-ttl">
                <p>{{ freelancer.title }}</p>
              </div>
              <div id="hourly-rate">
                <v-icon dense>receipt</v-icon>
                {{ freelancer.hourlyrate }} DH / hr
              </div>
              <div class="freelancer-desc">
                {{ freelancer.bio }}
              </div>
            </div>
            <div class="col-3">
              <div class="row">
                <div class="col-6 stats prjts-crs">
                  <p>{{ freelancer.projets_en_cours }}</p>
                  Projets en<br />
                  cours
                </div>
                <div class="col-6 stats revs">
                  <p>{{ freelancer.nb_reviews }}</p>
                  Reviews
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
          <div class="col-8 lft-container">
              <div class="reviews">
                    <p class="ttl">Clients Reviews</p>
                <v-divider></v-divider>
                <div>
                    <v-card
                      v-for="rev in freelancer.reviews"
                      :key="rev.id"
                      flat
                    >
                    <v-card-title>
                      <v-avatar>
                        <img :src="`${avatar}/${rev.avatar}`">
                      </v-avatar>
                      {{ rev.client_prenom }}
                      {{ rev.client_nom }}
                    </v-card-title>
                    <v-card-text>
                      {{ rev.review }}

                    </v-card-text>
                    </v-card>
                </div>
                <div class="row" v-if="$props.isNotMe">
                  <v-text-field
                    placeholder="Add review"
                    class="col-10"
                    @keypress.enter="addReview"
                    v-model="review.text"
                  >
                  </v-text-field>
                </div>
              </div>
              <div class="experience mt-5">
                <p class="ttl">Experience</p>
                <v-divider></v-divider>
                <v-card
                    flat
                    v-for="exp in freelancer.experience"
                    :key="exp.id"
                    :color="exp.id%2==0?'#f7f8fb':'#ffffff'"
                >
                    <v-card-title>
                        {{exp.titre}}
                    </v-card-title>
                    <v-card-subtitle>
                        {{exp.date_from}} - {{exp.date_to}}
                    </v-card-subtitle>
                    <v-card-text>
                        {{exp.description}}
                    </v-card-text>
                </v-card>
              </div>
          </div>
          <div class="col-4 rght-container">
              <div class="skills">
                <p>Skills</p>
                <v-divider></v-divider>
                <v-chip-group column>
                    <v-chip
                      class="ma-2"
                      v-for="skill in freelancer.skills"
                      :key="skill.id"
                  >
                      {{skill.skill_name}}
                  </v-chip>
                </v-chip-group>
                
              </div>
              <div class="certifications mt-4">
                <p>Certifications</p>
                <v-divider></v-divider>
                <v-card
                  v-for="cert in freelancer.certifications"
                  :key="cert.id"
                  outlined
                >
                  <v-card-title>{{cert.nom}}</v-card-title>
                  <v-card-subtitle>
                    <v-icon size="15">date_range</v-icon>
                    {{cert.date}}
                    <v-icon size="15">card_travel</v-icon> 
                    {{cert.provider}}
                  </v-card-subtitle>
                </v-card>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      freelancer: Object,
      avatar: `${process.env.VUE_APP_API_LINK}storage`,
      review: {
        text: ''
      }
    };
  },
  props: {
    freelancerID: {
      type: Number,
    },
    isNotMe: {
      type: Boolean,
      default: false
    }
  },
  created() {
    console.log(this.$props.freelancerID);
    
    axios.get(`freelancer/${this.$props.freelancerID}/profile`).then((res) => {
      this.freelancer = res.data;
    });
  },
  methods: {
    addReview() {
      axios.post(`freelancer/${this.$props.freelancerID}/profile/review`, this.review)
            .then(res=>console.log(res.data))
    }
  },
};
</script>

<style lang="scss" scoped>
.user-pg {
  background-color: #f7f8fb;
}

#user-header {
  background-color: #fff;
  border-radius: 4px;
  #username {
    font-weight: 500;
    font-size: 20px;
    margin-top: 10px;
  }
  #since{
      font-weight: 300;
  }
  .freelancer-ttl {
    p {
      font-weight: 700;
      font-size: 30px;
      margin-bottom: 0;
    }
  }
  .freelancer-desc {
    margin-top: 10px;
    font-weight: 300;
  }
}
.stats {
  text-align: center;
  font-weight: 300;
  p {
    font-weight: 700;
    font-size: 25px;
    margin-bottom: 0;
  }
}
.prjts-crs {
  background-color: #f7f8fb;
  p {
    color: #ec615b;
  }
}
.revs{
  p{
    color: blueviolet;
  }
}
.lft-container{
    padding-left: 0;
    .reviews{
        background-color: #fff;
        border-radius: 4px;
        padding: 10px;
    }
    .experience{
        background-color: #fff;
        border-radius: 4px;
        padding: 10px;
    }
    .ttl{
        font-weight: 500;
        font-size: large;
        margin-bottom: 5px;
    }
}

.rght-container{
    padding-right: 0;
    .skills{
        background-color: #fff;
        border-radius: 4px;
        padding: 10px;
        p{
            font-weight: 500;
            font-size: large;
            margin-bottom: 5px;
        }
    }
    .certifications{
      background-color: #fff;
      border-radius: 4px;
      padding: 10px;
      p{
          font-weight: 500;
          font-size: large;
          margin-bottom: 5px;
      }
    }
}
</style>
