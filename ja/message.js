function renderTip(template, context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }
        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;
        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
}

String.prototype.renderTip = function (context) {
    return renderTip(this, context);
};

var re = /x/;
console.log(re);
re.toString = function() {
    showMessage('ハハ、コンソールを開けたのは、私の秘密を見たいのですか。', 5000);
    return '';
};

$(document).on('copy', function (){
    showMessage('何をコピーしたのですか。転載には出典をつけてくださいね~~', 5000);
});

function initTips(){
    $.ajax({
        cache: true,
        url: `${live2d_Path}ja/message.json`,
        dataType: "json",
        success: function (result){
            $.each(result.mouseover, function (index, tips){
                $(tips.selector).mouseover(function (){
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.renderTip({text: $(this).text()});
                    showMessage(text, 3000);
                });
            });
            $.each(result.click, function (index, tips){
                $(tips.selector).click(function (){
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.renderTip({text: $(this).text()});
                    showMessage(text, 3000);
                });
            });
        }
    });
}
initTips();

(function (){
    var text;
    if(document.referrer !== ''){
        var referrer = document.createElement('a');
        referrer.href = document.referrer;
        text = 'ハイ！ <span style="color:#0099cc;">' + referrer.hostname + '</span>からの友人！';
        var domain = referrer.hostname.split('.')[1];
        if (domain == 'baidu') {
            text = 'ハイ！百度検索の友達から！<br>ようこそ<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }else if (domain == 'so') {
            text = 'ハイ！360検索の友達から！<br>ようこそ<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }else if (domain == 'google') {
            text = 'ハイ！グーグル検索の友達から！<br>ようこそ<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }
    }else {
        if (window.location.href == `${home_Path}`) { //主页URL判断，需要斜杠结尾
            var now = (new Date()).getHours();
            if (now > 23 || now <= 5) {
                text = 'あなたは夜型ですか。こんなに遅くまで寝ていないのに、明日起きたのですか。';
            } else if (now > 5 && now <= 7) {
                text = 'おはよう！一日の計は朝にあり、素晴らしい一日が始まる！';
            } else if (now > 7 && now <= 11) {
                text = 'おはようございます！仕事は順調ですか、長居しないで、たくさん起きて歩いてね！';
            } else if (now > 11 && now <= 14) {
                text = 'お昼になって、午前中仕事をして、今はランチタイムです！';
            } else if (now > 14 && now <= 17) {
                text = '午後は眠くなりやすいですね、今日の運動目標は達成しましたか？';
            } else if (now > 17 && now <= 19) {
                text = '夕方だ！窓の外の夕日の景色は美しいですね、最高ですが夕日が赤くて~~';
            } else if (now > 19 && now <= 21) {
                text = 'こんばんは、今日はどうでしたか。';
            } else if (now > 21 && now <= 23) {
                text = 'もうこんな時間だよ、早く休みなさい、おやすみなさい~~';
            } else {
                text = 'ハイ~早く遊びに来て!';
            }
        }else {
            text = 'ようこそ<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }
    }
    showMessage(text, 12000);
})();


function showMessage(text, timeout){
    if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
    //console.log('showMessage', text);
    $('.message').stop();
    $('.message').html(text).fadeTo(200, 1);
    if (timeout === null) timeout = 5000;
    hideMessage(timeout);
}

function hideMessage(timeout){
    $('.message').stop().css('opacity',1);
    if (timeout === null) timeout = 5000;
    $('.message').delay(timeout).fadeTo(200, 0);
}

