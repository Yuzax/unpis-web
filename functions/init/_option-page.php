<?php
/*
 ACFにOption Pageを追加
*/
if( function_exists('acf_add_options_page') ) {
	acf_add_options_page(array(
		'page_title' 	=> '共通項目設定',
		'menu_title'	=> '共通項目設定',
		'menu_slug' 	=> 'theme-options',
		'capability'	=> 'edit_posts',
		'parent_slug'	=> '',
		'position'	=> false,
		'redirect'	=> true,
        'show_in_graphql' => true
	),);
}
?>
