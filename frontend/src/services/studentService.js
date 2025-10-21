import api from './api';

const studentService = {
  verify: async (studentId) => {
    const response = await api.get(`/students/verify/${studentId}`);
    return response.data;
  },
};

export default studentService;
