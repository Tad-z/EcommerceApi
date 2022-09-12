const express = require("express");
const { postProduct } = require("./controllers/pro_ord.con")

const validate  = require("./validate")

test('quantity and price validation', () => 
{
    expect(validate(0,0)).toBe(false);
});
          


module.exports = test 