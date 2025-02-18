<?php
// CSS読み込み
function add_styles() {
    wp_register_style('style', get_bloginfo('template_directory').'/assets/css/style.css');
    wp_enqueue_style('style'.'?='.date('YmdHis'));
}
add_action('wp_enqueue_scripts', 'add_styles');
?>
