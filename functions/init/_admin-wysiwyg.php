<?php
/*
  ACFのwysiwygを設定
  https://monochrome-design.jp/blog/727
*/
function my_acf_toolbars($toolbars) {
    // ツールバーの種類に「Simple」という項目を追加
    $toolbars['Simple' ] = array();
    $toolbars['Simple' ][1] = array('link', 'unlink', 'undo', 'redo');
    return $toolbars;
  }
  add_filter('acf/fields/wysiwyg/toolbars' , 'my_acf_toolbars');
?>
