<template>
  <transition name="fade">
    <div class="notes" :style="addBackgroundColor(this.noteItem.color,.5)">
      <img src="@/assets/img/sk2.png" class="notes__img" />
      <div class="notes__home">
        <div class="notes__btn">
          <router-link tag="a" :to="{path: '/edit/' + noteItem.id}" class="notes__edit">
            <svg class="icon-svg">
              <use xlink:href="@/assets/img/sprite.svg#edit" />
            </svg>
          </router-link>
          <BaseButton @defaultClick="deleteNoteItem" bg="transparent">
            <svg class="icon-svg">
              <use xlink:href="@/assets/img/sprite.svg#delete" />
            </svg>
          </BaseButton>
        </div>
        <h5 class="notes__title">{{noteItem.name}}</h5>
        <vuescroll>
          <div class="notes__tasks">
            <div class="task" v-for="(task,index) in noteItem.tasks" :key="index">
              <label class="task__label" :class="{'completed':task.completed}">
                <input
                  type="checkbox"
                  class="task__input"
                  v-model="task.completed"
                  :disabled="disabled"
                />
                <span class="task__custom"></span>
                <span class="task__text">{{task.taskName}}</span>
              </label>
            </div>
          </div>
        </vuescroll>
      </div>
    </div>
  </transition>
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
  methods: {
    //Удаление заметки
    deleteNoteItem: function() {
      this.$emit("deleteNoteItem");
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>