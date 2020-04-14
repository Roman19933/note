<template>
  <div class="edit">
    <div class="edit__btn">
      <BaseButton
        classBtn="home__top-btn"
        value="Удалить заметку"
        bg="red"
        @defaultClick="openModal(`Вы действительно хотите удалить задачу ${getNoteToId.name} ?`,deleteNoteItem,getNoteToId.id)"
      />
      <BaseButton
        classBtn="home__top-btn"
        value="Отменить редактирование"
        @defaultClick="openModal(`Вы действительно хотите отменить редактирование ?`,cancelEdit)"
        bg="green"
      />
      <BaseButton
        classBtn="home__top-btn"
        value="Сохранить изменения"
        @defaultClick="saveNoteToId"
      />
      <BaseButton
        classBtn="home__top-btn"
        value="Отменить внесенное изменение"
        bg="#4ebaba"
        @defaultClick="undo()"
      />
      <BaseButton
        :disabled="!this.cancelData.length"
        classBtn="home__top-btn"
        value="Повторить отмененное изменение"
        bg="#7c60d5"
        @defaultClick="redo()"
      />
    </div>
    <div class="edit__note">
      <NoteItemEdit :noteItem="getNoteToId" @addTask="addTask" @deleteTask="deleteTask" />
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins/default";
import BaseButton from "@/components/BaseButton";
import NoteItemEdit from "@/components/NoteItemEdit";
import shortId from "short-id";
export default {
  data() {
    return {
      cancelData: []
    };
  },
  components: {
    BaseButton,
    NoteItemEdit
  },
  mixins: [mixins],
  methods: {
    //Сохранение заметки
    saveNoteToId: function() {
      this.addConectionLowDb()
        .get("items")
        .find({ id: this.getNoteToId.id })
        .assign({
          tasks: this.getNoteToId.tasks,
          color: this.getNoteToId.color,
          name: this.getNoteToId.name
        })
        .write();
      this.cancelEdit();
    },
    //Удаление таска
    deleteTask: function(val) {
      return this.getNoteToId.tasks.splice(val, 1);
    },
    //Добавление таска
    addTask: function() {
      this.getNoteToId.tasks.push({
        id: shortId.generate(),
        taskName: "",
        completed: false,
        edit: false
      });
    },
    //Отмена редактирования
    cancelEdit: function() {
      this.$router.push("/");
    },
    //Отмена изменений
    undo: function() {
      this.cancelData.push(this.getNoteToId);
      this.getNoteToIdFn(this.$route.params.id);
    },
    //Повтор отмененных изменений
    redo: function() {
      if (this.cancelData.length) {
        this.getNoteToId = this.cancelData.pop();
      }
    }
  },
  mounted() {
    this.getNoteToIdFn(this.$route.params.id);
  }
};
</script>

<style lang="scss" >
</style>