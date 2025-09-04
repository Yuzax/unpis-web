<?php
// JS読み込み
function add_scripts() {
    $version = '1.0&=' . date('YmdHis');
    wp_register_script('app', get_bloginfo('template_directory').'/assets/js/app.js', false, $version, true);

    if (!is_admin()) {
        wp_deregister_script('jquery');
        wp_enqueue_script('app');
    }
}
add_action('wp_enqueue_scripts', 'add_scripts');
?>
