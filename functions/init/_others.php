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

// ==========================================================================
// Google Analytics
// ==========================================================================
function add_google_analytics() {
    ?>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-J2EF9D4LK1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-J2EF9D4LK1');
    </script>
    <?php
}
add_action('wp_head', 'add_google_analytics');

// ==========================================================================
// Favicon
// ==========================================================================
function add_favicon() {
    $template_directory = get_template_directory_uri();
    ?>
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="<?php echo $template_directory; ?>/assets/img/favicon/0_favicon.ico" id="favicon">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo $template_directory; ?>/assets/img/favicon/favicon-16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?php echo $template_directory; ?>/assets/img/favicon/favicon-32.png">
    <link rel="apple-touch-icon" href="<?php echo $template_directory; ?>/assets/img/favicon/apple-touch-icon.png">
    <?php
}
add_action('wp_head', 'add_favicon');
?>
