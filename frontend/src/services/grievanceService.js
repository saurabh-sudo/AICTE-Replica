import api from './api';

const grievanceService = {
  create: async (grievanceData) => {
    const response = await api.post('/grievances', grievanceData);
    return response.data;
  },

  getByTicketNumber: async (ticketNumber) => {
    const response = await api.get(`/grievances/${ticketNumber}`);
    return response.data;
  },
};

export default grievanceService;
