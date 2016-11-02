var input = document.querySelectorAll(".input");
var hint = document.querySelectorAll(".hint")
var UPS = document.querySelectorAll(".UPS")
var oSpan = document.querySelectorAll(".arrow")
var register = document.querySelector("#register_btn")
console.log(input)
console.log(oSpan)
// 图片验证码数组
var arr = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n",
"o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4",
"5","6","7","8","9","0"]
var color = ["red","blue","cyan","orange","green","purple"];
var lineColor = ["#e5e5e5","#999","#e6d4f2","#c5c4ed"];
var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");
var str;

function random(min,max){
	return parseInt(Math.random()*(max-min+1)+min)
}

function testing(){
	str = arr[random(0,arr.length-1)]+arr[random(0,arr.length-1)]+arr[random(0,arr.length-1)]+arr[random(0,arr.length-1)];
	ctx.beginPath();
	ctx.font = '30px arial';
	ctx.strokeStyle = color[random(0,color.length-1)];
	ctx.strokeText(str,15,22)
	for (var i = 0; i < 2; i++) {
		ctx.beginPath();
		ctx.moveTo(0,random(0,33))
		ctx.lineTo(random(0,95),random(0,33));
		ctx.lineTo(95,random(0,33));
		ctx.strokeStyle = lineColor[random(0,lineColor.length-1)];
		ctx.stroke()
	};
}
testing()
canvas.onclick = function(){
	ctx.clearRect(0,0,95,33);
	testing()
	console.log(str)

}

for (var i = 0; i < input.length; i++) {
	input[i].index = i;
	input[i].judge = false;
};
// 形参分别为 正则判断式数组  内容为空 为错误是弹出的信息
function judge(obj,regArr,n,f,index){
	var panduan = false
	for (var i = 0; i < regArr.length; i++) {
		panduan = regArr[i].test(obj.value)
		if (panduan == false) {
			break;
		};
	};
	if (obj.value == "") {
		hint[index].style.display = 'block';
		hint[index].style.backgroundPositionX = '-47px';
		UPS[index].innerHTML = "<span>◆</span>" + n;
		UPS[index].style.display = 'block';
		UPS[index].style.right = -UPS[index].offsetWidth - 7 + "px"
		obj.judge = false;
		setTimeout(function(){
			hint[index].style.display = 'none';
			UPS[index].style.display = 'none';
		},2500)
	}else if(panduan) {
		hint[index].style.display = 'block';
		hint[index].style.backgroundPositionX = '-24px'
		obj.judge = true;
	}else{
		hint[index].style.display = 'block';
		hint[index].style.backgroundPositionX = '-47px';
		UPS[index].innerHTML = "<span>◆</span>" + f;
		UPS[index].style.display = 'block';
		UPS[index].style.right = -UPS[index].offsetWidth - 7 + "px"
		obj.judge = false;
		setTimeout(function(){
			hint[index].style.display = 'none'
			UPS[index].style.display = 'none'
		},2500)
	}
}
function num(obj,max){
	if (obj.value.length > max) {
			obj.value = obj.value.substring(0,max);
		}
}
input[0].onblur = function(){
	var reg = /^1[34578]{1}[0-9]{9}$/
	var arr = [reg];
	var n = "请输入您的手机号";
	var f = "请输入正确的手机号码"
	judge(this,arr,n,f,this.index);
}
input[1].onblur = function(){
	var reg = /[a-zA-Z]/g
	var reg2 = /[0-9]/g
	var reg3 = /^[0-9a-zA-Z_-]{6,18}$/g
	var arr = [reg,reg2,reg3]
	var n = "请输入密码";
	var f = "请输入6-18位数字、字母、-、_组成的密码"
	judge(this,arr,n,f,this.index);
}
input[2].onblur = function(){
	if (input[1].judge) {
		if (this.value == input[1].value) {
			hint[2].style.display = 'block';
			hint[2].style.backgroundPositionX = '-24px'
			this.judge = true;
		}else{
			hint[2].style.display = 'block';
			hint[2].style.backgroundPositionX = '-47px';
			UPS[2].innerHTML = "<span>◆</span>" + "两次密码不匹配，请重新输入";
			UPS[2].style.display = 'block';
			UPS[2].style.right = -UPS[2].offsetWidth - 7 + "px"
			this.judge = false;
			setTimeout(function(){
				hint[2].style.display = 'none'
				UPS[2].style.display = 'none'
			},2500)
		}
	}else{
		input[1].onblur();
	}
}
input[3].onblur = function(){
	var reg = /^[0-9a-zA-Z]{4}$/i
	var arr = [reg];
	var n = "请输入验证码";
	var f = "请输入四位验证码"
	judge(this,arr,n,f,this.index);
}
input[4].onblur = function(){
	if (input[0].judge) {
		var reg = /^[0-9a-zA-Z]{6}$/i
		var arr = [reg];
		var n = "请输入6位短信验证码";
		var f = "请输入6位短信验证码";
		judge(this,arr,n,f,this.index);
	}else{
		input[0].onblur()
	}
}
input[0].oninput = function(){
	num(this,11)
}
input[1].oninput = function(){
	num(this,18)
}
input[2].oninput = function(){
	num(this,18)
}
input[4].oninput = function(){
	num(this,6)
}
register.onclick = function(){
	var judge = false
	for (var i = 0; i < input.length; i++) {
		judge = input[i].judge
		if (judge == false) {
			input[i].onblur()
			break;
		};
	};
	if (judge) {
		var imgValue = input[3].value
		if (imgValue != str) {
			var div = document.createElement("div")
			div.className = "imgTestingJudge"
			document.body.appendChild(div)
			div.innerHTML = "<span>×</span>图片验证码验证失败";
			setTimeout(function(){
			div.style.display = 'none';
			},2500)
		};
	};
}
