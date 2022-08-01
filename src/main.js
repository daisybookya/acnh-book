import { createApp } from "vue";
import 'vuestic-ui/css'
import App from "./App.vue";
import router from "./router";
import { createVuestic } from 'vuestic-ui'

import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.use(createVuestic())
app.mount("#app");
