<template>
  <div>
    <!-- todo 모달 -->
    <div id="bg" v-if="isModal == true">
      <div class="contents">
        <div class="form-wrapper form-wrapper-sm">
          <form @submit.prevent="" class="form">
            <div>
              <label for="todo_description">변경할 내용:</label>
              <input
                id="todo_description"
                type="text"
                v-model="todo_description"
              />
            </div>

            <button class="my-btn" id="left-button" @click="resetModal">
              취소
            </button>
            <button type="submit" class="my-btn" @click="updateOneItem">
              수정완료
            </button>
          </form>
        </div>
      </div>
    </div>
    <header>
      <h1>오늘의 할일</h1>
    </header>
    <div class="inputBox shadow">
      <input type="text" v-on:keyup.enter="addTodo" v-model="newTodoItem" />
      <span class="addContainer" v-on:click="addTodo">
        <i class="ion-md-add"></i>
      </span>
    </div>
    <TodoBody
      v-bind:propsdata="todoItems"
      v-on:removeItem="removeOneItem"
      v-on:toggleItem="toggleOneItem"
      v-on:openModal="openModal"
    ></TodoBody>
    <div class="clearAllContainer">
      <span class="clearAllBtn" v-on:click="clearAllItems">Clear All</span>
    </div>
  </div>
</template>

<script>
import TodoBody from "@/components/TodoBody.vue";
import { createTodo, getTodoList, updateTodo, deleteTodo } from "../api/todo";

export default {
  data: function () {
    return {
      isModal: false,
      newTodoItem: "",
      todoItems: [],
      todo_description: "",
    };
  },
  components: {
    TodoBody,
  },
  methods: {
    async getTodoList() {
      const team_id = this.$route.params.teamId;
      const member_num = this.$store.state.member.member_num;
      const todos = await getTodoList(team_id, member_num);
      this.todoItems = todos.data;
      console.log(todos.data);
    },
    addTodo: async function () {
      if (this.newTodoItem !== "") {
        const team_id = this.$route.params.teamId;
        const member_num = this.$store.state.member.member_num;
        const todo = {
          todo_title: "할일",
          todo_description: this.newTodoItem,
          todo_endDate: "2022-08-01",
          member_num: member_num,
        };
        const { data } = await createTodo(team_id, todo);
        console.log(data);
        await this.getTodoList();
        this.clearInput();
      }
    },
    clearInput: function () {
      this.newTodoItem = "";
    },

    updateOneItem: async function () {
      const team_id = this.$route.params.teamId;
      const todo_num = this.todoItem.todo_num;
      const todo = {
        todo_num: todo_num,
        todo_title: "할일",
        todo_description: this.todo_description,
        todo_endDate: 2022 - 12 - 31,
      };
      const { data } = await updateTodo(team_id, todo_num, todo);
      console.log(data);
      await this.getTodoList();
      this.resetModal();
    },

    removeOneItem: async function (todoItem) {
      const team_id = this.$route.params.teamId;
      const todo_num = todoItem.todo_num;
      const { data } = await deleteTodo(team_id, todo_num);
      console.log(data);
      await this.getTodoList();
    },
    toggleOneItem: function (todoItem) {
      todoItem.completed = !todoItem.completed;
    },
    clearAllItems: function () {
      for (let i = 0; i < this.todoItems.length; i++) {
        this.removeOneItem(this.todoItems[i]);
      }
    },
    openModal: function (todoItem) {
      this.todoItem = todoItem;
      this.todo_description = todoItem.todo_description;
      this.isModal = true;
    },
    resetModal: function () {
      this.isModal = false;
    },
  },
  async created() {
    this.getTodoList();
  },
};
</script>

<style scoped>
/* 헤더 */
h1 {
  color: #2f3b52;
  font-weight: 900;
  margin: 2.5rem 0 1.5rem;
}
/* 인풋 */
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  width: 80%;
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  color: white;
  background: rgb(35, 127, 0);
  align-items: center;
  justify-content: center;
  display: inline-flex;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
.clearAllContainer {
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background-color: rgb(35, 127, 0);
  border-radius: 5px;
  margin: 0 auto;
  text-align: center;
}
.clearAllBtn {
  font-weight: 700;
  color: white;
  display: block;
}

.todo-modal {
  width: 400px;
  position: fixed;
  top: 200px;
  z-index: 1;
}

#todo_description {
  width: 100%;
}

#bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
</style>
