async function handleAction(url) {
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

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('logout').addEventListener('click', () => handleAction('/user/logout'));
    document.getElementById('clear').addEventListener('click', () => handle_ClearData('/ashes/delete'));
    document.getElementById('signinForm').addEventListener('click', () => handleAction('/user/login'));
});
