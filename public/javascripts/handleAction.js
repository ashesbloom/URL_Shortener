async function handleLogout(url) { //handling the logout request form the user
    try {
        const response = await fetch(url, { method: 'post' }); //fetching the url with post method
        const result = await response.json(); //converting the response into json
        if (result.redirect) {//if the result has redirect key then redirect to the url
            window.location.href = result.redirect; 
        }
    } catch (error) {//if any error occurs then log the error
        console.error({ error });
    }
}

async function handle_ClearData(url) { //handling the clear data request from the user
    try {
        const confirmed = await swal({ //using sweetalert to show the confirmation dialog (https://www.npmjs.com/package/sweetalert)
            title: 'Are you sure?',
            text: 'This will clear all the records!',
            icon: 'info',
            buttons: true,
            dangerMode: true,
        });

        if (confirmed) { //if the user confirms the dialog then fetch the url with post method
            const response = await fetch(url, { method: 'post' }); //fetching the url with post method
            const result = await response.json(); //converting the response into json
            if (result.redirect) { //if the result has redirect key then redirect to the url
                window.location.href = result.redirect;
            }
        }
    } catch (error) { //if any error occurs then log the error
        console.error({ error });
    }
}

async function handle_Userdelete(url,email){ //handling the user delete request from the admin
    try{
        const confirmed = await swal({ //using sweetalert to show the confirmation dialog
                title: 'Deleting this user?',
                text: 'User\'s urls will also be cleared!',
                icon: 'info',
                buttons: true,
                dangerMode: true,
        });
        if (confirmed) { //if the user confirms the dialog then fetch the url with post method
            const response = await fetch(url, { //fetching the url with post method
                method: 'post',
                headers: {  //passing the headers to request the user from database
                    'email':email
                }
             });
            const result = await response.json(); //converting the response into json
            if (result.redirect) { //if the result has redirect key then redirect to the url
                window.location.href = result.redirect;
            }
        }
    } catch (error) { //if any error occurs then log the error
        console.error({ error });
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('logout').addEventListener('click', () => handleLogout('/user/logout')); //adding event listener to the logout button
    document.getElementById('clear').addEventListener('click', () => handle_ClearData('/delete')); //adding event listener to the clear data button
});
