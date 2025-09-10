<?php

// ==========================================================================
// Clean Up
// ==========================================================================
require_once locate_template('functions/_cleanup.php');     // 不要なモノを削除する関数

// ==========================================================================
// Update
// ==========================================================================
require_once locate_template('functions/_update.php');     // wpのアップデートを定義する関数

// ==========================================================================
// Init
// ==========================================================================
require_once locate_template('functions/init/_add-styles.php');     // cssを読み込む関数
require_once locate_template('functions/init/_add-scripts.php');     // jsを読み込む関数
require_once locate_template('functions/init/_login-state.php');     // ログイン周りの関数
require_once locate_template('functions/init/_admin-menu.php');     // menu周りを管理する関数
require_once locate_template('functions/init/_admin-default-post.php');     // menu周りを管理する関数
require_once locate_template('functions/init/_option-page.php');     // オプションページを管理する関数
require_once locate_template('functions/init/_image-setting.php');     // 画像についての関数
require_once locate_template('functions/init/_admin-wysiwyg.php');     // wysiwygエディタについての関数
require_once locate_template('functions/init/_others.php');     // その他の初期設定関数

// ==========================================================================
// Theme
// ==========================================================================
require_once locate_template('functions/theme/_modify-wysiwyg.php');     // wysiwygタグを変更する関数
require_once locate_template('functions/theme/_get-theme-image.php');     // カテゴリを出力する関数
require_once locate_template('functions/theme/_infinite-scroll.php');     // 無限スクロール機能
require_once locate_template('functions/theme/_add-span-to-en.php');     // 無限スクロール機能
require_once locate_template('functions/theme/_color-mode.php');     // カラーモード取得関数

/* DON'T DELETE THIS CLOSING TAG */ ?>