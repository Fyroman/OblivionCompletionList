<template>
  <div>

    <div class="menu">

      <button
        id="editButton"
        @click="toggleEditing"
        :disabled="disableButtons"
      >
        Toggle Editing
      </button>

      <button
        id="completedButton"
        @click="toggleCompleted"
        :disabled="disableButtons"
      >
        Toggle Completed
      </button>

    </div>

    <Group v-for="group in computedGroups"
           :key="`${group.key}`"
           :group="group"
           :editMode="editMode"
           @deleteGroup="deleteGroup($event)"/>

    <button v-show="!showForm&&editMode"
            @click="showForm=!showForm">
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
        disableButtons: false,
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
        this.resetForm()
        this.disableButtons = true
        this.editMode = !this.editMode
        this.$nextTick(() => {
          this.$redrawVueMasonry()
          setTimeout(() => {
            this.disableButtons = false
          }, 1000)
        })
      },
      toggleCompleted: function () {
        this.disableButtons = true
        this.$store.commit('toggleShowCompleted')
        this.$nextTick(() => {
          this.$redrawVueMasonry()
          setTimeout(() => {
            this.disableButtons = false
          }, 1000)
        })
      }
    },
    async created() {
      await this.$store.dispatch('loadData')
      // await this.$store.dispatch('loadData')
      this.$store.dispatch('setToast', {text: 'Data Loaded'})
    },
  }
</script>

<style scoped>

  input {
    display: block;
    margin: 10px auto;
  }

</style>
