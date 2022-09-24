<template>
    <div class="container">
        <!-- <router-link :to="{ name: 'profile-insert' }" class="btn btn-primary">Tambah</router-link> -->
        <InsertModal @profile="getNewProfile"/>
        <div class="row">
            <div class="card">
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nama</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="( profile, index ) in profiles" :key="index">
                                <th scope="row">{{ index + 1}}</th>
                                <td>{{ profile.nama }}</td>
                                <td v-if="profile.gender === 1">Laki-laki</td>
                                <td v-else>Perempuan</td>
                                <td>
                                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <button @click.prevent="destroy(profile.id, index)" class="btn btn-danger">Hapus</button>
                                        <Modal :id="profile.id"/>
                                        <!-- <button type="button" class="btn btn-warning">Edit</button> -->
                                        <router-link :to="{ name: 'profile-edit', params: {id: profile.id}}" class="btn btn-warning">Edit</router-link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import Modal from '../profile/Modal.vue';
import InsertModal from './insertModal.vue';

export default {
    name: "Dashbord",
    components: { Modal, InsertModal },
    setup() {

        let profiles = ref([]);
        const show = ref(false);

        onMounted(() => {
            axios.get(`http://127.0.0.1:8000/api/profile`)
            .then((res) => {
                profiles.value = res.data.data;
                console.log(profiles)
                console.log(res.data.data)
            }).catch((err) => {
                console.log(err);
            });
        });

        function destroy(id, index) {
            axios.delete(`http://127.0.0.1:8000/api/profile/${id}`)
                .then(() => {
                profiles.value.splice(index, 1);
                Swal.fire({
                    title: "Succes",
                    text: "Hapus Data Berhasil",
                    icon: "success",
                    confirmButtonText: "Ok"
                });
            }).catch((err) => {
                console.log(err);
            });
        }

        function toogle() {
            show.value = !show.value;
        }

        return {
            profiles, show, toogle, destroy
        };
    },
    components: { Modal, InsertModal },
    methods:{
        getNewProfile(nama, gender, id){
            //console.log(profile)
            this.profiles.unshift({
                id: id,
                nama: nama,
                gender: gender
            })
        }
    }
}
</script>

<style scoped>
    .container{
        width: 700px;
        margin-top: 100px;
    }

    .container .btn-primary{
        margin-bottom: 30px;
    }
</style>