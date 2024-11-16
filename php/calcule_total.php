<?php

/*
Plugin Name:  Calculate Totals Plugin
*//*
Plugin Name:  Calculate Totals Plugin
*/

add_action('rest_api_init', function () {
    register_rest_route('custom/v1', '/calculate_totals', array(
        'methods' => 'POST',
        'callback' => 'calculate_totals_handler',
        'permission_callback' => '__return_true', // Allow access without authentication
    ));
});

function calculate_totals_handler($request) {
    $params = $request->get_json_params();
    $cart_items = isset($params['cart_items']) ? $params['cart_items'] : array();
    $coupon_code = isset($params['coupon_code']) ? sanitize_text_field($params['coupon_code']) : '';
    $shipping_method = isset($params['shipping_method']) ? sanitize_text_field($params['shipping_method']) : '';
    $customer_data = isset($params['customer_data']) ? $params['customer_data'] : array();
    $gift_products = isset($params['gift_products']) ? $params['gift_products'] : array();

    if (empty($cart_items)) {
        return new WP_REST_Response('Cart is empty', 400);
    }

        
    // Initialize session, cart, and customer
    WC()->session = new WC_Session_Handler();
    WC()->session->init();
    WC()->cart = new WC_Cart();
    WC()->customer = new WC_Customer();

    // Add items to cart
    foreach ($cart_items as $item) {
        WC()->cart->add_to_cart($item['product_id'], $item['quantity'], $item['var_id'],
        array());
    }

 // Apply Gift if provided
    foreach ($gift_products as $item) {
    WC()->cart->add_to_cart(
        $item['product_id'],
        $item['quantity'],
        $item['var_id'],
        array(),
        array(
            'ywdpd_is_gift_product' => true,
            'ywdpd_rule_id'         => $item['rule_id'],
            'ywdpd_time'            => time(),
        )
    );
}

    

    // Apply coupon if provided
    if ($coupon_code) {
        $coupon = new WC_Coupon($coupon_code);
        if ($coupon->is_valid()) {
            WC()->cart->apply_coupon($coupon_code);
        }
    }

    // Set customer shipping address if provided
    if (!empty($customer_data)) {
        WC()->customer->set_billing_country($customer_data['billing_country']);
        WC()->customer->set_shipping_country($customer_data['shipping_country']);
        WC()->customer->set_shipping_state($customer_data['shipping_state']);
        WC()->customer->set_shipping_postcode($customer_data['shipping_postcode']);
        WC()->customer->set_shipping_city($customer_data['shipping_city']);
        // WC()->customer->save();
    }

    // Calculate shipping costs based on zones
    WC()->cart->calculate_shipping();

    if ($shipping_method) {
        $packages = WC()->shipping->get_packages();
        foreach ($packages as $package_key => $package) {
            WC()->session->set('chosen_shipping_methods', array($shipping_method));
            WC()->shipping->calculate_shipping_for_package($package_key);
        }
    }

    // Calculate the totals
    WC()->cart->calculate_totals();

    $subtotal = WC()->cart->get_subtotal();
    $discount_total = WC()->cart->get_discount_total();
    $shipping_total = WC()->cart->get_shipping_total();
    $total = WC()->cart->get_total('edit');

    // Retrieve product data from the cart
    $products = array();
    foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
        $product = $cart_item['data'];

          // Get variation data if applicable
          $variations = array();
          if ($product->is_type('variable')) {
              $variations = $product->get_variation_attributes();
          }

        // Get the product image
        $image_url = wp_get_attachment_image_url($product->get_image_id(), 'full');
        $products[] = array(
            'product_id'    => $cart_item['product_id'],
            'name'          => $product->get_name(),
            'price'         => wc_get_price_to_display($product),
            'quantity'      => $cart_item['quantity'],
            'short_description'=>$product->get_short_description(),
            'description'=>$product->get_description(),
            'product_data'=>$cart_item,
            'slug'          => $product->get_slug(), // Adding product slug
            'sku'           => $product->get_sku(),  // Adding product SKU
            'variations'    => $variations, // Adding product variations if any
            'image'         => $image_url // Adding product image URL
        );
    }




    return new WP_REST_Response(array(
        'subtotal' => $subtotal,
        'discount_total' => $discount_total,
        'shipping_total' => $shipping_total,
        'total' => $total,
        'products'=>$products,
        'cart_contents_count' => WC()->cart->get_cart_contents_count()
    ), 200);
}
