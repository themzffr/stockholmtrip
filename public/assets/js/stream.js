
let widthFactor = 0;
let programList = document.querySelector('.program-list');
let streamingNowPlay = document.querySelector(".streaming-now-play");
let programListTop = document.querySelector(".program-list-top");
let nowLine = document.querySelector(".now-line");
programList.style.userSelect = 'none'; // text seçimlerini kapatmak


function pageWidthCalc() {
    let pageWidth = window.innerWidth;
    if (pageWidth < 767) {
        widthFactor = 6.03;
    } else {
        widthFactor = 7.95;
    }
}


function nowLineHeight() {
    let programListHeight = programList.offsetHeight;
    let programListWidth = programList.scrollWidth;
    nowLine.style.height = programListHeight+"px";
    programListTop.style.width = programListWidth+"px";
    
}

function nowLineFunction() {
    const now = new Date(); 
    const nowHours = now.getHours();  
    const nowMinute = now.getMinutes(); 
    let nowDates = (nowHours * 60 + nowMinute) * widthFactor;
    nowLine.style.left = nowDates+"px";
    

    streamingNowPlay.addEventListener("click", function() {
    
        programList.scrollLeft = nowDates - 100;
    
    });

}

function mouseDrag() {


    
        }

  



/* genişlik hesaplama alanı*/
function programWidth() {
    
    const programItem = $('.program-list-hourly');
    let datas = [];

    $('.program-list-item').each(function() {

        $(this).find('.program-list-hourly').each(function(index) {
            let data = $(this).attr('data-start-time');
            
            if ($(this).next().length > 0) {
                let data2 = $(this).next().attr('data-start-time');
                
                let streamStart = data; 
                let hoursAll = streamStart.split(':'); 
                let hours = parseInt(hoursAll[0]);  
                let minutes = parseInt(hoursAll[1]);  
                let startDates = (hours * 60 + minutes) * widthFactor;
                
                let streamStart2 = data2; 
                let hoursAll2 = streamStart2.split(':'); 
                let hours2 = parseInt(hoursAll2[0]);  
                let minutes2 = parseInt(hoursAll2[1]);  
                let allMinutes2 = (hours2 * 60 + minutes2) * widthFactor;
                
                
                let width = allMinutes2 - startDates;
                $(this).width(width);
                
                if(index === 0) {
                    $(this).css("margin-left",startDates)
                }

                datas.push(startDates);
                
            }
            
        });
        
    });
}

nowLineFunction();
setInterval(nowLineFunction, 1000);
mouseDrag();
programWidth();
nowLineHeight();



    
window.addEventListener("resize", function() {
    
    pageWidthCalc();
    programWidth();
    nowLineHeight();
});