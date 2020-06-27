import api from "@/service/api"

export default {
  getTestList: (project_id) => api.get(`/u/project/${project_id}/model/test`),
  getTestResult: (project_id, test_id, uri_query) => api.get(`/u/project/${project_id}/model/test/${test_id}/prediction?${uri_query}`),
  getDetailRsult: (project_id, test_id, predict_id) => api.get(`/u/project/${project_id}/model/test/${test_id}/prediction/${predict_id}`),
  startTest: (project_id, test_params) => api.post(`/u/project/${project_id}/model/test`, test_params),
}