<template>
  <td colspan="4">
    <tr class="table-row" :class="{ 'table-row_reject': isReject }">
      <td class="w-1/4 table-row__cell-btns">
        <button @click.prevent="isDetailsShown = !isDetailsShown">
          Описание
        </button>
        <button @click.prevent="isReject = !isReject" v-if="isDetailsShown">
          Отказ
        </button>
      </td>
      <td class="w-1/4 table-row__cell">{{ album.userId }}</td>
      <td class="w-1/4 table-row__cell">{{ album.id }}</td>
      <td class="w-1/4 table-row__cell">{{ album.title }}</td>
    </tr>

    <TableRowDescription v-if="isDetailsShown" :albumId="album.id" />
  </td>
</template>

<script>
import TableRowDescription from "./TableRowDescription.vue";

export default {
  data() {
    return {
      isDetailsShown: false,
      isReject: false,
      reject: "table-row_reject",
    };
  },
  props: {
    album: Object,
  },
  components: {
    TableRowDescription,
  },
};
</script>

<style lang="scss" scoped>
.table-row {
  &_reject {
    background-color: red;
  }
  display: flex;
  &__cell {
    display: flex;
    justify-content: center;
    &-btns {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
