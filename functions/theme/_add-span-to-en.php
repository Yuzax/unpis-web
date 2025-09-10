<?php

/**
 * テキスト内の英語部分をspanタグで囲む関数
 * 
 * @param string $text 処理対象のテキスト
 * @param string $class_name spanタグに付与するクラス名（デフォルト: 'is-en'）
 * @return string 英語部分がspanタグで囲まれたテキスト
 */
function add_span_to_en($text, $class_name = 'is-en') {
    if (empty($text)) {
        return $text;
    }
    
    // HTMLタグで分割して処理
    $parts = preg_split('/(<[^>]+>)/', $text, -1, PREG_SPLIT_DELIM_CAPTURE);
    $result = '';
    
    foreach ($parts as $part) {
        // HTMLタグの場合はそのまま追加
        if (preg_match('/^<[^>]+>$/', $part)) {
            $result .= $part;
        } else {
            // テキスト部分の場合は英語・数字・記号を検出してspanで囲む
            $processed_part = preg_replace_callback('/([a-zA-Z0-9\s\-\'\.,:;!?\(\)×÷\+\=\*\/\%\&\#\@\$\^\~\`\[\]\{\}\|\\\\]+)/u', function($matches) use ($class_name) {
                $match = trim($matches[0]);
                
                // 空文字やスペースのみの場合はそのまま返す
                if (empty($match) || ctype_space($match)) {
                    return $matches[0];
                }
                
                // 英語、数字、記号が含まれているかチェック（日本語以外）
                if (preg_match('/[a-zA-Z0-9\-\'\.,:;!?\(\)×÷\+\=\*\/\%\&\#\@\$\^\~\`\[\]\{\}\|\\\\]/', $match)) {
                    return '<span class="' . esc_attr($class_name) . '">' . $match . '</span>';
                }
                
                return $match;
            }, $part);
            
            $result .= $processed_part;
        }
    }
    
    return $result;
}