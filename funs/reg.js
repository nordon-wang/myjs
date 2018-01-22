/**
 * reg.text(string);
 *
 * string.match(reg);
 */

let reg1 = /aa/ig;

let str1 = 'aaa_qqaaaa';

let r1 = reg1.test(str1);

reg1.lastIndex;


let r2 = str1.match(reg1);

let str3 = str1.replace(/aa/ig, 's');

debugger;