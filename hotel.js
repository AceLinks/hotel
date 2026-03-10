
const rooms = {
    A: [], B: [], C: [],
    D: [], E: [], F: []
};

/* -------- ADD GUEST -------- */
function addGuest(room) {
    const input = document.getElementById(`input-${room}`);
    const name = input.value;
    if (!name) return;

    const time = new Date().toLocaleString();

    if (rooms[room].length >= 4) {
        alert(`Room ${room} is at maximum capacity!`);
        return;
    }

    rooms[room].push({ name, time });

    const log = document.getElementById('log');
    log.innerHTML += `
        <div class="log-entry">
            <span class="log-time">${time}</span>
            ${name} checked into Room ${room}
        </div>
    `;
    log.scrollTop = log.scrollHeight;

    input.value = "";
    render(room);
}

/* -------- RENDER -------- */
function render(room) {
    const list = document.getElementById(`list-${room}`);
    let html = "";

    rooms[room].forEach((guest, index) => {
        html += `
            <div>
                <span><strong>${guest.name}</strong><br><small>${guest.time}</small></span>
                <button onclick="removeGuest('${room}', ${index})">✕</button>
            </div>
        `;
    });

    list.innerHTML = html;
}

/* -------- REMOVE -------- */
function removeGuest(room, index) {
    rooms[room].splice(index, 1);
    render(room);
}

function removeAll(room) {
    rooms[room] = [];
    render(room);
}

/* -------- ENTER KEY SUPPORT -------- */
["A","B","C","D","E","F"].forEach(room => {
    document.getElementById(`input-${room}`).addEventListener("keydown", e => {
        if (e.key === "Enter") addGuest(room);
    });
});

/* -------- LOCK SYSTEM -------- */
let locked = {
    A:false,B:false,C:false,
    D:false,E:false,F:false
};

function lockRoom(room) {
    locked[room] = !locked[room];

    document.getElementById(`input-${room}`).disabled = locked[room];
    document.getElementById(`add${room}`).disabled = locked[room];
    document.getElementById(`removeAll${room}`).disabled = locked[room];

    document.querySelectorAll(`#list-${room} button`)
        .forEach(btn => btn.disabled = locked[room]);

    document.getElementById(`lock${room}`).innerHTML =
        locked[room] ? "Unlock Room 🔓" : "Lock Room 🔒";
}
