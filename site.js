// the only thing that needs javascript: the live clock in the sidebar
// (nav, sidebar and footer are plain html in each page now ~ edit them there)

function updateTime() {
    const el = document.getElementById('time');
    if (!el) return;
    el.textContent = new Date().toLocaleString('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
}

setInterval(updateTime, 1000);
updateTime();
