<?php

// WebP画像のURLを取得する関数
function get_webp_url($original_url) {
    if (empty($original_url)) {
        return $original_url;
    }
    // ファイル名の後ろに.webpを追加
    return $original_url . '.webp';
}

// 画像を出力するfunction（WebP対応版）
// 画像はIDで表示
// $imgはfield value（get_field('hoge')など）
function get_image_array($img, $is_webp = true) {
    $img_array = [];
    if($img){
        // 元の画像URL取得
        $img_array['small_original'] = wp_get_attachment_image_src( $img , 'small' )[0];
        $img_array['thumbnail_original'] = wp_get_attachment_image_src( $img , 'thumbnail' )[0];
        $img_array['medium_original'] = wp_get_attachment_image_src( $img , 'medium' )[0];
        $img_array['large_original']  = wp_get_attachment_image_src( $img , 'large' )[0];
        $img_array['ex_large_original']  = wp_get_attachment_image_src( $img , 'ex_large' )[0];
        $img_array['full']  = wp_get_attachment_image_src( $img , 'full' )[0];
        if($is_webp) { // WebP版URL取得（存在しない場合は元のURLを返す）
            $img_array['small'] = get_webp_url($img_array['small_original']);
            $img_array['thumbnail'] = get_webp_url($img_array['thumbnail_original']);
            $img_array['medium'] = get_webp_url($img_array['medium_original']);
            $img_array['large'] = get_webp_url($img_array['large_original']);
            $img_array['ex_large'] = get_webp_url($img_array['ex_large_original']);
            $img_array['full'] = get_webp_url($img_array['full']);
        }
        $img_array['width'] = wp_get_attachment_image_src( $img , 'thumbnail' )[1];
        $img_array['height'] = wp_get_attachment_image_src( $img , 'thumbnail' )[2];
        $img_array['alt'] = get_post_meta( get_post($img) -> ID , '_wp_attachment_image_alt' , true );
    }
    return $img_array;
}

// 画像のサムネイルを出力するfunction（WebP対応版）
function get_thumbnail_image_array($target, $is_webp = true) {
    $img_array = [];
    if($target){
        // 元の画像URL取得
        $img_array['small_original'] = wp_get_attachment_image_src( $target , 'small' )[0];
        $img_array['thumbnail_original'] = wp_get_attachment_image_src( $target , 'thumbnail' )[0];
        $img_array['medium_original'] = wp_get_attachment_image_src( $target , 'medium' )[0];
        $img_array['large_original']  = wp_get_attachment_image_src( $target , 'large' )[0];
        $img_array['ex_large_original']  = wp_get_attachment_image_src( $target , 'ex_large' )[0];
        $img_array['full']  = wp_get_attachment_image_src( $target , 'full' )[0];
        if($is_webp) { // WebP版URL取得
            $img_array['small'] = get_webp_url($img_array['small_original']);
            $img_array['thumbnail'] = get_webp_url($img_array['thumbnail_original']);
            $img_array['medium'] = get_webp_url($img_array['medium_original']);
            $img_array['large'] = get_webp_url($img_array['large_original']);
            $img_array['ex_large'] = get_webp_url($img_array['ex_large_original']);
            $img_array['full'] = get_webp_url($img_array['full']);
        }
        $img_array['width'] = wp_get_attachment_image_src( $target , 'thumbnail' )[1];
        $img_array['height'] = wp_get_attachment_image_src( $target , 'thumbnail' )[2];
        $img_array['alt'] = get_post_meta( get_post($target) -> ID , '_wp_attachment_image_alt' , true );
    }
    return $img_array;
}

?>