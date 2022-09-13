exports.isValidate = (products, requiredFields) => {
  let flag = true;
  if (JSON.stringify(requiredFields) == JSON.stringify(Object.keys(products))) {
    flag = true;
  } else {
    flag = false;
    return flag;
  }

  return flag;
};

exports.validateEmail = (email) => {
  const regex = new RegExp(
    "([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)"
  );
  const testEmail = regex.test(email);
  return testEmail;
};

// const isValidate = (product, requiredFields) => {
//     let flag = true;

//     for(let element of Object.keys(product)){
//        if(!requiredFields.includes(element.toLowerCase())) {
//         flag = false;
//         return flag;
//        }
//        flag = true;

//     };

//     return flag;

// }
