<footer data-section="1"><div class="c-half-layout js-fit-content js-fit-content--only-pc"><div class="c-half-layout__item c-half-layout__item--vertical"><div class="c-vertical-half"><?php $news_group = get_field('news_letter', 'option'); ?><div class="c-vertical-half__item p-news-letter js-fit-content__container"><?php
$text = $news_group['description'];
if($text):
?><div class="p-news-letter__text p-main-text js-fit-content__item"><?= $text; ?></div><?php endif; ?>
<?php
$link = $news_group['link_url'];
$text = $news_group['link_text'];
if($link && $text):
?><div class="p-news-letter__link js-fit-content__item"><a class="p-news-letter__link-body js-hover" href="<?= $link; ?>" target="_blank" rel="noopener noreferrer"><span><?= $text; ?></span></a></div><?php endif;?>
<?php
$note = $news_group['note'];
if($note):
?><p class="p-news-letter__note p-note-text js-fit-content__item"><?= $note; ?></p><?php endif; ?></div><?php $contact_group = get_field('contact_and_links', 'option'); ?><div class="c-vertical-half__item p-contact-group js-fit-content__container"><?php
$text = $contact_group['contact_text'];
if($text):
?><div class="p-contact-group__text p-main-text js-fit-content__item"><?= $text; ?></div><?php endif; ?>
<?php
$related_links = $contact_group['related_links'];
if($related_links):
?><h5 class="p-contact-group__link-title js-fit-content__item">関連リンク</h5><ol class="p-contact-group__link-list js-fit-content__item"><?php
  foreach($related_links as $related_link):
      $link = $related_link['link'];
      $text = $related_link['name'];
      if($link && $text):
?><li class="p-contact-group__link-item"><a class="js-hover" href="<?= $link; ?>" target="_blank" rel="noopener noreferrer"><span><?= $text; ?></span></a></li><?php endif; endforeach; ?></ol><?php endif; ?></div></div></div><div class="c-half-layout__item c-half-layout__item--only-pc"><?php $img_array = get_image_array('footer_image', 'option'); ?><div class="c-half-layout__img"><?php if($img_array != []): ?><picture><img class="js-lazy" src="<?php bloginfo('template_directory'); ?>/assets/img/system/placeholder.webp" data-src="<?= $img_array['thumbnail']; ?>" data-srcset="<?= $img_array['thumbnail'] . ' 1x, ' . $img_array['medium'] . ' 2x, ' . $img_array['large'] . ' 3x'; ?>" alt="<?= $img_array['alt']; ?>"/></picture><?php endif; ?></div></div></div></footer>