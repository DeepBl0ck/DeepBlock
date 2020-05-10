<script>
import axios from 'axios'
import {apiserver} from './apiserver'

axios.get(`${apiserver}/session`, {'withCredentials':'true'}).then(res => {
    console.log(res)
})
</script>