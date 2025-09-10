<?php
// WordPressのデフォルトCSSを無効化
function remove_wp_default_styles() {
    // WordPressのデフォルトスタイルを削除
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
    wp_dequeue_style('wc-blocks-style');
    wp_dequeue_style('global-styles');
    wp_dequeue_style('classic-theme-styles');
}
add_action('wp_enqueue_scripts', 'remove_wp_default_styles', 100);

// CSS読み込み
function add_styles() {
    wp_register_style('style', get_bloginfo('template_directory').'/assets/css/style.css');
    wp_enqueue_style('style'.'?='.date('YmdHis'));
}
add_action('wp_enqueue_scripts', 'add_styles');
?>
