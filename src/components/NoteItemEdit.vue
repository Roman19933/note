<template>
  <div class="notes" :style="addBackgroundColor(this.noteItem.color,.5)">
    <img src="@/assets/img/sk2.png" class="notes__img" />
    <div class="notes__edit">
      <div class="notes__edit-title">
        <h5 class="notes__title" v-if="!noteItem.edit">{{noteItem.name}}</h5>
        <div class="form-group" v-else>
          <input type="text" class="notes__title notes__title_input" v-model="noteItem.name" />
        </div>
        <BaseButton bg="transparent" @defaultClick="editTask(noteItem)" v-if="!noteItem.edit">
          <svg class="icon-svg">
            <use xlink:href="@/assets/img/sprite.svg#edit" />
          </svg>
        </BaseButton>
        <BaseButton
          bg="transparent"
          :disabled="noteItem.name == ''"
          @defaultClick="editTask(noteItem)"
          v-else
        >
          <svg class="icon-svg">
            <use xlink:href="@/assets/img/sprite.svg#save-ok" />
          </svg>
        </BaseButton>
      </div>
      <div class="notes__wrapper">
        <vuescroll>
          <div class="notes__tasks">
            <div class="task" v-for="(task,index) in noteItem.tasks" :key="index">
              <label class="task__label" :class="{'completed':task.completed}">
                <input type="checkbox" class="task__input" v-model="task.completed" />
                <span class="task__custom"></span>
                <div class="form-group form-group_edit" v-if="task.edit">
                  <input type="text" class="task__text" v-model="task.taskName" />
                </div>
                <span class="task__text" v-else>{{task.taskName}}</span>
              </label>
              <BaseButton bg="transparent" @defaultClick="editTask(task)" v-if="!task.edit">
                <svg class="icon-svg">
                  <use xlink:href="@/assets/img/sprite.svg#edit" />
                </svg>
              </BaseButton>
              <BaseButton
                bg="transparent"
                :disabled="task.taskName == ''"
                @defaultClick="editTask(task)"
                v-else
              >
                <svg class="icon-svg">
                  <use xlink:href="@/assets/img/sprite.svg#save-ok" />
                </svg>
              </BaseButton>
              <BaseButton bg="transparent" @defaultClick="deleteTask(index)">
                <svg class="icon-svg">
                  <use xlink:href="@/assets/img/sprite.svg#del" />
                </svg>
              </BaseButton>
            </div>
          </div>
        </vuescroll>

        <BaseButton bg="transparent" @defaultClick="addTask">
          <svg class="icon-svg add">
            <use xlink:href="@/assets/img/sprite.svg#add" />
          </svg>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/BaseButton";
import mixins from "@/mixins/default";
export default {
  components: {
    BaseButton
  },
  mixins: [mixins],
  props: {
    noteItem: {
      type: Object,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.getNoteToIdFn(this.$route.params.id);
  },
  methods: {
    //Добавление таска
    addTask: function() {
      this.$emit("addTask");
    },
    //Удаление таска
    deleteTask: function(index) {
      this.$emit("deleteTask", index);
    },
    //Редактирование таска
    editTask: function(task) {
      task.edit = !task.edit;
    }
  }
};
</script>

<style lang="scss" scoped>
.notes {
  &__tasks {
    width: 95%;
  }
}
</style>