//[assignment] write your own unit test to show that your Mastermind variation circuit is working as expected
const chai = require("chai");
const path = require("path");

const wasm_tester = require("circom_tester").wasm;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const assert = chai.assert;

describe("Mastermind variant test", function () {
    this.timeout(100000000);

    it("Passes Input", async () => {
        const circuit = await wasm_tester("/home/suhas/zku/week3_assginment/week3/Part1/contracts/circuits/MastermindVariation.circom");
        await circuit.loadConstraints();

        const input = {
            "pubGuessA": 1,
            "pubGuessB": 2,
            "pubGuessC": 3,
            "pubGuessD": 4,
            "pubNumHit": 4,
            "pubNumBlow": 0,
            "pubSolnHash": "16018284176552455129886281306961124796831745036120658223074731723071302944427",
            "pubSum": 10,
            "privSolnA": 1,
            "privSolnB": 2,
            "privSolnC": 3,
            "privSolnD": 4,
            "privSalt": "12345"
        };

      

     
        let witness = await circuit.calculateWitness(input, true);
     

        

        console.log(witness);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)),"failed test");
        assert(Fr.eq(Fr.e(witness[1]),Fr.e("16018284176552455129886281306961124796831745036120658223074731723071302944427")),"failed test");

    });

});

