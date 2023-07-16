const socket = io();

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

  $("#message-form").submit(function (event) {
    event.preventDefault();
    console.log("click");
    var message = $("#message").val();
    $.ajax({
      url: "/message",
      method: "POST",
      data: {
        message: message,
      },
      success: function (response) {
        console.log(response);
        socket.emit("message", response.data.message);
        $("#message").val("");
      },
      error: function (xhr, textStatus, errorThrown) {
        response = $.parseJSON(xhr.responseText);
        console.log(response.message);
        $("#message").val("");
      },
    });
  });

  socket.on("message", (message) => {
    var sender = message.sender;
    var createTime = message.createTime;
    var content = message.content;
    var newMessage = $(
      '<div class="message">' +
        "<ul>" +
        '<li class="username">' +
        sender +
        "</li>" +
        '<li class="sendTime">' +
        createTime +
        "</li>" +
        "</ul>" +
        '<p class="text">' +
        content +
        "</p>" +
        "</div>"
    );

    $(".chat-messages").append(newMessage);
    var element = $(".chat-messages");
    element.scrollTop(element[0].scrollHeight);
  });
});
