import { bundleData } from "../../commonBundleData";

export function cartTransformRun(input) {
  console.log("cart transform api called");
  if (!input?.cart?.lines?.length) {
    throw new Error("No cart lines found");
  }


  const operations = [];

  if (bundleData?.bundle_product_option === "none") {
    
    // console.log("input?.cart?.lines", JSON.stringify(input?.cart?.lines));
    const bundlesProduct = bundleData?.products?.map(
      (product) => product?.variants[0]?.id
    );
    //   console.log('bundlesProduct', bundlesProduct)


    const bundleVariantIds = bundleData.products.map(
  (product) => `gid://shopify/ProductVariant/${product.variants[0].id}`
);

const bundleLines = input.cart.lines.filter(line =>
  bundleVariantIds.includes(line.merchandise.id)
);

//  const bundleLines = input.cart.lines.filter((line) =>
//       line.attributes?.some(
//         (attr) =>
//           attr.key === "bundleId" && attr.value === String(bundleData.id)
//       )
//     );

//     const bundleLines = input?.cart?.lines?.filter((line) =>
//   bundleVariantIds?.includes(line.merchandise.id) &&
//   line.attributes?.some(
//     (attr) =>
//       attr.key === "bundleId" && attr.value == String(bundleData?.id)
//   )
// );

// const bundleLines = input.cart.lines.filter((line) => {
//     console.log("line", JSON.stringify(line))
//      return bundleVariantIds.includes(line?.merchandise.id) &&
//       line.properties?.bundleId === String(bundleData?.id)
// }
// );

// const bundleLines = input.cart.lines.filter(
//   (line) => {
//     console.log('attr', line?.attributes)
//   }
    // bundleVariantIds.includes(line.merchandise.id) &&
    // line.attributes?.some(
    //   (attr) => attr.key === "bundleId" && attr.value == String(bundleData.id)
    // )
// );

// console.log('bundleLines', JSON.stringify(bundleLines))


if (bundleLines.length === 0) {
  // যদি bundleLines খালি হয়, তাহলে merge operation পাঠাও না
  return { operations: [] };
}


   

    const mergedCartLines = bundleLines.map((line) => ({
      cartLineId: line.id,
      quantity: line.quantity,
    }));

    console.log('mergedCartLines', mergedCartLines)

    const mergeOp = {
    linesMerge: {
        parentVariantId: "gid://shopify/ProductVariant/42123272683622",
        cartLines: mergedCartLines,
        title: "My Bundle Title",
        price: {
        percentageDecrease: { value: 15 },
        },
    },
};

   return { operations: [mergeOp] };
  }
  if (
    (bundleData?.bundle_product_option == "create" &&
      bundleData?.shopify_prebuilt_bundle_operation_id) ||
    (bundleData?.bundle_product_option == "link" &&
      !bundleData?.linked_product?.product_id)
  ) {
    return  operations;
  }
}



   // const BUNDLE_VARIANT_GID = `gid://shopify/ProductVariant/42560136085606`;
    // input.cart.lines.forEach((line) => {
    //   if (line.merchandise.id === BUNDLE_VARIANT_GID) {
    //     // আগের মূল মূল্য থেকে ১০% কম
    //     const originalAmount = Number(line.cost.subtotalAmount.amount);
    //     const discountedAmount = (originalAmount * 0.9).toFixed(2);

    //     operations.push({
    //       // type: "lineUpdate",
    //       lineUpdate: {
    //         cartLineId,
    //         title: "My new upadted title",
    //         price: {
    //           adjustment: {
    //             fixedPricePerUnit: {
    //               amount: 50.0,
    //             },
    //           },
    //         },
    //       },
    //       // cartLineId: line.id,
    //       // updates: {
    //       //   cost: {
    //       //     amount: discountedAmount,
    //       //     currencyCode: line.cost.subtotalAmount.currencyCode || "USD",
    //       //   }
    //       // }
    //     });
    //   }
    // });
