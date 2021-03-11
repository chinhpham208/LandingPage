////header
//scroll background header
let header = document.querySelector('header');
let slider = document.querySelector('.slider');
let heightSlider = slider.clientHeight;
let heightHeader = header.clientHeight;
function addBgHeader(){
    let scrollY = window.pageYOffset;
    if(scrollY > heightSlider-heightHeader)
    {
        header.classList.add('active');

    }
    else{
        header.classList.remove('active');
    }
}
//Back to top
let backTop = document.querySelector('.totop');
let backTopFooter = document.querySelector('.backtotop');
let getHeightWindow = window.innerHeight;
function backToTop(){
    let scrollY = window.pageYOffset;
    if(scrollY > getHeightWindow)
    {
        backTop.classList.add('active');

    }
    else{
        backTop.classList.remove('active');
    }
}
backTop.addEventListener('click',function(){
    window.scrollTo({
        top: 0
    });
});
backTopFooter.addEventListener('click',function(){
    window.scrollTo({
        top: 0
    });
});
document.addEventListener('scroll',function(){
    addBgHeader();
    backToTop();
});

//tags
let tagText = document.querySelectorAll('.news__tags .tag');
let tagList = document.querySelectorAll('.news__list');

tagText.forEach(function(item,index){
    item.addEventListener('click',function(){
        let tagId = index + 1;
        // console.log(tagId);
        tagText.forEach(function(tag){
            tag.classList.remove('active');
        });
        tagList.forEach(function(list){
            list.classList.remove('active');
        });
        item.classList.add('active');
        document.querySelector('.--tag' + tagId).classList.add('active');
    })
});

////////////////////////slider////////////////////////
let listItemSlider = document.querySelectorAll('.slider__list-item');
let currentSlider = 0;
let dot =document.querySelectorAll('.dotted li');
//---show Number
let numberSlider = document.querySelector('.number');
function showNum(index){
    numberSlider.innerHTML = (index).toString().padStart(2,'0');
}
//---default active
showNum(currentSlider + 1);
dot[currentSlider].classList.add('active');
// console.log(listItemSlider);
listItemSlider.forEach(function(itemSlider,index){
    if(itemSlider.classList.contains('active'))
    {
        // console.log(index);
        currentSlider = index;
    }
});
/*let $carouselSlider = $('.slider__list');
console.log($carouselSlider);
$$carouselSlider.flickity({
    // options
    cellAlign: 'left',
    contain: true,
    wrapAround: true,
    prevNextButtons: false,
    on:{
        ready: function(){
            let dotted = $('.flickity-page-dots');
            let paging = $('.slider__control .dotted');
            dotted.appendTo(paging);
        },
        change: function(index){
            let number = $('.slider__control .number');
            let indexPage = index + 1;
            number.text(indexPage.toString().padStart(2,0));
        }
    }
});
$('.slider__control .btn .btnctr.prev').on('click', function(){
    $carouselSlider.flickity('previous');
})
('.slider__control .btn .btnctr.next').on('click', function(){
    $carouselSlider.flickity('next');
})*/
///////---btn Next

document.querySelector('.btnctr.next').addEventListener('click',function(){
    if(currentSlider < listItemSlider.length - 1){
        goTo(currentSlider + 1);
    }
    else{
       goTo(0);
    }
});
/////---btn Prev

document.querySelector('.btnctr.prev').addEventListener('click',function(){
    if(currentSlider>0){
        goTo(currentSlider - 1);
    }
    else{
        goTo(listItemSlider.length - 1);
       
    }
});
dot.forEach(function(li,index){
    li.addEventListener('click',function(){
        goTo(index);
    });
});
function goTo(index){
    listItemSlider[currentSlider].classList.remove('active');
    listItemSlider[index].classList.add('active');
    dot[currentSlider].classList.remove('active');
    dot[index].classList.add('active');
    currentSlider = index;
    showNum(currentSlider + 1);
}

//Menu
let menus = document.querySelectorAll('header .menu a');
let sections = [];
function removeActiveMenu(){
    menus.forEach(function(menu_item,menu_index){
        menu_item.classList.remove('active');
    });
}

menus.forEach(function(item,index){
    let className = item.getAttribute('href').replace('#','');
    let section = document.querySelector('.' + className);
    sections.push(section);
    item.addEventListener('click',function(e){
        e.preventDefault();
        window.scrollTo({
            top: section.offsetTop - heightHeader + 1,
        });
        removeActiveMenu();
        item.classList.add('active');
    });
});
window.addEventListener('scroll',function(e){
    let positionScroll = window.pageYOffset;
    sections.forEach(function(section,index){
        if(positionScroll > section.offsetTop - heightHeader && positionScroll < section.offsetTop + section.offsetHeight)
        {
            removeActiveMenu();
            menus[index].classList.add('active');
        }
        else{
            menus[index].classList.remove('active');
        }
    })
});

//pop up video
let btnVideo = document.querySelectorAll('.video__item-img');
let popupVideo = document.querySelector('.popup-video');
let closePopup = document.querySelector('.close');
let iframe=document.querySelector('iframe');
btnVideo.forEach(function(btn){
    btn.addEventListener('click',function(){
        let video_id = btn.getAttribute('data-video-id');
        iframe.setAttribute('src','https://www.youtube.com/embed/'+ video_id);
        // console.log(video_id);
        popupVideo.style.display = 'flex';
    });
});
closePopup.addEventListener('click', function() {
    iframe.setAttribute('src','');
    popupVideo.style.display = 'none';
});
document.querySelector('.popup-video').addEventListener('click',function(){
    iframe.setAttribute('src','');
    popupVideo.style.display = 'none';
})

//nav

let navSlide = function(){
    let burger = document.querySelector('.btnmenu');
    let nav = document.querySelector('.nav');
    let navLinks = document.querySelectorAll('.nav a');
    let sections_nav =[];
    //toggle Nav
    function toggleNav(){
        burger.classList.toggle('active');
        nav.classList.toggle('active');
    }
    burger.addEventListener('click',function(){
        toggleNav();
    })
    navLinks.forEach(function(link,index){
        let className_nav = link.getAttribute('href').replace('#','');
        let section_nav = document.querySelector('.' + className_nav);
        sections_nav.push(section_nav);
        link.addEventListener('click',function(n){
            n.preventDefault();
            window.scrollTo({
                top: section_nav.offsetTop - heightHeader + 1,
            });
            toggleNav();
            link.classList.add('active');
        });
        
    });
}
navSlide();
/************Popup Gallery***************/
var initPhotoSwipeFromDOM = function(gallerySelector) {
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;
        for(var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            if(figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute('data-size').split('x');
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if(figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML; 
            }
            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 
            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if(!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }
            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if(index >= 0) {
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};
        if(hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }
        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };
    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function(index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },
            showAnimationDuration : 0,
            hideAnimationDuration : 0
        };
        if(fromURL) {
            if(options.galleryPIDs) {
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if( isNaN(options.index) ) {
            return;
        }
        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    var galleryElements = document.querySelectorAll(gallerySelector);
    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};
$(window).on('load',function () {
    initPhotoSwipeFromDOM('.gallery__grid');
})
/************Flickity***********/
// let $carousels = $('.photos__item');
// console.log($carousels);
// $carousels.flickity({
//     //options
//     cellAlign: 'left',
//     contain: true,
//     wrapAround: true
// });
$('.photos__item').flickity({
    // options
    cellAlign: 'left',
    contain: true,
    wrapAround: true
  });


