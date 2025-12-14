/* AUTH */
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => window.location.href = "index.html")
        .catch(err => alert(err.message));
}

function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => alert("Akun berhasil dibuat"))
        .catch(err => alert(err.message));
}

function logout() {
    auth.signOut().then(() => window.location.href = "login.html");
}

auth.onAuthStateChanged(user => {
    if (!user && window.location.pathname.includes("index")) {
        window.location.href = "login.html";
    }
});

/* SEARCH */
const searchInput = document.getElementById("search");
if (searchInput) {
    searchInput.addEventListener("keyup", function () {
        const value = this.value.toLowerCase();
        document.querySelectorAll(".resep-card").forEach(card => {
            card.style.display = card.dataset.title.includes(value)
                ? "block" : "none";
        });
    });
}

/* Q&A */
let currentRecipe = "";

function openQA(recipe) {
    currentRecipe = recipe;
    document.getElementById("qa-section").classList.remove("hidden");
    document.getElementById("qa-title").innerText = "Tanya Jawab: " + recipe;
    loadQuestions();
}

function submitQuestion() {
    const text = document.getElementById("question").value;
    if (!text) return;

    const data = JSON.parse(localStorage.getItem(currentRecipe)) || [];
    data.push(text);
    localStorage.setItem(currentRecipe, JSON.stringify(data));

    document.getElementById("question").value = "";
    loadQuestions();
}

function loadQuestions() {
    const qaList = document.getElementById("qa-list");
    qaList.innerHTML = "";

    const data = JSON.parse(localStorage.getItem(currentRecipe)) || [];
    data.forEach(q => {
        const div = document.createElement("div");
        div.innerHTML = "❓ " + q;
        qaList.appendChild(div);
    });
}
