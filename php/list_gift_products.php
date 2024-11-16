<?php
/**
 * Plugin Name: WooCommerce Discount Rules API
 * Description: A plugin to retrieve discount rules via a custom REST API.
 * Version: 1.0
 * Author: Your Name
 */

/**
 * Register REST API endpoint to get discount rules.
 */
add_action( 'rest_api_init', function() {
    register_rest_route( 'wc-discounts/v1', '/rules', array(
        'methods' => 'GET',
        'callback' => 'get_discount_rules',
        'permission_callback' => '__return_true', // No authentication required
    ));
});

function get_discount_rules() {

    //list of gift products 
    global $wpdb;

    
    $results = $wpdb->get_results(
        $wpdb->prepare(
            "SELECT * FROM {$wpdb->prefix}postmeta WHERE meta_key = %s",
            '_gift_product_selection'
        ),
        ARRAY_A
    );
    
    
    $gifts = array();
    foreach ($results as $item) {

        $gifts[] = array(
            "rule_id"=>$item['post_id'],
            "products"=>unserialize( $item['meta_value'])
        );

    }

    return new WP_REST_Response( $gifts, 200 );
}
