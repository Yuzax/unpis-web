<?php
/*
  自動生成停止する
*/
function remove_add_image_size($sizes){
    // unset($sizes['thumbnail']);
    // unset($sizes['medium']);
    // unset($sizes['large']);
    unset($sizes['medium_large']);
    unset($sizes['1536x1536']);
    unset($sizes['2048x2048']);
    return $sizes;
}
add_filter('intermediate_image_sizes_advanced','remove_add_image_size');
add_filter('big_image_size_threshold','__return_false');

/*
  自動生成を追加する
*/
// add_image_size('thumbnail', 0, 0);
// add_image_size('medium', 0, 0);
// add_image_size('medium_large', 0, 0);
// add_image_size('large', 0, 0);
// add_image_size('1536x1536', 0, 0);
// add_image_size('2048x2048', 0, 0);
add_image_size('small', 375, 0);
add_image_size('ex_large', 4000, 0);


/*
  アイキャッチ注意テキスト(投稿)を追加する。
*/
function add_featured_image_instruction( $content ) {
  return $content .= '<p>画像の横幅を可能な限り3000px以上で入力してください。</p>';
}
add_filter( 'admin_post_thumbnail_html', 'add_featured_image_instruction' );


/*
  svgの入力を許可する
*/
function allow_svg_upload($mimes) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter('upload_mimes', 'allow_svg_upload');

function fix_svg_mime_type($data, $file, $filename, $mimes) {
  $ext = pathinfo($filename, PATHINFO_EXTENSION);
  if ($ext === 'svg') {
      $data['ext']  = 'svg';
      $data['type'] = 'image/svg+xml';
  }
  return $data;
}
add_filter('wp_check_filetype_and_ext', 'fix_svg_mime_type', 10, 4);
?>
