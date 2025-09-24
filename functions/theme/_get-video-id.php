<?php

// urlからyoutubeのvideo idを抽出する
function get_youtube_video_id($url) {
    if (empty($url)) {
        return '';
    }
    
    // URLからクエリパラメータを解析
    $parsed_url = parse_url($url);
    
    // クエリパラメータが存在する場合
    if (isset($parsed_url['query'])) {
        parse_str($parsed_url['query'], $query_params);
        
        // パラメータ'v'が存在する場合、その値を返す
        if (isset($query_params['v'])) {
            return $query_params['v'];
        }
    }
    
    // youtu.be形式のURLの場合（例: https://youtu.be/W0W6yh0uT2o）
    if (isset($parsed_url['host']) && $parsed_url['host'] === 'youtu.be') {
        return ltrim($parsed_url['path'], '/');
    }
    
    return '';
}

// urlからvimeoのvideo idを抽出する
function get_vimeo_video_id($url) {
    if (empty($url)) {
        return '';
    }
    
    // URLを解析
    $parsed_url = parse_url($url);
    
    // ホストがvimeo.comの場合
    if (isset($parsed_url['host']) && strpos($parsed_url['host'], 'vimeo.com') !== false) {
        // パスからビデオIDを抽出（最初のスラッシュ以降の数字部分）
        if (isset($parsed_url['path'])) {
            $path = ltrim($parsed_url['path'], '/');
            // 数字のみを抽出（例: "1027555793?autoplay=1" から "1027555793" を取得）
            if (preg_match('/^(\d+)/', $path, $matches)) {
                return $matches[1];
            }
        }
    }
    
    return '';
}

?>