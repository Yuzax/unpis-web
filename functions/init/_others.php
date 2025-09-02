<?php
/*
 404 redirect
*/
add_action('template_redirect', 'meks_remove_wp_archives');
function meks_remove_wp_archives(){
  if( is_tag() || is_date() || is_author() ) {
    wp_safe_redirect(home_url());
    exit();
  }
}

if( !function_exists('redirect_404_to_homepage') ){
    add_action( 'template_redirect', 'redirect_404_to_homepage' );
    function redirect_404_to_homepage(){
       if(is_404()):
            wp_safe_redirect( home_url('/') );
            exit;
        endif;
    }
}
?>
