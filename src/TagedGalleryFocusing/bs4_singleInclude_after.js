$(document).ready(function () {
    initTaggedGallery();
});

function initTaggedGallery() {
    resolveSelected($('.tag-selector.active'));
    $('.tag-selector').click(function () {
        resolveSelected($(this));
    });
}

function resolveSelected(button) {
    let galleryWrapper = button.parent().parent().find('.taggedGallery');
    let tagId = button.data('show-images-tag');
    let buttons = button.parent().find('.tag-selector');
    buttons.each(function () {
        $(this).removeClass('active');
    })
    button.addClass('active');
    let allImages = galleryWrapper.find('[data-show-images]');
    if (tagId === 'all') {
        allImages.each(function () {
            $(this).parent().show();
        });
    } else {
        allImages.each(function () {
            $(this).parent().hide();
        });
        allImages.each(function () {
            let element = $(this);
            let regular = new RegExp(tagId + '(?!\\S)');
            if (regular.test(element.data('show-images'))) {
                element.parent().show();
            }
        });
    }
}
