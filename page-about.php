
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
      <?php
      $acceptLanguage = $_SERVER['HTTP_ACCEPT_LANGUAGE'];
      $lang_array = explode(',', $acceptLanguage);
      $is_jp = false;
      if (strpos($lang_array[0], 'ja') === 0){ $is_jp = true; }
      ?>
      <div class="c-about">
        <div class="c-about__arrow js-change-color-target">
          <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.6095 12.6064C23.1953 12.0207 23.1953 11.0711 22.6095 10.4854L13.0636 0.939453C12.4778 0.353666 11.5283 0.353666 10.9425 0.939453L1.3966 10.4854C0.81081 11.0711 0.81081 12.0207 1.3966 12.6064C1.98238 13.1922 2.93191 13.1922 3.51769 12.6064L10.503 5.62109L10.503 26C10.503 26.8284 11.1746 27.5 12.003 27.5C12.8315 27.5 13.503 26.8284 13.503 26L13.503 5.62109L20.4884 12.6064C21.0742 13.1922 22.0237 13.1922 22.6095 12.6064Z"></path>
          </svg>
        </div><?php if(get_field('jp_profile')): ?>
        <p class="c-about__profile-jp <?php if($is_jp){ echo 'is-active'; } ?>"><?= get_field('jp_profile'); ?></p><?php endif; ?>
        <?php if(get_field('en_profile')): ?>
        <p class="c-about__profile-en <?php if(!$is_jp){ echo 'is-active'; } ?>"><?= get_field('en_profile'); ?></p><?php endif; ?>
        <?php if(get_field('mail_address')): ?>
        <hr class="c-about__border js-change-color-target"/>
        <div class="c-about__mail">
          <button class="c-about__mail-button js-change-color-target js-hover js-copy-address" type="button" aria-label="メールアドレスをコピー"><?= get_field('mail_address'); ?></button>
        </div><?php endif; ?>
      </div>
    </div><?php if ( !is_single() ) : ?>
    <?php get_footer(); ?>
    <?php endif; ?>
    <?php wp_footer(); ?>
  </div>
</body></html>