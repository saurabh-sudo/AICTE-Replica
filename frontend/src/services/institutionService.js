import api from './api';

const institutionService = {
  getAll: async () => {
    const response = await api.get('/institutions');
    return response.data;
  },

  searchByName: async (name) => {
    const response = await api.get(`/institutions/search/name?name=${name}`);
    return response.data;
  },

  searchByState: async (state) => {
    const response = await api.get(`/institutions/search/state?state=${state}`);
    return response.data;
  },

  getApproved: async () => {
    const response = await api.get('/institutions/approved');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/institutions/${id}`);
    return response.data;
  },
};

export default institutionService;
