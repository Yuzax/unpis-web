<?php
//管理画面のメニュー削除
function remove_menu() {
  //コメントアウトしたものは削除しない
  //remove_menu_page('index.php');                // ダッシュボード
  // remove_menu_page('edit.php');                 // 投稿
  //remove_menu_page('upload.php');               // メディア
  remove_menu_page('link-manager.php');         // リンク
  //remove_menu_page('edit.php?post_type=page');  // 固定ページ
  remove_menu_page('edit-comments.php');        // コメント
  // remove_menu_page('themes.php');               // 外観
  //remove_menu_page('plugins.php');              // プラグイン
  //remove_menu_page('users.php');                // ユーザー
  // remove_menu_page('tools.php');                // ツール
  // remove_menu_page('options-general.php');      // 設定
  // remove_menu_page( 'wpcf7' ); // Contact Form 7.
	// remove_menu_page( 'edit.php?post_type=mw-wp-form' ); // MW WP Form.
	// remove_menu_page( 'all-in-one-seo-pack/aioseop_class.php' ); // All In One SEO Pack.
	// remove_submenu_page( 'tools.php', 'aiosp_import' ); // All In One SEO Pack.
	// remove_menu_page( 'wpseo_dashboard' ); // Yoast SEO.
	// remove_menu_page( 'jetpack' ); // Jetpack.
	// remove_menu_page( 'edit.php?post_type=acf-field-group' ); // Advanced Custom Fields.
	// remove_menu_page( 'cptui_main_menu' ); // Custom Post Type UI.
	// remove_menu_page( 'backwpup' ); // BackWPup.
	// remove_menu_page( 'ai1wm_export' ); // All-in-One WP Migration.
	// remove_menu_page( 'advgb_main' ); // Advanced Gutenberg.
	// remove_submenu_page( 'options-general.php', 'tinymce-advanced' ); // TinyMCE Advanced.
	// remove_submenu_page( 'options-general.php', 'table-of-contents' ); // Table of Contents Plus.
	// remove_submenu_page( 'options-general.php', 'duplicatepost' ); // Duplicate Post.
	// remove_submenu_page( 'upload.php', 'ewww-image-optimizer-bulk' ); // EWWWW.
	// remove_submenu_page( 'options-general.php', 'ewww-image-optimizer/ewww-image-optimizer.php' ); // EWWWW.
}
add_action('admin_menu', 'remove_menu');

/*
　「投稿」「固定ページ」を
　上の方に持ってきて見やすく！
*/
function custom_menu_order($menu_old) {
    if (!$menu_old) return true;

    return array(
        'index.php', // ダッシュボード
        'theme-options', //共通オプション
        'edit.php', 
        'edit.php?post_type=page',
        'edit-comments.php', // コメント
        'separator1', // 区切り線１
        'upload.php', // メディア
        'link-manager.php', // リンク
        'users.php', // ユーザー
        'separator2', // 区切り線２
        'themes.php', // テーマ
        'plugins.php', // プラグイン
        'tools.php', // ツール
        'options-general.php', // 設定
        'separator-last', // 区切り線３
    );
}
add_filter('custom_menu_order', 'custom_menu_order');
add_filter('menu_order', 'custom_menu_order');

// add_action( 'template_redirect', 'is404_redirect_home' );
// function is404_redirect_home() {
//   if ( is_404() ) {
//     wp_safe_redirect( home_url( '/' ) );
//     exit();
//   }
// }
?>
