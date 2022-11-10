//index.js
import ScaleBigScreen from "./components/ScaleBigScreen.vue"; // 引入封装好的组件

export { ScaleBigScreen }; //实现按需引入*

const components = [ScaleBigScreen];
const install = function (App, options) {
  components.forEach((component) => {
    App.component(component.name, component);
  });
};
export default { install }; // 批量的引入*
