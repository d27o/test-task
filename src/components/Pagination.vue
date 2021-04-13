<template>
  <div class="pagination">
    <button
      @click.prevent="$emit('onChangePage', currentPage - 1)"
      :disabled="currentPage === 1"
    >
      prev
    </button>
    <button
      v-for="page of pageArray"
      :key="page"
      @click.prevent="$emit('onChangePage', page)"
      class="mx-1"
    >
      {{ page }}
    </button>
    <button
      @click.prevent="$emit('onChangePage', currentPage + 1)"
      :disabled="currentPage === pageCount"
    >
      next
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    pageCount: Number,
    currentPage: Number,
  },
  computed: {
    pageArray() {
      return new Array(this.pageCount)
        .fill(1)
        .map((element, index) => index + 1);
    },
  },
};
</script>

<style scoped></style>
