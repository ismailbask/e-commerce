<template>
    <v-container class="text-center">
        <!-- user.fullname'i name değeri ile navbarmenuye gönderdik. -->
        <NavbarMenu :fullname="user.fullname"/> 
        <v-alert text outlined prominent v-model="alert.show" :type="alert.type" dismissible>{{alert.message}}</v-alert>
        <h1 class="font-weight-regular">Eklenen Ürünler</h1>
        <v-row>
            <v-card
            elevation="9"
            outlined
            class="ma-3 text-center" max-width="344" v-for="product in productList" :key="product.id_p">
                <v-img
                :src="product.file"
                height="200px"
                ></v-img>
                
                <h2 class="font-weight-bold text-center" style="color:#673AB7">{{product.title}}</h2>
                <v-card-subtitle color="deep-purple">{{product.description}}</v-card-subtitle>
                <v-card-subtitle>{{product.price}} TL</v-card-subtitle>
                <v-card-actions>
                    <v-btn color="deep-purple" small dark @click="readProduct(product.id_p)"><v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn color="red darken-4" small dark @click="deleteProduct(product.id_p)"><v-icon>mdi-delete</v-icon></v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="deep-purple" dark small text>Detaylı incele</v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
<!-- Ürün ekleme -->
        <v-dialog v-model="add"
        max-width="600px"
        >
            <v-card>
                <v-card-title>Ürün Ekleme</v-card-title>
                <v-card-text>
                    <v-form ref="addForm" @submit.prevent="addProduct()">
                        <v-text-field v-if="productToAdd"
                        prepend-icon="mdi-pencil"
                        label="Title"
                        :rules="[(v)=>!!v||'Title alanı boş bırakılmaz.']"
                        v-model="productToAdd.title"
                        ></v-text-field>
                        <v-textarea v-if="productToAdd"
                        prepend-icon="mdi-message"
                        label="Description"
                        :rules="[(v)=>!!v|| 'Description alanı boş bırakılmaz']"
                        v-model="productToAdd.description"
                        ></v-textarea>
                        <v-text-field  v-if="productToAdd"
                        prepend-icon="mdi-cash"
                        label="Price(₺)"
                        type="number"
                        :rules="[(v)=>!!v||'Price alanı boş bırakılmaz.']"
                        v-model="productToAdd.price"
                        ></v-text-field>
                        <v-file-input
                        label="Image Add"
                        filled
                        prepend-icon="mdi-camera"
                        :rules="[(v)=>!!v||'Image alanı boş bırakılmaz.']"
                        v-model="productToAdd.imageFile"
                        ></v-file-input>
                        <v-select
                        :items="items"
                        item-text="label"
                        item-value="category_id"
                        label="Schoose a category"
                        :rules="[(v)=>!!v||'Category alanı boş bırakılmaz.']"
                        v-model="productToAdd.category_id"
                        ></v-select>
                        <v-btn block class="success mt-3" type="submit">Ekle</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
<!-- Ürün ekleme sonu -->
<!-- Ürün güncelleme -->
                <v-dialog v-model="edit"
                max-width="600px"
                >
                <v-card>
                <v-card-title>Ürün Güncelleme</v-card-title>
                <v-card-text>
                    <v-form ref="editForm" @submit.prevent="editProduct()">
                        <v-text-field v-if="productToEdit"
                        prepend-icon="mdi-pencil"
                        label="Title"
                        :rules="[(v)=>!!v||'Title alanı boş bırakılmaz.']"
                        v-model="productToEdit.title"
                        ></v-text-field>
                        <v-textarea v-if="productToEdit"
                        prepend-icon="mdi-message"
                        label="Description"
                        :rules="[(v)=>!!v|| 'Description alanı boş bırakılmaz']"
                        v-model="productToEdit.description"
                        ></v-textarea>
                        <v-text-field  v-if="productToEdit"
                        prepend-icon="mdi-cash"
                        label="Price(₺)"
                        type="number"
                        :rules="[(v)=>!!v||'Price alanı boş bırakılmaz.']"
                        v-model="productToEdit.price"
                        ></v-text-field>
                        <v-file-input
                        label="Image Add"
                        filled
                        prepend-icon="mdi-camera"
                        v-model="productToEdit.imageFile"
                        ></v-file-input>
                        <v-select
                        :items="items"
                        item-text="label"
                        item-value="category_id"
                        label="Schoose a category"
                        :rules="[(v)=>!!v||'Category alanı boş bırakılmaz.']"
                        v-model="productToEdit.category_id"
                        ></v-select>
                        <v-btn block class="success mt-3" type="submit">güncelle</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-btn @click="add=true" color="green lighten-1" right fixed bottom fab dark><v-icon>mdi-plus</v-icon></v-btn>
        <!-- ürün güncelle sonu -->
    </v-container>
</template>
<script>
// import NavbarMenu from '../../components/NavbarMenu.vue'
import NavbarMenu from '@/components/NavbarMenu.vue'

export default {
    data:()=>({
        user:{},
        productList:[],
        productToAdd:{},
        add:false,
        edit:false,
        productToEdit:{},
        items: [
            {category_id:1, label:'1-) Gömlek' },
            {category_id:2, label:'2-) Pantolon'},
            {category_id:3, label:'3-) Ayakkabı'},
            {category_id:4, label:'4-) Çanta'},
            {category_id:5, label:'5-) Mont'},
            {category_id:6, label:'6-) Şapka' },
            {category_id:7, label:'7-) Etek'},
            {category_id:8, label:'8-) Saat'},
            {category_id:9, label:'9-) Kazak'},
            {category_id:10, label:'10-) Pijama'},
        ],
        alert:{
            show:false,
        }
    }),
    methods:{
        async addProduct(){
            this.add=true
            let inputValue=this.$refs.addForm.validate();
            this.productToAdd.price=Number(this.productToAdd.price);
            // console.log(this.productToAdd.price);
            // console.log(this.productToAdd.title);
            if(inputValue){
                // console.log("price değeri",typeof this.productToAdd.price);
                // console.log("user_id",this.productToAdd.id);
                this.productToAdd.id=this.user.id;
                try {
                    //file, image gibi dosyaları backende form-data şeklinde yolladık fakat form url olarak yollanınca hata verir.
                    const newProduct=new FormData();
                    newProduct.append('title',this.productToAdd.title);
                    newProduct.append('price',this.productToAdd.price);
                    newProduct.append('id',this.productToAdd.id);
                    newProduct.append('description',this.productToAdd.description);
                    newProduct.append('imageFile',this.productToAdd.imageFile);
                    newProduct.append('category_id',this.productToAdd.category_id);
                    console.log("ürün ekleme",newProduct)
                    const result=await this.axios.post('/user/product',newProduct);
                    console.log(result.data);
                    // console.log(result.data);
                    // console.log(result.data.message)
                    this.productList.push(result.data.product);
                    this.$refs.addForm.reset();
                    this.add=false;
                    this.alert={
                        show:true,
                        type:'success',
                        message:result.data.message
                    }
                } catch (error) {
                    console.log(error.response.data);
                }
            }
        },
        async readProduct(id_p){
            try {
                const result=await this.axios.get(`/user/product/${id_p}`);
                this.productToEdit=result.data.product;
                console.log(this.productToEdit);
                this.edit=true;
            } catch (error) {
                // console.log(error.response.data);
                console.log(error.message);
            }
        },
        async editProduct(){
        let inputValue=this.$refs.editForm.validate();
        this.productToEdit.price=Number(this.productToEdit.price);
        if(inputValue){
            try {
                const newProduct=new FormData();
                newProduct.append('title',this.productToEdit.title);
                newProduct.append('description',this.productToEdit.description);
                newProduct.append('price',this.productToEdit.price);
                newProduct.append('imageFile',this.productToEdit.imageFile);
                newProduct.append('category_id',this.productToEdit.category_id);

                const result=await this.axios.put(`/user/product/${this.productToEdit.id_p}`,newProduct);
                // console.log("ürün güncelleme",newProducts);
                console.log(result.data.message);
                const index=this.productList.findIndex(index=>index.id_p==this.productToEdit.id_p);
                this.productList[index]=this.productToEdit;
                this.edit=false;
                this.alert={
                    show:true,
                    type:'success',
                    message:result.data.message
                }
                } catch (error) {
                    console.log("Hata meydana geldi:",error.response);
                }
        }
        },
        async deleteProduct(id_p){
            try {
                const result=await this.axios.delete(`/user/product/${id_p}`);
                const index=this.productList.findIndex(index=>index.id_p==id_p);
                this.productList.splice(index,1);
                this.alert={
                    show:true,
                    type:'info',
                    message:result.data.message
                }
            } catch (error) {
                console.log(error);
            }
        }
    
    },
    
    created:async function(){
        this.user=JSON.parse(sessionStorage.getItem('session'));
        if(this.user==null){
            this.$router.push('/')
        }else{
            try {
                const result=await this.axios.post('/user/my-added-products',this.user);
                this.productList=result.data.products;
            } catch (error) {
                console.log(error);
            }
        }
    },
    components:{
        NavbarMenu
    }
}
</script>