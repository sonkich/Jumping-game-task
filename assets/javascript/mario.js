$(function(){
   console.log("ready");
   // vars init

   var mario,flag,container,speed,bullets_count,shooting_interval,end,lives;
   // get from dom
   mario = $("#mario");
   wrapper = $("#wrapper");
   lives = $('#lives span');

   // vars descr
   flag = false;
   speed = 4;
   bullets_count= 20;
   end = false;

   // shooting
   function shooting(){

      var positions = [ "5px" , "50px" , "100px"];
      var rand = Math.floor((Math.random() * 3));
      var position = positions[rand];

      $("<div></div>").appendTo(wrapper).addClass('bul').css({
         bottom: position,
         right: '45px'
      });

      bullets_count--;
      $("#bullets p").html(bullets_count);

      if(bullets_count == 0){
         clearInterval(shooting_interval);
      }




   }

   shooting_interval = setInterval(shooting,2500);



   // bulet moove


   function move(){
      var bullets = $('.bul');

      for(var i = 0;i < bullets.length ; i ++){
         var bul = $(bullets[i]);
         var rightPosition = bul.css('right');
         rightPosition=parseInt(rightPosition) + speed;
         bul.css('right',rightPosition+"px");
         // check for hit
         if(rightPosition > 558 && rightPosition < 618){

            if(bul.css('bottom') == '5px'){
               if(parseInt($(mario).css('bottom')) < 5){

                  if(!bul.hasClass('hit')){

                     removeHeart();
                  }
                  bul.addClass('hit');
               }
            }else if(bul.css('bottom') == '50px'){


                if(parseInt($(mario).css('bottom')) > 50){
                  continue;
                }

               if(parseInt($(mario).css('height')) < 50){
                  continue;
               }

               if(!bul.hasClass('hit')){

                 removeHeart();
               }
               bul.addClass('hit');



            }else{
               if(parseInt($(mario).css('height')) < 100){
                  continue;
               }

               if(!bul.hasClass('hit')){

                 removeHeart();
               }
               bul.addClass('hit');
            }
         }

          // deleting at max
         if(rightPosition > 890){
            bul.remove();
         }
      }
   }

   // //remove live
   function removeHeart(){
      lives = $('#lives span');

      if($(lives).length > 1){
         $("#lives span:last").remove();
      }else{
         console.log("triggered");
         $("#lives span:last").remove();
         end = true;

      }
   }
   // check for end

   function checkEnd(){
      var bullets = $('.bul');

      if(bullets.length == 0 && bullets_count==0){
          end = true;
      }

      return end;
   }
   // game loop

   function gameLoop(){


      move();
      if(!checkEnd()){
         requestAnimationFrame(gameLoop);
      }else{
         if($('#lives span').length == 0){
            clearInterval(shooting_interval);
            $('#game-over').css('display','block');
         }else{
            $('#game-win').css('display','block');
         }
      }
   }

   requestAnimationFrame(gameLoop);

   // events
   $(document).keydown(function (e)  {

      // squat
      if(e.keyCode == 40){
         if(!flag){
            flag = true;

            mario.animate({
               height: '40px'
            },500,function(){
               mario.animate({
                  height: '120px'
               },500,function(){
                  flag = false;
               })
            })
         }
      }
      // jump
      if(e.keyCode == 38){
         if(!flag){
            flag = true;
            mario.animate({
               bottom: '100px'
            },500,function(){
               mario.animate({
                  bottom: '0'
               },500,function(){
                  flag = false;
               })
            })
         }
      }
   })
})
