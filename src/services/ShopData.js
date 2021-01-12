import axios from 'axios'

export default {
    getProducts: () => axios.get('./data/ShopData.json')
}