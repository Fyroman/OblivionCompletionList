<template>
  <div class="group-container">

    <h1>{{ group.groupName }}</h1>

    <div
      class="category-grid"
      v-masonry
      itemSelector=".category-box"
      fit-width="true"
      stagger="30ms"
    >

      <Category v-for="category in computedCategories"
                :key="`${group.key}${category.key}`"
                :category="category"
                :editMode="editMode"
                :group="group"
                @deleteCategory="deleteCategory($event)"/>
    </div>
    <div>
      <button @mouseover="buttonHovering=true"
              @mouseout="buttonHovering=false"
              v-show="!showForm&&editMode"
              @click="showForm=!showForm">
        Add New Category
      </button>
      <button @mouseover="buttonHovering=true"
              @mouseout="buttonHovering=false"
              v-show="!showForm&&editMode"
              @click="deleteGroup">
        Delete Group
      </button>
    </div>
    <div v-show="showForm" id="item-form">
      <input type="text"
             v-model="categoryName"
             placeholder="Category Name">
      <button @click="addNewCategory"
              @mouseover="buttonHovering=true"
              @mouseout="buttonHovering=false">Save
      </button>
      <button @click="resetForm"
              @mouseover="buttonHovering=true"
              @mouseout="buttonHovering=false">Cancel
      </button>
    </div>
  </div>
</template>

<script>
  import Category from '@/components/Category.vue'

  export default {
    props: ['group', 'editMode'],
    components: {
      Category
    },
    data() {
      return {
        categoryName: '',
        showForm: false,
        buttonHovering: false
      }
    },
    computed: {
      computedCategories() {
        return this.group.categories
      },
    },
    methods: {
      addNewCategory: function () {
        var name = this.categoryName;
        var group = this.group.groupName;
        if (name == '') {
          console.log("Nećeš razbojniće!");
        } else {
          this.$http.post(
            'https://oblivioncompletionlist.firebaseio.com/categories/'
            + group
            + '/.json',
            {categoryName: name}
          ).then(
            response => {
              var message = "Postanje uspješno, server javlja: "
                + response.statusText;
              console.log(message);
              this.categories.push({
                categoryName: name,
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
        this.categoryName = '';
      },
      deleteGroup: function () {
        var message = "Počinje brisanje grupe \"" + this.group.groupName + "\"";
        console.log(message);
        for (var i = 0; i < this.categories.length; i++) {
          message = "Pozivam brisanje kategorije \"" + this.categories[i].categoryName + "\"";
          console.log(message);
          this.deleteCategory(this.categories[i]);
        }
        ;
        this.$emit(
          'deleteGroup',
          {
            id: this.group.id,
            name: this.group.groupName
          }
        );
      },
      deleteCategory: function (category) {
        var message = "Brišem questove u kategoriji \"" + category.categoryName + "\"";
        console.log(message);
        this.$http.delete(
          'https://oblivioncompletionlist.firebaseio.com/quests/'
          + this.group.groupName
          + '/'
          + category.categoryName
          + '.json'
        );
        message = "Brišem kategoriju \"" + category.categoryName + "\"";
        console.log(message);
        this.$http.delete(
          'https://oblivioncompletionlist.firebaseio.com/categories/'
          + this.group.groupName
          + '/'
          + category.id
          + '.json'
        ).then(
          response => {
            message = "Brisanje uspješno, server javlja: "
              + response.statusText;
            console.log(message);
            for (var i = 0; i < this.categories.length; i++) {
              if (this.categories[i].id == category.id) {
                this.categories.splice(i, 1);
              }
              ;
            }
            ;
          },
          response => {
            message = "Brisanje neuspješno, server javlja: "
              + response.statusText;
            console.log(message);
          }
        );
      }
    },
  }
</script>

<style scoped>

  #main {
    margin: 30px auto;
    display: block;
    text-align: center;
  }

  input {
    display: block;
    margin: 10px auto;
  }
</style>
