<?php
/*
  ACFのwysiwygを設定
  https://monochrome-design.jp/blog/727
*/
function my_acf_toolbars($toolbars) {
    // ツールバーの種類に「Simple」という項目を追加
    $toolbars['Simple' ] = array();
    $toolbars['Simple' ][1] = array('bold', 'formatselect', 'link', 'unlink', 'undo', 'redo');
    return $toolbars;
  }
  add_filter('acf/fields/wysiwyg/toolbars' , 'my_acf_toolbars');

function custom_tinymce_settings($init) {
    // フォーマットの選択肢を h3 のみに制限
    $init['block_formats'] = '見出し3=h3';
    return $init;
}
add_filter('tiny_mce_before_init', 'custom_tinymce_settings');

?>
