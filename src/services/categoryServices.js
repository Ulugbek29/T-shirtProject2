import request from "../utils/request";


const categoryService = {
  getList: ({limit=100}) => request.get(`/category?limit=${limit}`),
  getById: (id, params) => request.get(`/category/${id}`, { params }),
  create: (data) => request.post("/category", data),
  update: (data) => request.put("/category", data),
  delete: (id) => request.delete(`/category/${id}`),
};

export default categoryService;