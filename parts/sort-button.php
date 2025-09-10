<div class="c-sort"><div class="c-sort__wrap"><ul class="c-sort__category"><?php
$page_for_posts_id = get_option( 'page_for_posts' );
$posts_page_url = get_permalink( $page_for_posts_id );
?><li><a class="js-change-color-target js-hover <?php if(is_home() || is_front_page()){ echo 'is-active'; }; ?><?php if($is_dark_mode){ echo ' is-rev'; }; ?>" href="<?= $posts_page_url; ?>" aria-label="全てのカテゴリ一覧へ">all</a></li><?php
$categories = get_categories();
$current_cat = get_queried_object();
foreach ($categories as $category):
?><li><a class="js-change-color-target js-hover <?php if($current_cat->name == $category->name){ echo 'is-active'; }; ?><?php if($is_dark_mode){ echo ' is-rev'; }; ?>" href="<?= get_category_link($category->term_id); ?>" aria-label="<?= $category->name . 'でフィルター'; ?>"><?= $category->name; ?></a></li><?php endforeach; ?></ul><div class="c-sort__layout js-change-color-target <?php if($is_dark_mode){ echo ' is-rev'; }; ?>"><?php
// JavaScriptで設定されたレイアウト状態を確認
$is_list_layout = false;
if (isset($_COOKIE['layout_style']) && $_COOKIE['layout_style'] === 'list') {
   $is_list_layout = true;
}
?><button class="js-hover js-change-style__button js-change-style__button--tile" type="button" aria-label="タイルレイアウトにレイアウトを変更" aria-pressed="<?php echo $is_list_layout ? 'false' : 'true'; ?>">tile</button><span class="js-change-color-target js-change-style__arrow <?php if($is_list_layout){ echo 'is-list'; }; ?><?php if($is_dark_mode){ echo ' is-rev'; }; ?>"><svg fill="none" height="24" viewBox="0 0 28 24" width="28" xmlns="http://www.w3.org/2000/svg"><path d="m12.6064 1.39357c-.5857-.58579-1.5353-.58579-2.121 0l-9.545945 9.54593c-.585786.5858-.585786 1.5353 0 2.1211l9.545945 9.5459c.5857.5857 1.5353.5857 2.121 0 .5858-.5858.5858-1.5354 0-2.1211l-6.9853-6.9854h20.3789c.8284 0 1.5-.6716 1.5-1.5s-.6716-1.5-1.5-1.5h-20.3789l6.9853-6.98534c.5858-.58579.5858-1.53531 0-2.12109z" fill="#000"/></svg></span><button class="js-hover js-change-style__button js-change-style__button--list" type="button" aria-label="リストレイアウトにレイアウトを変更" aria-pressed="<?php echo $is_list_layout ? 'true' : 'false'; ?>">list</button></div></div></div>