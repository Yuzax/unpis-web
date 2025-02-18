<?php

// wysiwygで投稿されたlinkタグにjs-hoverを付与する
function give_link_class($content) {
    $class_name = 'js-hover';
    $content = preg_replace('/(<a.*?)>/', '$1 class="' . $class_name . '" >', $content);
    return $content;
}
add_filter('the_content','give_link_class');

?>