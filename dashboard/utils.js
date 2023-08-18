function containsOnlySpaces(str) {
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== ' ') {
            return false;
        }
    }
    return true;
}

function isContainsNotAddedUsers(users) {
    let result = true;
    for (let user of users){
        if (!currentFolderUsers.includes(user.id.toString())){
            result = false;
            break;
        }
    }

    return result;
}