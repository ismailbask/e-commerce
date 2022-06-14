<template>
<v-container>
    <v-app-bar color="white" flat app>
    <v-toolbar flat toll>
        <v-toolbar-title>
        <v-btn style="border:none" outlined text color="deep-purple">
            <v-icon>mdi-store</v-icon>
            <span>Ürünler</span>
        </v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field class="mr-2" color="deep-purple"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
    ></v-text-field>

        <v-btn outlined elevation="4"  @click="showSignForm=false" color="green lighten-1" class=""><v-icon>mdi-account-arrow-right</v-icon>Sign In</v-btn>
        <v-btn outlined elevation="4" color="deep-purple" class="ml-2" @click="showSignForm=true"><v-icon>mdi-account-arrow-up</v-icon>Sign Up</v-btn>
    </v-toolbar>
</v-app-bar>
    <v-alert text outlined prominent v-model="alert.show" :type="alert.type" dismissible>{{alert.message}}</v-alert>

    <!-- SIGN UP ALANI -->
    <v-row justify="center">
    <v-col md="6" sm="6">
        <v-card v-if="showSignForm">
        <v-card-title>Sign Up</v-card-title>
        <v-card-text>
            <v-form class="ma-4" @submit.prevent="signup()" ref="signupForm">
            <v-text-field 
            label="Name"
            prepend-icon="mdi-account"
            :rules="nameRules"
            v-model="user.name"></v-text-field>
            <v-text-field 
            label="E-mail"
            prepend-icon="mdi-email"
            :rules="emailRules"
            v-model="user.email">
            </v-text-field>
            <v-text-field
            label="Password"
            prepend-icon="mdi-lock"
            type="password"
            :rules="passwordRules"
            v-model="user.password">
            </v-text-field>
            <v-btn  color="deep-purple" block class="" type="submit"><span style="color:white">Sign Up</span></v-btn>
            </v-form>
        </v-card-text>
        </v-card>

        <!-- SİGN IN ALANI -->
        <v-card v-else>
          <v-card-title>Sign In</v-card-title>
          <v-card-text>
            <v-form class="ma-4" @submit.prevent="signin()" ref="signinForm">
              <v-text-field 
              :rules="passwordRules"
              label="E-mail"
              prepend-icon="mdi-email"
              v-model="user.email">
              </v-text-field>
              <v-text-field
              label="Password"
              prepend-icon="mdi-lock"
              type="password"
              
              v-model="user.password">
              </v-text-field>
              <v-btn block class="green lighten-1" type="submit"><span style="color:white">Sign In</span></v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>


  export default {
    data:()=>({
      //Form kuralları ayarlandı.
      passwordSignRules:[
        value=>!!value||'Şifre girmelisin',
        value=>(value&&value.length>=3||'Şifre en az 3 karakter olmalı')
      ],
      nameRules:[
        value=>!!value|| 'İsim girmek zorundasın',
        value=>(value&&value.length>=3 ||'İsim 3 ve daha fazla karakter içermelidir!')
      ],
      emailRules:[
        value=>!!value|| 'Email adresini girmeden kayıt yapamazsın',
        value=>/.+@.+\..+/.test(value)||'Email adresi doğru değil'
      ],
      passwordRules:[
        value=>!!value||'Şifre girmelisin',
        value=>(value&&value.length>=3||'Şifre en az 3 karakter olmalı')
      ],
      //Hata mesajları ayarlandı
      alert:{show:false,message:''},
      //inputlara girilen değerleri yakaladık.
      user:{name:'',email:'',password:''},
      //
      showSignForm:true
    }),
    methods:{
      async signup(){
        let inputValues=this.$refs.signupForm.validate();//input değerleri istenilen bir şekilde alındıysa true döner.
        if(inputValues){
          try {
            const result=await this.axios.post('/signup',this.user);
            this.$refs.signupForm.reset();//Sayfa post işleminden sonra input değerleri sıfırlandı.
            // console.log(result.data);
            this.alert={
              show:true,
              message:result.data.message,
              type:'success',
            }
          } catch (error) {
            console.log(error.response.data);
            this.alert={
              show:true,
              message:error.response.data.message,
              type:'error',          
            }
          }
        }
      },
      async signin(){
        let inputValues=this.$refs.signinForm.validate();//input değerleri istenilen bir şekilde 
        if(inputValues){
          try {
            const result=await this.axios.post('/signin',this.user);
            console.log(result.data.checkUser)
            if(result.data.noUser){
              this.alert={
                show:true,
                message:result.data.message,
                type:'error'
              }
            }else{
              sessionStorage.setItem('session',JSON.stringify(result.data));
              this.$router.push('/profile');
            }
          } catch (error) {
            this.alert={
              show:true,
              type:'error',
              message:error.response.data.message
            }
          }
        }
      }
    }
  }
</script>
