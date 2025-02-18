<?php

// 画像を出力するfunction
function get_image_array($target, $option='') {
    $img_array = [];
    $img = get_field($target, $option);
    if($img){
        $img_array['thumbnail'] = wp_get_attachment_image_src( $img , 'thumbnail' )[0];
        $img_array['medium'] = wp_get_attachment_image_src( $img , 'medium' )[0];
        $img_array['large']  = wp_get_attachment_image_src( $img , 'large' )[0];
        $img_array['width'] = wp_get_attachment_image_src( $img , 'thumbnail' )[1];
        $img_array['height'] = wp_get_attachment_image_src( $img , 'thumbnail' )[2];
        $img_array['alt'] = get_post_meta( get_post($img) -> ID , '_wp_attachment_image_alt' , true );
    }
    return $img_array;
}

?>