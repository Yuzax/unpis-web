<?php
/*
  投稿自体を削除
*/
function remove_default_post_type() {
    remove_menu_page( 'edit.php' );
}
add_action( 'admin_menu', 'remove_default_post_type' );


// /*
//   投稿機能から「カテゴリ」と「タグ」を削除
// */
// function hide_taxonomy_from_menu() {
//   global $wp_taxonomies;
//   if (!empty($wp_taxonomies['category']->object_type)) {
//     foreach ($wp_taxonomies['category']->object_type as $i => $object_type) {
//       if ($object_type == 'post') {
//         unset($wp_taxonomies['category']->object_type[$i]);
//       }
//     }
//   }
//   if ( !empty( $wp_taxonomies['post_tag']->object_type ) ) {
//       foreach ( $wp_taxonomies['post_tag']->object_type as $i => $object_type ) {
//           if ( $object_type == 'post' ) {
//               unset( $wp_taxonomies['post_tag']->object_type[$i] );
//           }
//       }
//   }
//   return true;
// }
// add_action( 'init', 'hide_taxonomy_from_menu' );


// /*
//  「投稿」のラベルを変更
// */
// function change_post_menu_label() {
//   global $menu;
//   global $submenu;
//   $menu[5][0] = 'Exhibition';
//   $submenu['edit.php'][5][0] = 'Exhibition';
//   $submenu['edit.php'][10][0] = '新規追加';
//  }
//  function change_post_object_label() {
//   global $wp_post_types;
//   $labels = &$wp_post_types['post']->labels;
//   $labels->name = 'Exhibition';
//   $labels->singular_name = 'Exhibition';
//   $labels->name_admin_bar = 'Exhibition';
//   $labels->add_new = '新規追加';
//   $labels->add_new_item = 'Exhibitionを追加';
//   $labels->edit_item = 'Exhibitionの編集';
//   $labels->new_item = '新規Exhibition';
//   $labels->view_item = 'Exhibitionを表示';
//   $labels->search_items = 'Exhibitionを検索';
//   $labels->not_found = 'Exhibitionが見つかりませんでした';
//   $labels->not_found_in_trash = 'ゴミ箱にExhibitionは見つかりませんでした';
//  }
//  add_action( 'init', 'change_post_object_label' );
//  add_action( 'admin_menu', 'change_post_menu_label' );


// // 投稿ページのパーマリンクをカスタマイズ
// function add_article_post_permalink( $permalink ) {
//     $permalink = '/exhibition' . $permalink;
//     return $permalink;
// }
// add_filter( 'pre_post_link', 'add_article_post_permalink' );


// function add_article_post_rewrite_rules( $post_rewrite ) {
//     $return_rule = array();
//     foreach ( $post_rewrite as $regex => $rewrite ) {
//         $return_rule['exhibition/' . $regex] = $rewrite;
//     }
//     return $return_rule;
// }
// add_filter( 'post_rewrite_rules', 'add_article_post_rewrite_rules' );


// /* 投稿アーカイブページの作成 */
// function post_has_archive( $args, $post_type ) {
// 	if ( 'post' == $post_type ) {
// 		$args['rewrite'] = true;
// 		$args['has_archive'] = 'exhibition'; //任意のスラッグ名
// 	}
// 	return $args;
// }
// add_filter( 'register_post_type_args', 'post_has_archive', 10, 2 );

// // アイキャッチ画像を有効にする。
// add_theme_support('post-thumbnails');
?>
