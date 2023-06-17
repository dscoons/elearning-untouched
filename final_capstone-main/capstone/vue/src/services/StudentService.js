import axios from 'axios';

export default {
    getAllStudents() {
      return axios.get('/students');
    },
    getCourseStudents(courseId) {
        return axios.get(`/course/${courseId}/students`);
    },
    getStudentGrade(courseId, studentId) {
        return axios.get(`/course/${courseId}/student/${studentId}/grade`);
    },
    sendStudentRequest(body) {
        const header = {'Authorization': '' };
        const url = 'https://api.sendgrid.com/v3/mail/send';
        return axios.post(url, body, header);
    }
  }
