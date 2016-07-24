$(function(){
    // 关闭广告图
    var close=$(".close")[0];
    var guanggao=$(".guanggao-box")[0];
    close.onclick=function(){
        guanggao.style.display="none";
    }
    var flag=true;
    // banner 的轮播
	var imgBox=$(".img-box")[0];
	var as=$("a",imgBox);
	var btns=$(".btn-box")[0];
	var lis=$("li",btns);
	var index=0;
	var t=setInterval(wheel,2000)
	function wheel(){
        if(!flag){
            return;
        }
        flag=false;
        index++;
        if(index>as.length-1){
        	index=0;
        }
        for (var i = 0; i < as.length; i++) {
        	animate(as[i],{opacity:0});
        	lis[i].style.background="";
        };
        lis[index].style.background="#b61b1f";
        animate(as[index],{opacity:1},function(){
            flag=true;
        });
	}
	//banner 鼠标经过事件
	var imgBg=$(".imgbox")[0];
	imgBg.onmouseover=function(){
		clearInterval(t);
	}
	imgBg.onmouseout=function(){
		t=setInterval(wheel,3000)
	}

	//banner 左右按钮单击事件
	var rbtn=$(".right-btn")[0];
	var lbtn=$(".left-btn")[0];
	rbtn.onclick=function(){
		wheel();
	}
	lbtn.onclick=function(){
        if(!flag){
            return;
        }
        flag=false;
		index--;
		if(index<0){
			index=as.length-1;
		}
		for (var i = 0; i < as.length; i++) {
             animate(as[i],{opacity:0});
             lis[i].style.background="";
		};
		animate(as[index],{opacity:1},function(){
            flag=true;
        });
        lis[index].style.background="#b61b1f";
	}
	//banner 小圆点轮播事件
	for (var i = 0; i < lis.length; i++) {
		lis[i].index=i;
		lis[i].onmouseover=function(){
			for (var j = 0; j < lis.length; j++) {
				 lis[j].style.background="";
				 animate(as[j],{opacity:0});
			};
			lis[this.index].style.background="#b61b1f";
			animate(as[this.index],{opacity:1});
			index=this.index;
		}
	};


    // 生活服务的选项卡
    var banhua=$(".ban-hua",$(".bg-top")[0]);  //上 
    var asli=$("li",$(".ul-title")[0]);
    var huaUlT=$(".ul-2")[0];  //下
    // console.log(huaUlT);
    var huaUlB=$(".hua-ul",$(".ul-2")[0]);
    for (var i = 0; i < banhua.length; i++) {    
        banhua[i].onmouseover=function(){
            animate(huaUlT,{top:0},300);
        }
        var closeT=$(".closeT",huaUlB[i])[0];
        closeT.onclick=function(){
            animate(huaUlT,{top:209},300);
        }
    };  
    for (var i = 0; i < asli.length; i++) {
        asli[i].asindex=i;
        asli[i].onmouseover=function(){
            for (var j = 0; j < huaUlB.length; j++) {
                huaUlB[j].style.display="none";
                asli[j].className="";
            };
            huaUlB[this.asindex].style.display="block";
            asli[this.asindex].className="ul-style";
        }
    };


    // 生活的服务的小选项卡
    var huaUl=$(".hua-ul");
    var lifeLis,huaBox;
    for (var i = 0; i < huaUl.length; i++) {
        lifeLis=$("a",$(".hua-top")[i]);
        huaBox=$(".hua-content",$(".hua-bottom")[i]);
        lifeXuan(lifeLis,huaBox);
    };
    function lifeXuan(life,hua){
        for (var i = 0; i < life.length; i++) {
            life[i].lifeLisIndex=i;
            life[i].onmouseover=function(){
                for (var j = 0; j < hua.length; j++) {
                    hua[j].style.display="none";
                    life[j].className="";
                };
                hua[this.lifeLisIndex].style.display="block";
                life[this.lifeLisIndex].className="hua-tab";
            }
        };
    }




















	//今日推荐的轮播
    var tuijianB=$(".tuijian-box")[0];
    var lisS=getChild(tuijianB);
    var lisW=parseInt(getStyle(lisS[0],"width"));    
    tuijianB.style.width=lisW*lisS.length+"px";
    var nleft=$(".niu-left")[0];
    var nright=$(".niu-right")[0];
    var tuij=0;
    nright.onclick=function(){
    	if(!flag){
    		return;
    	}
    	flag=false;
    	animate(tuijianB,{marginLeft:-lisW},800,function(){
    		flag=true;
    		tuijianB.appendChild(getFirst(tuijianB));
    		tuijianB.style.marginLeft=0+"px";
            tuij++;
            if(tuij>=lisS.length){
            	tuij=0;
            }
    	});
    	return flag;
    }
    nleft.onclick=function(){
    	if(flag){
    		flag=false;
    		insertBefore(getLast(tuijianB),getFirst(tuijianB));
	    	tuijianB.style.marginLeft=-lisW+"px";
	    	animate(tuijianB,{marginLeft:0},800,function(){
	    		tuij--;
	    		if(tuij<0){
	    			tuij=lisS.length-1
	    		}
	    		flag=true;
	    	})
    	}
    	return flag;    	
    }
    

    //楼层 服装鞋包的轮播的封装
    var conF=$(".con-f");   //找出大框
    var imgWheel=$(".imgs-box");  //找出轮播的最大匡
    var yuan=$(".f2-yuan");   //小圆点的框
    var lrbtn=$(".f2-lrbtn");  //左右按钮的框
    var imgF1,imgW,listF,lfBtn,rfBtn;   //声明每一个用到的变量
    for (var i = 0; i < conF.length; i++) {   //遍历最大款，下标都相同
        imgF1=$(".img-wheel",imgWheel[i]);    //根据下标相同，获取里面的每一个图片的框
        imgW=parseInt(getStyle(imgF1[0],"width"));   //获取每一个轮播的宽度
        imgWheel[i].style.width=imgW*imgF1.length+"px";  //计算出整个轮播的长度
        listF=$("li",yuan[i]);      //获取每一个小圆点
        lfBtn=$(".f2-left",lrbtn[i])[0];  //获取每一个左按钮，因为是集合，所以需要下标      
        rfBtn=$(".f2-right",lrbtn[i])[0];  //获取每一个右按钮，同上
        // console.log(rfBtn)；
        allWheel(imgWheel[i],imgW,conF[i],listF,lfBtn,rfBtn);  //在循环里面，让函数运行
    };

    function allWheel(obj,w,con,yuans,left,right){
        var f1=setInterval(f1wheel,3000); 
        var indexf1=0;
        var flag=true;
        function f1wheel(){
             if(!flag){
                 return;
             }
             flag=false;
             animate(obj,{marginLeft:-w},600,function(){   
                flag=true;
                obj.appendChild(getFirst(obj));
                obj.style.marginLeft=0+"px";
                indexf1++;
                if(indexf1>=yuans.length){
                    indexf1=0;
                }
                for (var i = 0; i < yuans.length; i++) {
                    yuans[i].className="";
                 }
                yuans[indexf1].className="hot";
             })
             return flag;
        }
        //鼠标移上和移开事件
        con.onmouseover=function(){
            clearInterval(f1);
        }
        con.onmouseout=function(){
            f1=setInterval(f1wheel,3000);
        }
        //左右按钮单击事件
        right.onclick=function(){
            f1wheel();
        }
        left.onclick=function(){
            if(flag){
                flag=false;        
                    insertBefore(getLast(obj),getFirst(obj));
                    obj.style.marginLeft=-w+"px";
                    animate(obj,{marginLeft:0},600,function(){
                        indexf1--;
                        if(indexf1<0){
                            indexf1=yuans.length-1;
                        }
                        for (var i = 0; i < yuans.length; i++) {
                        yuans[i].className="";
                        }
                        yuans[indexf1].className="hot";
                        flag=true;
                    }) 
            }   
            return flag;
        }
        //小圆点轮播事件
        for (var i = 0; i < yuans.length; i++) {
            yuans[i].lisIndex=i;
            yuans[i].onmouseover=function(){
                for (var j = 0; j < yuans.length; j++) {
                    yuans[j].className="";
                };
                animate(obj,{marginLeft:-this.lisIndex*w});
                yuans[this.lisIndex].className="hot";
                indexf1=this.lisIndex;
            }
        };
    }



    // f 楼层选项卡的封装
    var asF=$(".f1-right");   //将所有的a链接获取到
    var listF=$(".content-box");  //将所有的选项卡获取
    var links,lists,span;    //声明遍历中获取到的变量
    for (var i = 0; i < asF.length; i++) {  //遍历出所有的a链接，根据下标相同
          links=$("a",asF[i]);  //从对应的每一层中，找到该层所有的a链接
          // console.log(links); 
          lists=$(".con-info",listF[i]);  //同上找到所有的选项卡
          span=$("span",asF[i]);   //找到每一个span
          tab(links,lists,span);
    };
    function tab(als,lls,span){
        for (var i = 0; i < als.length; i++) {
            als[i].lin=i;   //将下标保存在一个自定义的属性身上，相当于加标签，记录下标
            als[i].onmouseover=function(){
                  for (var i = 0; i < lls.length; i++) {
                      lls[i].style.display="none";
                      als[i].className="";
                      span[i].style.display="block";
                      if(i==span.length-1){
                         span[i].style.display="none";
                      }
                  };
                  lls[this.lin].style.display="block";
                  als[this.lin].className="f-item";
                  span[this.lin].style.display="none";
                  if(this.lin>0){
                    span[this.lin-1].style.display="none";
                  }

            }
        };
    }

    // 热门晒单
    var upBox=$(".up-wheel")[0];
    var upLis=$("li",upBox);
    var upT=parseInt(getStyle(upLis[0],"height"));
    upBox.style.height=upT*upLis.length+"px";
    var uptime=setInterval(upWheel,2000);
    var time=0;
    function upWheel(){
        insertBefore(getLast(upBox),getFirst(upBox));
        upBox.style.marginTop=-upT+"px";
        animate(upBox,{marginTop:0});
    }
    var wheelBox=$(".wheel-box")[0];
    wheelBox.onmouseover=function(){
        clearInterval(uptime);
    }
    wheelBox.onmouseout=function(){
        uptime=setInterval(upWheel,2000);
    }

    // 天天低价
    var imgsBox=$(".imgs-boxs");
    var fImgs;
    for (var i = 0; i < imgsBox.length; i++) {
        fImgs=$("img",imgsBox[i])[0];
        // console.log(fImgs);
        imgsWheel(fImgs);
    };
    function imgsWheel(fImags){
        fImags.onmouseover=function(){
            animate(fImags,{marginLeft:-12},200);
        }
        fImags.onmouseout=function(){
            animate(fImags,{marginLeft:0},200);
        }
    }


    //右半边定位  
    var fTop=$(".f-top");
    var fBtom,ftA;
    for (var i = 0; i < fTop.length; i++) {
         fBtom=$(".f-bottom",fTop[i])[0];
         ftA=$(".f-t",fTop[i])[0];
         fTopw(fBtom,fTop[i],ftA);
    };
    function fTopw(fb,ft,fa){
        ft.onmouseover=function(){
             animate(fb,{right:30},300);
             fb.style.background="#c81623";
             fa.style.background="#c81623";
        }
        ft.onmouseout=function(){
             animate(fb,{right:-62},300);
             fb.style.background="#7a6e6e";
             fa.style.background="#7a6e6e";
        }
    }


    //搜索框 光标事件
    var guangB=$("#one");
    var value=guangB.value;
    guangB.onfocus=function(){
        if(value==this.value){
            this.value="";
        }       
    }
    guangB.onblur=function(){
        if(this.value==""){
            this.value=value;
        }   
    }

    // 楼层跳转
    var floor=$(".f1-box");  //获取每一个楼层
    var floors=$(".fixed-left")[0];
    var lisBtn=$("li",floors); //将每一个楼层的按钮获取出来
    var topF=$(".top-f"); //楼层数
    var topT=$(".top-title");  //楼层字体描述
    var back=$(".back")[0];   //右边定位的返回按钮
    
    var floorBox=$(".floors");  //按需加栽
    // 遍
    var offtop=[];
    for (var i = 0; i < floorBox.length; i++) {
        offtop.push(floorBox[i].offsetTop);
    };
    back.onclick=function(){
        var docu=document.body.scrollTop?document.body:document.documentElement;
        animate(docu,{scrollTop:0});
    }
    // console.log(topT)
    var arrFloor=[];
    for (var i = 0; i < floor.length; i++) {
        arrFloor.push(floor[i].offsetTop);  
    };
    // 1728, 2495, 3243, 3851, 4459, 5207, 5815, 6423, 7031, 7779, 8387
    // console.log(arrFloor);
    var clientH=document.documentElement.clientHeight;
    function onscroll(){
        var st=document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;
        if(arrFloor[0]>st){
            floors.style.display="none";
        }
        if((arrFloor[0]-100)<st){
            floors.style.display="block";
        }
        if((arrFloor[arrFloor.length-1]+clientH)<st){
            floors.style.display="none";
        }
        for (var i = 0; i < arrFloor.length; i++) {
            if((st+110)>arrFloor[i]){
                for (var j = 0; j < lisBtn.length; j++) {
                    topT[j].style.display="none";
                    topF[j].style.display="block";
                };
                topT[i].style.display="block";
                topT[i].style.color="#c81623";
                topF[i].style.display="none";
                }
        };
    }
    window.onscroll=function(){
        onscroll();
        if(!flag){
            return;
        }
        flag=false;
        var stop=document.body.scrollTop||document.documentElement.scrollTop;
        for (var i = 0; i < offtop.length; i++) {
            if(offtop[i]<stop+clientH){
                var imgb=$("img",floorBox[i]);
                for (var j = 0; j < imgb.length; j++) {
                    imgb[j].src=imgb[j].getAttribute("asrc");
                };
                flag=true;
            }
        };
        return flag;
    }
    window.onscroll();
    // 楼层跳转的点击事件
    for (var i = 0; i < lisBtn.length; i++) {
        lisBtn[i].indexT=i;
        lisBtn[i].onclick=function(){
            var docu=document.body.scrollTop?document.body:document.documentElement;
            animate(docu,{scrollTop:arrFloor[this.indexT]});
        }
    };

    













})