<?php

// Cookieからカラーモードとレイアウトスタイルを取得するグローバル関数
if (!function_exists('get_color_mode_state')) {
    function get_color_mode_state() {
        $is_dark_mode = false;
        if (isset($_COOKIE['color_mode']) && $_COOKIE['color_mode'] === 'dark') {
            $is_dark_mode = true;
        }
        return $is_dark_mode;
    }
}

if (!function_exists('get_layout_style_state')) {
    function get_layout_style_state() {
        $is_list_layout = false;
        if (isset($_COOKIE['layout_style']) && $_COOKIE['layout_style'] === 'list') {
            $is_list_layout = true;
        }
        return $is_list_layout;
    }
}

?>