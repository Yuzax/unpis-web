
<header>
  <section class="c-half-layout p-header js-fit-content">
    <div class="c-half-layout__item p-header__item js-fit-content__container">
      <h1 class="p-header__title js-fit-content__item">
        <?php
        $title = get_field('header_text', 'option');
        if($title):
        ?><span class="p-header__title-text"><?= $title; ?></span><?php endif; ?>
        <?php
        $main_img = get_field('header_svg', 'option');
        if($main_img):
        ?><img class="p-header__title-img" src="<?= $main_img; ?>" alt="&lt;?= $title; ?&gt;"/><?php endif; ?>
      </h1>
    </div><?php $img_array = get_image_array('header_img', 'option'); ?>
    <div class="c-half-layout__item p-header__item js-fit-content__img" data-width="<?= $img_array['width']; ?>" data-height="<?= $img_array['height']; ?>">
      <div class="c-half-layout__img"><?php if($img_array != []): ?>
        <picture><img class="js-lazy" src="<?php bloginfo('template_directory'); ?>/assets/img/system/placeholder.webp" data-src="<?= $img_array['thumbnail']; ?>" data-srcset="<?= $img_array['thumbnail'] . ' 1x, ' . $img_array['medium'] . ' 2x, ' . $img_array['large'] . ' 3x'; ?>" alt="<?= $img_array['alt']; ?>"/></picture><?php endif; ?>
      </div>
    </div>
    <div class="p-header__button">
      <button class="p-header__button-body js-hover js-scroll-to-btn" data-target="1"><span>本講座に関するお問い合わせ｜↓</span></button>
    </div>
  </section>
</header>