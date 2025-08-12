// import { useEffect, useState } from "react";

export function cartLinesDiscountsGenerateRun(input) {
  console.log("function run discount");
  console.log('input', JSON.stringify(input))
  if (!input?.cart?.lines?.length) {
    throw new Error("No cart lines found");
  }

    const bundleData = {
    id: 1,
    title: "Prebuilt bundle",
    description: "Prebuilt bundle description",
    bundle_title: "Prebuilt bundle title",
    bundle_description: "Prebuilt bundle descrioption",
    type: "pre-built",
    shopify_prebuilt_bundle_product_id: "43009479049318",
    shopify_prebuilt_bundle_operation_id:
      "gid://shopify/ProductBundleOperation/40245166182",
    linked_product: {
      medias: [null],
    },
    products: [
      {
        id: "7333216485478",
        title: "The Collection Snowboard: Hydrogen",
        medias: [
          "https://cdn.shopify.com/s/files/1/0594/9125/4374/files/Main_0a40b01b-5021-48c1-80d1-aa8ab4876d3d.jpg?v=1719472366",
        ],
        variants: [
          {
            id: "42123272683622",
            price: "600.00",
            title: "Purple",
            quantity: 1,
            image_url: null,
          },
        ],
      },
      {
        id: "7333216583782",
        title: "The Complete Snowboard",
        medias: [
          "https://cdn.shopify.com/s/files/1/0594/9125/4374/files/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1719472366",
        ],
        variants: [
          {
            id: "41764301635686",
            price: "400.00",
            title: "Ice",
            quantity: 1,
            image_url: null,
          },
          {
            id: "41764301701222",
            price: "500.00",
            title: "Dawn",
            quantity: 1,
            image_url: null,
          },
          {
            id: "41764301799526",
            price: "600.00",
            title: "Powder",
            quantity: 1,
            image_url: null,
          },
          {
            id: "41764301897830",
            price: "700.00",
            title: "Electric",
            quantity: 1,
            image_url: null,
          },
          {
            id: "41764301963366",
            price: "800.00",
            title: "Sunset",
            quantity: 1,
            image_url: null,
          },
        ],
      },
    ],
    preview_urls: [
      "https://cdn.shopify.com/s/files/1/0594/9125/4374/files/Main_0a40b01b-5021-48c1-80d1-aa8ab4876d3d.jpg?v=1719472366",
      "https://cdn.shopify.com/s/files/1/0594/9125/4374/files/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1719472366",
    ],
    property: [],
    discount: {
      type: "percentage",
      value: "10",
      method: "shopify_functions",
      product_prices: [],
      is_free_shipping: true,
    },
    bundle_product_option: "create",
    setting: {
      schedule: {
        end_date: null,
        end_time: null,
        timezone: "(GMT-04:30)",
        start_date: "2026-11-02",
        start_time: "12:12",
        will_apply_end_date: false,
      },
      audiences: [
        {
          id: 22,
          name: "All users",
        },
      ],
      bundle_details: {
        discount_label_in_cart: "Discount label in cart",
        how_to_present_bundle_in_cart: "line_item",
      },
      product_segment: {
        tags: [],
        category: null,
        collections: [],
        product_type: null,
        product_vendor: null,
      },
      show_on_included_product_page: false,
    },
    add_ons: [],
    status: 1,
    default_preview_url:
      "https://cdn.shopify.com/s/files/1/0594/9125/4374/files/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1719472366",
    layout: null,
    categories: null,
    deleted_at: null,
    created_at: "2025-08-11T07:25:45.000Z",
    updated_at: "2025-08-11T07:25:51.000Z",
  };

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
      console.error("Bundle product id not match! (discount_function)");
    }
  });

  return {
    operations,
  };
}
