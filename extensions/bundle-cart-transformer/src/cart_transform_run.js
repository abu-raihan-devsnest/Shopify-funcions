export function cartTransformRun(input) {
    console.log('cart transform api called')
  if (!input?.cart?.lines?.length) {
    throw new Error("No cart lines found");
  }

  const operations = [];
  const BUNDLE_VARIANT_GID = `gid://shopify/ProductVariant/43001111248998`;

  input.cart.lines.forEach(line => {
    if (line.merchandise.id === BUNDLE_VARIANT_GID) {
      // আগের মূল মূল্য থেকে ১০% কম
      const originalAmount = Number(line.cost.subtotalAmount.amount);
      const discountedAmount = (originalAmount * 0.9).toFixed(2);

      operations.push({
        type: "cartLineUpdate",
        lineId: line.id,
        updates: {
          cost: {
            amount: discountedAmount,
            currencyCode: line.cost.subtotalAmount.currencyCode || "USD",
          }
        }
      });
    }
  });

  return { operations };
}
