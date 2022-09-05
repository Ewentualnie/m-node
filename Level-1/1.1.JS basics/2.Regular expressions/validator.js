"use strict"

class Validator {
    validateEmail(mail) {
        return mail.match(/^[a-z|\d][a-z\d-.+]{1,19}@[a-z\d.!$%&’*+\/=?^_-]{1,15}\.[a-z]{1,5}$/) != null;
    }

    validatePhone(phone) {
        return phone.match(/^(?=[+\d-()\s]{10,25}$)[ -]*(\+38)?[ -]*(\(([\s-]*\d){3}\)|([\s-]*\d){3})([\s-]*\d){7}$/) != null;
    }

    validatePassword(pass) {
        return pass.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/) != null;
    }
}

let validator = new Validator;

function test(array, funk) {
    for (let element of array) {
        console.log(" - " + funk(element) + " - " + element);
    }
    console.log("\n")
}

let mails = ["firstpart@secondpart.end",
    "fi@secondpart.end",
    "first-part@.secondpart.end",
    "first-part@.se=cond%p.art.end",
    "first.part@se=cond%part.r",
    "",
    "f@secondart.end,",
    "first-part@.se=cond@part.end",
    "-firstpart@.se=cond%.enddeded",
    "firs_tpart@.se.en",
    "firstpart@.se.enddeded"]

let phones = ["+38 (099) 567 8901",
    "    +38 099 5 6 7 8 9  01",
    "(09-9) 567-890-1",
    "--  (099) 567 890-1",
    "",
    "+38 (099) 567 8901 0",
    "+38 099 a0000000",
    "+38 (0989) 567 8901",
    "+48 (0989) 567 8901"]

let passes = ["C00l_Pass",
    "SupperPas1",
    "",
    "Cool_pass",
    "C00l"]

test(mails, validator.validateEmail)
test(phones, validator.validatePhone)
test(passes, validator.validatePassword)
