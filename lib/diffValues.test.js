const diffValues = require("./diffValues");

test("diffValues", () => {
    const sourceContents = `
VAL_1=value-1
VAL_2=value-2
VAL_3=value-3
    `.trim();
    const destinationContents = `
VAL_1=value-0
VAL_2=value-2
VAL_4=value-4
    `.trim();

    const actual = diffValues(sourceContents, destinationContents);
    const expected = [
        { variable: "VAL_1", sourceValue: "value-1", destValue: "value-0" },
        { variable: "VAL_3", sourceValue: "value-3", destValue: "<undefined>" },
        { variable: "VAL_4", sourceValue: "<undefined>", destValue: "value-4" },
    ];

    expect(actual).toEqual(expected);
});