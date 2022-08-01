import axios from 'axios'

axios.defaults.timeout = 30000

export async function fetchData(params) {
    try {
      const response = await axios.get(`https://acnhapi.com/v1a/${params}`);
      return response.data;
    }
    catch (error) {
      return Promise.reject(error.response);
    }
  }

  export async function fetchTemp() {
    try {
      const response = await axios.get(`/swagger.json`);
      return response.data;
    }
    catch (error) {
      return Promise.reject(error.response);
    }
  }