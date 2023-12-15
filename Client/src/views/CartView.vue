<template lang="">
    <div>
        <div class="container">
           <div class="row my-1"
           v-for="(item, index) in fetchCart" :key="index" 
           >
                <div class="card col-12  bg-black">
                    <h5 class="card-header border-bottom border-success text-white">{{fetchCart[index].ProductName}}</h5>
                    <div class="row g-0">
                        <div class="col-md-2">
                            <img :src="imageCart[index]" width="180px">
                        </div>
                        <div class="col-md-10">
                        <div class="card-body">
                            <h5 class="card-title text-white">{{fetchCart[index].ProductName}} : {{fetchCart[index].Quantity}} Unit</h5>
                            <p class="card-text text-success fs-3">฿{{fetchCart[index].TotalProce}}~</p>
                            <p class="card-text text-white">
                                <small>Unit price : ฿{{fetchCart[index].ProductPrice}}~</small>
                            </p>
                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <botton @click="addOrder(fetchCart[index].cartID)" class="btn btn-outline-success">Order this cart</botton>
                            <botton @click="delCart(fetchCart[index].cartID)" class="btn btn-outline-danger">Delete this cart</botton>
                        </div>
                    </div>
                </div>
                </div>
           </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            parameterUser:'KITTIPONG',
            fetchCart:[],
            imageCart:[],
        }
    },
    methods:{
        async getData(Username){
            await this.axios.get('http://localhost:3000/api/cart/' + Username )
                .then((res) => {
                    this.fetchCart = res.data;
                    res.data.forEach((item, index) => {
                        this.imageCart[index] =require('../../../server/public/images/ProductImage/'+item.ProductImage)
                    })
                    console.log(this.fetchCart);
                })
        },
        async delCart(id){
            await this.axios.delete('http://localhost:3000/api/cart/' + id)
                .then(this.getData(this.parameterUser))
        },
        async addOrder(id)
        {
            await this.axios.post('http://localhost:3000/api/order/' + id)
                .then((res) => {
                    alert(res.data.message.msg);
                    this.getData(this.parameterUser)
                });
        },
    },
    created(){
        this.getData(this.parameterUser)
    }    
}
</script>
<style>
    
</style>