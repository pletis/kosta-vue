<template>
  <section>
    <ul>
      <li
        v-for="(todoItem, index) in propsdata"
        class="shadow"
        v-bind:key="todoItem.todo_num"
      >
        <span v-bind:class="{ textCompleted: todoItem.completed }">
          {{ todoItem.todo_description }}</span
        >

        <span class="removeBtn">
          <ion-icon
            @click="openModal(todoItem)"
            id="todo-gear"
            name="settings-outline"
          ></ion-icon>
          <i
            class="icon ion-md-trash"
            v-on:click="removeTodo(todoItem, index)"
            id="todo-trash"
          ></i>
        </span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: ["propsdata"],
  methods: {
    removeTodo: function (todoItem, index) {
      this.$emit("removeItem", todoItem, index);
    },
    toggleComplete: function (todoItem, index) {
      this.$emit("toggleItem", todoItem, index);
    },
    openModal: function (todoItem) {
      this.$emit("openModal", todoItem);
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}

#todo-trash {
  color: #de4343;
}

#todo-gear {
  color: #364f6b;
  text-decoration: none;
  cursor: pointer;
}
</style>
