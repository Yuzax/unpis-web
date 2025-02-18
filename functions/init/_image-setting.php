<?php
/*
 自動生成停止する
*/
// add_image_size('thumbnail', 0, 0);
// add_image_size('medium', 0, 0);
add_image_size('medium_large', 0, 0);
// add_image_size('large', 0, 0);
add_image_size('1536x1536', 0, 0);
add_image_size('2048x2048', 0, 0);


/* ---------- アイキャッチ注意テキスト (投稿)---------- */
// function add_featured_image_instruction( $content ) {
//   return $content .= '<p>画像の横幅を可能な限り1600px以上で入力してください。</p>';
// }
// add_filter( 'admin_post_thumbnail_html', 'add_featured_image_instruction' );
//

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
