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
        index() {
            this.loading = true;
            return new Promise((resolve, reject) => {
                client.get(this.url)
                    .then((response) => {
                        this.rows = response.data;
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