var api_ip="https://m-01.herokuapp.com";
var api_ip1="http://127.0.0.1:5000";
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if(results==null)
        return null;
    return results[1] || 0;
}

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
            alert(data.message+"ooo");
            window.location.href="dash.html";
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
            window.location.href="dash.html";
        }
    });

}
function editBook() {
    $("#loading").show();
    var book_id=$("#book_id").val();
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
    $.post(api_ip+"/admin/edit-books",{"book_id":book_id,"book_title":book_title,"author":author,"publications":publications,"edition":edition,"year":year,"price":price,"token":token},function (data,status) {
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
            window.location.href="dash.html";
        }
    });

}
function getBook() {
    $("#fetching").show();
    var book_id=$.urlParam('id');
    if(!book_id)
    {
        $("#fetching").hide();
        $("#alert").show();
        $("#alert").text("Book id is required");
        return;
    }
    var token=getCookie("token");
    $.ajaxSetup({crossDomain:true,xhrFields:{withCredentials:true}});
    $.post(api_ip+"/admin/get-book",{"book_id":book_id,"token":token},function (data,status) {
        //alert(document.cookie);
        $("#fetching").hide();
        //$("#login-button").prop('disabled',false);
        if(!data.status) {
            $("#alert").show();
            $("#alert").text(data.message);
        }
        else
        {
            console.log(data.book);
            $("#edit-cont").show();
            $("#book_id").val(data.book.book_id);
            $("#book_title").val(data.book.book_title);
            $("#author").val(data.book.author);
            $("#publications").val(data.book.publications);
            $("#edition").val(data.book.edition);
            $("#year").val(data.book.year);
            $("#price").val(data.book.price);
        }
    });

}
function viewBook() {
    $("#fetching").show();
    var book_id=$.urlParam('id');
    if(!book_id)
    {
        $("#fetching").hide();
        $("#alert").show();
        $("#alert").text("Book id is required");
        return;
    }
    var token=getCookie("token");
    $.ajaxSetup({crossDomain:true,xhrFields:{withCredentials:true}});
    $.post(api_ip+"/admin/get-book",{"book_id":book_id,"token":token},function (data,status) {
        //alert(document.cookie);
        $("#fetching").hide();
        //$("#login-button").prop('disabled',false);
        if(!data.status) {
            $("#alert").show();
            $("#alert").text(data.message);
        }
        else
        {
            console.log(data.book);
            $("#view-cont").show();
            $("#book_id").text(data.book.book_id);
            $("#book_title").text(data.book.book_title);
            $("#author").text(data.book.author);
            $("#publications").text(data.book.publications);
            $("#edition").text(data.book.edition);
            $("#year").text(data.book.year);
            $("#price").text(data.book.price);
        }
    });

}
function logout(){
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/e-lib;";
    alert("Logged out successfully");
    window.location.href="home.html";
}
window.page_no=1;
function getBooks(page_no=1) {
    if(page_no<1) {
        page_no = 1;
    }
    if(page_no===1){
        $('#pre').addClass('disabled');
    }
    else {
        $('#pre').removeClass('disabled');
    }
    window.page_no=page_no;
    console.log(page_no);
    $('#table').find('tbody').empty();
    $("#fetching").show();
    var token=getCookie("token");
    $.ajaxSetup({crossDomain:true,xhrFields:{withCredentials:true}});
    $.post(api_ip+"/admin/get-books",{"page_no":page_no,"token":token},function (data,status) {
        //alert(document.cookie);
        $("#fetching").hide();
        //$("#login-button").prop('disabled',false);
        if(!data.status){
            window.location.href="login.html";
        }
        if(!data.books) {
            $("#alert").show();
            $("#alert").text(data.message);
            $('#next').addClass('disabled');
        }
        else
        {
            $('#next').removeClass('disabled');
            console.log(data.books);
            $("#dash-cont").show();
            $('#table').find('tbody').empty();
            for(i=0;i<data.books.length;i++)
            {
                $("#alert").hide();
                $('#table').append('<tr><td>'+data.books[i].book_id+'</td><td>'+data.books[i].book_title+'</td><td>'+data.books[i].author+'</td><td><a href="view.html?id='+data.books[i].book_id+'">View</a></td><td><a href="edit.html?id='+data.books[i].book_id+'">Edit</a></td><td><button onclick="deleteBook('+data.books[i].book_id+')" class="delete">Delete</button></td></tr>');
            }
        }
    });

}
function deleteBook(book_id) {
    $("#deleting").show();//
    var token=getCookie("token");
    var con=confirm("Are you sure to delete book -"+book_id+" ?");
    if(!con) return;
    $.ajaxSetup({crossDomain:true,xhrFields:{withCredentials:true}});
    $.post(api_ip+"/admin/delete-book",{"book_id":book_id,"token":token},function (data,status) {
        //alert(document.cookie);
        $("#deleting").hide();
        //$("#login-button").prop('disabled',false);
        if(!data.status) {
            $("#alert").show();
            $("#alert").text(data.message);
        }
        else
        {
            alert(data.message);
            window.location.href="dash.html";
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