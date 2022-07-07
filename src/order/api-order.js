import fileDownload from 'js-file-download'


const create = (params, credentials, checkoutDetails) => {
  return fetch('http://localhost:3000/api/orders/'+params.userId, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({order: checkoutDetails})
    })
    .then((response) => {
      return response.json()
    }).catch((err) => console.log(err))
}

const downloadAPIproduct = (params, credentials) => {
  /*var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+ credentials.t);
  return fetch('http://localhost:8000/dowloadFile/'+params.File, {
    'method': 'GET',
    'mode': 'no-cors',
    headers: myHeaders
  })
  .then((res) =>  fileDownload(res.data, params.File)).catch(err => console.log(err))*/
  /*var request = require('request');
  var instance = {
    url: 'http://localhost:3000/api/orders/download/'+params.File,
    mode: 'no-cors',
    headers: {'Authorization': 'basic '+ credentials.t}
  };
  
  request(instance, function (error, response) {
    if (error) throw new Error(error);
    fileDownload(response.body, params.File).catch(err => console.log(err))
    console.log(response.body);
  });*/
  /*var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+credentials.t);
  
  var requestOptions = {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Authorization': "Bearer "+credentials.t,
      'Connection':'keep-alive',
      'Accept-Encoding':'gzip, deflate, br'
    },
    redirect: 'follow'
  };
  
  fetch("http://localhost:8000/dowloadFile/1656013447691-OriginThinSetup.rar", requestOptions)
    .then(response => response.text())
    .then(result => {console.log(result);fileDownload(result, params.File).catch(err => console.log(err))})
    .catch(error => console.log('error', error));*/
      return fetch('http://localhost:3000/api/orders/download/'+params.File, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + credentials.t
        }
      }).then((response) => {console.log('comienza descraga')
       fileDownload(response, params.File).catch(err => console.log(err))
      }).catch((err) => {
        console.log(err)
      })

};

const listByShop = (params, credentials) => {
  return fetch('http://localhost:3000/api/orders/shop/'+params.shopId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const update = (params, credentials, product) => {
  return fetch('http://localhost:3000/api/order/status/' + params.shopId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify(product)
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const cancelProduct = (params, credentials, product) => {
  return fetch('http://localhost:3000/api/order/'+params.shopId+'/cancel/'+params.productId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify(product)
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const processCharge = (params, credentials, product) => {
  return fetch('http://localhost:3000/api/order/'+params.orderId+'/charge/'+params.userId+'/'+params.shopId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    },
    body: JSON.stringify(product)
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const getStatusValues = () => {
  return fetch('http://localhost:3000/api/order/status_values', {
    method: 'GET'
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}

const listByUser = (params, credentials) => {
  return fetch('http://localhost:3000/api/orders/user/'+params.userId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then((response) => {
    return response.json()
  }).catch((err) => {
    console.log(err)
  })
}

const read = (params, credentials) => {
  return fetch('http://localhost:3000/api/orders/' + params.orderId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + credentials.t
    }
  }).then((response) => {
    return response.json()
  }).catch((err) => console.log(err))
}

export {
  create,
  listByShop,
  update,
  cancelProduct,
  processCharge,
  getStatusValues,
  listByUser,
  read,
  downloadAPIproduct
}
