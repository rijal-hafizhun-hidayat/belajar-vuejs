<template>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" id="btn-create" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Tambah
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="save()">
                    <div class="modal-body">
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Nama:</label>
                            <div class="col-sm-10">
                                <input type="text" v-model="nama" class="form-control">
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Gender:</label>
                            <div class="col-sm-10">
                                <select class="form-select" v-model="gender" aria-label="Default select example">
                                    <option selected value="">Open this select menu</option>
                                    <option value="1">Laki-laki</option>
                                    <option value="0">Perempuan</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <input type="submit" class="btn btn-primary" data-bs-dismiss="modal" value="Submit">
                    </div>
                </form>
            </div>
        </div>
    </div>


</template>
<script>
import { reactive } from '@vue/reactivity'
import axios from 'axios'
export default {
    name: 'insertModal',
    data(){
        return{
            nama: '',
            gender:''
        }
    },

    methods:{
        save(){
            axios.post(`http://127.0.0.1:8000/api/profile`, {
                nama: this.nama,
                gender: this.gender
            }).then((res) => {
                console.log(res)
                this.$emit('profile', res.data.data.nama, res.data.data.gender, res.data.data.id);
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
    #btn-create{
        margin-bottom: 30px;
    } 
</style>