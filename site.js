// shared header / sidebar / footer for every page
// edit the nav or the "updates" list here and it changes everywhere

const NAV_TOP = [
    ['./', 'home'],
    ['me', 'me'],
    ['socials', 'socials'],
    ['music', 'music'],
    ['media', 'media'],
];

const NAV_BOTTOM = [
    ['gifts', 'gimmie stuff..'],
    ['rack', 'server rack'],
    ['mailto:lexi@puppybit.ch', 'email'],
];

// newest first ~ add a line when you change something
// the last bit is the commit hash it links to (copy it from github, the short one works too)
const UPDATES = [
    ['03/11/26', 'site got a new look!! ☀', 'd7aa99a'],
];

// 88x31 badges in the footer ~ put the gif/png in the badges folder and add a line here
// ['file in badges/ or a full image link', 'hover text (optional)', 'link (optional)']
// ['file', 'https://...'] works too, the hover text is just the site name then
const BADGES = [
    ['able_8831.png', 'https://able.moe'],
    ['cutesocks.gif', 'i wear cute socks!'],
    ['cyberdog.gif', 'cyberdog'],
    ['slsknet.webp', 'https://slsknet.org'],
    ['teto.webp', 'teto'],
    ['underwear.gif', 'underwear is for losers!'],
];

// clicking an update opens that commit on github (or the whole history if there's no hash)
const REPO_URL = 'https://github.com/puppygirlstink/puppygirlstink.github.io';
const commitUrl = (sha) => (sha ? `${REPO_URL}/commit/${sha}` : `${REPO_URL}/commits/main`);

const here = location.pathname.split('/').pop().replace('.html', '') || 'index';

function navLinks(list) {
    return list
        .map(([href, label]) => {
            const current = href === here || (href === './' && here === 'index');
            return `<a href="${href}"${current ? ' class="here"' : ''}>${label}</a>`;
        })
        .join('');
}

document.getElementById('header').innerHTML = `
    <nav id="nav">
        <div class="nav-row">${navLinks(NAV_TOP)}</div>
        <div class="nav-row">${navLinks(NAV_BOTTOM)}</div>
    </nav>
`;

document.getElementById('side').innerHTML = `
    <div class="note">
        <div class="pfp-row">
            <img class="pfp" src="images/pfp.webp" alt="lexi">
            <div>
                <p class="note-title">lexi</p>
                <p class="small">just a girl</p>
            </div>
        </div>
    </div>
    <div class="note blue tilt">
        <p class="small">my current time (england)</p>
        <p class="clock" id="time">--:--:--</p>
    </div>
    <div class="updates-head">updates</div>
    <ul class="updates">
        ${UPDATES.map(([d, t, sha]) => `<li><a href="${commitUrl(sha)}" target="_blank" title="see this on github">${t} <span class="date">[${d}]</span></a></li>`).join('')}
    </ul>
`;

const isUrl = (s) => /^https?:\/\//.test(s || '');

function badge([file, title, link]) {
    // a link in the hover text spot counts as the link
    if (!link && isUrl(title)) {
        link = title;
        title = '';
    }
    // no hover text? use the site name or the file name
    if (!title) {
        title = link ? new URL(link).hostname : file.split('/').pop().replace(/\.\w+$/, '');
    }
    // full image urls work too, otherwise it's from the badges folder
    const src = isUrl(file) ? file : `badges/${file}`;
    const img = `<img src="${src}" width="88" height="31" alt="${title}" title="${title}" loading="lazy">`;
    return link ? `<a href="${link}" target="_blank">${img}</a>` : img;
}

document.getElementById('footer').innerHTML = `
    <div class="badges">${BADGES.map(badge).join('')}</div>
    <p>puppygirlstink ~ <a href="mailto:lexi@puppybit.ch">lexi@puppybit.ch</a> ~ <a href="old/">old site</a></p>
`;

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
