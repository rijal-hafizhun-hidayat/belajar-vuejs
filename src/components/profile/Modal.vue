<template>
    <!-- Button Trigger -->
    <button type="button" @click="show()" data-bs-toggle="modal" :data-bs-target="'#exampleModal-' + id" class="btn btn-success">Show</button>
    <!-- Modal -->
    <div class="modal fade" :id="'exampleModal-' + id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Nama:</label>
                        <div class="col-sm-10">
                            <input type="text" readonly class="form-control-plaintext" id="staticEmail" :value="datas.nama">
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Gender:</label>
                        <div class="col-sm-10">
                            <input v-if="datas.nama === 1" readonly class="form-control-plaintext" id="staticEmail" value="Laki-laki">
                            <input v-else readonly class="form-control-plaintext" id="staticEmail" value="Perempuan">
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Di Buat:</label>
                        <div class="col-sm-10">
                            <input readonly class="form-control-plaintext" id="staticEmail" :value="datas.created_at">
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="staticEmail" class="col-sm-2 col-form-label">Di Ubah:</label>
                        <div class="col-sm-10">
                            <input readonly class="form-control-plaintext" id="staticEmail" :value="datas.updated_at">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import { onMounted, reactive } from '@vue/runtime-core'
import axios from 'axios'
import moment from 'moment';

export default {
    name: 'Modal',
    props: ['id'],
    setup(props){
        let datas = reactive({
            nama: '',
            gender: '',
            created_at: '',
            updated_at: ''
        })

        const id = props.id

        function show(){
            axios.get(`http://127.0.0.1:8000/api/profile/${id}`)
            .then((res) => {
                datas.nama = res.data.data.nama
                datas.gender = res.data.data.gender
                datas.created_at = moment(res.data.data.created_at).format('L');
                datas.updated_at = moment(res.data.data.updated_at).format('L');

                console.log(datas)
            }).catch((err) => {
                console.log(err)
            })
        }
        
        return {
            id, datas, show
        }
    },
}
</script>