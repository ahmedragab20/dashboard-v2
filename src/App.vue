<template>
  <div id="app">
    <!--    :style="`background-color: ${$vuetify.theme.dark ? '#000' : '#f1f1f1'}`"-->
    <router-view>
      <transition name="rout" mode="out-in">
        <component :is="selectedComponent"></component>
      </transition>
    </router-view>
  </div>
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
