<template>
  <router-view v-slot="{ Component }">
    <transition name="rout" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script>
import { isAuth } from "@/composables/useAuth";

export default {
  name: "App",
  data() {
    return {
      selectedComponent: null,
    };
  },
  created() {
    const { loggedIn } = isAuth();

    // if (loggedIn) {
    //   router.push({ name: "dashboard" });
    // } else {
    //   router.push({ name: "login" });
    // }

    // const navigation_drawer__scrim = document.querySelectorAll(
    //   ".v-navigation-drawer__scrim"
    // );
    // navigation_drawer__scrim.forEach((element) => {
    //   // element.removeAttribute("style")
    //   element.style.inset = "0px";
    // });
  },
  watch: {
    $route(to, from) {
      this.selectedComponent = to.matched[0].components.default;
    },
  },
};
</script>

<style>

.rout-enter-from,
.rout-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.rout-enter-active,
.rout-leave-active {
  transition: all 0.3s ease-in-out;
}

.v-card {
  background: transparent;
}
</style>

