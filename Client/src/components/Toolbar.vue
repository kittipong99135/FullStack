<template lang="">
    <div class = "d-flex align-item-center justify-content-center">
        <v-app-bar
            app
            color="dark"
            dark
        >
        <div class="d-flex align-center">
            <v-img
                alt="Vuetify Logo"
                class="shrink mr-2"
                contain
                src="../assets/OO Gumdam.png"
                transition="scale-transition"
                width="60"
            />
            <h1 class="mt-2">ArcAngle</h1>
        </div>
        <v-spacer></v-spacer>
        <router-link class="btn btn-outline-light btn-sm" to="/cart">
          <b-icon icon="cart3"></b-icon>    
        </router-link>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="">
    
</style>