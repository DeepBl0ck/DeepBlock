import api from "@/service/api"

export default {
    get: () => api.get("/u/dataset"),
    add: (dataset) => api.post("/u/dataset", dataset),
    delete: (dataset) => api.delete(`/u/dataset/${dataset}`)
}