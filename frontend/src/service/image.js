import api from "@/service/api"

export default {
  get: (dataset_id, class_id, limit, offset) => api.get(`/u/dataset/${dataset_id}/class/${class_id}/image?offset=${offset}&limit=${limit}`),
  add: (dataset_id, class_id, images, config) => api.post(`/u/dataset/${dataset_id}/class/${class_id}/image`, images, config),
  delete: (dataset_id, class_id, image_id) => api.delete(`/u/dataset/${dataset_id}/class/${class_id}/image/${image_id}`),
  getOrigin: (dataset_id, class_id, image_id) => api.get(`/u/dataset/${dataset_id}/class/${class_id}/image/${image_id}`)
}