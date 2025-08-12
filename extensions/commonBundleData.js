const bundleProductOption = 'none'
const discountType = "percentage"
const discountValue = "10"
const shopifyPreBuiltBundlePId = "43009479049318"

export const bundleData = {
    id: 1,
    title: "Prebuilt bundle",
    description: "Prebuilt bundle description",
    bundle_title: "Prebuilt bundle title",
    bundle_description: "Prebuilt bundle descrioption",
    type: "pre-built",
    // shopify_prebuilt_bundle_product_id: "gid://shopify/Product/43009479049318",
    shopify_prebuilt_bundle_product_id: shopifyPreBuiltBundlePId,

    shopify_prebuilt_bundle_operation_id: "gid://shopify/ProductBundleOperation/40245166182",
    linked_product: {
      medias: [
        "https://cdn.shopify.com/s/files/1/0594/9125/4374/files/Abu_Raihan_420dccd5-d1ab-43a5-9cb4-cf7ab7ff8f67.jpg?v=1754568083"
      ],
      product_id: "7703227433062",
      product_title: "Bundle Product #1 Fast bundle"
    },
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
            price: "600.00",
            title: "Purple",
            quantity: 1,
            image_url: null
          }
        ],
        is_excluded: false
      },
      {
        id: "7333216583782",
        title: "The Complete Snowboard",
        medias: [
          "https://cdn.shopify.com/s/files/1/0594/9125/4374/files/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1719472366"
        ],
        variants: [
          { id: "41764301635686", price: "400.00", title: "Ice", quantity: 1, image_url: null },
          { id: "41764301701222", price: "500.00", title: "Dawn", quantity: 1, image_url: null },
          { id: "41764301799526", price: "600.00", title: "Powder", quantity: 1, image_url: null },
          { id: "41764301897830", price: "700.00", title: "Electric", quantity: 1, image_url: null },
          { id: "41764301963366", price: "800.00", title: "Sunset", quantity: 1, image_url: null }
        ],
        is_excluded: false
      }
    ],
    preview_urls: [
      "https://cdn.shopify.com/s/files/1/0594/9125/4374/files/Main_0a40b01b-5021-48c1-80d1-aa8ab4876d3d.jpg?v=1719472366",
      "https://cdn.shopify.com/s/files/1/0594/9125/4374/files/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1719472366"
    ],
    property: [],
    discount: {
      type: discountType,
      value: discountValue,
      method: "shopify_functions",
      product_prices: [],
      is_free_shipping: true
    },
    bundle_product_option: bundleProductOption,
    setting: {
      schedule: {
        end_date: null,
        end_time: null,
        timezone: "(GMT-04:30)",
        start_date: "2026-11-02",
        start_time: "12:12",
        will_apply_end_date: false
      },
      audiences: [
        { id: 22, name: "All users" }
      ],
      bundle_details: {
        discount_label_in_cart: "Discount label in cart",
        how_to_present_bundle_in_cart: "line_item"
      },
      product_segment: {
        tags: [],
        category: null,
        collections: [],
        product_type: null,
        product_vendor: null
      },
      show_on_included_product_page: true
    },
    add_ons: [],
    status: 1,
    default_preview_url: "https://cdn.shopify.com/s/files/1/0594/9125/4374/files/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1719472366",
    layout: null,
    categories: null,
    deleted_at: null,
    created_at: "2025-08-11T07:25:45.000000Z",
    updated_at: "2025-08-12T10:04:17.000000Z"
  }
