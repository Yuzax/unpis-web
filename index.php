
<html lang="ja"></html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/><?php wp_head(); ?>
</head>
<body data-section="0" data-barba="wrapper">
  <div data-barba="container" data-barba-namespace="common"><?php get_header(); ?>
    <div>
      <section class="c-half-layout p-description js-fit-content">
        <div class="c-half-layout__item js-fit-content__container">
          <h3 class="p-description__title js-fit-content__item">
            <?php
            $title = get_field('description_title');
            if($title){
            echo $title;
            };
            ?>
          </h3><?php
          $text = get_field('description_text', false, false);
          if($text):
            $text = give_link_class($text);
          ?>
          <p class="p-description__text p-main-text js-fit-content__item"><?= $text; ?></p><?php endif; ?>
          <?php if(have_rows('member')): ?>
          <div class="p-description__member p-member js-fit-content__item">
            <h5 class="p-member__title">メンバー</h5>
            <ol class="p-member__list"><?php while(have_rows('member')): the_row(); ?>
              <li class="p-member__item"><span class="p-member__name"><?= get_sub_field('name'); ?></span><span class="p-member__information"><?= get_sub_field('information'); ?></span></li><?php endwhile; ?>
            </ol>
          </div><?php endif; ?>
        </div><?php $img_array = get_image_array('description_image'); ?>
        <div class="c-half-layout__item p-description__img js-fit-content__img" data-width="<?= $img_array['width']; ?>" data-height="<?= $img_array['height']; ?>">
          <div class="c-half-layout__img"><?php if($img_array != []): ?>
            <picture><img class="js-lazy" src="<?php bloginfo('template_directory'); ?>/assets/img/system/placeholder.webp" data-src="<?= $img_array['thumbnail']; ?>" data-srcset="<?= $img_array['thumbnail'] . ' 1x, ' . $img_array['medium'] . ' 2x, ' . $img_array['large'] . ' 3x'; ?>" alt="<?= $img_array['alt']; ?>"/></picture><?php endif; ?>
          </div>
        </div>
      </section>
      <article class="p-event-block js-fit-content js-fit-content--only-pc">
        <div class="p-event-block__wrapper js-fit-content__container">
          <h4 class="p-event-block__block-title js-fit-content__item">SYMPOSIUM</h4><?php
          $title = get_field('symposium_title');
          if($title):
          ?>
          <h2 class="p-event-block__event-title js-fit-content__item"><?= $title; ?></h2><?php endif; ?>
          <?php
          $img_array = get_image_array('symposium_image');
          if($img_array != []):
          ?>
          <div class="p-event-block__media js-fit-content__item">
            <div class="p-event-block__media-inner"><?php if($img_array != []): ?>
              <picture><img class="js-lazy" src="<?php bloginfo('template_directory'); ?>/assets/img/system/placeholder.webp" data-src="<?= $img_array['thumbnail']; ?>" data-srcset="<?= $img_array['thumbnail'] . ' 1x, ' . $img_array['medium'] . ' 2x, ' . $img_array['large'] . ' 3x'; ?>" alt="<?= $img_array['alt']; ?>"/></picture><?php endif; ?>
            </div>
          </div><?php endif; ?>
          <?php
          $text = get_field('symposium_text');
          if($text):
          ?>
          <p class="p-event-block__description p-main-text js-fit-content__item"><?= $text; ?></p><?php endif; ?>
          <?php
          $link = get_field('peatix_link');
          $text = get_field('peatix_link_text');
          if($link && $text):
          ?><a class="p-event-block__link js-hover" href="<?= $link; ?>" target="_blank" rel="noopener noreferrer"><span><?= $text; ?></span></a><?php endif; ?>
        </div>
      </article>
    </div><?php get_footer(); ?>
    <?php wp_footer(); ?>
  </div>
</body></html>