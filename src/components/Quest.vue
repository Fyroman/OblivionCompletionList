<template>
  <div @mouseover="hovering=true"
       @mouseout="hovering=false"
       id="list-item"
       :class="{completed: quest.questCompleted}">
    <img id="icon" src="../assets/main_city_logo.png"/>
    <div id="item-text">
      <button @click="toggleCompletion"
              v-show="hovering&&!editMode"
              @mouseover="buttonHovering=true"
              @mouseout="buttonHovering=false">
        Complete
      </button>
      <button v-show="editMode&&hovering"
              @click="deleteQuest"
              @mouseover="buttonHovering=true"
              @mouseout="buttonHovering=false">
        Delete Quest
      </button>
      <h3 id="quest-title">{{ quest.questTitle }}</h3>
      <p id="quest-description">{{ quest.questDescription }}</p>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase/app'
  import 'firebase/database'

  export default {
    props: ['group', 'quest', 'category', 'editMode'],
    data() {
      return {
        hovering: false,
        buttonHovering: false
      }
    },
    methods: {
      async deleteQuest() {
        let ref = `group/${this.group.key}/category/${this.category.key}/quest/${this.quest.key}`
        try {
          await firebase.database().ref(ref).remove()
          this.$store.dispatch('deleteQuest', {
            group: this.group.key,
            category: this.category.key,
            quest: this.quest.key
          })
          this.$store.dispatch('setToast', {text: 'Quest deleted'})
          this.$nextTick(() => {
            this.$redrawVueMasonry()
          })
        } catch (err) {
          console.log(err)
        }
      },
      async toggleCompletion() {
        let ref = `group/${this.group.key}/category/${this.category.key}/quest/${this.quest.key}`
        try {
          await firebase.database().ref(ref).update({questCompleted: !this.quest.questCompleted})
          this.$store.dispatch('toggleQuestCompletion', {
            group: this.group.key,
            category: this.category.key,
            quest: this.quest.key
          })
          this.$store.dispatch('setToast', {text: 'Quest completion updated'})
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
</script>

<style scoped>
  #list-item {
    background: url('../assets/body.png');
    display: block;
    box-sizing: border-box;
    width: 452px;
    height: 63px;
    vertical-align: top;
    text-align: left;
  }

  #list-item:hover {
    background: url('../assets/body_hover.png');
  }

  #icon {
    display: inline-block;
    width: 52px;
    height: 52px;
    left: 0;
    top: 0;
    margin: 4px 5px 0px 24px;
  }

  #item-text {
    display: inline-block;
    vertical-align: top;
    width: 335px;
  }

  #quest-title {
    display: block;
    text-align: left;
    font-size: 20px;
    color: #303261;
    margin: 0;
    width: auto;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .completed #quest-title {
    color: #999;
  }

  #quest-description {
    display: block;
    text-align: left;
    font-size: 16px;
    color: #783f25;
    margin: 0px;
    width: auto;
    max-height: 36px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    width: 422px;
  }

  .completed #quest-description {
    color: #999;
  }

  button {
    font-family: 'Kingthings Petrock', 'Felipa', Arial, sans-serif;
    color: #4e2c10;
    float: right;
    outline: none;
    background: url(../assets/button.png);
    margin: 4px 0px 0 0;
    padding: 0;
    height: 19px;
    width: 95px;
    border: none;
  }

  button:hover {
    background: url(../assets/button_hover.png);
  }
</style>
