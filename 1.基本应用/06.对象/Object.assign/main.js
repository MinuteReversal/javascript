var A = {
    a: 11
};

var B = {
    a: "bbbb",
    b: "bbb"
};

var C = {
    a: "CCC",
    b: "CCCC",
    c: "CCCC"
};

var o = Object.assign(A, B, C);
console.log([A,B,C,o]);