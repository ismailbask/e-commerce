<template>
  <v-container>
    <v-row v-if="userCheck"
    >
        <v-text-field class="mr-2" color="deep-purple"
        style="width:450px;"
        label="Searchs"
        @keyup.prevent="search"
        v-model="query"
        single-line
        hide-details
      ></v-text-field>
      <v-col
        md="5"
      ><v-btn @click.prevent="search(), showForm=11"><v-icon>mdi-magnify</v-icon></v-btn>
      </v-col>
    </v-row>
    <NavbarMenu 
    :fullname="user.fullname"
    v-if="userCheck==true"
    > </NavbarMenu>
    <v-app-bar v-else color="white" flat app>
      <v-toolbar flat toll>
        <v-toolbar-title>
          <v-menu offset-y>
            <template v-slot:activator="{ attrs, on }">
              <v-btn to="/" @click="reloadPage"
              color="deep-purple" 
              style="border:none"
              outlined ><v-icon>mdi-home</v-icon>Anasayfa</v-btn>
              <v-btn style="border:none"
              append-icon="mdi-arrow_drop_down"
              color="deep-purple"
              outlined
              text
              v-bind="attrs"
              v-on="on"
              >Kategoriler<v-icon>mdi-arrow-down-drop-circle-outline</v-icon>
              </v-btn>
            </template>
            <v-list dark color="deep-purple">
              <v-list-item  @click="getAllShirts(),showForm=1">Gömlek</v-list-item>
              <v-list-item @click="getAllPants(),showForm=2">Pantolonlar</v-list-item>
              <v-list-item @click="getAllShoes(),showForm=3">Ayakkabılar</v-list-item>
              <v-list-item @click="getAllBags(),showForm=4">Çantalar</v-list-item>
              <v-list-item @click="getAllCoats(),showForm=5">Montlar</v-list-item>
              <v-list-item @click="getAllHats(),showForm=6">Şapkalar</v-list-item>
              <v-list-item @click="getAllSkirts(),showForm=7">Etekler</v-list-item>
              <v-list-item @click="getAllWatches(),showForm=8">Saatler</v-list-item>
              <v-list-item @click="getAllSweaters(),showForm=9">Kazaklar</v-list-item>
              <v-list-item @click="getAllPajamas(),showForm=10">Pijamalar</v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field class="mr-2" color="deep-purple"

        label="Searchs"
        @keyup.prevent="search"
        v-model="query"
        single-line
        hide-details
      ></v-text-field><v-btn @click.prevent="search(), showForm=11"><v-icon>mdi-magnify</v-icon></v-btn>
        <v-btn to="/signin" outlined elevation="4" color="green lighten-1" class=""><v-icon>mdi-account-arrow-right</v-icon>Sign In</v-btn>
        <v-btn to="/signup" outlined elevation="4" color="deep-purple" class="ml-2" ><v-icon>mdi-account-arrow-up</v-icon>Sign Up</v-btn>
    </v-toolbar>
  </v-app-bar>
  <v-row v-if="data" >
      <v-col  v-for="(value, index) in data" 
      :key="index"
      :ref="`card_${index}`"
        cols="12"
        md="4"
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

<!-- Tüm ürünler listelenir -->
  <ProductsField v-if="showForm==0" ></ProductsField>

<!-- Kategoriye göre listelenir -->
    <v-row>
      <v-col cols="6" md="4" sm="6" v-for="shirt in shirtList" :key="shirt.category_id">
        <v-card  v-if="showForm==1"
            elevation="9"
            outlined
            class="text-center" max-width="344" >
                <v-img
                :src="shirt.file"
                height="200px"
                ></v-img>
                
                <h2 class="font-weight-bold text-center" style="color:#673AB7">{{shirt.title}}</h2>
                <v-card-subtitle color="deep-purple">{{shirt.description}}</v-card-subtitle>
                <v-card-subtitle>{{shirt.price}} TL</v-card-subtitle>
                <v-card-actions>
                <v-btn icon>
                <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
                </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="deep-purple" dark small text>Detaylı incele</v-btn>
                </v-card-actions>
            </v-card>
      </v-col>
    </v-row>
    <v-row>
    <v-col
    class="mb-5"
    v-for="pant in pantList" :key="pant.category_id"
    cols="12"
    md="4"
    >
      <v-card v-if="showForm==2"
            elevation="9"
            outlined
            class="text-center" max-width="344" >
                <v-img
                :src="pant.file"
                height="200px"
                ></v-img>
                
                <h2 class="font-weight-bold text-center" style="color:#673AB7">{{pant.title}}</h2>
                <v-card-subtitle color="deep-purple">{{pant.description}}</v-card-subtitle>
                <v-card-subtitle>{{pant.price}} TL</v-card-subtitle>
                <v-card-actions>
                <v-btn icon>
                <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
                </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="deep-purple" dark small text>Detaylı incele</v-btn>
                </v-card-actions>
            </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
      v-for="shoe in shoeList" :key="shoe.category_id"
      cols="12"
      md="4"
      >
      <v-card v-if="showForm==3"
            elevation="9"
            outlined
            class="text-center" max-width="344" >
                <v-img
                :src="shoe.file"
                height="200px"
                ></v-img>
                
                <h2 class="font-weight-bold text-center" style="color:#673AB7">{{shoe.title}}</h2>
                <v-card-subtitle color="deep-purple">{{shoe.description}}</v-card-subtitle>
                <v-card-subtitle>{{shoe.price}} TL</v-card-subtitle>
                <v-card-actions>
                <v-btn icon>
                <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
                </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="deep-purple" dark small text>Detaylı incele</v-btn>
                </v-card-actions>
            </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
      v-for="bag in bagList" :key="bag.category_id"
      cols="12"
      md="4"
      >
      <v-card v-if="showForm==4"
            elevation="9"
            outlined
            class="text-center" max-width="344" >
                <v-img
                :src="bag.file"
                height="200px"
                ></v-img>
                
                <h2 class="font-weight-bold text-center" style="color:#673AB7">{{bag.title}}</h2>
                <v-card-subtitle color="deep-purple">{{bag.description}}</v-card-subtitle>
                <v-card-subtitle>{{bag.price}} TL</v-card-subtitle>
                <v-card-actions>
                <v-btn icon>
                <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
                </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="deep-purple" dark small text>Detaylı incele</v-btn>
                </v-card-actions>
            </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
      v-for="coat in coatList" :key="coat.category_id"
      cols="12"
      md="4"
      >
      <v-card v-if="showForm==5"
            elevation="9"
            outlined
            class=" text-center" max-width="344" >
                <v-img
                :src="coat.file"
                height="200px"
                ></v-img>
                
                <h2 class="font-weight-bold text-center" style="color:#673AB7">{{coat.title}}</h2>
                <v-card-subtitle color="deep-purple">{{coat.description}}</v-card-subtitle>
                <v-card-subtitle>{{coat.price}} TL</v-card-subtitle>
                <v-card-actions>
                <v-btn icon>
                <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
                </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="deep-purple" dark small text>Detaylı incele</v-btn>
                </v-card-actions>
            </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
      v-for="hat in hatList" :key="hat.category_id"
      cols="12"
      md="4"
      >
      <v-card v-if="showForm==6"
            elevation="9"
            outlined
            class="text-center" max-width="344" >
                <v-img
                :src="hat.file"
                height="200px"
                ></v-img>
                
                <h2 class="font-weight-bold text-center" style="color:#673AB7">{{hat.title}}</h2>
                <v-card-subtitle color="deep-purple">{{hat.description}}</v-card-subtitle>
                <v-card-subtitle>{{hat.price}} TL</v-card-subtitle>
                <v-card-actions>
                <v-btn icon>
                <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
                </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="deep-purple" dark small text>Detaylı incele</v-btn>
                </v-card-actions>
            </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
      v-for="skirt in skirtList" :key="skirt.category_id"
      cols="12"
      md="4"
      >
      <v-card v-if="showForm==7"
            elevation="9"
            outlined
            class="text-center" max-width="344" >
                <v-img
                :src="skirt.file"
                height="200px"
                ></v-img>
                
                <h2 class="font-weight-bold text-center" style="color:#673AB7">{{skirt.title}}</h2>
                <v-card-subtitle color="deep-purple">{{skirt.description}}</v-card-subtitle>
                <v-card-subtitle>{{skirt.price}} TL</v-card-subtitle>
                <v-card-actions>
                <v-btn icon>
                <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
                </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="deep-purple" dark small text>Detaylı incele</v-btn>
                </v-card-actions>
            </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
      v-for="watches in watchesList" :key="watches.category_id"
      cols="12"
      md="4"
      >
      <v-card v-if="showForm==8"
            elevation="9"
            outlined
            class=" text-center" max-width="344" >
                <v-img
                :src="watches.file"
                height="200px"
                ></v-img>
                
                <h2 class="font-weight-bold text-center" style="color:#673AB7">{{watches.title}}</h2>
                <v-card-subtitle color="deep-purple">{{watches.description}}</v-card-subtitle>
                <v-card-subtitle>{{watches.price}} TL</v-card-subtitle>
                <v-card-actions>
                <v-btn icon>
                <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
                </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="deep-purple" dark small text>Detaylı incele</v-btn>
                </v-card-actions>
            </v-card>
      </v-col>
    </v-row>
    <v-row class="" style="background:black;">
    <v-col
    v-for="sweater in sweaterList" :key="sweater.category_id"
    cols="12"
    md="4"
    >
    <v-card v-if="showForm==9"
            elevation="9"
            outlined
            class=" text-center" max-width="344" >
                <v-img
                :src="sweater.file"
                height="200px"
                ></v-img>
                <h2 class="font-weight-bold text-center" style="color:#673AB7">{{sweater.title}}</h2>
                <v-card-subtitle color="deep-purple">{{sweater.description}}</v-card-subtitle>
                <v-card-subtitle>{{sweater.price}} TL</v-card-subtitle>
                <v-card-actions>
                <v-btn icon>
                <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
                </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="deep-purple" dark small text>Detaylı incele</v-btn>
                </v-card-actions>
            </v-card>
      </v-col>
    </v-row>
    <v-row>
    <v-col
    v-for="pajamas in pajamasList" :key="pajamas.category_id"
    cols="12"
    md="4"
    >
    <v-card v-if="showForm==10"
            elevation="9"
            outlined
            class=" text-center" max-width="344" >
                <v-img
                :src="pajamas.file"
                height="200px"
                ></v-img>
                
                <h2 class="font-weight-bold text-center" style="color:#673AB7">{{pajamas.title}}</h2>
                <v-card-subtitle color="deep-purple">{{pajamas.description}}</v-card-subtitle>
                <v-card-subtitle>{{pajamas.price}} TL</v-card-subtitle>
                <v-card-actions>
                <v-btn icon>
                <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
                </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="deep-purple" dark small text>Detaylı incele</v-btn>
                </v-card-actions>
            </v-card>
      </v-col>
    </v-row>
<!-- Kategoriye göre listelenir sonu -->
  </v-container>
</template>
<script>
import NavbarMenu from '@/components/NavbarMenu.vue'
import ProductsField from '@/components/ProductsField.vue'

  export default {
    data:()=>({
      productList:[],
      categoryList:[],
      shirtList:[],
      pantList:[],
      shoeList:[],
      bagList:[],
      coatList:[],
      hatList:[],
      skirtList:[],
      watchesList:[],
      sweaterList:[],
      pajamasList:[],
      productToEdit:{},
      showForm:0,
      add:false,
      dialog: false,
      query:'',
      data:[],
      user:{},
      userCheck:false,
    }),
    components:{
        NavbarMenu,
        ProductsField,
    },
    methods:{
      async search(){
        const result=await this.axios.get(`/search?q=${this.query}`);
        this.data=result.data;
      },
      async getAllShirts(){
        try {
          const result=await this.axios.post('/category/shirts');
          this.shirtList=result.data.shirts
        } catch (error) {
          console.log(error.response);
        }
      },
      async getAllPants(){
        try {
          const result=await this.axios.post('/category/pants');
          this.pantList=result.data.pants
        } catch (error) {
          console.log(error.response);
        }
      },
      async getAllShoes(){
        try {
          const result=await this.axios.post('/category/shoes');
          this.shoeList=result.data.shoes
        } catch (error) {
          console.log(error.response);
        }
      },
      async getAllBags(){
          try {
          const result=await this.axios.post('/category/bags');
          this.bagList=result.data.bags
        } catch (error) {
          console.log(error.response);
        }
      },
      async getAllCoats(){
        try {
          const result=await this.axios.post('/category/coats');
          this.coatList=result.data.coats
        } catch (error) {
          console.log(error.response);
        }
      },
      async getAllHats(){
        try {
          const result=await this.axios.post('/category/hats');
          this.hatList=result.data.hats
        } catch (error) {
          console.log(error.response);
        }
      },
      async getAllSkirts(){
        try {
          const result=await this.axios.post('/category/skirts');
          this.skirtList=result.data.skirts
        } catch (error) {
          console.log(error.response);
        }
      },
      async getAllWatches(){
        try {
          const result=await this.axios.post('/category/watches');
          this.watchesList=result.data.watches
        } catch (error) {
          console.log(error.response);
        }
      },
      async getAllSweaters(){
        try {
          const result=await this.axios.post('/category/sweaters');
          this.sweaterList=result.data.sweaters
        } catch (error) {
          console.log(error.response);
        }
      },
      async getAllPajamas(){
        try {
          const result=await this.axios.post('/category/pajamas');
          this.pajamasList=result.data.pajamas
        } catch (error) {
          console.log(error.response);
        }
      },
      async reloadPage() {
        
      window.location.reload();
    },  async readProduct(id_p){
            try {
                const result=await this.axios.get(`/user/product/${id_p}`);
                this.productToEdit=result.data.product;
                // console.log(this.productToEdit);
                this.edit=true;
            } catch (error) {
                // console.log(error.response.data);
                console.log(error.message);
            }
        },
    },
    created:async function(){
      try {
          this.user=await JSON.parse(sessionStorage.getItem('session'));
          if(this.user==null){
            this.userCheck=false;
            this.$router.push("/").catch(()=>{});
          }else{
              this.userCheck=true;
          }
          const result=await this.axios.get('/all-products');
          const resultCate=await this.axios.get('/category/all-catagories');
          this.productList=result.data.products;
          this.categoryList=resultCate.data.catagories;
        } catch (error) {
          console.log(error);
        }
    },
    
  }
</script>
