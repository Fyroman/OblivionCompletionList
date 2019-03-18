<template>
  <div class="category-box">
    <div id="title-box">
      <h2 class="title-ornaments">E </h2>
      <h2 id="category-title">{{ category.categoryName }}</h2>
      <h2 class="title-ornaments"> B</h2>
    </div>
    <Quest v-for="quest in computedQuests"
           :key="`${group.key}${category.key}${quest.key}`"
           :quest="quest"
           :category="category"
           :editMode="editMode"
           :group="group"
           @deleteQuest="deleteQuest($event)"/>
    <div v-show="editMode" id="edit-buttons">
      <img id="icon" v-show="showForm&&editMode" src="../assets/main_city_logo.png"/>
      <button class="category-buttons"
              v-show="!showForm&&editMode"
              @click="showForm=!showForm"
              @mouseover="buttonHovering=true"
              @mouseout="buttonHovering=false">
        Add New Quest
      </button>
      <button class="category-buttons"
              v-show="!showForm&&editMode"
              @click="deleteCategory"
              @mouseover="buttonHovering=true"
              @mouseout="buttonHovering=false">
        Delete Category
      </button>
      <div id="input-text">
        <button id="save" @click="addNewQuest"
                v-show="showForm&&editMode"
                @mouseover="buttonHovering=true"
                @mouseout="buttonHovering=false">
          Save
        </button>
        <input type="text"
               v-show="showForm&&editMode"
               v-model="questTitle"
               id="inputTitle"
               placeholder="Quest Title">
        <textarea v-model="questDescription"
                  v-show="showForm&&editMode"
                  id="inputDescription"
                  rows="2"
                  placeholder="Quest Description"></textarea>
      </div>
      <!--<button @click="resetForm" v-show="showForm&&editMode">Cancel</button>-->
    </div>
    <img id="footer" src="../assets/footer.png"/>
    <div v-show="showForm" id="item-form">
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase/app'
  import 'firebase/database'
  import Quest from '@/components/Quest.vue'

  export default {
    props: ['group', 'category', 'editMode'],
    components: {
      Quest
    },
    data() {
      return {
        questTitle: '',
        questDescription: '',
        showForm: false,
        buttonHovering: false
      }
    },
    computed: {
      computedQuests() {
        if (this.$store.state.group.showCompleted) {
          return this.category.quests
        } else {
          return this.category.quests.filter(q => !q.questCompleted)
        }
      }
    },
    methods: {
      async addNewQuest() {
        let {questTitle, questDescription} = this
        let quest = {
          questTitle,
          questDescription,
          questCompleted: false,
        }
        console.log(quest)
        let ref = `group/${this.group.key}/category/${this.category.key}/quest`
        try {
          let data = await firebase.database().ref(ref).push(quest)
          quest.key = data.key
          this.$store.dispatch('addQuest', {
            group: this.group.key,
            category: this.category.key,
            quest,
          })
          this.$store.dispatch('setToast', {text: 'Quest added'})
          this.$nextTick(() => {
            this.$redrawVueMasonry()
          })
        } catch (err) {
          console.log(err)
        }
        this.resetForm();
      },
      resetForm: function () {
        this.showForm = false;
        this.questTitle = '';
        this.questDescription = '';
      },
      deleteCategory: function () {
        this.$emit(
          'deleteCategory',
          {
            id: this.category.id,
            categoryName: this.category.categoryName
          }
        );
      }
    }
    ,
  }
</script>

<style scoped>
  .category-box {
    margin: 10px;
    vertical-align: top;
    text-align: left;
  }

  #category-title {
    display: inline-block;
    color: #34508e;
    margin: 15px;
    text-align: center;
    display: inline;
  }

  #footer {
    display: block;
    width: 452px;
    height: 34px;
  }

  input {
    font-family: 'Kingthings Petrock', 'Felipa', Arial, sans-serif;
    display: block;
    background: none;
    outline: none;
    border: none;
  }

  #icon {
    display: inline-block;
    width: 52px;
    height: 52px;
    left: 0;
    top: 0;
    margin: 4px 5px 0px 24px;
  }

  #title-box {
    background: url('../assets/header.png');
    box-sizing: border-box;
    width: 452px;
    height: 67px;
    text-align: center;
    vertical-align: top;
  }

  #inputTitle {
    display: block;
    font-size: 20px;
    color: #303261;
    font-weight: bold;
    width: 12em;
    padding: 0;
  }

  #input-text {
    display: inline-block;
    vertical-align: top;
    width: 335px;
  }

  #inputDescription {
    display: block;
    font-size: 16px;
    color: #783f25;
    width: 335px;
    font-family: 'Kingthings Petrock', 'Felipa', Arial, sans-serif;
    display: block;
    background: none;
    outline: none;
    border: none;
    padding: 0;
    resize: none;
  }

  button.category-buttons {
    display: inline-block;
    font-family: 'Kingthings Petrock', 'Felipa', Arial, sans-serif;
    color: #4e2c10;
    background: url(../assets/button.png);
    padding: 0;
    height: 19px;
    width: 95px;
    border: none;
    outline: none;
    margin: 25px 14%;
  }

  #edit-buttons {
    background: url('../assets/body.png');
    display: block;
    box-sizing: border-box;
    text-align: left;
    width: 452px;
    height: 63px;
  }

  #save {
    font-family: 'Kingthings Petrock', 'Felipa', Arial, sans-serif;
    color: #4e2c10;
    float: right;
    background: url(../assets/button.png);
    margin: 4px 0px 0 0;
    padding: 0;
    height: 19px;
    width: 95px;
    border: none;
    outline: none;
  }

  h2.title-ornaments {
    color: #34508e;
    display: inline-block;
    font-family: 'Ornaments';
    font-weight: normal;
    font-size: 50px;
    margin: 17px 0 0;
  }

  button:hover {
    background: url(../assets/button_hover.png);
  }
</style>
