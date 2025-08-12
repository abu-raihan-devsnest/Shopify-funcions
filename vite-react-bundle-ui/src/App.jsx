import React from "react";

const bundleData = {
  id: 7,
  title: "Prebuilt new",
  type: "pre-built",
  bundle_title: "asdf",
  bundle_description: "adf",
  shopify_prebuilt_bundle_operation_id:
    "gid://shopify/ProductBundleOperation/7705503301734",
  preview_urls: [
    "https://cdn.shopify.com/s/files/1/0594/9125/4374/files/Main_0a40b01b-5021-48c1-80d1-aa8ab4876d3d.jpg?v=1719472366",
  ],
  default_preview_url:
    "https://cdn.shopify.com/s/files/1/0594/9125/4374/files/Main_0a40b01b-5021-48c1-80d1-aa8ab4876d3d.jpg?v=1719472366",
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
          title: "Purple",
          price: "600.00",
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
          title: "Ice",
          price: "400",
          quantity: 1,
          image_url: null,
        },
        {
          id: "41764301701222",
          title: "Dawn",
          price: "500",
          quantity: 1,
          image_url: null,
        },
        {
          id: "41764301799526",
          title: "Powder",
          price: "600",
          quantity: 1,
          image_url: null,
        },
        {
          id: "41764301897830",
          title: "Electric",
          price: "700",
          quantity: 1,
          image_url: null,
        },
        {
          id: "41764301963366",
          title: "Sunset",
          price: "800",
          quantity: 1,
          image_url: null,
        },
      ],
      is_excluded: true,
    },
  ],
  discount: {
    type: "percentage",
    value: "20",
    method: "shopify_scripts",
    is_free_shipping: true,
  },
  bundle_product_option: "none",
  setting: {
    schedule: {
      start_date: "2026-12-12",
      start_time: "10:48",
      end_date: null,
      end_time: null,
      timezone: "(GMT-03:00)",
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
      tags: ["dynamatic-engraving-widget"],
      product_type: "giftcard",
      product_vendor: "Hydrogen Vendor",
      category: null,
      collections: [],
    },
    show_on_included_product_page: false,
  },
};

const STOREFRONT_ACCESS_TOKEN = "95b79191ef574df85795804c72ebe766";
const SHOP_DOMAIN = "abu-raihan-jr.myshopify.com";

const handleAddBundleToCart = async () => {
 
    // প্রতিটি প্রোডাক্টের প্রথম variant নিয়ে bundle বানাচ্ছি
  const lines = bundleData.products.map((product) => ({
    merchandiseId: `gid://shopify/ProductVariant/${product.variants[0].id}`,
    quantity: product.variants[0].quantity || 1,
  }));

  const formData = {
    items: lines.map(({ merchandiseId, quantity }) => ({
      id: Number(merchandiseId.replace("gid://shopify/ProductVariant/", "")),
      quantity,
      properties: {
        bundleId: String(bundleData.id),
      },
    })),
  };

  const res = await fetch("/cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  const data = await res.json();
  console.log("Add lines response:", data);
};

const App = ({ product }) => {
  console.log("Current page single product info:", product);

  const productIdFromProps = String(product?.id);
  const bundleProductId = bundleData?.shopify_prebuilt_bundle_operation_id
    ?.split("/")
    .pop();

  const isIncluded = bundleData?.products?.some(
    (product) => product?.id === productIdFromProps
  );

  const isExcluded = bundleData?.products?.some(
    (p) => String(p?.id) == productIdFromProps && p?.is_excluded == true
  );

  // final check
  const willBundleShow =
    bundleData?.setting.show_on_included_product_page &&
    isIncluded &&
    !isExcluded;

  console.log({
    included: isIncluded,
    excluded: isExcluded,
    willShowBundle: willBundleShow,
  });

  return (
    <>
      {willBundleShow || product?.id == bundleProductId ? (
        <div id="products-container" className="products-wrapper">
          {/* Discount Label */}
          <div
            style={{
              border: "2px solid red",
              padding: "4px",
              marginBottom: "8px",
            }}
          >
            {bundleData?.discount?.type === "fixed" && "$"}
            {bundleData?.discount?.value}
            {bundleData?.discount?.type === "percentage" && "%"} off
          </div>

          {/* Product Cards */}
          {bundleData?.products?.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.medias?.[0] || ""}
                alt={product.title}
                className="product-image"
              />
              <div className="product-info">
                <p className="product-title">{product.title}</p>
                <p className="product-price">
                  ${product.variants?.[0]?.price || "0.00"}
                </p>

                {/* Variant Selector */}
                {product.variants?.length > 1 && (
                  <select
                    className="variant-selector"
                    onChange={(e) => {
                      const selectedVariant = product.variants.find(
                        (v) => v.id === e.target.value
                      );
                      console.log("Selected Variant:", selectedVariant);
                      // You can add logic to update selected variant in state if needed
                    }}
                  >
                    {product.variants.map((variant) => (
                      <option key={variant.id} value={variant.id}>
                        {variant.title} - ${variant.price}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          ))}

          {/* Total Summary */}
          {product?.id == bundleProductId
            ? null
            : bundleData?.bundle_product_option == "none" && (
                <button
                  onClick={handleAddBundleToCart}
                  style={{ border: "2px solid red" }}
                >
                  Add bundle to cart
                </button>
              )}
        </div>
      ) : null}
    </>
  );
};

export default App;
