import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/villagers",
      name: "villagers",
      component: () => import("../views/VillagerView.vue"),
    },
    {
      path: "/houseware",
      name: "houseware",
      component: () => import("../views/FurnitureView.vue"),
    },
    {
      path: "/seacreatures",
      name: "seacreatures",
      component: () => import("../views/SeaView.vue"),
    },
    {
      path: "/fossils",
      name: "fossils",
      component: () => import("../views/FossilsView.vue"),
    },
    {
      path: "/bugs",
      name: "bugs",
      component: () => import("../views/BugsView.vue"),
    },
    {
      path: "/fish",
      name: "fish",
      component: () => import("../views/FishView.vue"),
    },
    {
      path: "/art",
      name: "art",
      component: () => import("../views/ArtView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});
export const menuLink = [

{
  path:'/villagers',
  label:'島民 Villagers',
  url: 'src/assets/villager.png',
  intro: '介紹動森會所有的島民，每個島民出現的時間都是隨機或是特定條件才會出現喔'
},
{
  path:'/houseware',
  label:'居家用品 Houseware',
  url: 'src/assets/furniture.webp',
  intro: '動森會豐富的居家用品可以佈置成各種風格～不同季節節日還會出現特別的傢俱喔'
},
{
  path:'/fossils',
  label:'化石 Fossils',
  url: 'src/assets/fossils.webp',
  intro: '遊戲內化石主要有捐贈和出售兩種作用。玩家可以根據自己的實際情況來處理自己挖到的化石。'
},
{
  path:'/bugs',
  label:'昆蟲 Bugs',
  url: 'src/assets/bug.png',
  intro: '玩家可以通過捕蟲網抓到各種各樣的昆蟲，這些昆蟲可以販賣，或者貢獻給博物館等等。'
},
{
  path:'/fish',
  label:'魚類 Fish',
  url: 'src/assets/fish.png',
  intro: '魚種有82款，多數魚種南北半球都有但出現時間不一樣。若要釣目標魚種或特殊魚種，請注意魚類出現地、魚影大小及出沒時間'
},
{
  path:'/seacreatures',
  label:'海洋生物 SeaCreatures',
  url: 'src/assets/sea.png',
  intro: '介紹動森會所有海洋生物的收錄，在海裡抓到的各種「海洋生物」都可以捐贈給博物館或是賣商店賺「鈴錢」喔'
},
{
  path:'/art',
  label:'藝術品 Art',
  url: 'src/assets/art.png',
  intro: '博物館的美術館館藏，總共有43件藝術品，但卻有29件假藝術品，分辨藝術品的真假，最快的方式，就是直接拿到博物館，跟NPC「傅達」對話'
},
{
  path:'/about',
  label:'關於圖鑑 About',
  url: 'src/assets/ch.webp',
  intro: '介紹本圖鑑的資料來源與使用的工具搭建說明'
},
{
  path:'/',
  label:'首頁 Index',
  url: 'src/assets/sea.jpg',
  intro: ''
},]
export default router;
