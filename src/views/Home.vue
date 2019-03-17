<template>
  <div class="home">
    <!--
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
-->

    <button id="editButton" @click="toggleEditing"
            @mouseover="buttonHovering=true"
            @mouseout="buttonHovering=false">Toggle Editing
    </button>
    <button id="completedButton" @click="toggleCompleted"
            @mouseover="buttonHovering=true"
            @mouseout="buttonHovering=false">Toggle Completed
    </button>

    <Group v-for="group in computedGroups"
           :key="`${group.key}`"
           :group="group"
           :editMode="editMode"
           :showCompleted="$store.state.group.showCompleted"
           @deleteGroup="deleteGroup($event)"/>

    <button v-show="!showForm&&editMode"
            @click="showForm=!showForm"
            @mouseover="buttonHovering=true"
            @mouseout="buttonHovering=false">
      Add New Group
    </button>

    <div v-show="showForm" id="item-form">
      <input type="text" v-model="groupName" placeholder="Group Name" required>
      <button @click="addNewGroup">
        Save
      </button>
      <button @click.prevent="resetForm">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
  import Group from '@/components/Group.vue'

  export default {
    name: 'home',
    components: {
      Group
    },
    data() {
      return {
        groupName: '',
        showForm: false,
        editMode: false,
        buttonHovering: false,
      }
    },
    computed: {
      computedGroups() {
        return this.$store.state.group.groups
      },
    },
    methods: {
      addNewGroup: function () {
        var name = this.groupName;
        if (name == '') {
          console.log("Nećeš razbojniće!");
        } else {
          this.$http.post(
            'https://oblivioncompletionlist.firebaseio.com/groups.json',
            {groupName: name}
          ).then(
            response => {
              var message = "Postanje uspješno, server javlja: "
                + response.statusText;
              console.log(message);
              this.groups.push({
                groupName: name,
                id: response.body.name
              });
            }, response => {
              var message = "Postanje neuspješno, server javlja: "
                + response.statusText;
              console.log(message);
            }
          );
          this.resetForm();
        }
        ;
      },
      resetForm: function () {
        this.showForm = false;
        this.groupName = '';
      },
      deleteGroup: function (group) {
        this.$http.delete(
          'https://oblivioncompletionlist.firebaseio.com/groups/'
          + group.id
          + '.json'
        ).then(
          response => {
            var message = "Brisanje uspješno, server javlja: "
              + response.statusText;
            console.log(message);
            for (var i = 0; i < this.groups.length; i++) {
              if (this.groups[i].id == group.id) {
                this.groups.splice(i, 1);
              }
              ;
            }
            ;
          },
          response => {
            var message = "Brisanje neuspješno, server javlja: "
              + response.statusText;
            console.log(message);
          }
        );
      },
      toggleEditing: function () {
        this.resetForm();
        this.editMode = !this.editMode;
        this.$redrawVueMasonry();
      },
      toggleCompleted: function () {
        this.$store.commit('toggleShowCompleted')
        // this.showCompleted = !this.showCompleted;
        this.$redrawVueMasonry();
      }
    },
    async created() {
      console.log('učitavanje grupa')
      await this.$store.dispatch('loadData')
      console.log('učitavanje gotovo')
    },
    updated() {
      if (typeof this.$redrawVueMasonry === 'function') {
        this.$redrawVueMasonry()
      }
    }
  }
</script>

<style scoped>
  #home {
    display: block;
    background: #FAEBD7 url(//en.uesp.net/w/extensions/UespCustomCode/files/Parchment_bg.jpg) 0 0 repeat;
  }

  input {
    display: block;
    margin: 10px auto;
  }

  button {
    margin: 10px 10px;
    font-family: 'Kingthings Petrock', 'Felipa', Arial, sans-serif;
    color: #4e2c10;
    outline: none;
    padding: 0;
    height: 19px;
    width: 95px;
    border: none;
    background: url(../assets/button.png);
  }

  button:hover {
    background: url(../assets/button_hover.png);
  }

  #editButton {
    display: block;
    position: sticky;
    top: 10px;
    margin: 0 0 0px auto;
    z-index: 1000;
  }

  #completedButton {
    display: block;
    position: sticky;
    top: 40px;
    margin: 0 0 0 auto;
    z-index: 1000;
  }
</style>
