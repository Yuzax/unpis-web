
<?php
$cat_slug = '';
if(!is_home() && !is_front_page()) $cat_slug = get_queried_object() -> slug;
$args = array(
  'posts_per_page' => 12,
  'post_type' => 'post',
  'post_status' => 'publish',
  'orderby' => 'date',
  'order' => 'DESC',
  'category_name' => $cat_slug
);
$query = new WP_Query($args);
$posts = $query->posts;
$has_more_posts = ($query->max_num_pages > 1);
?>
<ol class="c-works-list js-masonry js-change-style" data-current-page="1" data-category-slug="<?= $cat_slug; ?>">
  <?php if (have_posts()): foreach ($posts as $post): setup_postdata($post); ?>
  <?php
  $image_array = get_thumbnail_image_array(get_post_thumbnail_id());
  if((is_home() || is_front_page()) && get_field('top_thumbnail')) $image_array = get_image_array('top_thumbnail');
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
  ?>
  <li class="c-works-list__item js-masonry__item js-change-style__item <?php if($image_array['width'] <= $image_array['height']){ echo 'c-works-list__item--vertical'; } ?>"><a class="c-works-list__item-link js-hover" href="<?php the_permalink(); ?>"><img class="js-change-style__image" alt="<?= get_the_title() . ' thumbnail image'; ?>" width="<?= $image_array['width']; ?>" height="<?= $image_array['height']; ?>" src="<?= $image_array['small']; ?>" srcset="<?= $image_array['small'] . ' 375w, ' . $image_array['thumbnail'] . ' 750w, ' . $image_array['medium'] . ' 1500w, ' . $image_array['large'] . ' 3000w'; ?>" sizes="(max-width: 768px) 50vw, (max-width: 2000px) 33vw, 25vw" data-sizes-list="100vw"/></a>
    <div class="c-works-list__text">
      <h2 class="c-works-list__title"><?= get_the_title(); ?></h2><?php if(get_field('works_remarks')): ?>
      <p class="c-works-list__note"><?= get_field('works_remarks'); ?></p><?php endif; ?>
    </div>
  </li><?php endforeach; endif; wp_reset_postdata(); ?>
</ol><?php if($has_more_posts): ?>
<button class="p-infinite-scroll-button js-infinite-scroll-button" type="button" aria-label="投稿を更に読み込む" aria-pressed="false">投稿を読み込む</button><?php endif; ?>