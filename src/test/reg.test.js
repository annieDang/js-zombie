
const { validatePosition, getX, getY } = require("../helper")
describe("Regular expression", () => {
    it("check regex of a position", () => {
        expect(validatePosition("(32,3)")).toEqual(true);
        expect(validatePosition("(9,3)")).toEqual(true);
        expect(validatePosition("(,3)")).toEqual(false);
        expect(validatePosition("3,3)")).toEqual(false);
    });

    it("extract x and y", () => {
        const x = 2;
        const y = 4;
        const input = `(${x},${y})`;
        expect(getX(input)).toEqual(x);
        expect(getY(input)).toEqual(y);
    });

});