<?php

// 無限スクロール用のAJAXエンドポイントを追加
add_action('wp_ajax_load_more_posts', 'load_more_posts_callback');
add_action('wp_ajax_nopriv_load_more_posts', 'load_more_posts_callback');

function load_more_posts_callback() {
    // 基本的なセキュリティチェック（リファラーチェック）
    if (!wp_get_referer() || !check_ajax_referer('load_more_posts_nonce', 'nonce', false)) {
        // nonceが無効でもリファラーが正しければ処理を続行
        if (!wp_get_referer() || strpos(wp_get_referer(), home_url()) !== 0) {
            wp_send_json_error('Security check failed');
            return;
        }
    }

    $page = intval($_POST['page']);
    $cat_slug = sanitize_text_field($_POST['cat_slug']);
    
    $args = array(
        'posts_per_page' => 12,
        'post_type' => 'post',
        'post_status' => 'publish',
        'orderby' => 'date',
        'order' => 'DESC',
        'paged' => $page,
        'category_name' => $cat_slug
    );
    
    $query = new WP_Query($args);
    
    if (!$query->have_posts()) {
        wp_die('no_more_posts');
    }
    
    $response = array();
    
    while ($query->have_posts()) {
        $query->the_post();
        
        $image_array = get_thumbnail_image_array(get_post_thumbnail_id());
        if((is_home() || is_front_page()) && get_field('top_thumbnail')) {
            $image_array = get_image_array('top_thumbnail');
        }
        
        // 画像配列が空の場合はデフォルト画像を設定
        if (empty($image_array) || empty($image_array['small'])) {
            $default_image_url = get_template_directory_uri() . '/src/img/default-thumbnail.jpg';
            $image_array = array(
                'small' => $default_image_url,
                'thumbnail' => $default_image_url,
                'medium' => $default_image_url,
                'large' => $default_image_url,
                'width' => 300,
                'height' => 200
            );
        }
        
        $vertical_class = ($image_array['width'] <= $image_array['height']) ? 'c-works-list__item--vertical' : '';
        
        $post_html = '<li class="c-works-list__item js-masonry__item js-change-style__item ' . $vertical_class . '">';
        $post_html .= '<a class="c-works-list__item-link js-hover js-works-modal-link js-works-seen-trigger" href="' . get_permalink() . '" data-work-url="' . get_permalink() . '">';
        $post_html .= '<img class="js-change-style__image js-lazy" ';
        $post_html .= 'alt="' . get_the_title() . ' thumbnail image" ';
        $post_html .= 'width="' . $image_array['width'] . '" ';
        $post_html .= 'height="' . $image_array['height'] . '" ';
        $post_html .= 'src="' . $image_array['small'] . '" ';
        $post_html .= 'data-src="' . $image_array['small'] . '" ';
        $post_html .= 'data-srcset="' . $image_array['small'] . ' 375w, ' . $image_array['thumbnail'] . ' 750w, ' . $image_array['medium'] . ' 1500w, ' . $image_array['large'] . ' 3000w" ';
        $post_html .= 'sizes="(max-width: 768px) 50vw, (max-width: 2000px) 33vw, 25vw" ';
        $post_html .= 'data-sizes-list="100vw">';
        $post_html .= '<div class="c-works-list__seen-icon js-change-color-target js-works-seen-icon">seen</div>';
        $post_html .= '</a>';
        $post_html .= '<div class="c-works-list__text">';
        $post_html .= '<h2 class="c-works-list__title">' . get_the_title() . '</h2>';
        
        if(get_field('works_remarks')) {
            $post_html .= '<p class="c-works-list__note">' . get_field('works_remarks') . '</p>';
        }
        
        $post_html .= '</div>';
        $post_html .= '</li>';
        
        $response[] = $post_html;
    }
    
    wp_reset_postdata();
    
    // 次のページがあるかチェック
    $next_page = $page + 1;
    $has_more = ($next_page <= $query->max_num_pages);
    
    wp_send_json_success(array(
        'posts' => $response,
        'has_more' => $has_more,
        'next_page' => $next_page
    ));
}

// AJAXのURLとnonceをJavaScriptに渡す
function enqueue_infinite_scroll_script() {
    // ログイン状態に関係なく動作するnonceを生成
    $nonce = wp_create_nonce('load_more_posts_nonce');
    
    wp_localize_script('app', 'infinite_scroll_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => $nonce,
        'is_user_logged_in' => is_user_logged_in()
    ));
}
add_action('wp_enqueue_scripts', 'enqueue_infinite_scroll_script');

?>