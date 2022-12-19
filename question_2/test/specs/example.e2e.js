describe("Calculator", () => {
  it("sum of the first ten natural numbers is 55", async () => {
    for (let num = 1; num <= 10; num++) {
      if (num < 10) {
        await browser.$(`id:com.google.android.calculator:id/digit_${num}`).click();
      } else {
        for (let char of num.toString()) {
          await browser.$(`id:com.google.android.calculator:id/digit_${char}`).click();
        }
      }
      await browser.$("id:com.google.android.calculator:id/op_add").click();
    }

    await browser.$("id:com.google.android.calculator:id/eq").click();

    const resultText = await browser
      .$("id:com.google.android.calculator:id/result_final")
      .getText();
    expect(resultText).toEqual("55");
  });
});