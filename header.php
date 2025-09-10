
<header class="l-header js-header" data-section="1">
  <div class="l-header__container js-header__container"><a class="l-header__link js-header__link js-hover js-avoid-reload" href="<?= home_url( '/' ); ?>" aria-label="ホームページに移動">unpis</a><?php  if (is_front_page()): ?>
    <?php
    // kv.pugで設定されたgestureを取得
    $kv_gesture = isset($GLOBALS['kv_gesture']) ? $GLOBALS['kv_gesture'] : '';
    ?>
    <div class="l-header__kv-note js-header__link js-change-color-target js-kv-note <?php if($is_dark_mode){ echo ' is-rev'; }; ?>" data-kv-gesture="<?= $kv_gesture; ?>"><svg fill="none" height="24" viewBox="0 0 28 24" width="28" xmlns="http://www.w3.org/2000/svg"><path d="m12.6064 1.39357c-.5857-.58579-1.5353-.58579-2.121 0l-9.545945 9.54593c-.585786.5858-.585786 1.5353 0 2.1211l9.545945 9.5459c.5857.5857 1.5353.5857 2.121 0 .5858-.5858.5858-1.5354 0-2.1211l-6.9853-6.9854h20.3789c.8284 0 1.5-.6716 1.5-1.5s-.6716-1.5-1.5-1.5h-20.3789l6.9853-6.98534c.5858-.58579.5858-1.53531 0-2.12109z" fill="#000"/></svg>
      <p class="js-kv-note__text"></p>
    </div>
    <button class="l-header__button l-header__button--arrow js-header__link js-kv-note__visible-target js-change-color-target js-hover js-scroll-to-btn js-is-in-kv is-hide <?php if($is_dark_mode){ echo ' is-rev'; }; ?>" type="button" aria-label="ワークス一覧へ移動" data-target="1"><svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m22.6066 11.3936c.5857.5857.5857 1.5353 0 2.121l-9.5459 9.5459c-.5858.5858-1.5353.5858-2.1211 0l-9.54593-9.5459c-.58579-.5857-.58579-1.5353 0-2.121.58578-.5858 1.5353-.5858 2.12109 0l6.98534 6.9853v-16.3789c0-.82843.6716-1.500001 1.5-1.500001s1.5.671571 1.5 1.500001v16.3789l6.9854-6.9853c.5858-.5858 1.5353-.5858 2.1211 0z" fill="#000"/></svg></button><?php endif; ?>
    <button class="l-header__button l-header__button--face js-header__link js-kv-note__visible-target js-change-color-btn js-hover <?php  if (is_front_page()){ echo 'js-is-in-kv is-hide'; }; ?>" type="button" aria-label="ダークモード・ライトモードを切り替え"><span class="l-header__button--face-wrapper"><img class="js-face-animation" src="<?php bloginfo('template_directory'); ?>/assets/img/face/<?php echo get_color_mode_state() ? 'dark-0.webp' : 'light-0.webp'; ?>" alt="Face"/><span><img src="<?php bloginfo('template_directory'); ?>/assets/img/face/beam.webp" alt="Face with Light"/></span></span></button><a class="l-header__link js-header__link js-hover js-avoid-reload" href="<?= home_url( '/about/' ); ?>" aria-label="Aboutページに移動">about</a>
  </div>
</header>