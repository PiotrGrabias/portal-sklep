import axios from 'axios';

const API_URL = 'https://pjerdson321.pythonanywhere.com/api/';

class GetProducts {
    getData() {
        return axios.post(API_URL + 'products', {
          headers: {
            'Content-Type': 'application/json'}})
      }

}

export default new GetProducts();