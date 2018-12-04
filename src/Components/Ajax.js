import axios from 'axios';

export default Ajax = async (tparams) => {
    return await axios({
        method: tparams.method,
        url: tparams.url,
        data: tparams.params,
        baseURL: 'http://127.0.0.1:3020/'
    })
        .then(function(res){
            return res.data;
        })
        .catch(function (error) {
            return error;
        });
};
