<!DOCTYPE html><?php
// グローバル変数として設定
$is_dark_mode = get_color_mode_state();
$is_list_layout = get_layout_style_state();
?><html class="js-change-color-target js-change-style-target<?php if($is_dark_mode){ echo ' is-rev'; }; ?><?php if($is_list_layout){ echo ' is-list'; }; ?>" lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="template-directory" content="<?php bloginfo("template_directory"); ?>">
  <style>
    /* Critical Reset & Base CSS */
    html,body,div,span,h1,h2,h3,h4,h5,h6,p,a,img,ol,ul,li{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}
    body{line-height:1}ol,ul{list-style:none}
    html{font-family:"Quicksand","Kosugi Maru",sans-serif;width:100%!important;height:100%!important;font-size:62.5%!important;-webkit-font-smoothing:antialiased!important;-webkit-text-size-adjust:none!important;-moz-text-size-adjust:none!important;-ms-text-size-adjust:none!important;text-size-adjust:none!important;-webkit-overflow-scrolling:touch;overscroll-behavior:none}
    body{margin:0!important;width:100%!important;height:100%!important;-webkit-font-smoothing:antialiased!important;-webkit-text-size-adjust:none!important;-moz-text-size-adjust:none!important;-ms-text-size-adjust:none!important;text-size-adjust:none!important;position:relative;box-sizing:border-box;min-height:100%;-webkit-overflow-scrolling:touch;overscroll-behavior:none}
    *{word-wrap:break-word;-webkit-tap-highlight-color:rgba(0,0,0,0);backface-visibility:hidden;-webkit-backface-visibility:hidden;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-text-size-adjust:none!important;-moz-text-size-adjust:none!important;-ms-text-size-adjust:none!important;text-size-adjust:none!important}
    *:focus,*:hover{outline:none;border-color:transparent}
    
  </style>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Kosugi+Maru&amp;family=Quicksand:wght@500;600;700&amp;display=block">
  <link rel="preload" as="style" href="<?php bloginfo("template_directory"); ?>/assets/css/style.css?v=<?php echo date("YmdHis"); ?>"><?php wp_head(); ?>
</head>
<body data-barba="wrapper" data-section="0">
  <div class="l-wrap" data-barba="container" data-barba-namespace="common">
    <?php if ( !is_single() && !is_404() ) : ?>
    <?php if ( is_front_page() ) : ?>
    <?php include get_template_directory() . '/parts/kv.php'; ?>
    <?php endif; ?>
    <?php get_header(); ?>
    <?php endif; ?>
    <div class="l-container">
      <article class="c-works-slider">
        <h1 class="c-works-slider-item__title c-works-slider__hide-target js-works-slider__hide-target"><span><?= add_span_to_en(get_the_title()); ?></span></h1><?php
        $index = 0;
        if(have_rows('works_slider')):
        while(have_rows('works_slider')): the_row();
        ?>
        <div class="c-works-slider-item js-works-slider__item js-works-slider-image-fit__wrap <?php if($index != 0) echo 'is-hide'; ?>">
          <div class="c-works-slider-item__media <?php if(get_sub_field('description')){ echo 'c-works-slider-item__image--with-description'; } ?>">
            <?php
            if(get_sub_field('type') == 'image'):
             $image_array = get_image_array(get_sub_field('image'));
            ?><img class="js-works-slider-image-fit__img js-img-load" alt="<?= get_the_title() . ' image'; ?>" width="<?= $image_array['width']; ?>" height="<?= $image_array['height']; ?>" src="<?= $image_array['small']; ?>" srcset="<?= $image_array['small'] . ' 375w, ' . $image_array['thumbnail'] . ' 750w, ' . $image_array['medium'] . ' 1500w, ' . $image_array['large'] . ' 3000w'; ?>" sizes="100vw"><?php
            elseif(get_sub_field('type') == 'gif'):
             $image_array = get_image_array(get_sub_field('image'), false);
            ?><img class="js-img-load" alt="<?= get_the_title() . ' image'; ?>" width="<?= $image_array['width']; ?>" height="<?= $image_array['height']; ?>" src="<?= $image_array['full']; ?>" sizes="100vw"><?php
            elseif(get_sub_field('type') == 'youtube'):
              $video_id = get_youtube_video_id(get_sub_field('url'));
            ?>
            <div class="c-works-slider-item__video-wrap js-yt-player__video-wrap">
              <div class="c-works-slider-item__video c-works-slider-item__video--youtube js-yt-player" data-video-id="<?= $video_id; ?>" data-auto-play="<?= get_sub_field('auto_play'); ?>" data-aspect-ratio="<?= get_sub_field('aspect_ratio'); ?>"></div><?php if(!$is_auto_play): ?>
              <button class="c-works-slider__button c-works-slider__play-button js-yt-player__play-button js-change-color-target js-hover <?php if($is_dark_mode){ echo 'is-rev'; }; ?>" type="button" aria-label="動画を再生する"><svg fill="none" height="22" viewBox="0 0 22 22" width="22" xmlns="http://www.w3.org/2000/svg"><path d="m21.5 11c0 .5764-.3303 1.1017-.8496 1.3516l-18.00001 8.6601c-.46463.2236-1.01163.1932-1.44824-.081-.4367-.2745-.702151-.7547-.702151-1.2705l.000001-17.32033c0-.51581.265451-.996.70215-1.27051.43661-.274202.98362-.304594 1.44824-.081052l18.00001 8.660162.0947.0498c.4645.2657.7549.76123.7549 1.30173zm-18-6.27439v12.54879l13.041-6.2744z"/></svg></button><?php endif; ?>
            </div><?php
            elseif(get_sub_field('type') == 'vimeo'):
              $video_id = get_vimeo_video_id(get_sub_field('url'));
            ?>
            <div class="c-works-slider-item__video-wrap js-vimeo-player__video-wrap">
              <div class="c-works-slider-item__video c-works-slider-item__video--vimeo js-vimeo-player" data-video-id="<?= $video_id; ?>" data-auto-play="<?= get_sub_field('auto_play'); ?>" data-aspect-ratio="<?= get_sub_field('aspect_ratio'); ?>"></div><?php if(!$is_auto_play): ?>
              <button class="c-works-slider__button c-works-slider__play-button js-vimeo-player__play-button js-change-color-target js-hover <?php if($is_dark_mode){ echo 'is-rev'; }; ?>" type="button" aria-label="動画を再生する"><svg fill="none" height="22" viewBox="0 0 22 22" width="22" xmlns="http://www.w3.org/2000/svg"><path d="m21.5 11c0 .5764-.3303 1.1017-.8496 1.3516l-18.00001 8.6601c-.46463.2236-1.01163.1932-1.44824-.081-.4367-.2745-.702151-.7547-.702151-1.2705l.000001-17.32033c0-.51581.265451-.996.70215-1.27051.43661-.274202.98362-.304594 1.44824-.081052l18.00001 8.660162.0947.0498c.4645.2657.7549.76123.7549 1.30173zm-18-6.27439v12.54879l13.041-6.2744z"/></svg></button><?php endif; ?>
            </div><?php endif; ?>
          </div><?php if(get_sub_field('description')): ?>
          <div class="c-works-slider-item__description c-works-slider__hide-target c-works-slider__hide-target--light-color js-works-slider__hide-target">
            <p><?= add_span_to_en(get_sub_field('description')); ?></p>
          </div><?php endif; ?>
        </div><?php
        $index += 1;
        endwhile; endif;
        ?><a class="c-works-slider__button c-works-slider__close-button c-works-slider__hide-target js-works-slider__hide-target js-change-color-target js-works-close-button js-hover <?php if($is_dark_mode){ echo ' is-rev'; }; ?>" href="<?= home_url( '/' ); ?>" aria-label="ホームページに移動"></a>
        <div class="c-works-slider__button-wrap">
          <button class="c-works-slider__button c-works-slider__handle c-works-slider__hide-target js-works-slider__left-handle js-works-slider__hide-target js-change-color-target js-hover is-disable <?php if($is_dark_mode){ echo ' is-rev'; }; ?>" type="button" aria-label="前の画像を表示する"><svg fill="none" height="24" viewBox="0 0 28 24" width="28" xmlns="http://www.w3.org/2000/svg"><path d="m12.6064 1.39357c-.5857-.58579-1.5353-.58579-2.121 0l-9.545945 9.54593c-.585786.5858-.585786 1.5353 0 2.1211l9.545945 9.5459c.5857.5857 1.5353.5857 2.121 0 .5858-.5858.5858-1.5354 0-2.1211l-6.9853-6.9854h20.3789c.8284 0 1.5-.6716 1.5-1.5s-.6716-1.5-1.5-1.5h-20.3789l6.9853-6.98534c.5858-.58579.5858-1.53531 0-2.12109z" fill="#000"/></svg></button>
          <button class="c-works-slider__button c-works-slider__information c-works-slider__hide-target js-works-slider__information-button js-works-slider__hide-target js-change-color-target js-hover <?php if($is_dark_mode){ echo ' is-rev'; }; ?>" type="button" aria-label="ワークスの詳細情報を表示する"><svg fill="none" height="21" viewBox="0 0 4 21" width="4" xmlns="http://www.w3.org/2000/svg"><g fill="#000"><path d="m3.5 19c0 .8284-.67157 1.5-1.5 1.5s-1.499999-.6716-1.499999-1.5l-.000001-10c0-.82843.67157-1.5 1.5-1.5s1.5.67157 1.5 1.5z"/><path d="m4 2c0 1.10457-.89543 2-2 2s-2-.89543-2-2 .89543-2 2-2 2 .89543 2 2z"/></g></svg></button>
          <button class="c-works-slider__button c-works-slider__handle js-works-slider__right-handle c-works-slider__handle--right c-works-slider__hide-target js-works-slider__hide-target js-change-color-target js-hover <?php if($index == 1){ echo 'is-disable';}; ?><?php if($is_dark_mode){ echo ' is-rev'; }; ?>" type="button" aria-label="次の画像を表示する"><svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m11.3936 1.39356c.5857-.585783 1.5353-.585783 2.121 0l9.5459 9.54594c.5858.5857.5858 1.5353 0 2.1211l-9.5459 9.5459c-.5857.5857-1.5353.5857-2.121 0-.5858-.5858-.5858-1.5354 0-2.1211l6.9853-6.9854h-16.3789c-.82843 0-1.5-.6716-1.5-1.5s.67157-1.5 1.5-1.5h16.3789l-6.9853-6.98534c-.5858-.58579-.5858-1.53531 0-2.1211z" fill="#000"/></svg></button>
        </div>
        <div class="c-works-information-modal js-works-information-modal js-works-slider__information-modal js-change-color-target <?php if($is_dark_mode){ echo ' is-rev'; }; ?>">
          <article class="c-works-information-modal__container js-works-information-modal__container">
            <div class="c-works-information-modal__title-wrap">
              <h2 class="c-works-information-modal__title"><?= add_span_to_en(get_the_title()); ?></h2><?php if(get_field('works_remarks')): ?>
              <p class="c-works-information-modal__remarks"><?= add_span_to_en(get_field('works_remarks')); ?></p><?php endif; ?>
            </div><?php if(get_field('works_description')): ?>
            <p class="c-works-information-modal__description"><?= add_span_to_en(get_field('works_description')); ?></p><?php endif; ?>
            <?php if(have_rows('links')): ?>
            <ul class="c-works-information-modal__link-list"><?php while(have_rows('links')): the_row(); ?>
              <li class="p-works-link"><a class="p-works-link__body js-change-color-target js-hover <?php if($is_dark_mode){ echo ' is-rev'; }; ?>" href="<?= get_sub_field('url'); ?>" target="_blank" rel="noopener noreferrer" aria-label="リンクを別タブで開く">
                  <?php
                  if(get_sub_field('text')) echo get_sub_field('text');
                  else echo get_sub_field('url');
                  ?></a></li><?php endwhile; ?>
            </ul><?php endif; ?>
            <?php if(have_rows('works_credit_list')): ?>
            <div class="c-works-information-modal__credit-list">
              <ul class="p-works-credit"><?php while(have_rows('works_credit_list')): the_row(); ?>
                <li class="p-works-credit__item"><span class="p-works-credit__role"><?= add_span_to_en(get_sub_field('roll')); ?></span><span class="p-works-credit__separator"></span><span class="p-works-credit__name"><?= add_span_to_en(get_sub_field('name')); ?></span></li><?php endwhile; ?>
              </ul>
            </div><?php endif; ?>
            <button class="c-works-slider__button c-works-slider__close-button c-works-information-modal__close-button js-works-slider__information-modal-close-button js-change-color-target js-hover js-works-information-modal__button <?php if($is_dark_mode){ echo ' is-rev'; }; ?>" type="button" aria-label="情報モーダルを閉じる"></button>
          </article>
        </div>
      </article>
    </div><?php if ( !is_single() && !is_404() ) : ?>
    <?php get_footer(); ?>
    <?php endif; ?>
  </div><?php wp_footer(); ?>
</body></html>