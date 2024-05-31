import axios from 'axios';

const API_URL = 'http://localhost:8000/';

class GetProducts {
    getData() {
        return axios.post(API_URL + 'products', {
          headers: {
            'Content-Type': 'application/json'}})
      }

}

export default new GetProducts();