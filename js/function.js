function $(selector,obj){    //第一个参数是选择器，第二个参数是范围
     var obj=obj||document;
     if(typeof selector==="string"){    //当选择器是字符串类型时，执行if语句
          //".aa"   "#bb"  "div"
          if(selector.charAt(0)==(".")){    //当截取类型字符串中的下标为0的值是“.”时，可以判断是通过类名获取
          	  return getClass(selector.substring(1),obj);   //获取类名元素时，通过调用函数getClass，截取下标为1以后的所有的字符串
          }else if(selector.charAt(0)=="#"){   //截取下标为0的第一个字符串为“#”时，判断通过id来获取元素
          	  return obj.getElementById(selector.substring(1));  //id是在document对象中获取，截取下标为1以后的所有的字符串进行判断
          }
          else if(/^[a-z][a-z1-6]{0,9}$/g.test(selector)){   //获取的值是标签时
              return obj.getElementsByTagName(selector);     //标签是通过document对象中获取
          }
          else if(/^<[a-z][a-z1-6]{0,9}>$/.test(selector)){
          	  return document.createElement(selector.slice(1,-1));   //当传进来的值是标签时，"<div>",返回值 创建元素时只截取标签内部的内容
          }
     }
     else if(typeof selector=="function"){
           window.onload=function(){
           	  selector();
           }
     }
}

/*

window.onload=function(aa){
	
}

*/
function getClass(classname,obj){
	var obj=obj||document;    //逻辑表达式中的||（或）运算：当表达式左边元素是true的话，就不会执行后边，返回值为true；当表达式左边为false的时候，右边的值无论是true或是false，都回返回右边的值
	if(obj.getElementsByClassName){ //会隐式的调用布尔类型转换思想，如果可以获取到类名的话，就执行if里面的语句；如果不可以获取到类名的话，就是undefined，会调用布尔类型进行转换为false，就会执行else语句
        // console.log("支持");
		return obj.getElementsByClassName(classname);
	}else{
		// console.log("不支持");
		var arr=[];
		var alls=obj.getElementsByTagName("*");  //获取文档里面所有的标签名
		for (var i = 0; i < alls.length; i++) {
			 if(checkbox(alls[i].className,classname)){
			 	arr.push(alls[i]); 
			 }
		};
		return arr;
	}
     
}
function checkbox(newarr,oldarr){
	  //"out box" 字符串，要将字符串转换为数组使用split
     var chlist=newarr.split(" ");  //字符串转换为数组的话，使用split，split有两个参数，第一个参数是按照什么分割为数组
     var flag=false;
     for (var i = 0; i < chlist.length; i++) {
     	   if(chlist[i]==oldarr){
                flag=true;
     	   }
     };
     return flag;
}

//处理兼容性问题
function getText(obj,val){
	if(val==undefined){
	     // "" ||undefined
		if(typeof obj.textContent=="string"){
	    	console.log("IE9-11、FireFox、Chrome");
	    	return obj.textContent;
	    }
	    else{
	    	console.log("IE6-11、Chrome");
	    	return obj.innerText;
	    }
	}else{
		if(typeof obj.textContent=="string"){
	    	//console.log("IE9-11、FireFox、Chrome");
	    	obj.textContent=val;
	    }
	    else{
	    	//console.log("IE6-11、Chrome");
	    	obj.innerText=val;
	    }
	}
	
}

function getStyle(obj,attr){
	if(!obj.currentStyle){
		return getComputedStyle(obj,null)[attr];
	}
	else{
		return  obj.currentStyle[attr];
	}
}

//兼容子节点
function getChild(parent,t){   //参数1是父节点，参数2是判断当前的状态，如果不传参数2，就会默认执行false语句
	var t=t||false;
    var childs=parent.childNodes;    
    var arr=[];
    if(t==true){
    	for (var i = 0; i < childs.length; i++) {
    	if(childs[i].nodeType==1||(childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s+|\s+$/g,"")!='')){
             arr.push(childs[i]);
	    	}    	
	    };
    }else if(t==false){
    	for (var i = 0; i < childs.length; i++) {
    	if(childs[i].nodeType==1){
             arr.push(childs[i]);
	    	}    	
	    };	   
    }
    return arr;
}

//获取第一个子节点
function getFirst(obj){  
      return getChild(obj)[0];
}

//获取最后一个子节点
function getLast(obj){
	 var aa=getChild(obj);
	 return aa[aa.length-1];
}

//获得其中任何一个子节点
function getNum(obj,num){
	return getChild(obj)[num];
}

//获得下一个兄弟节点
function getNext(obj){
    var next=obj.nextSibling;
    if(next==null){
    	return false;
    }
    while(next.nodeType==8||(next.nodeType==3&&next.nodeValue.replace(/^\s+|\s+$/g,"")=="")){
    	next=next.nextSibling;
    	if(next==null){
	    	return false;
	     }
    }
    
    return next;
 }

//获得上一个兄弟节点
function getPrevious(obj){
	var previous=obj.previousSibling;
	if(previous==null){
		return false;
	}
	while(previous.nodeType==8||(previous.nodeType==3&&previous.nodeValue.replace(/^\s+|\s+$/g,"")=="")){
		previous=previous.previousSibling;
		if(previous==null){
			return false;
		}
	}
	return previous;
}

//插入到上一个兄弟元素
/*
   obj1：要插入的对象
   obj2：之前的对象
*/
function insertBefore(obj1,obj2){
	var parentNode=obj2.parentNode;
	parentNode.insertBefore(obj1,obj2);
}

//插入到下一个对象之前
/*
   obj1:要插入的对象
   obj2:之后的对象
       1  2
*/
function insertAfter(obj1,obj2){
	var next=getNext(obj2);
	insertBefore(obj1,next);
}

