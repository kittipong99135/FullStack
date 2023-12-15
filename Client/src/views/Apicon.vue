<template lang="">
    <div>
        <div  class="container text-center">
            <div class="row gap-2">
                <div class="card bg-dark col-4"
                    v-for="(item, index) in apidata" :key="index" 
                    style="width: 20rem;"
                >
                    <img class="card-img-top" src="../assets/wolf.png">
                    <div class="card-body">
                        <h5 class="card-title text-white">{{item.productName}}</h5>
                        <p class="card-text text-white">{{item.productDetail}}</p>
                        <div class="row d-flex justify-content-between ">
                            <button @click="deatilProduct(item._id)" type="button" class="btn btn-primary btn-sm col-5 m-5" 
                                data-bs-toggle="modal" 
                                data-bs-target="#exampleModal1"
                            >
                                Detail
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">{{view.productName}} {{view._id}}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <v-text-field
                    v-model="postdata.productName"
                    name="productName"
                    lable="productName"
                    id="productName"
                ></v-text-field>
                <v-text-field
                    v-model="postdata.price"
                    name="price"
                    lable="price"
                    id="price"
                ></v-text-field>
                <v-text-field
                    v-model="postdata.productDetail"
                    name="productDetail"
                    lable="productDetail"
                    id="productDetail"
                ></v-text-field>
                <v-text-field
                    v-model="postdata.order"
                    name="order"
                    lable="order"
                    id="order"
                ></v-text-field>
                <v-text-field
                    v-model="postdata.stock"
                    name="stock"
                    lable="stock"
                    id="stock"
                ></v-text-field>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button @click="savePutData(view._id)" type="button" class="btn btn-primary">Changes</button>
              </div>
            </div>
          </div>
        </div>


        <!-- Modal -->
        <button type="button" class="btn btn-primary btn-sm col-5 m-5" 
            data-bs-toggle="modal" 
            data-bs-target="#exampleModal"
        >
            Detail
        </button>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">{{view.productName}}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <v-text-field
                    v-model="postdata.productName"
                    name="productName"
                    lable="productName"
                    id="productName"
                ></v-text-field>
                <v-text-field
                    v-model="postdata.price"
                    name="price"
                    lable="price"
                    id="price"
                ></v-text-field>
                <v-text-field
                    v-model="postdata.productDetail"
                    name="productDetail"
                    lable="productDetail"
                    id="productDetail"
                ></v-text-field>
                <v-text-field
                    v-model="postdata.order"
                    name="order"
                    lable="order"
                    id="order"
                ></v-text-field>
                <v-text-field
                    v-model="postdata.stock"
                    name="stock"
                    lable="stock"
                    id="stock"
                ></v-text-field>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button @click="savePostData()" type="button" class="btn btn-primary">Save changes</button>
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
            apidata:[],
            view:[],
            model:[],
            postdata:{
                productName:'',
                price:0,
                productDetail:'',
                order:0,
                stock:0
            },
            postdefualt:{
                productName:'',
                price:0,
                productDetail:'',
                order:0,
                stock:0
            }
        }
    },
    created(){
        this.getData()
    },
    methods:{
        newItem() {
            this.id = '';
            this.postdata = {...this.postdefualt};
        },
        editItem(item){
            this.id = item._id;
            this.postdata = {...item};
        },
       saveSelect(){
            if(this.id != ''){
                this.savePutData();
            }
            else{
                this.savePostData();
            }
        },
        async savePostData(){
            console.log('Postdata');
            try {
                const {data} = await this.axios.post('http://localhost:3000/api/product', this.postdata);
                alert(data);
                this.getData();
            } catch (error) {
                console.log(error);
            }
        },
        async savePutData(id){
            console.log(id);
            console.log(this.postdata);
            try {
                const {data} = await this.axios.put('http://localhost:3000/api/product/' + id, this.postdata);
                alert(data);
                this.getData();
            } catch (error) {
                console.log(error);
            }
        },
        getData(){
            this.axios.get('http://localhost:3000/api/v1/product/')
                .then((res) => {
                    this.apidata = res.data;
                    console.log(res.data);
                })
        },
        deatilProduct(id){
            this.axios.get('http://localhost:3000/api/v1/product/'+id)
                .then((res) => {
                    this.view = res.data;
                    console.log(res.data);
                })
        },
    },
}
</script>
<style scoped>
    .custom-color{
        color: aliceblue;
    }   
    .custom-card{
        background: whitesmoke;
    }
    .custom-btn{
        background: greenyellow;
        color: dimgray;
    }
</style>