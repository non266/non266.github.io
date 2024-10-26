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
    showMessage('Haha, you opened the console, do you want to see my secret?', 5000);
    return '';
};

$(document).on('copy', function (){
    showMessage('What have you copied? Remember to include the source when reprinting~~', 5000);
});

function initTips(){
    $.ajax({
        cache: true,
        url: `${live2d_Path}en/message.json`,
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
        text = 'Hi! come from <span style="color:#0099cc;">' + referrer.hostname + '</span> ' + 'friend!';
        var domain = referrer.hostname.split('.')[1];
        if (domain == 'baidu') {
            text = 'Hi! Friends from Baidu Search!<br>Welcome to visit<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }else if (domain == 'so') {
            text = 'Hi! Friends from 360 Search!<br>Welcome to visit<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }else if (domain == 'google') {
            text = 'Hi! Friends from Google Search!<br>Welcome to visit<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
        }
    }else {
        if (window.location.href == `${home_Path}`) { //主页URL判断，需要斜杠结尾
            var now = (new Date()).getHours();
            if (now > 23 || now <= 5) {
                text = 'Are you a night owl? You\'re still up so late, will you wake up tomorrow?';
            } else if (now > 5 && now <= 7) {
                text = 'Good morning The plan for the day lies in the morning, and a beautiful day is about to begin!';
            } else if (now > 7 && now <= 11) {
                text = 'Good morning! Is work going smoothly? Don\'t sit for long periods of time, get up and move around more!';
            } else if (now > 11 && now <= 14) {
                text = 'It\'s noon, I\'ve been working all morning, and now it\'s lunchtime!';
            } else if (now > 14 && now <= 17) {
                text = 'It\'s easy to feel sleepy in the afternoon. Have you achieved today\'s exercise goal?';
            } else if (now > 17 && now <= 19) {
                text = 'It\'s evening! The scenery of the sunset outside the window is very beautiful, and the most beautiful one is the sunset red~~';
            } else if (now > 19 && now <= 21) {
                text = 'Good evening, how was your day today?';
            } else if (now > 21 && now <= 23) {
                text = 'It\'s already so late, go to bed early and have a good night~~';
            } else {
                text = 'Hi~Come and play with me!';
            }
        }else {
            text = 'Welcome to visit<span style="color:#0099cc;">「 ' + document.title.split(' - ')[0] + ' 」</span>';
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

