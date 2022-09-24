<template>
    <div class="container">
        <div class="row">
            <div class="card">
                <div class="card-body">
                    <form @submit.prevent="update()">
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Nama:</label>
                            <div class="col-sm-10">
                                <input type="text" v-model="profile.nama" class="form-control">
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label class="col-sm-2 col-form-label">Gender:</label>
                            <div class="col-sm-10">
                                <select class="form-select" v-model="profile.gender" aria-label="Default select example">
                                    <option value="1">Laki-laki</option>
                                    <option value="0">Perempuan</option>
                                </select>
                            </div>
                        </div>
                        <div class="mb-3">
                            <input type="submit" class="btn btn-primary" value="submit">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2/dist/sweetalert2.js';
export default {
    name: 'Edit',
    setup(){
        let profile = reactive({
            nama: '',
            gender: ''
        })

        const router = useRouter()
        const route = useRoute()

        onMounted(() => {
            axios.get(`http://127.0.0.1:8000/api/profile/${route.params.id}`)
            .then((res) => {
                profile.nama = res.data.data.nama,
                profile.gender = res.data.data.gender
            }).catch((err) => {
                console.log(err)
            })
        })

        function update(id){
            axios.put(`http://127.0.0.1:8000/api/profile/${route.params.id}`, {
                nama: profile.nama,
                gender: profile.gender
            }).then(() => {
                Swal.fire({
                    title: 'Succes',
                    text: 'Data Berhasil diedit',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }),
                router.push({
                    name: 'profile-index'
                })
            }).catch((err) => {
                console.log(err)
            })
        }

        return {
            profile,
            route,
            update
        }
    }
}
</script>

<style scoped>
    .container{
        width: 700px;
        margin-top: 100px;
    }
</style>