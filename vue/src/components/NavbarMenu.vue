<template>
    <div>
    <v-app-bar color="white" flat app>
    <v-toolbar flat toll>
        <v-toolbar-title>
        <v-btn to="/" @click="reloadPage"
              color="deep-purple" 
              style="border:none"
              outlined ><v-icon>mdi-home</v-icon> Anasayfa</v-btn>
        <v-btn style="border:none" 
        outlined 
        text 
        color="deep-purple"
        to="/user/product">
            <v-icon>mdi-store</v-icon>
            <span>Ürünlerim</span>
        </v-btn>

        </v-toolbar-title>
        <v-spacer></v-spacer>

    <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
        <v-btn style="border:none"
        append-icon="mdi-arrow_drop_down"
        color="deep-purple"
        outlined
        text
        v-bind="attrs"
        v-on="on"
        >{{fullname}}<v-icon>mdi-arrow-down-drop-circle-outline</v-icon>
        </v-btn>
    </template>
    <v-list dark color="deep-purple">
        <v-list-item to="/profile">Profile</v-list-item>
        <v-list-item @click="Logout()">Logout</v-list-item>
    </v-list>
    </v-menu>
    <v-row v-if="data && showForms==11" >
      <v-col  v-for="(value, index) in data" 
      :key="index"
      :ref="`card_${index}`"
        cols="12"
        md="6"
      >
        <v-card
            elevation="9"
            outlined
            class="text-center" max-width="300" >
              <v-img
                :src="value._source.file"
                height="400"
                width="400"
                ></v-img>
                <h2 class="font-weight-bold text-center" style="color:#673AB7">{{value._source.title}}</h2>
                <v-card-subtitle color="deep-purple">{{value._source.description}}</v-card-subtitle>
                <v-card-subtitle>{{value._source.price}} TL</v-card-subtitle>
                <v-card-actions>
                <v-btn icon>
                <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
                </v-btn>
                </v-card-actions>
            </v-card>
      </v-col>
    </v-row>
    </v-toolbar>
  </v-app-bar>
    </div>
</template>
<script>
export default {
    data:()=>({
        query:'',
        data:[],
        showForms:0
        
    }),
    methods:{
        Logout(){
            sessionStorage.clear();
            this.$router.push("/")
        },
        async search(){
        const result=await this.axios.get(`/search?q=${this.query}`);
        this.data=result.data;
      },
      async reloadPage() {
        
      window.location.reload();
    }
    },
    props:['fullname'],

}
</script>