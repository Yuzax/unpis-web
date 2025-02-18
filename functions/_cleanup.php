<?php
// smilyを削除
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('wp_print_styles', 'print_emoji_styles' );
remove_action('admin_print_styles', 'print_emoji_styles');
//rss feedを削除
remove_action( 'wp_head', 'feed_links', 2 );
remove_action( 'wp_head', 'feed_links_extra', 3 );
//wordpressに外部から投稿する機能を削除
remove_action( 'wp_head', 'rsd_link' );
//不明だが、不要
remove_action( 'wp_head', 'wlwmanifest_link' );
//wpで出力されたことを示すタグ
remove_action( 'wp_head', 'wp_generator' );
//wp json
remove_action('wp_head','rest_output_link_wp_head');
//外部サイトの情報を埋め込むタグ
remove_action('wp_head','wp_oembed_add_discovery_links');
remove_action('wp_head','wp_oembed_add_host_js');
//投稿で短いurlを表示するタグ
remove_action('wp_head', 'wp_shortlink_wp_head');

//gutenberg用のスタイルを削除
function dequeue_plugins_style() {
    wp_dequeue_style('wp-block-library');
}
add_action( 'wp_enqueue_scripts', 'dequeue_plugins_style', 9999);
?>
