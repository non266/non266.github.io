function initLive2d (){
    $('.hide-live2d-button').fadeOut(0).on('click', () => {
        $('#landlord').css('display', 'none')
    })
    $('#landlord').hover(() => {
        $('.hide-live2d-button').fadeIn(600)
    }, () => {
        $('.hide-live2d-button').fadeOut(600)
    })
}
initLive2d();
loadlive2d("live2d", live2d_Path + "model/tia/model.json");
