<template>
  <tr class="description">
    <table class="description__table">
      <thead class="description__table-head">
        <tr>
          <th class="w-1/5">albumId</th>
          <th class="w-1/5">id</th>
          <th class="w-1/5">title</th>
          <th class="w-1/5">url</th>
          <th class="w-1/5">thumbnailUrl</th>
        </tr>
        <tr v-for="photo of photos" :key="photo.id" class="">
          <td class="description__table-cell">{{ photo.albumId }}</td>
          <td class="description__table-cell ">{{ photo.id }}</td>
          <td class="description__table-cell ">{{ photo.title }}</td>
          <td class="description__table-cell ">{{ photo.url }}</td>
          <td class="description__table-cell ">
            {{ photo.thumbnailUrl }}
          </td>
        </tr>
      </thead>
    </table>
  </tr>
</template>

<script>
import { fetchPhotos } from "../api";

export default {
  data() {
    return {
      photos: [],
    };
  },
  mounted() {
    fetchPhotos(this.albumId).then((json) => {
      this.photos = json;
    });
  },
  props: {
    albumId: Number,
  },
};
</script>

<style lang="scss" scoped>
.description {
  display: flex;
  &__table {
    width: 100%;
    &-head {
      width: 100%;
    }
    &-row {
      display: flex;
    }
    &-cell {
      text-align: center;
    }
  }
}
</style>
