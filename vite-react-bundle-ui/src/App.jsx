import React from "react";

const bundleData = {
  id: 7,
  title: "Prebuilt new",
  type: "pre-built",
  bundle_title: "asdf",
  bundle_description: "adf",
  shopify_prebuilt_bundle_operation_id: "gid://shopify/ProductBundleOperation/39370555494",
  preview_urls: [
    "https://cdn.shopify.com/s/files/1/0594/9125/4374/files/Main_0a40b01b-5021-48c1-80d1-aa8ab4876d3d.jpg?v=1719472366"
  ],
  default_preview_url: "https://cdn.shopify.com/s/files/1/0594/9125/4374/files/Main_0a40b01b-5021-48c1-80d1-aa8ab4876d3d.jpg?v=1719472366",
  products: [
    {
      id: "7333216485478",
      title: "The Collection Snowboard: Hydrogen",
      medias: [
        "https://cdn.shopify.com/s/files/1/0594/9125/4374/files/Main_0a40b01b-5021-48c1-80d1-aa8ab4876d3d.jpg?v=1719472366"
      ],
      variants: [
        {
          id: "42123272683622",
          title: "Purple",
          price: "600.00",
          quantity: 1,
          image_url: null
        }
      ]
    },
    {
      id: "7333216583782",
      title: "The Complete Snowboard",
      medias: [
        "https://cdn.shopify.com/s/files/1/0594/9125/4374/files/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1719472366"
      ],
      variants: [
        {
          id: "41764301635686",
          title: "Ice",
          price: "400",
          quantity: 1,
          image_url: null
        },
        {
          id: "41764301701222",
          title: "Dawn",
          price: "500",
          quantity: 1,
          image_url: null
        },
        {
          id: "41764301799526",
          title: "Powder",
          price: "600",
          quantity: 1,
          image_url: null
        },
        {
          id: "41764301897830",
          title: "Electric",
          price: "700",
          quantity: 1,
          image_url: null
        },
        {
          id: "41764301963366",
          title: "Sunset",
          price: "800",
          quantity: 1,
          image_url: null
        }
      ]
    }
  ],
  discount: {
    type: "percentage",
    value: "20",
    method: "shopify_scripts",
    is_free_shipping: true
  },
  bundle_product_option: "create",
  setting: {
    schedule: {
      start_date: "2026-12-12",
      start_time: "10:48",
      end_date: null,
      end_time: null,
      timezone: "(GMT-03:00)",
      will_apply_end_date: false
    },
    audiences: [
      {
        id: 22,
        name: "All users"
      }
    ],
    bundle_details: {
      discount_label_in_cart: "Discount label in cart",
      how_to_present_bundle_in_cart: "line_item"
    },
    product_segment: {
      tags: ["dynamatic-engraving-widget"],
      product_type: "giftcard",
      product_vendor: "Hydrogen Vendor",
      category: null,
      collections: []
    },
    show_on_included_product_page: false
  }
};

const calculateBundlePrices = (bundle) => {
  let total = 0;

  bundle.products.forEach((product) => {
    product.variants.forEach((variant) => {
      const price = parseFloat(variant.price || 0);
      const quantity = variant.quantity || 1;
      total += price * quantity;
    });
  });

  const discountType = bundle.discount?.type;
  const discountValue = parseFloat(bundle.discount?.value || 0);

  let discountAmount = 0;

  if (discountType === "percentage") {
    discountAmount = (discountValue / 100) * total;
  } else if (discountType === "fixed") {
    discountAmount = discountValue;
  }

  const finalPrice = total - discountAmount;
  console.log('app runn console')
  return {
    total: total.toFixed(2),
    discountAmount: discountAmount.toFixed(2),
    finalPrice: finalPrice.toFixed(2),
  };
};


const App = () => {
  const { total, discountAmount, finalPrice } = calculateBundlePrices(bundleData);

  return (
    <div id="products-container" className="products-wrapper">
  {/* Discount Label */}
  <div style={{ border: "2px solid red", padding: "4px", marginBottom: "8px" }}>
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
  <div
    style={{
      marginTop: "16px",
      borderTop: "1px solid #ccc",
      paddingTop: "8px",
    }}
  >
    <p>
      <strong>Original Price:</strong> ${total}
    </p>
    <p>
      <strong>Discount:</strong> -${discountAmount}
    </p>
    <p>
      <strong>Final Price:</strong> ${finalPrice}
    </p>
  </div>
</div>

  );
};

export default App; 