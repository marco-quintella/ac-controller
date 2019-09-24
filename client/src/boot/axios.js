import axios from 'axios'

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
  axios.get('http://189.50.88.218:85/data')
    .then(
      result => {
        Vue.prototype.$data = result.data
      })
}
