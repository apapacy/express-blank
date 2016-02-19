define(['jquery', "domReady!"], function($){

    var formPlaceholder = document.getElementById("form-placeholder");
    var formJson = document.getElementById("formJson");
    var emai = document.getElementById("email");
    var memo = document.getElementById("memo");
    var savedId = document.getElementById("savedId");
    var posts = JSON.parse(document.getElementById("json").value);

    $("input:button").on("click", function(){
        var id = this.id;
        savedId.value = "";
        email.value = "";
        memo.value = "";
        for (var i = 0; i < posts.length; i++) {
            if (posts[i].id == id) {
                savedId.value = id;
                email.value  = posts[i]['email'];
                memo.value = posts[i]['memo'];
            }
        }
        $(formPlaceholder).fadeIn(300);
    });

    $("#closePopup").on("click", function(){
        $(formPlaceholder).fadeOut(300);
    })

});