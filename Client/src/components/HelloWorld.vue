<template>
  <v-container style="height: 100vh;">
    <v-row class="text-center ">
      <v-col cols="12">
        <v-img
          :src="require('../assets/OO Gumdam.png')"
          class="my-3"
          contain
          height="350"
        />
      </v-col>
      <v-col class="mb-6">
        <h1 class="display-2 font-weight-bold mb-3 text-primary">
          Product
        </h1>
        <div class="d-grid col-6 gap-2 mx-auto">
          <router-link 
            class="btn btn-outline-success btn-lg text-white" 
            to="/product">
              <b-icon icon="arrow-right-circle"></b-icon>
          </router-link>
        </div>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data: () => ({
    }),
  }
</script>