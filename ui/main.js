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
  request.open('GET','http://yazidabbas96.imad.hasura-app.io',true);
  request.send('null');
}