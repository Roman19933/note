<template>
  <button :class="classBtn" @click="defaultClick" :style="addBackgroundColor(bg)">
    {{value}}
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    classBtn: {
      type: String,
      default: ""
    },
    bg: {
      type: String,
      default: "#448aff"
    }
  },
  methods: {
    defaultClick() {
      this.$emit("defaultClick");
    },
    addBackgroundColor: function(color) {
      return {
        background: `${color}`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>