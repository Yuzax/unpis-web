<?php
/*
 アップロード周りの処理
*/
@ini_set( 'upload_max_size' , '50M' ); //アップロードできる最大ファイルサイズ
@ini_set( 'post_max_size', '50M'); //ポストデータに入る最大ファイルサイズ
@ini_set( 'max_execution_time', '300' ); //スクリプト実行時間の最大

/*
 404 redirect
*/
// add_action('template_redirect', 'meks_remove_wp_archives');
// function meks_remove_wp_archives(){
//   if( is_category() || is_tag() || is_date() || is_author() ) {
//     wp_safe_redirect(home_url());
//     exit();
//   }
// }
?>
