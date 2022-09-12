const isValidate = (products, requiredFields) => {
    let flag = true;
       if(JSON.stringify(requiredFields) == JSON.stringify(Object.keys(products))) {
            flag = true; 
       } else {
        flag = false;
        return flag;
       }

       return flag; 
       
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

module.exports = isValidate







