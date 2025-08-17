
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
    <?php if ( is_front_page() ) : ?>
    <?php include get_template_directory() . '/parts/kv.php'; ?>
    <?php endif; ?>
    <?php get_header(); ?>
    <div class="l-container">
      <div data-section="1">
        <?php include get_template_directory() . '/parts/sort-button.php'; ?>
        <?php include get_template_directory() . '/parts/works-list.php'; ?>
      </div>
    </div><?php get_footer(); ?>
    <?php wp_footer(); ?>
  </div>
</body></html>