
var imgUtility = {
    _canvas:null,
    _quality:0.92,
    _img:{x:0,y:0,width:0,height:0,tag:null,data:null},
    _init(img){//初始化对象，获取图片数据，绘制到canvas
        var me=this,w=img.naturalWidth,h=img.naturalHeight;
        return me.draw({img:img,source:{width:w,height:h},data:{width:w,height:h}});
    },
    _get(opt){//获取canvas中图像信息{x,y,width,height}
        var me=this,ctx=me._canvas.getContext("2d"),img=me._img;
        var d=opt?Object.assign({x:0,y:0,width:0,height:0},opt):img;
        img.x=d.x;img.y=d.y;img.width=d.width;img.height=d.height;
        img.data=ctx.getImageData(d.x,d.y,d.width,d.height);
        return me;
    },
    _put(opt){//修改canvas图像信息{source:{x,y,width,height},data:{x,y,width,height}}
        var me=this,img=me._img;
        var s=Object.assign({x:0,y:0,width:img.width,height:img.height},opt?opt.source:{});
        var d=Object.assign({x:0,y:0,width:0,height:0},opt?opt.data:{});
        var canvas=document.createElement('canvas');
        canvas.width=d.width;canvas.height=d.height;
        canvas.getContext("2d").drawImage(me._canvas,s.x,s.y,s.width,s.height,d.x,d.y,d.width,d.height);
        me._canvas=canvas;
        me._get();
        return me;
    },
    async read(img){//读取图片SRC或者img对象
        var me=this,tp=img?typeof(img):'';
        me._canvas=document.createElement('canvas');
        var image=new Image();
        image.crossOrigin="anonymous";
        return new Promise((resolve,reject)=>{
            if(tp=='string'){
                image.src=img;
            }else if(tp=='object'){
                if(img instanceof File||img instanceof Blob){
                    var reader=new FileReader();
                    reader.addEventListener('load',evt=>{image.src=evt.target.result;});
                    reader.addEventListener('error',evt=>{reject(evt);});
                    reader.readAsDataURL(img);
                }else{
                    image=img;
                }
                if(image.natureWidth){me._init(image);resolve(me);return;}
            }else{
                resolve(me);return;
            }
            image.addEventListener('load',evt=>{me._init(image);resolve(me);});
            image.addEventListener('error',evt=>{reject(evt);});
        });
    },
    draw(opt){//把img绘制到canvas中{img,source:{x,y,width,height},data:{x,y,width,height}}
        var me=this;
        me._canvas=document.createElement('canvas');
        var ctx=me._canvas.getContext("2d");
        ctx.fillStyle="#000000";
        var source=opt?opt.source:{},target=opt?opt.data:{};
        var s=Object.assign({x:0,y:0,width:100,height:100},source);
        var d=Object.assign({x:0,y:0,width:100,height:100},target);
        me._canvas.width=d.width;me._canvas.height=d.height;
        ctx.drawImage(opt.img,s.x,s.y,s.width,s.height,d.x,d.y,d.width,d.height);
        return me._get({x:d.x,y:d.y,width:d.width,height:d.height});
    },
    resize(opt){//缩放到指定尺寸{width,height}
        var me=this,ctx=me._canvas.getContext("2d"),data=me._img.data;
        var dw=opt?opt.width:0,dh=opt?opt.height:0,rt=opt?opt.ratio:1;
        dh=dh?dh:dw*rt;
        return me._put({
            data:{width:dw,height:dh}
        });
    },
    limit(opt){//限制在指定尺寸内{width,height}
        var me=this;
        var sw=me._img.width,sh=me._img.height;
        var dw=opt?opt.width:0,dh=opt?opt.height:0;
        var wv=dw?(dw<sw?dw/sw:1):1,hv=dh?(dh<sh?dh/sh:1):1;
        var lv=Math.min(wv,hv);
        var tw=sw*lv,th=sh*lv;
        return me._put({data:{width:tw,height:th}});
    },
    crop(opt){//裁剪图片位置{x1,y1,x2,y2,x,y}
        var me=this;
        opt=Object.assign({x1:0,y1:0,x2:0,y2:0,x:0,y:0},opt);
        opt.x2=opt.x2?opt.x2:opt.x;
        opt.y2=opt.y2?opt.y2:opt.y;
        var tw=opt.x2-opt.x1,th=opt.y2-opt.y1;
        return me._put({
            source:{x:opt.x1,y:opt.y1,width:tw,height:th},
            data:{width:tw,height:th}
        });
    },
    text(txt,opt){//在canvas中写文字{x,y,size,font,align,color}
        var me=this,ctx=me._canvas.getContext("2d");
        opt=Object.assign({x:0,y:0,size:'10px',font:'sans-serif',align:'start',color:'#ffff'},opt);
        ctx.textBaseline='middle';
        ctx.textAlign=opt.align;
        ctx.fillStyle=opt.color;
        ctx.font=opt.size+' '+opt.font;
        ctx.fillText(txt,opt.x,opt.y);
        return me._get();
    },
    rect(opt){//在canvas中画矩形{x,y,width,height,color,empty}
        var me=this,ctx=me._canvas.getContext("2d");
        opt=Object.assign({x:0,y:0,width:0,height:0,color:'#000',empty:false},opt);
        ctx.rect(opt.x,opt.y,opt.width,opt.height);
        if(opt.empty){
            ctx.strokeStyle=opt.color
        }else{
            ctx.fillStyle=opt.color;
        }
        opt.empty?ctx.stroke():ctx.fill();
        return me._get();
    },
    line(opt){//在canvas中画线{x,y,points:[{x,y,color}]}
        var me=this,ctx=me._canvas.getContext("2d");
        opt=Object.assign({x:0,y:0,points:[]},opt);
        var points=opt.points;
        if(!points||!points.length){return me._get();}
        ctx.beginPath();
        ctx.moveTo(opt.x,opt.y);
        for(var i=0;i<points.length;i++){
            var p=points[i],color=p.color?p.color:'#000';
            ctx.strokeStyle=color;
            ctx.lineTo(p.x,p.y);
            ctx.stroke();
        }
        return me._get();
    },
    arc(opt){//在canvas中画弧形{x,y,radius,startAngle,endAngle,color,empty,anticlockwise}
        var me=this,ctx=me._canvas.getContext("2d");
        opt=Object.assign({x:0,y:0,radius:0,startAngle:0,endAngle:0,anticlockwise:false,color:'#000',empty:false},opt);
        if(!opt.radius||!opt.startAngle||!opt.endAngle){return me._get();}
        ctx.beginPath();
        ctx.arc(opt.x,opt.y,opt.radius,opt.startAngle,opt.endAngle,opt.anticlockwise);
        if(opt.empty){
            ctx.strokeStyle=opt.color
        }else{
            ctx.fillStyle=opt.color;
        }
        opt.empty?ctx.stroke():ctx.fill();
        return me._get();
    },
    arcTo(opt){//在canvas中画弧形{x:0,y:0,x1,y1,x2,y2,radius,color,empty}
        var me=this,ctx=me._canvas.getContext("2d");
        opt=Object.assign({x:0,y:0,x1:0,y1:0,x2:0,y2:0,radius:0,color:'#000',empty:false},opt);
        if(!opt.radius){return me._get();}
        ctx.beginPath();
        ctx.moveTo(opt.x,opt.y);
        ctx.arcTo(opt.x1,opt.y1,opt.x2,opt.y2,opt.radius);
        if(opt.empty){
            ctx.strokeStyle=opt.color
        }else{
            ctx.fillStyle=opt.color;
        }
        opt.empty?ctx.stroke():ctx.fill();
        return me._get();
    },
    alpha(val){//设置图片透明度
        var me=this,ctx=me._canvas.getContext("2d");
        ctx.globalAlpha=val?(val>1?val/100:val):1;
        return me._get();
    },
    quality(val){//设置图片质量
        var me=this;
        val=val?val:0.92;
        me._quality=val<1?val:val/100;
        //console.log(me._quality);
        return me;
    },
    toSrc(ext,quality){//转成base64图片地址
        var me=this;quality=quality?quality:me._quality;
        //console.log(me._quality);
        return me._canvas.toDataURL(ext,quality);
    },
    async toBlob(ext,quality){
        var me=this;quality=quality?quality:me._quality;
        return new Promise((resolve,reject)=>{
            try{
                me._canvas.toBlob(x=>{resolve(x);},ext,quality);
            }catch(e){
                reject(e);
            }
        });
    }
};