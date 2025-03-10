import { defineStore } from "pinia";
import client from "@/axiosClient";
export const useCrudStore = defineStore('crudStore', {
    state: () => ({
        url: "",
        loading: false,
        rows: [],
        row: null,
        createData: {},
    }),
    actions: {
        resetAll(){
            this.url = ""
            this.loading = false
            this.rows = []
            this.row = null
            this.createData = {} 
        },
        index() {
            this.loading = true;
            return new Promise((resolve, reject) => {
                client.get(this.url)
                    .then((response) => {
                        this.rows = response.data;
                        // console.log(this.rows)
                        resolve(this.rows);
                    })
                    .catch((error) => {
                        reject(error);
                    })
                    .finally(() => {
                        this.loading = false;
                    })
            })
        },
        show(id) {
            this.loading = true;
            return new Promise((resolve, reject) => {
                if (this.rows.find(el => el.id == id)) {
                    this.row = this.rows.find(el => el.id == id);
                    resolve(this.row);
                    this.loading = false
                }else{
                    client.get(`${this.url}/${id}`)
                        .then((response) => {
                            this.row = response.data;
                            resolve(this.row);
                        })
                        .catch((error) => {
                            reject(error);
                        })
                        .finally(() => {
                            this.loading = false;
                        })
                }
            })
        },
        store(data) {
            this.loading = true;
            return new Promise((resolve, reject) => {
                client.post(`${this.url}`, data)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    })
                    .finally(() => {
                        this.loading = false;
                    })
            })
        },
        update(data, id) {
            this.loading = true;
            return new Promise((resolve, reject) => {
                client.put(`${this.url}/${id}`, data)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    })
                    .finally(() => {
                        this.loading = false;
                    })
            })
        },
        delete(id) {
            this.loading = true;
            return new Promise((resolve, reject) => {
                client.delete(`${this.url}/${id}`)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    })
                    .finally(() => {
                        this.loading = false;
                    })
            })
        },
        create() {
            this.loading = true
            return new Promise((resolve, reject) => {
                client.get(`${this.url}/create`).then(response => { this.createData = response.data; resolve(response.data) }).catch((error) => {
                    reject(error);
                })
            }).finally(() => {
                this.loading = false;
            })
        }
    }
})