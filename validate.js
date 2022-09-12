const express = require("express");


const validate = (quantity,price) => {
    if(quantity > 0 && price > 0) {
        return true;
    }
    return false;
}

module.exports = validate;