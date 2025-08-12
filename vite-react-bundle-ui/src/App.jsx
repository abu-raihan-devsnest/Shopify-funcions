import React, { useState } from "react"; 
import { bundleData } from "../../extensions/commonBundleData"; 

const STOREFRONT_ACCESS_TOKEN = "95b79191ef574df85795804c72ebe766";
const SHOP_DOMAIN = "abu-raihan-jr.myshopify.com"


const App = ({ product }) => {
  console.log("Current page single product info:", product);

    const [selectedVariants, setSelectedVariants] = useState({});

     const handleVariantChange = (productId, variantId) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: variantId,
    }));
  };


  const productIdFromProps = String(product?.id);
//   const bundleProductId = bundleData?.shopify_prebuilt_bundle_operation_id
//     ?.split("/")
//     .pop();

  const bundleProductId = "7705503301734"


  const isIncluded = bundleData?.products?.some(
    (product) => product?.id === productIdFromProps
  );

  const isExcluded = bundleData?.products?.some(
    (p) => String(p?.id) == productIdFromProps && p?.is_excluded == true
  );

  // final check
  const willBundleShow =
    bundleData?.setting.show_on_included_product_page == true &&
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
                    value={selectedVariants[product.id] || product.variants[0].id}
                    onChange={(e) =>
                        handleVariantChange(product.id, e.target.value)
                    }
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
                  onClick={() => handleAddBundleToCart(selectedVariants, handleVariantChange)}
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

const handleAddBundleToCart = async (selectedVariants) => { 
    // প্রতিটি প্রোডাক্টের প্রথম variant নিয়ে bundle বানাচ্ছি
//   const lines = bundleData.products.map((product) => ({
//     merchandiseId: `gid://shopify/ProductVariant/${product.variants[0].id}`,
//     quantity: product.variants[0].quantity || 1,
//   }));

 const lines = bundleData.products.map((product) => {
      const selectedVariantId = selectedVariants[product.id] || product.variants[0].id;

      return {
        merchandiseId: `gid://shopify/ProductVariant/${selectedVariantId}`,
        quantity: product.variants.find((v) => v.id === selectedVariantId)
          ?.quantity || 1,
      };
    });

    console.log('lines', lines)

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

