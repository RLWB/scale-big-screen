<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTodosStore } from "@/stores/todos";
import { storeToRefs } from "pinia";
const currentTab = ref("");
const inpt = ref("");
const route = useRoute();
const router = useRouter();
const store = useTodosStore();
const { lists } = storeToRefs(store);
const showLists = ref([]);
const tabs = reactive([
  {
    id: 0,
    name: "全部",
    label: "all",
  },
  {
    id: 1,
    name: "完成",
    label: "finished",
  },
  {
    id: 2,
    name: "未完成",
    label: "unfinished",
  },
]);
const handleAdd = () => {
  if (!inpt.value.trim()) return;
  lists.value.push({
    id: new Date().getTime(),
    val: inpt.value,
    checked: false,
  });
  inpt.value = "";
};
const handleStatus = (id) => {
  const i = lists.value.findIndex((item) => item.id === id);
  // lists.splice(index, 1);
  lists.value[i].checked = !lists.value[i].checked;
};
const handleDel = (id) => {
  const i = lists.value.findIndex((item) => item.id === id);
  lists.value.splice(i, 1);
};
watchEffect(() => {
  currentTab.value = route.params.id || "all";
  // if (!route.params.id) {
  //   showLists.value = lists.value;
  // } else if (route.params.id == "finished") {
  //   showLists.value = lists.value.filter((item) => item.checked);
  // } else {
  //   showLists.value = lists.value.filter((item) => !item.checked);
  // }
});
watch(
  currentTab,
  (val) => {
    router.push({
      name: "home",
      params: {
        id: val === "all" ? "" : val,
      },
    });
    if (val == "all") {
      showLists.value = lists.value;
    } else if (val == "finished") {
      showLists.value = lists.value.filter((item) => item.checked);
    } else {
      showLists.value = lists.value.filter((item) => !item.checked);
    }
  },
  {
    immediate: true,
  }
);
</script>
<template>
  <div class="todos">
    <h3>ToDoList</h3>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-input
            class="inpt"
            v-model="inpt"
            placeholder="请输入内容"
          ></el-input>
          <el-button class="button" @click="handleAdd" text type="primary"
            >添加</el-button
          >
        </div>
      </template>
      <div class="tabs">
        <el-radio-group v-model="currentTab" size="large">
          <el-radio-button
            v-for="item in tabs"
            :key="item.id"
            :label="item.label"
            >{{ item.name }}</el-radio-button
          >
        </el-radio-group>
      </div>
      <ul class="lists" v-if="showLists.length > 0">
        <li class="item" v-for="item in showLists" :key="item.id">
          <p
            :class="item.checked ? 'checked' : ''"
            @click="handleStatus(item.id)"
          >
            {{ item.val }}
          </p>
          <el-button size="small" @click="handleDel(item.id)" type="primary"
            >删除</el-button
          >
        </li>
      </ul>
      <h3 class="no-more" v-else>暂无内容</h3>
    </el-card>
  </div>
</template>
<style scoped>
.todos {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.box-card {
  width: 320px;
}
:deep .el-card__header {
  padding-right: 0;
}
.card-header {
  display: flex;
}
.inpt {
  flex: 1;
}
.tabs {
  display: flex;
  justify-content: center;
}
.lists {
  display: flex;
  padding-left: 0;
  flex-direction: column;
}
.item {
  display: inline-flex;
  border-bottom: 1px solid #eee;
  align-items: center;
}
.item p {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.no-more {
  text-align: center;
}
.checked {
  text-decoration: line-through;
  color: #333;
}
</style>
