import api from "@/service/api"

export default {
  get: (dataset_id) => api.get(`/u/dataset/${dataset_id}/class`),
  add: (dataset_id, class_info) => api.post(`/u/dataset/${dataset_id}/class`, class_info),
  delete: (dataset_id, class_id) => api.delete(`/u/dataset/${dataset_id}/class/${class_id}`),
  update: (dataset_id, class_id, after) => api.put(`/u/dataset/${dataset_id}/class/${class_id}`, after)
}