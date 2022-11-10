import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useTodosStore = defineStore({
  id: "todos",
  // () => {
  //   const lists = reactive([]);
  //   return { lists };
  // },
  // {
  //   persist: true,
  // }
  state: () => ({
    lists: [],
  }),
  actions: {},
  persist: true,
});
