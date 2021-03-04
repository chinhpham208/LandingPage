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

//slider
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
//---btn Next
document.querySelector('.btnctr.next').addEventListener('click',function(){
    if(currentSlider < listItemSlider.length - 1){
        goTo(currentSlider + 1);
    }
    else{
       goTo(0);
    }
});
//---btn Prev
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



