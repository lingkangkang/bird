

window.onload=function(){
    var kongxi=150;
    var canvas=document.getElementById('canvas');
    var context=canvas.getContext('2d');
    var background={
        positionX:0,
        positionY:0,
        width:288,
        height:512,
        bgImage:(function(){
            var a=new Image();
            a.src='img/bg_night.png';
            return a;
        }()),//��������ʱ,���Զ�ִ���Ե��ú���,
        draw:function(){
            var _this=this;
                context.drawImage(this.bgImage, _this.positionX, _this.positionY, _this.width, _this.height);
        }
    }

    var obstruction={
        positionX:288,
        positionY:Math.floor(Math.random()*279-278),//���������������ӵ�yֵҪ�ǵ���-320��,��ô��������ӻ��������п�϶,����bug,����Ҫ��y����СֵΪ-228,��ô���������һ�������پ�����п�϶
        width:50,
        createImg:(function(){
           var imgs=[];
            var images=['img/pipe_down.png','img/pipe_up.png'];
            for(var i=0;i<images.length;i++){
                var a=new Image();
                a.src=images[i];
                imgs.push(a);
            }
            return imgs;
        })(),
        draw :function(){
            this.positionX-=5;
            context.drawImage(this.createImg[0],this.positionX,this.positionY,52,320);
            context.drawImage(this.createImg[1],this.positionX,this.positionY+320+kongxi,52,320);
            if(this.positionX<=-52){
                this.positionX=288;
                this.positionY=Math.floor(Math.random()*279-278);
            }
        }
    }

    var bird={
        positionX:80,
        positionY:150,
        width:37,
        height:30,
        images:['img/bird0_0.png','img/bird0_1.png','img/bird0_2.png'],
        index:0,//��ǰ�ǵڼ���ͼƬ
        wing :setInterval(function(){
            bird.index++;
        },200),
        currentImg:function(){
            var a=new Image();
            a.src=this.images[this.index%3];
            //this.index++;
            return a;
        },
        draw:function(){
            this.bgImage=this.currentImg();
            this.positionY+=5;
            context.drawImage(this.bgImage,5,10,37,30, this.positionX, this.positionY, this.width, this.height);
        },
        clearTime:function(){
            clearInterval(this.wing);
        }
    }

    var zongshijian={
        positionX:119,
        positionY:100,
        i:0,
        index:setInterval(function(){
            zongshijian.i++;
        },1000),
        draw:function(){
            context.fillStyle='red';
            context.font='50px simsun';
            context.fillText(this.i,this.positionX,this.positionY);
        },
        clearTime:function(){
            clearInterval(this.index);
        }
    }

    function drawAll(){
        context.clearRect(0,0,288,512);
        background.draw();
        obstruction.draw();
        //zongshijian.draw();
        bird.draw();
    }
    function judge(){

        var img=new Image();
        img.src='img/text_game_over.png';
        if(bird.positionY<=0){
            clearInterval(timer);
            bird.clearTime();
            context.drawImage(img,46,230196,52);
        }

        if(bird.positionY+bird.height>=512){
            clearInterval(timer);
            zongshijian.clearTime();
            bird.clearTime();
            context.drawImage(img,46,230,196,52);
        }

        if(bird.positionX+bird.width>=obstruction.positionX && bird.positionX<=obstruction.positionX+obstruction.width&&bird.positionY<=obstruction.positionY+320){
            clearInterval(timer);
            zongshijian.clearTime();
            bird.clearTime();
            context.drawImage(img,46,230,196,52);
        }
        if(bird.positionX+bird.width>=obstruction.positionX&&bird.positionX<=obstruction.positionX+obstruction.width&&bird.positionY+bird.height>=obstruction.positionY+320+kongxi){
            clearInterval(timer);
            zongshijian.clearTime();
            bird.clearTime();
            context.drawImage(img,46,230,196,52);
        }
    }
   var timer=setInterval(function(){
       drawAll();
       judge();
   },30)
    document.onkeydown=function(e){
        e=e||window.event;
        var keycode= e.keyCode|| e.which;
        if(keycode==32){//������ո�ʱ�Ĳ���
            bird.positionY-=50;
        }
    }
}
