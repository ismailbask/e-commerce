<template>
<v-container>
    <v-row class="mt-3">
      <v-col
        v-for="product in productList" :key="product.id_p"
        cols="12"
        md="4"
      >
        <v-card  
            elevation="9"
            outlined
            class="text-center" max-width="300" >
              <v-img
                :src="product.file"
                height="300"
                width="400"
                ></v-img>
                <h2 class="font-weight-bold text-center" style="color:#673AB7">{{product.title}}</h2>
                <v-card-subtitle color="deep-purple">{{product.description}}</v-card-subtitle>
                <v-card-subtitle>{{product.price}} TL</v-card-subtitle>
                <v-card-actions>
                <v-btn icon>
                <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
                </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="add=true,readProduct(product.id_p)"  color="deep-purple" dark small text>Detaylı incele</v-btn>
                </v-card-actions>
            </v-card>
      </v-col>
    </v-row>
        <v-dialog v-model="add"
    fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
        >
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="add = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card class="text-center">
          <v-row>
            <v-col cols="12"
            sm="6"
            md="4">
            <v-img
                :src="productToEdit.file"
                width="500"
                height="500"
                ></v-img>
            </v-col>
            <v-col cols="6"
            md="8">
              <h2 class="font-weight-bold text-center"  style="color:#673AB7">{{productToEdit.title}}</h2>
                  <v-card-subtitle color="deep-purple">{{productToEdit.description}}</v-card-subtitle>
                <v-card-subtitle>{{productToEdit.price}} TL</v-card-subtitle>
                <v-btn color="deep-purple" dark outlined>Sepete Ekle</v-btn>
            </v-col>
            <v-col cols="12"
            sm="6"
            md="12">
              
            </v-col>
          </v-row>
        </v-card>
        </v-dialog>
</v-container>

</template>
<script>
export default {
    name:'ProductsField',
    data:()=>({
    productList:[],
    categoryList:[],
    productToEdit:{},
    add:false,
    
    }),
    methods:{
        async readProduct(id_p){
            try {
                const result=await this.axios.get(`/user/product/${id_p}`);
                this.productToEdit=result.data.product;
                this.edit=true;
            } catch (error) {
                console.log(error.message);
            }
        },
    },
    created:async function(){
      try {
          const result=await this.axios.get('/all-products');
          const resultCate=await this.axios.get('/category/all-catagories');
          this.productList=result.data.products;
          this.categoryList=resultCate.data.catagories;
        } catch (error) {
          console.log(error);
        }
    }
}
</script>