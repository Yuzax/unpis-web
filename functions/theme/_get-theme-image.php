<?php

// 画像を出力するfunction
// 画像はIDで表示
function get_image_array($target, $option='') {
    $img_array = [];
    $img = get_field($target, $option);
    if($img){
        $img_array['small'] = wp_get_attachment_image_src( $img , 'small' )[0];
        $img_array['thumbnail'] = wp_get_attachment_image_src( $img , 'thumbnail' )[0];
        $img_array['medium'] = wp_get_attachment_image_src( $img , 'medium' )[0];
        $img_array['large']  = wp_get_attachment_image_src( $img , 'large' )[0];
        $img_array['ex_large']  = wp_get_attachment_image_src( $img , 'ex_large' )[0];
        $img_array['width'] = wp_get_attachment_image_src( $img , 'thumbnail' )[1];
        $img_array['height'] = wp_get_attachment_image_src( $img , 'thumbnail' )[2];
        $img_array['alt'] = get_post_meta( get_post($img) -> ID , '_wp_attachment_image_alt' , true );
    }
    return $img_array;
}

// 画像のサムネイルを出力するfunction
function get_thumbnail_image_array($target) {
    $img_array = [];
    if($target){
        $img_array['small'] = wp_get_attachment_image_src( $target , 'small' )[0];
        $img_array['thumbnail'] = wp_get_attachment_image_src( $target , 'thumbnail' )[0];
        $img_array['medium'] = wp_get_attachment_image_src( $target , 'medium' )[0];
        $img_array['large']  = wp_get_attachment_image_src( $target , 'large' )[0];
        $img_array['ex_large']  = wp_get_attachment_image_src( $target , 'ex_large' )[0];
        $img_array['width'] = wp_get_attachment_image_src( $target , 'thumbnail' )[1];
        $img_array['height'] = wp_get_attachment_image_src( $target , 'thumbnail' )[2];
        $img_array['alt'] = get_post_meta( get_post($img) -> ID , '_wp_attachment_image_alt' , true );
    }
    return $img_array;
}

?>