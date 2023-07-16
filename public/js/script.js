$(document).ready(function () {
  $("#login-form").submit(function (event) {
    event.preventDefault();

    var username = $("#username").val();
    var password = $("#password").val();

    $.ajax({
      url: "/login",
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      success: function (response) {
        window.location.href = "/chatroom";
      },
      error: function (xhr, textStatus, errorThrown) {
        response = $.parseJSON(xhr.responseText);
        alert(response.message);
      },
    });
  });

  $("#register-form").submit(function (event) {
    event.preventDefault();

    var username = $("#username").val();
    var password = $("#password").val();
    var passwordConfirm = $("#passwordConfirm").val();

    $.ajax({
      url: "/register",
      method: "POST",
      data: {
        username: username,
        password: password,
        passwordConfirm: passwordConfirm,
      },
      success: function (response) {
        window.location.href = "/chatroom";
      },
      error: function (xhr, textStatus, errorThrown) {
        response = $.parseJSON(xhr.responseText);
        alert(response.message);
      },
    });
  });

  $("#logout").click(function () {
    $.get("/logout")
      .done(function (res) {
        console.log(res);
        if (res.status == "success") {
          window.location.href = "/login";
        } else {
          alert(res.message);
        }
      })
      .fail(function (xhr, status, error) {
        console.error(error);
        alert("Failed to logout. Please try again later.");
      });
  });
});
