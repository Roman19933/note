<template>
  <div class="home">
    <div class="home__top">
      <div class="form-group">
        <input type="text" v-model="noteName" placeholder="Введите названия заметки" />
      </div>
      <BaseButton
        @defaultClick="addNoteItem"
        value="Добавить заметку"
        classBtn="home__top-btn"
        :disabled="this.noteName == ''"
      ></BaseButton>
    </div>
    <div class="home__bottom">
      <NoteItem
        v-for="(item,index) in noteList"
        :key="index"
        :noteItem="item"
        @deleteNoteItem="openModal(`Вы действительно хотите удалить заметку ${item.name} ?`,deleteNoteItem,item.id)"
        disabled
      />
    </div>
  </div>
</template>

<script>
import NoteItem from "@/components/NoteItem";
import BaseButton from "@/components/BaseButton";
import mixins from "@/mixins/default";
import shortId from "short-id";
export default {
  data() {
    return {
      noteName: ""
    };
  },
  mixins: [mixins],
  methods: {
    getRandomColor() {
      let letters = "0123456789";
      let color = "";
      for (var i = 0; i < 9; i++) {
        color += letters[Math.floor(Math.random() * 5)];
      }
      let background =
        color.slice(0, 3) + "," + color.slice(3, 6) + "," + color.slice(6, 9);
      return background;
    },
    //Добавление заметки в LocalStorage и вывод на страницу
    addNoteItem: function() {
      this.addConectionLowDb()
        .get("items")
        .push({
          id: shortId.generate(),
          name: this.noteName,
          edit: false,
          color: this.getRandomColor(),
          tasks: []
        })
        .write();
      this.noteName = "";
      this.render();
    }
  },
  mounted() {
    this.render();
  },
  components: {
    NoteItem,
    BaseButton
  }
};
</script>

<style lang="scss" scoped>
</style>