var api_ip="https://m-01.herokuapp.com";
var api_ip1="http://127.0.0.1:5000";
function login() {
    $("#loading").show();
    $("#login-button").prop('disabled',true);
    var username=$("#username").val();
    var password=$("#password").val();

    //alert(username);
    console.log(username);
    $.ajaxSetup({crossDomain:true,xhrFields:{withCredentials:true}});
    $.post(api_ip+"/admin/login",{"username":username,"password":password},function (data,status) {
        //alert(document.cookie);
        $("#loading").hide();
        $("#login-button").prop('disabled',false);
        if(!data.status) {
            $("#alert").show();
            $("#alert").text(data.message);
        }
        else
        {
            document.cookie="token="+data.token;
            alert(data.message);
            window.location.href="index.php";
        }
    });
    //alert(username+password);
}
function addBook() {
    $("#loading").show();
    var book_title=$("#book_title").val();
    var author=$("#author").val();
    var publications=$("#publications").val();
    var edition=$("#edition").val();
    var year=$("#year").val();
    var price=$("#price").val();
    var token=getCookie("token");
    console.log(book_title+"-"+author+"-"+publications+"-"+edition+"-"+year+"-"+price);
    if(book_title===""||author===""||publications===""||edition===""||year===""||price===""){
        $("#loading").hide();
        $("#alert").show();
        $("#alert").text("All fields are required");
        return;
    }

    $.ajaxSetup({crossDomain:true,xhrFields:{withCredentials:true}});
    $.post(api_ip+"/admin/add-books",{"book_title":book_title,"author":author,"publications":publications,"edition":edition,"year":year,"price":price,"token":token},function (data,status) {
        //alert(document.cookie);
        $("#loading").hide();
        //$("#login-button").prop('disabled',false);
        if(!data.status) {
            $("#alert").show();
            $("#alert").text(data.message);
        }
        else
        {
            alert(data.message);
            window.location.href="index.php";
        }
    });

}
function test() {
    alert('k');

}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}