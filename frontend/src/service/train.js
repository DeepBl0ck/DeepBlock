import api from "@/service/api"

export default {
  getTrainResult: (project_id) => api.get(`/u/project/${project_id}/model/train`),
  startTrain: (project_id, train_params) => api.post(`/u/project/${project_id}/model/train`, train_params),
}