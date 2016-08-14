//<![CDATA[
var ctx=null;
var frmObj=null;
var ultX=0; var ultY=0;
var DRAWING=false;
window.addEventListener('load',IniciaFirma,false);
function IniciaFirma(){
  frmObj=document.getElementById('canvas');
  ctx=frmObj.getContext('2d');
  ctx.fillStyle=FirmaFondoColor;
  ctx.fillRect(0,0,FirmaAncho,FirmaAlto);
  ctx.strokeStyle=FirmaLetraColor;
  ctx.lineWidth=FirmaLetraGrosor;
  ctx.lineJoin='round'; ctx.lineCap='round';
  frmObj.addEventListener('mousedown',MouseDown,false);
  frmObj.addEventListener('mouseup',MouseUp,false);
  frmObj.addEventListener('mousemove',MouseMove,false);
  frmObj.addEventListener('touchstart',TouchStart,false);
  frmObj.addEventListener('touchmove',TouchMove,false);
  frmObj.addEventListener('touchend',TouchEnd,false);
  frmObj.addEventListener('touchleave',TouchEnd,false);
  frmObj.style.cursor='crosshair';
// prueba  frmObj.style.cursor='wait';
}
function FinalizaFirma(){
  frmObj.removeEventListener('mousedown',MouseDown,false);
  frmObj.removeEventListener('mouseup',MouseUp,false);
  frmObj.removeEventListener('mousemove',MouseMove,false);
  frmObj.removeEventListener('touchstart',TouchStart,false);
  frmObj.removeEventListener('touchmove',TouchMove,false);
  frmObj.removeEventListener('touchend',TouchEnd,false);
  frmObj.removeEventListener('touchleave',TouchEnd,false);
// prueba  frmObj.style.cursor='auto';
  frmObj.style.cursor='not-allowed';
}
function MouseDown(e){
  DRAWING=true;
  ctx.beginPath();
  ultX=e.pageX-objLeft(frmObj); ultY=e.pageY-objTop(frmObj);
  ctx.moveTo(ultX,ultY);
}
function MouseUp(e){
  ctx.closePath();
  DRAWING=false;
}
function MouseMove(e){
  if(DRAWING){
    ctx.beginPath();
    ctx.moveTo(ultX,ultY);
    ultX=e.pageX-objLeft(frmObj); ultY=e.pageY-objTop(frmObj);
    ctx.lineTo(ultX,ultY);
    ctx.closePath();
    ctx.stroke();
  }
}
function TouchStart(e){
  if (e.targetTouches.length == 1) { 
    var touch = e.targetTouches[0]; 
    MouseDown(touch);
  }
}
function TouchEnd(e){
  if (e.targetTouches.length == 1) { 
    var touch = e.targetTouches[0]; 
    MouseUp(touch);
  }
}
function TouchMove(e){
  e.preventDefault();
  if (e.targetTouches.length == 1) { 
    var touch = e.targetTouches[0]; 
    MouseMove(touch);
  }
}
function objTop(obj) {
  var val = obj.offsetTop;
  if (obj.offsetParent) val += objTop(obj.offsetParent);
  return val;
}
function objLeft(obj) {
  var val = obj.offsetLeft;
  if (obj.offsetParent) val += objLeft(obj.offsetParent);
  return val;
}
//]]>
