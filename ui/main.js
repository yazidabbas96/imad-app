var button=document.getElementById("counter");
button.onclick=function () {
    var request=new XMLHttpRequest;
    request.omreadystatechange=function () {
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if(request.status===200)
            {
                var counter=request.responseText;
                var span=document.getElementById("count");
                span.innerHTML=counter.toString();
                
            }
        }
    }
  request.open('GET','http://yazidabbas96.imad.hasura-app.io/counter',true);
  request.send('null');
}
var nameInput=document.getElementById("name");
var name=nameInput.getvalue;
var submit=document.getElementById("submitbtn");
submit.onclick=function () {
    var names=['name1','name2','name3'];
    var list='';
    for(var i=0;i<names.length;i++)
    {
        list+="<li>"+names[i]+"<li>";
    }
    var ul=document.getElementById("namelist");
    ul.innerHTML=list;
    
}
