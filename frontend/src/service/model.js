import api from "@/service/api"

export default {
  loadModel: (project_id) => api.get(`/u/project/${project_id}/model`),
  saveModel: (project_id, model_json) => api.put(`/u/project/${project_id}/model`, model_json),
}