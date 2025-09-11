<?php
// グローバル変数として設定
$is_dark_mode = get_color_mode_state();
$is_list_layout = get_layout_style_state();
?><html class="js-change-color-target js-change-style-target<?php if($is_dark_mode){ echo ' is-rev'; }; ?><?php if($is_list_layout){ echo ' is-list'; }; ?>" lang="ja"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="template-directory" content="<?php bloginfo("template_directory"); ?>"/><style>/* Critical Reset & Base CSS */
html,body,div,span,h1,h2,h3,h4,h5,h6,p,a,img,ol,ul,li{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}
body{line-height:1}ol,ul{list-style:none}
html{font-family:"Quicksand","Kosugi Maru",sans-serif;width:100%!important;height:100%!important;font-size:62.5%!important;-webkit-font-smoothing:antialiased!important;-webkit-text-size-adjust:none!important;-moz-text-size-adjust:none!important;-ms-text-size-adjust:none!important;text-size-adjust:none!important;-webkit-overflow-scrolling:touch;overscroll-behavior:none}
body{margin:0!important;width:100%!important;height:100%!important;-webkit-font-smoothing:antialiased!important;-webkit-text-size-adjust:none!important;-moz-text-size-adjust:none!important;-ms-text-size-adjust:none!important;text-size-adjust:none!important;position:relative;box-sizing:border-box;min-height:100%;-webkit-overflow-scrolling:touch;overscroll-behavior:none}
*{word-wrap:break-word;-webkit-tap-highlight-color:rgba(0,0,0,0);backface-visibility:hidden;-webkit-backface-visibility:hidden;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-text-size-adjust:none!important;-moz-text-size-adjust:none!important;-ms-text-size-adjust:none!important;text-size-adjust:none!important}
*:focus,*:hover{outline:none;border-color:transparent}
</style><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="crossorigin"/><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Kosugi+Maru&amp;family=Quicksand:wght@500;600;700&amp;display=block"/><link rel="preload" as="style" href="<?php bloginfo("template_directory"); ?>/assets/css/style.css?v=<?php echo date("YmdHis"); ?>"/><?php wp_head(); ?></head><body data-barba="wrapper" data-section="0"><div class="l-wrap" data-barba="container" data-barba-namespace="common"><?php if ( !is_single() && !is_404() ) : ?>
<?php if ( is_front_page() ) : ?>
<?php include get_template_directory() . '/parts/kv.php'; ?>
<?php endif; ?>
<?php get_header(); ?>
<?php endif; ?><div class="l-container"><div><?php include get_template_directory() . '/parts/sort-button.php'; ?>
<?php include get_template_directory() . '/parts/works-list.php'; ?>
<?php include get_template_directory() . '/parts/dancing-man.php'; ?></div></div><?php if ( !is_single() && !is_404() ) : ?>
<?php get_footer(); ?>
<?php endif; ?></div><?php wp_footer(); ?></body></html>