async function handleLogout(url) {
    try {
        const response = await fetch(url, { method: 'post' });
        const result = await response.json();
        if (result.redirect) {
            window.location.href = result.redirect;
        }
    } catch (error) {
        console.error({ error });
    }
}

async function handle_ClearData(url) {
    try {
        const confirmed = await swal({
            title: 'Are you sure?',
            text: 'This will clear all the records!',
            icon: 'info',
            buttons: true,
            dangerMode: true,
        });

        if (confirmed) {
            const response = await fetch(url, { method: 'post' });
            const result = await response.json();
            if (result.redirect) {
                window.location.href = result.redirect;
            }
        }
    } catch (error) {
        console.error({ error });
    }
}

async function handle_Userdelete(url,email){
    try{
        const confirmed = await swal({
                title: 'Deleting this user?',
                text: 'User\'s urls will also be cleared!',
                icon: 'info',
                buttons: true,
                dangerMode: true,
        });
        if (confirmed) {
            const response = await fetch(url, { 
                method: 'post',
                headers: {
                    'email':email
                }
             });
            const result = await response.json();
            if (result.redirect) {
                window.location.href = result.redirect;
            }
        }
    } catch (error) {
        console.error({ error });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('logout').addEventListener('click', () => handleLogout('/user/logout'));
    document.getElementById('clear').addEventListener('click', () => handle_ClearData('/delete'));
});
