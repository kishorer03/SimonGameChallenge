let colors=["green","red","yellow","blue"];
let game_obj=[];
let rand;
let obt_colors;
let audio;

$(document).keypress(async()=>{

    let flag=0;
    while(flag==0){
        $("#level-title").text("LEVEL "+Number(game_obj.length+1)); 
        await time_();
    rand=Math.floor(Math.random()*4);
    obt_colors=colors[rand];
    animate(obt_colors);
    game_obj.push(obt_colors);
    for(let i=0;i<game_obj.length;i++){
        let butt=await mouse_press();
        if(game_obj[i]!=butt){
            game_obj=[];
            lost();
            setTimeout(()=>{
                $("#level-title").text("Press Any Key to Star");
            },500)
            flag=1;
            break;
        }
    }
}
})



function mouse_press(){
    return new Promise(resolve => {
        $(".btn").click((event)=>{
            animate(event.currentTarget.id);
            resolve(event.currentTarget.id);
        })
    })
}

function animate(obj){
    $("."+obj).addClass("animater");
    audio=new Audio("./sounds/"+obj+".mp3");
    audio.play();
    setTimeout(()=>{
        $("."+obj).removeClass("animater");
    },500)
}

function lost(){
    $("body").addClass("lost");
    setTimeout(()=>{
        $("body").removeClass("lost");        
    },500)

    let lost_aud=new Audio("./sounds/wrong.mp3");
    lost_aud.play();
}

function time_(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("Done");
        },1000)
    })
}
