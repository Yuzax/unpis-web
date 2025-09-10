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

// 管理画面に日本語スラッグの投稿・タームを一覧表示
add_action('admin_notices', function () {
    // 管理画面かどうか＆get_current_screen関数が使えるかをチェック
    if (!is_admin() || !function_exists('get_current_screen')) return;

    // 現在の画面情報を取得
    $s = get_current_screen(); 
    $out = []; // 対象リストの出力用配列

    // 投稿・ターム共通の検出処理をコールバック化
    $check = function ($label, $items, $get_link, $get_name, $get_slug) use (&$out) {
        foreach ($items as $item) {
            // スラッグに日本語（URLエンコードで%が含まれる）を検出
            if (strpos(urlencode($get_slug($item)), '%') !== false) {
                // 編集リンク付きでリストに追加
                $out[] = sprintf('<li><a href="%s">%s</a>（%s）</li>',
                    esc_url($get_link($item)),     // 編集画面へのリンク
                    esc_html($get_name($item)),    // 投稿・ターム名
                    esc_html($get_slug($item))     // スラッグ
                );
            }
        }
    };

    // 投稿一覧ページでの検出処理（投稿・固定ページ・カスタム投稿に対応）
    if ($s->base === 'edit') {
        $check('post',
            get_posts([
                'post_type'   => $s->post_type,
                'numberposts' => -1,
                'post_status' => 'any',
            ]),
            fn($p) => get_edit_post_link($p->ID),
            fn($p) => get_the_title($p),
            fn($p) => $p->post_name
        );
    }

    // ターム一覧ページでの検出処理（カテゴリー・タグ・カスタムタクソノミーに対応）
    if ($s->base === 'edit-tags') {
        $check('term',
            get_terms([
                'taxonomy'   => $s->taxonomy,
                'hide_empty' => false,
            ]),
            fn($t) => get_edit_term_link($t->term_id, $s->taxonomy),
            fn($t) => $t->name,
            fn($t) => $t->slug
        );
    }

    // 日本語スラッグが1件以上見つかった場合、メッセージとして表示
    if ($out) {
        echo '<div class="notice notice-warning"><p>日本語スラッグを変更してください！：</p><ul>' . implode('', $out) . '</ul></div>';
    }
});
?>
