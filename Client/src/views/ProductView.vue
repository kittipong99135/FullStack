<template lang="">
    <div>
        <!-- All Product -->
        <div class="container">
            <div class="row positsion-relative">
                <div 
                v-for="(item, index) in fetchList" :key="index"
                class="col-md-3 col-sm-2">
                    <div class="card bg-black \" 
                        style="width: 20rem;"
                    >
                    <img :src="imgProduct[index]"/>
                        <div id="productImage"></div>
                        <div class="card-body positsion-relative">
                            <!-- {{item.ProductImage}} -->
                            <h5 class="card-title text-white">{{item.ProductName}}</h5>
                            <h6 class="card-subtitle mb-2 text-white">{{item.ProductDetail}}</h6>
                            <p class="card-text text-white">{{item.ProductPrice}} ฿</p>
                            <div class="position-absolute mb-2 bottom-0" style="width:100%">
                                <div class="d-grid gap-2 d-md-block">
                                    <button @click="readData(item._id)" 
                                        class="btn btn-outline-light btn-sm" 
                                        type="button"
                                        data-bs-toggle="modal" 
                                        data-bs-target="#staticBackdrop"
                                    >
                                        Detail product <b-icon icon="zoom-in"></b-icon>
                                    </button>

                                    <!-- <button type="button" 
                                        class="btn btn-outline-light btn-sm" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#exampleModal">
                                        Stock Product
                                    </button> -->

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Detail Product -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content bg-dark">
                    <div class="modal-header border-bottom border-success">
                        <h1 class="modal-title text-white fs-5" id="staticBackdropLabel">{{fetchRead.ProductName}}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12 d-flex justify-content-center">
                                <img :src="imgProductRead[0]" alt=""/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="text-white">
                                    {{fetchRead.ProductDetail}}
                                </div>
                                <div class="text-white">
                                    ฿{{fetchRead.ProductPrice}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-top border-success">
                        <div class="row">
                            <div class="col-8">
                                <input  v-model="Unit" type="number" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
                            </div>
                            <div class="col-4">
                                <button @click="createCart(fetchRead._id)" type="button" class="btn btn-outline-success">
                                    Add card <b-icon icon="cart-plus-fill"></b-icon>
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <button @click="delData(fetchRead._id)" type="button" class="btn btn-outline-danger btn-sm col-12" data-bs-dismiss="modal">
                                Delete Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">{{fetchRead.ProductName}}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <input v-model="Stock" 
                                type="number" 
                                class="form-control" 
                                placeholder="Add Product to stock" 
                                aria-label="Recipient's username" 
                                aria-describedby="button-addon2">
                            <button @click="updateStock(fetchRead._id)" class="btn btn-outline-secondary" type="button" id="button-addon2">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return{
            fetchList:[],
            imgProduct:[],
            fetchRead:[],
            imgProductRead:[],
            Unit:0 ,
            Stock:0           
        }
    }, 
    methods:{
        async getData(){
            await this.axios.get('http://localhost:3000/api/product/')
                .then((res) => {
                    this.fetchList = res.data;
                    res.data.forEach((item, index) => {
                        this.imgProduct[index] =require('../../../server/public/images/ProductImage/'+item.ProductImage)
                    })
                })
        },
        async readData(id){
            await this.axios.get('http://localhost:3000/api/product/'+id)
                .then((res) => {
                    this.fetchRead = res.data;
                    this.imgProductRead[0] =require('../../../server/public/images/ProductImage/'+res.data.ProductImage)
                })
        },
        async createCart(id){
            console.log(id);
            console.log(this.fetchRead._id);
            await this.axios.post('http://localhost:3000/api/cart/'+id, {Username:'KITTIPONG',Unit:this.Unit})
                .then((res) => {
                    alert(res.data.message.msg);
                });
        },
        async delData(id){
            await this.axios.delete('http://localhost:3000/api/product/'+id)
                .then((res) => {
                    alert(res.data.message.msg);
                    this.getData()
                });
        },

    },
    created(){
        this.getData()
    }
}
</script>
<style scoped>
.card-body{
    height: 12rem;
}
    
</style>