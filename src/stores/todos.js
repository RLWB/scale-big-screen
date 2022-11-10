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
  getters: {
    showLists: (state) => (val) => {
      if (val == "all") {
        return state.lists;
      } else if (val == "finished") {
        return state.lists.filter((item) => item.checked);
      } else {
        return state.lists.filter((item) => !item.checked);
      }
    },
  },
  actions: {
    handleAdd(inpt) {
      if (!inpt.trim()) return;
      this.lists.unshift({
        id: new Date().getTime(),
        val: inpt,
        checked: false,
      });
    },
    handleStatus(id) {
      const i = this.lists.findIndex((item) => item.id === id);
      // lists.splice(index, 1);
      this.lists[i].checked = !this.lists[i].checked;
    },
    handleDel(id) {
      const i = this.lists.findIndex((item) => item.id === id);
      this.lists.splice(i, 1);
    },
  },
  persist: true,
});
