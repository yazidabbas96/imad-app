var submit=document.getElementById("submit_btn");
submit.onclick=function () {
    var request=new XMLHttpRequest;
    request.onreadystatechange=function () {
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if(request.status===200)
            {
               alert('login successfully');
                
            }
            else if(request.status===403)
            {
             alert('username/password incorrect');   
            }
               else if(request.status===500)
            {
             alert('something went wrong');   
            }
            
        }
    };
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    console.log(username);
    console.log(password);
    
  request.open('POST','http://yazidabbas96.imad.hasura-app.io/login',true);
  request.setRequestHeader('Content-Type','application/json');
  request.send(JSON.stringify({username:username,passowrd:password}));
}
