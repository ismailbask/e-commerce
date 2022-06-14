<template>
    <v-container>
        <NavbarMenu :fullname="user.fullname"/> 
        <v-row justify="center">
            <v-col md="6" sm="6">
                <v-card>
                    <v-card-title>Lorem ipsum dolor sit amet. </v-card-title>
                    <v-card-text>
                        <h2><strong v-if="user"> {{user.fullname}}</strong> </h2>
                        <h3><strong v-if="user">{{user.email}}</strong></h3>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import NavbarMenu from '@/components/NavbarMenu.vue'
export default {
    data:()=>({
        user:{fullname:'',email:''}
    }),
    created:function(){
        this.user=JSON.parse(sessionStorage.getItem('session'));
        // console.log(this.user);
        if(this.user==null){
            this.$router.push('/');//sessionStrage boş ise giriş sayfasına yönlendirdi.
        }
    },
    components:{
        NavbarMenu
    }
}
</script>