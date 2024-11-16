<?php

/*
Plugin Name:  Change currency to MAD
*/

add_filter('woocommerce_currency_symbol', 'change_existing_currency_symbol', 10, 2);

function change_existing_currency_symbol( $currency_symbol, $currency ) {
     switch( $currency ) {
          case 'MAD': $currency_symbol = 'Dh'; break;
     }
     return $currency_symbol;
}