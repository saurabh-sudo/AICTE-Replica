import api from './api';

const announcementService = {
  getAll: async () => {
    const response = await api.get('/announcements');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/announcements/${id}`);
    return response.data;
  },

  getByCategory: async (category) => {
    const response = await api.get(`/announcements/category/${category}`);
    return response.data;
  },
};

export default announcementService;
