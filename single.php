
<?php
// Cookieからカラーモードとレイアウトスタイルを取得
$is_dark_mode = false;
if (isset($_COOKIE['color_mode']) && $_COOKIE['color_mode'] === 'dark') {
   $is_dark_mode = true;
}
$is_list_layout = false;
if (isset($_COOKIE['layout_style']) && $_COOKIE['layout_style'] === 'list') {
   $is_list_layout = true;
}
?><html class="js-change-color-target js-change-style-target<?php if($is_dark_mode){ echo ' is-rev'; }; ?><?php if($is_list_layout){ echo ' is-list'; }; ?>" lang="ja">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/><?php wp_head(); ?>
</head>
<body data-barba="wrapper" data-section="0">
  <div class="l-wrap" data-barba="container" data-barba-namespace="common">
    <?php if ( !is_single() ) : ?>
    <?php if ( is_front_page() ) : ?>
    <?php include get_template_directory() . '/parts/kv.php'; ?>
    <?php endif; ?>
    <?php get_header(); ?>
    <?php endif; ?>
    <div class="l-container">
      <article class="c-works-slider">
        <h1 class="c-works-slider-item__title c-works-slider__hide-target js-works-slider__hide-target"><?= get_the_title(); ?></h1><?php
        $index = 0;
        if(have_rows('works_slider')):
        while(have_rows('works_slider')): the_row();
        ?>
        <?php $image_array = get_image_array('image', '', true); ?>
        <div class="c-works-slider-item js-works-slider__item <?php if($index != 0) echo 'is-hide'; ?>">
          <div class="c-works-slider-item__image"><img alt="<?= get_the_title() . ' image'; ?>" width="<?= $image_array['width']; ?>" height="<?= $image_array['height']; ?>" src="<?= $image_array['small']; ?>" srcset="<?= $image_array['small'] . ' 375w, ' . $image_array['thumbnail'] . ' 750w, ' . $image_array['medium'] . ' 1500w, ' . $image_array['large'] . ' 3000w'; ?>" sizes="100vw"/></div><?php if(get_sub_field('description')): ?>
          <p class="c-works-slider-item__description c-works-slider__hide-target js-works-slider__hide-target"><?= get_sub_field('description'); ?></p><?php endif; ?>
        </div><?php
        $index += 1;
        endwhile; endif;
        ?><a class="c-works-slider__button c-works-slider__close-button c-works-slider__hide-target js-works-slider__hide-target js-change-color-target js-works-close-button js-hover" href="<?= home_url( '/' ); ?>" aria-label="ホームページに移動"></a>
        <div class="c-works-slider__button-wrap">
          <button class="c-works-slider__button c-works-slider__handle c-works-slider__hide-target js-works-slider__left-handle js-works-slider__hide-target js-change-color-target js-hover" type="button" aria-label="前の画像を表示する"><svg fill="none" height="24" viewBox="0 0 28 24" width="28" xmlns="http://www.w3.org/2000/svg"><path d="m12.6064 1.39357c-.5857-.58579-1.5353-.58579-2.121 0l-9.545945 9.54593c-.585786.5858-.585786 1.5353 0 2.1211l9.545945 9.5459c.5857.5857 1.5353.5857 2.121 0 .5858-.5858.5858-1.5354 0-2.1211l-6.9853-6.9854h20.3789c.8284 0 1.5-.6716 1.5-1.5s-.6716-1.5-1.5-1.5h-20.3789l6.9853-6.98534c.5858-.58579.5858-1.53531 0-2.12109z" fill="#000"/></svg></button>
          <button class="c-works-slider__button c-works-slider__information c-works-slider__hide-target js-works-slider__information-button js-works-slider__hide-target js-change-color-target js-hover" type="button" aria-label="ワークスの詳細情報を表示する"><svg fill="none" height="21" viewBox="0 0 4 21" width="4" xmlns="http://www.w3.org/2000/svg"><g fill="#000"><path d="m3.5 19c0 .8284-.67157 1.5-1.5 1.5s-1.499999-.6716-1.499999-1.5l-.000001-10c0-.82843.67157-1.5 1.5-1.5s1.5.67157 1.5 1.5z"/><path d="m4 2c0 1.10457-.89543 2-2 2s-2-.89543-2-2 .89543-2 2-2 2 .89543 2 2z"/></g></svg></button>
          <button class="c-works-slider__button c-works-slider__handle js-works-slider__right-handle c-works-slider__handle--right c-works-slider__hide-target js-works-slider__hide-target js-change-color-target js-hover" type="button" aria-label="次の画像を表示する"><svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m11.3936 1.39356c.5857-.585783 1.5353-.585783 2.121 0l9.5459 9.54594c.5858.5857.5858 1.5353 0 2.1211l-9.5459 9.5459c-.5857.5857-1.5353.5857-2.121 0-.5858-.5858-.5858-1.5354 0-2.1211l6.9853-6.9854h-16.3789c-.82843 0-1.5-.6716-1.5-1.5s.67157-1.5 1.5-1.5h16.3789l-6.9853-6.98534c-.5858-.58579-.5858-1.53531 0-2.1211z" fill="#000"/></svg></button>
        </div>
        <div class="c-works-information-modal js-works-slider__information-modal js-change-color-target is-active">
          <article class="c-works-information-modal__container">
            <h2 class="c-works-information-modal__title"><?= get_the_title(); ?></h2><?php if(get_field('works_remarks')): ?>
            <p class="c-works-information-modal__remarks"><?= get_field('works_remarks'); ?></p><?php endif; ?>
            <?php if(have_rows('links')): ?>
            <ul class="p-works-link-list"><?php while(have_rows('links')): the_row(); ?>
              <li class="p-works-link-list__item"><a class="p-works-link-list__link js-hover" href="<?= get_sub_field('url'); ?>" target="_blank" rel="noopener noreferrer" aria-label="リンクを別タブで開く"><?= get_sub_field('url'); ?></a></li><?php endwhile; ?>
            </ul><?php endif; ?>
            <?php if(have_rows('works_credit_list')): ?>
            <ol class="p-works-credit-list"><?php while(have_rows('works_credit_list')): the_row(); ?>
              <li class="p-works-credit-list__item"><span class="p-works-credit-list__roll"><?= get_sub_field('roll'); ?></span><span class="p-works-credit-list__name"><?= get_sub_field('name'); ?></span></li><?php endwhile; ?>
            </ol><?php endif; ?>
          </article>
          <button class="c-works-slider__button c-works-slider__close-button c-works-information-modal__close-button js-works-slider__information-modal-close-button js-change-color-target js-hover" type="button" aria-label="情報モーダルを閉じる"></button>
        </div>
      </article>
    </div><?php if ( !is_single() ) : ?>
    <?php get_footer(); ?>
    <?php endif; ?>
    <?php wp_footer(); ?>
  </div>
</body></html>