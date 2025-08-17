<html class="js-change-color-target" lang="ja">
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