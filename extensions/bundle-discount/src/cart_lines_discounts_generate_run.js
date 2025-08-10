export function cartLinesDiscountsGenerateRun(input) {
  console.log("function run discount");

  if (!input?.cart?.lines?.length) {
    throw new Error("No cart lines found");
  }

  console.log("input?.cart?.lines", JSON.stringify(input?.cart?.lines));
  const operations = [];

  const BUNDLE_VARIANT_GID = `gid://shopify/ProductVariant/43001111248998`;

  input?.cart?.lines?.forEach((line) => {
    if (line?.merchandise?.id === BUNDLE_VARIANT_GID) {
      console.log("found exact items");

      const amountPerItem = Number(line.cost.subtotalAmount.amount) * 0.1; // 10% discount
      // Shopify expects string for amount
      const discountAmountStr = amountPerItem.toFixed(2);

      operations.push({
        productDiscountsAdd: {
          selectionStrategy: "ALL",
          candidates: [
            {
              message: "Bundle 10% off",
              targets: [
                {
                  cartLine: {
                    id: line.id,
                  },
                },
              ],
              value: {
                fixedAmount: {
                  amount: discountAmountStr,
                },
              },
            },
          ],
        },
      });
    } else {
      console.log("jeta te operation chalate hobe seta pawa jayni!");
    }
  });

  return {
    operations,
  };
}
