let currentFolderUsers = [];

$(function () {
    $("body").on("click", function (event) {
        if (event.target.id !== "userInput" && event.target.id !== "suggestList" && !$(event.target).closest(".userSuggestions").length) {
            $("#suggestList").css("scale", "0");
            $("#usersList").css("filter", "brightness(1)");
        }
    });

    $("#userInput").on("focus", function () {
        $("#suggestList").css("scale", "1");
        $("#usersList").css("filter", "brightness(0.6)");
        onUserInput($("#userInput").val());
    })
});

function onFolderTypeChange(newValue) {
    let usersList = $("#usersList");
    if (newValue !== "Public") {
        usersList.children("li:not(:first-child)").remove();
        usersList.get(0).style.setProperty("--empty-user-list-text", "'To add users to the folder, make it public'");
        usersList.addClass("empty");
        let input = $("#userInput");
        input.attr("disabled", "disabled");
        input.val("");
        onUserInput();
    } else {
        $("#userInput").removeAttr("disabled");
        usersList.get(0).style.setProperty("--empty-user-list-text", "'There are no any users yet'");
        usersList.addClass("empty");
    }
}

function onUserInput() {
    let input = $("#userInput");
    $("#suggestList").children("li:not(.notFound, :first-child)").remove();

    if (containsOnlySpaces(input.val())) {
        $(".notFound").css("display", "flex");
        return;
    }

    getUsersWithStringInName(input.val(), (users) => {
        let parent = $("#suggestList").find("li:not(.notFound)");

        $(".notFound").css("display",
            users.length > 0 && !isContainsNotAddedUsers(users) ? "none" : "flex");

        for (let user of users) {
            if (currentFolderUsers.includes(user.id.toString())) continue;
            let copy = parent.clone();

            copy.attr("data-user-id", user.id);
            copy.find(".username").text(user.username);

            parent.parent().append(copy);

            copy.css("display", "flex");
        }
    });
}

function addUser(el) {
    let userRow = $(el).parent().parent();
    let folderUsers = $("#usersList");

    currentFolderUsers.push(userRow.attr("data-user-id"));
    folderUsers.removeClass("empty");

    let parent = $(folderUsers.children("li").get(0));
    let copy = parent.clone();
    copy.attr("data-user-id", userRow.attr("data-user-id"));
    copy.find(".username").text(userRow.find(".username").text());
    copy.css("display", "flex");

    folderUsers.append(copy);
    userRow.remove();
}