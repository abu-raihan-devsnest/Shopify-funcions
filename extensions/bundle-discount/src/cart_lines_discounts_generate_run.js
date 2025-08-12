// import { useEffect, useState } from "react";

import { bundleData } from "../../commonBundleData";

export function cartLinesDiscountsGenerateRun(input) {
  console.log("Discount function api called!");
  console.log('input', JSON.stringify(input))
  if (!input?.cart?.lines?.length) {
    throw new Error("No cart lines found");
  }
 
  if(bundleData?.bundle_product_option !== 'none') {
 // bundleVariantGid নির্ধারণ
  let bundleVariantGid = null;
  if (bundleData.bundle_product_option === "create" && bundleData.shopify_prebuilt_bundle_product_id) {
    bundleVariantGid = bundleData.shopify_prebuilt_bundle_product_id;
  } else if (bundleData.bundle_product_option === "link" && bundleData.linked_product?.product_id) {
    bundleVariantGid = bundleData.linked_product.product_id;
  }

  if (!bundleVariantGid) {
    console.error("No bundle variant GID found!");
    return { operations: [] };
  }

  const operations = [];

  const BUNDLE_VARIANT_GID = `gid://shopify/ProductVariant/${bundleVariantGid}`;
  const discountType = bundleData?.discount?.type;
  const discountValue = parseFloat(bundleData?.discount?.value)

  input?.cart?.lines?.forEach((line) => {
    if (line?.merchandise?.id === BUNDLE_VARIANT_GID) {
      console.log("found exact items");

   const originalAmount = Number(line.cost.subtotalAmount.amount);
      let discountAmount = 0;

      if (discountType === "percentage") {
        discountAmount = (originalAmount * discountValue) / 100;
      } else if (discountType === "fixed") {
        discountAmount = discountValue;
      } else if (discountType === "set_price") {
        discountAmount = originalAmount - discountValue;
        // যদি set_price এ originalAmount ছোট হয় discountValue থেকে, নেগেটিভ হলে 0 set করো
        if (discountAmount < 0) discountAmount = 0;
      } else if (discountType === "no_discount") {
        discountAmount = 0;
      } else {
        console.warn("Unknown discount type:", discountType);
        discountAmount = 0;
      }

      operations.push({
        productDiscountsAdd: {
          selectionStrategy: "ALL",
          candidates: [
            {
            //    message: `$ Bundle ${discountType === 'percentage' ? `${discountAmount}% Discount`} discount`,
              targets: [
                {
                  cartLine: {
                    id: line.id,
                  },
                },
              ],
              value: {
                fixedAmount: {
                  amount: discountAmount.toFixed(2),
                },
              },
            },
          ],
        },
      });
    } else {
      console.error("Bundle product id not match! at (discount_function)");
    }
  });

  return {
    operations,
  };
  } else { 
    const operations = [];
  }
   

}
