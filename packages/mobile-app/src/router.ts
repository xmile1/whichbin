import { createRouter, createWebHistory } from "vue-router";
import { trashIdentifierRoutes } from "@/modules/TrashIdentifier/routes";

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export const router = createRouter({
  history: createWebHistory(),
  routes: [...trashIdentifierRoutes], // short for `routes: routes`
});
