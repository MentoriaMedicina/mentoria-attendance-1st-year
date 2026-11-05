// =====================================================
// MENTORIA MEDICINA - ADMIN PANEL
// Firebase Authentication + Firestore
// =====================================================

import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc,
    addDoc,
    collection,
    getDocs,
    query,
    where,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// =====================================================
// FIREBASE CONFIG
// =====================================================

const firebaseConfig = {
  apiKey: "AIzaSyBPag4SLUqmdfAws0WFLV7FWp3X8_eLPXQ",
  authDomain: "mentoria-medicina-attend-7d5ca.firebaseapp.com",
  databaseURL: "https://mentoria-medicina-attend-7d5ca-default-rtdb.firebaseio.com",
  projectId: "mentoria-medicina-attend-7d5ca",
  storageBucket: "mentoria-medicina-attend-7d5ca.firebasestorage.app",
  messagingSenderId: "238479536134",
  appId: "1:238479536134:web:3ff9a57dc1cb70dc8c9387",
  measurementId: "G-WEVCZ0JG2K"
};


// =====================================================
// INITIALIZE FIREBASE
// =====================================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

console.log("Firebase initialized");
console.log("Admin JS loaded");


// =====================================================
// HTML ELEMENTS
// =====================================================

const loginSection =
    document.getElementById("loginSection");

const adminDashboard =
    document.getElementById("adminDashboard");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const loginBtn =
    document.getElementById("loginBtn");

const loginMessage =
    document.getElementById("loginMessage");

const logoutBtn =
    document.getElementById("logoutBtn");

const adminEmail =
    document.getElementById("adminEmail");

const groupFilter =
    document.getElementById("groupFilter");

const dateFilter =
    document.getElementById("dateFilter");

const absentList =
    document.getElementById("absentList");

const totalStudents =
    document.getElementById("totalStudents");

const absentCount =
    document.getElementById("absentCount");


// =====================================================
// STUDENT GROUPS
// =====================================================

const groups = {

    "Group 7": [
        "Jayaram",
        "Nikhil",
        "Afsal",
        "Ashwin",
        "Vibin",
        "Akshay",
        "Revathy",
        "Aksa",
        "Vincy",
        "Abiya",
        "Nayana",
        "Jesna",
        "Ashina",
        "Devi Nandana",
        "Aleena",
        "Priya",
        "Riya",
        "Neenu",
        "Sona",
        "Avanthika"
    ],
  
    "Group 8": [
    "PAUL SHINE",
    "DAN B SAM",
    "RAJKRISHNA B",
    "JUSTIN SHAJI",
    "MURSHIDA THASNEEM P",
    "FEBINA ROJIN",
    "GODWIN BINU MATHEW",
    "ANANNYA",
    "HIBA",
    "NITHA FATHIMA",
    "SHIFANA SHERIN",
    "ALFIYA",
    "LAKSHMISHREE",
    "RIYA SHAJI",
    "SREEMATHI G",
    "ANN MARIA",
    "JAREENA",
    "EVA SAYONA"
],

    "Group 9": [
        "Ajlan Mahmood",
        "Aliya naushad",
        "Almaz russel",
        "Persis Susan Sonu",
        "Fathima Abdul Rahman",
        "Ansa ajilal",
        "Ashmi ajmeer",
        "Aslam",
        "Alona",
        "Yuktha",
        "Razin",
        "Nifana",
        "Nizam",
        "Devika",
        "Sadhika",
        "Adithya",
        "Jithin",
        "Yaseen",
        "Aishwarya"
    ],

    "Group 10": [
        "P Meenakshy Nair",
        "Gloria v s",
        "Sandra. S. R",
        "Aashni J R",
        "Noora fathima",
        "Rehsilan. H",
        "Jemima Sara Binu",
        "Anamika. S",
        "Mubeena pattan",
        "Aiswariya raj",
        "Vipanjika s",
        "Sajana rs",
        "Anaswara s",
        "Divya l",
        "Ajay JB",
        "Efrin Sam",
        "Adwaith Anish",
        "Rajeev",
        "Adhitiyan A",
        "Jelshian VA"
    ],

    "Group 11": [
        "Anu suresh Aryananda",
        "Archana shaji Akshaya",
        "Biju Anugraha",
        "George Anamika",
        "Vanju kavitha Anjali",
        "Varghese sindhu Arsha",
        "Sunil Athma",
        "Sajitha Rajesh Aparna",
        "Sanilkumar Rakhi Angel",
        "Prema Ajayan Nandana",
        "Saiju Nimisha",
        "Ramachandran pillai ardra",
        "Ramesh dhanya Roshni",
        "Krishna Amita",
        "Aadith Nair",
        "Nadhusha Althaf",
        "Koshi Aneesh Amal",
        "Adarsh",
        "Shaji Arjun",
        "Shaji Jagath"
    ],

    "Group 12": [
        "Musthaid",
        "anaswara",
        "varsha",
        "sruthi",
        "Jackson",
        "Rayan",
        "Arya",
        "Albin",
        "Basil",
        "Sajena",
        "afsana",
        "Nikhitha",
        "Ajmina",
        "Gowthami",
        "Ann",
        "shadi",
        "Alfiya",
        "Jeeva",
        "Sidra",
        "Reby"
    ],

    "Group 13": [
        "Niranjan",
        "Athul Rajendran",
        "Abhiram Darshan H",
        "Abhay S R",
        "Amrita SM",
        "Shalu R",
        "Sangeetha P Saji",
        "Jolsna John",
        "Aasiya Fazi",
        "Aksa Jose",
        "Sandra B",
        "Alna Prasad",
        "Georgy",
        "Nadeem",
        "Shifana Badri",
        "Anshifa Mehar",
        "Alfa M S",
        "Muhsina",
        "Abhishek",
        "Gulfisha"
    ],

    "Group 15": [
        "Joshua jimmy",
        "Saldan k.s",
        "Abhinandh L.S",
        "Jasmine Maria John",
        "Aisha M Anzari",
        "Alakanandha",
        "Snena Angel",
        "Christy Sara Pinto"
    ]

};


// =====================================================
// LOGIN
// =====================================================

loginBtn.addEventListener("click", async () => {

    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;

    if (!email || !password) {

        loginMessage.textContent =
            "Please enter email and password.";

        loginMessage.style.color =
            "red";

        return;
    }


    loginBtn.disabled = true;

    loginBtn.textContent =
        "Logging in...";


    loginMessage.textContent =
        "Checking account...";

    loginMessage.style.color =
        "#1565c0";


    try {

        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
            userCredential.user;


        console.log(
            "Authentication successful:",
            user.uid
        );


        // Check admins collection

        const adminRef =
            doc(
                db,
                "admins",
                user.uid
            );


        const adminSnapshot =
            await getDoc(adminRef);


        if (!adminSnapshot.exists()) {

            await signOut(auth);

            loginMessage.textContent =
                "Login successful, but this account has no admin permission.";

            loginMessage.style.color =
                "red";

            return;
        }


        const adminData =
            adminSnapshot.data();


        if (adminData.role !== "admin") {

            await signOut(auth);

            loginMessage.textContent =
                "This account is not an admin.";

            loginMessage.style.color =
                "red";

            return;
        }


        console.log(
            "Admin permission verified"
        );


        loginMessage.textContent =
            "Login successful.";

        loginMessage.style.color =
            "green";


    } catch (error) {

        console.error(
            "LOGIN ERROR:",
            error
        );


        loginMessage.textContent =
            getErrorMessage(error);

        loginMessage.style.color =
            "red";

    }


    loginBtn.disabled = false;

    loginBtn.textContent =
        "Login";

});


// =====================================================
// AUTH STATE
// =====================================================

onAuthStateChanged(
    auth,
    async (user) => {

        if (!user) {

            showLogin();

            return;
        }


        console.log(
            "User already logged in:",
            user.email
        );


        try {

            const adminRef =
                doc(
                    db,
                    "admins",
                    user.uid
                );


            const adminSnapshot =
                await getDoc(adminRef);


            if (!adminSnapshot.exists()) {

                await signOut(auth);

                showLogin();

                loginMessage.textContent =
                    "This account does not have admin permission.";

                loginMessage.style.color =
                    "red";

                return;
            }


            const adminData =
                adminSnapshot.data();


            if (adminData.role !== "admin") {

                await signOut(auth);

                showLogin();

                loginMessage.textContent =
                    "This account is not an admin.";

                loginMessage.style.color =
                    "red";

                return;
            }


            showDashboard(
                user,
                adminData
            );


            initializeDashboard();


        } catch (error) {

            console.error(
                "ADMIN CHECK ERROR:",
                error
            );

            showLogin();

            loginMessage.textContent =
                "Could not verify admin permission.";

            loginMessage.style.color =
                "red";
        }

    }
);


// =====================================================
// SHOW LOGIN
// =====================================================

function showLogin() {

    loginSection.style.display =
        "flex";

    adminDashboard.style.display =
        "none";

}


// =====================================================
// SHOW DASHBOARD
// =====================================================

function showDashboard(
    user,
    adminData
) {

    loginSection.style.display =
        "none";

    adminDashboard.style.display =
        "block";


    adminEmail.textContent =
        adminData.name ||
        user.email;

}


// =====================================================
// LOGOUT
// =====================================================

logoutBtn.addEventListener(
    "click",
    async () => {

        await signOut(auth);

        showLogin();

        emailInput.value = "";

        passwordInput.value = "";

    }
);


// =====================================================
// INITIALIZE DASHBOARD
// =====================================================

function initializeDashboard() {

    setupGroups();

    setupDate();

    createSessionPanel();

    loadAttendance();

}


// =====================================================
// GROUP FILTER
// =====================================================

function setupGroups() {

    groupFilter.innerHTML = `

        <option value="">
            All Groups
        </option>

        <option value="Group 7">
            Group 7
        </option>
        <option value="Group 8">
            Group 8
        </option>
        <option value="Group 9">
            Group 9
        </option>

        <option value="Group 10">
            Group 10
        </option>

        <option value="Group 11">
            Group 11
        </option>

        <option value="Group 12">
            Group 12
        </option>

        <option value="Group 13">
            Group 13
        </option>

        <option value="Group 15">
            Group 15
        </option>

    `;


    groupFilter.addEventListener(
        "change",
        loadAttendance
    );

}


// =====================================================
// DATE
// =====================================================

function setupDate() {

    dateFilter.value =
        todayString();


    dateFilter.addEventListener(
        "change",
        loadAttendance
    );

}


// =====================================================
// CREATE SESSION PANEL
// =====================================================

function createSessionPanel() {

    if (
        document.getElementById(
            "sessionPanel"
        )
    ) {
        return;
    }


    const panel =
        document.createElement("div");


    panel.id =
        "sessionPanel";

    panel.className =
        "admin-card";


    panel.innerHTML = `

        <h2>
            Open Attendance
        </h2>

        <div class="session-controls">

            <label>

                Group

                <select id="sessionGroup">

                    <option value="">
                        Select Group
                    </option>

                    <option value="Group 7">
            Group 7
        </option>
           <option value="Group 8">
            Group 8
        </option>
                    <option value="Group 9">
                        Group 9
                    </option>

                    <option value="Group 10">
                        Group 10
                    </option>

                    <option value="Group 11">
                        Group 11
                    </option>

                    <option value="Group 12">
                        Group 12
                    </option>

                    <option value="Group 13">
                        Group 13
                    </option>

                    <option value="Group 15">
                        Group 15
                    </option>

                </select>

            </label>


            <label>

                Duration

                <select id="sessionDuration">

                    <option value="10">
                        10 minutes
                    </option>

                    <option value="15">
                        15 minutes
                    </option>

                    <option value="20" selected>
                        20 minutes
                    </option>

                    <option value="30">
                        30 minutes
                    </option>

                    <option value="45">
                        45 minutes
                    </option>

                    <option value="60">
                        60 minutes
                    </option>

                </select>

            </label>


            <button
                id="openSessionBtn"
                class="open-session-btn">

                Open Attendance

            </button>


            <button
                id="closeSessionBtn"
                class="close-session-btn"
                style="display:none;">

                Close Attendance

            </button>

        </div>


        <div
            id="sessionStatus"
            class="session-status">

            No active session.

        </div>

    `;


    const container =
        document.querySelector(
            ".dashboard-container"
        );


    // Put session panel at top
    container.insertBefore(
        panel,
        container.firstChild
    );


    document
        .getElementById("openSessionBtn")
        .addEventListener(
            "click",
            openSession
        );


    document
        .getElementById("closeSessionBtn")
        .addEventListener(
            "click",
            closeSession
        );


    checkActiveSession();

}


// =====================================================
// OPEN SESSION
// =====================================================

async function openSession() {

    const group =
        document.getElementById(
            "sessionGroup"
        ).value;


    const duration =
        Number(
            document.getElementById(
                "sessionDuration"
            ).value
        );


    const status =
        document.getElementById(
            "sessionStatus"
        );


    if (!group) {

        status.textContent =
            "Please select a group.";

        status.className =
            "session-status warning";

        return;
    }


    try {

        // Check active sessions

        const activeQuery =
            query(
                collection(
                    db,
                    "sessions"
                ),
                where(
                    "active",
                    "==",
                    true
                )
            );


        const activeSnapshot =
            await getDocs(
                activeQuery
            );


        if (!activeSnapshot.empty) {

            status.textContent =
                "Another attendance session is already open.";

            status.className =
                "session-status warning";

            return;
        }


        const start =
            new Date();


        const end =
            new Date(
                start.getTime() +
                duration * 60 * 1000
            );


        const sessionData = {

            group: group,

            active: true,

            startTime:
                start.toISOString(),

            endTime:
                end.toISOString(),

            duration:
                duration,

            createdBy:
                auth.currentUser.uid,

            createdAt:
                serverTimestamp()

        };


        const sessionRef =
            await addDoc(
                collection(
                    db,
                    "sessions"
                ),
                sessionData
            );


        console.log(
            "Session created:",
            sessionRef.id
        );


        status.textContent =
            `Group ${group} attendance is OPEN until ${formatTime(end)}.`;

        status.className =
            "session-status session-active";


        document
            .getElementById(
                "openSessionBtn"
            )
            .style.display =
            "none";


        document
            .getElementById(
                "closeSessionBtn"
            )
            .style.display =
            "inline-block";


        document
            .getElementById(
                "sessionGroup"
            )
            .disabled =
            true;


        document
            .getElementById(
                "sessionDuration"
            )
            .disabled =
            true;


        // Automatically select group in records

        groupFilter.value =
            group;


        await loadAttendance();


    } catch (error) {

        console.error(
            "OPEN SESSION ERROR:",
            error
        );


        status.textContent =
            "Could not open session: " +
            error.message;

        status.className =
            "session-status error";

    }

}


// =====================================================
// CHECK ACTIVE SESSION
// =====================================================

async function checkActiveSession() {

    try {

        const activeQuery =
            query(
                collection(
                    db,
                    "sessions"
                ),
                where(
                    "active",
                    "==",
                    true
                )
            );


        const snapshot =
            await getDocs(
                activeQuery
            );


        if (snapshot.empty) {

            resetSession();

            return;
        }


        const sessionDoc =
            snapshot.docs[0];


        const session =
            sessionDoc.data();


        const now =
            new Date();


        const end =
            new Date(
                session.endTime
            );


        // Automatically close expired session

        if (now >= end) {

            await updateDoc(
                doc(
                    db,
                    "sessions",
                    sessionDoc.id
                ),
                {
                    active: false,
                    closedAt:
                        serverTimestamp()
                }
            );


            resetSession();

            return;
        }


        const status =
            document.getElementById(
                "sessionStatus"
            );


        status.textContent =
            `Group ${session.group} attendance is OPEN until ${formatTime(end)}.`;


        status.className =
            "session-status session-active";


        document
            .getElementById(
                "sessionGroup"
            )
            .value =
            session.group;


        document
            .getElementById(
                "sessionGroup"
            )
            .disabled =
            true;


        document
            .getElementById(
                "sessionDuration"
            )
            .disabled =
            true;


        document
            .getElementById(
                "openSessionBtn"
            )
            .style.display =
            "none";


        document
            .getElementById(
                "closeSessionBtn"
            )
            .style.display =
            "inline-block";


    } catch (error) {

        console.error(
            "CHECK SESSION ERROR:",
            error
        );

    }

}


// =====================================================
// CLOSE SESSION
// =====================================================

async function closeSession() {

    try {

        const activeQuery =
            query(
                collection(
                    db,
                    "sessions"
                ),
                where(
                    "active",
                    "==",
                    true
                )
            );


        const snapshot =
            await getDocs(
                activeQuery
            );


        for (
            const sessionDoc
            of snapshot.docs
        ) {

            await updateDoc(
                doc(
                    db,
                    "sessions",
                    sessionDoc.id
                ),
                {
                    active: false,

                    closedAt:
                        serverTimestamp(),

                    closedBy:
                        auth.currentUser.uid
                }
            );

        }


        resetSession();

        await loadAttendance();


    } catch (error) {

        console.error(
            "CLOSE SESSION ERROR:",
            error
        );

        alert(
            "Could not close session:\n" +
            error.message
        );

    }

}


// =====================================================
// RESET SESSION
// =====================================================

function resetSession() {

    const status =
        document.getElementById(
            "sessionStatus"
        );


    if (status) {

        status.textContent =
            "No active attendance session.";

        status.className =
            "session-status session-closed";

    }


    const openBtn =
        document.getElementById(
            "openSessionBtn"
        );


    const closeBtn =
        document.getElementById(
            "closeSessionBtn"
        );


    const group =
        document.getElementById(
            "sessionGroup"
        );


    const duration =
        document.getElementById(
            "sessionDuration"
        );


    if (openBtn)
        openBtn.style.display =
            "inline-block";


    if (closeBtn)
        closeBtn.style.display =
            "none";


    if (group) {

        group.disabled =
            false;

        group.value =
            "";

    }


    if (duration)
        duration.disabled =
            false;

}


// =====================================================
// LOAD ATTENDANCE
// =====================================================

async function loadAttendance() {

    absentList.innerHTML =
        "<p>Loading attendance...</p>";


    try {

        const selectedGroup =
            groupFilter.value;


        const selectedDate =
            dateFilter.value;


        const snapshot =
            await getDocs(
                collection(
                    db,
                    "attendance"
                )
            );


        const records = [];


        snapshot.forEach(
            (docSnapshot) => {

                const data =
                    docSnapshot.data();


                // Group filter

                if (
                    selectedGroup &&
                    data.group !== selectedGroup
                ) {
                    return;
                }


                // Date filter

                if (
                    data.submittedAt &&
                    data.submittedAt.toDate
                ) {

                    const date =
                        dateString(
                            data.submittedAt.toDate()
                        );


                    if (
                        date !== selectedDate
                    ) {
                        return;
                    }

                }


                records.push({

                    id:
                        docSnapshot.id,

                    ...data

                });

            }
        );


 // =====================================================
// REMOVE DUPLICATE STUDENT ATTENDANCE FOR SAME DAY
// Same student + same group + same date = show only once
// Different days = show separately
// =====================================================

const uniqueRecords = new Map();

records.forEach((record) => {

    let date = "unknown";

    if (
        record.submittedAt &&
        record.submittedAt.toDate
    ) {

        date =
            dateString(
                record.submittedAt.toDate()
            );

    }

    const student =
        record.studentId ||
        record.studentName ||
        record.id;

    const group =
        record.group ||
        selectedGroup ||
        "";

    const key =
        group +
        "_" +
        student +
        "_" +
        date;

    if (
        !uniqueRecords.has(key)
    ) {

        uniqueRecords.set(
            key,
            record
        );

    }

});


// Convert back to array

const finalRecords =
    Array.from(
        uniqueRecords.values()
    );


// =====================================================
// SORT NEWEST FIRST
// =====================================================

finalRecords.sort(
    (a, b) => {

        const aTime =
            a.submittedAt?.seconds ||
            0;

        const bTime =
            b.submittedAt?.seconds ||
            0;

        return bTime - aTime;

    }
);


displayAttendance(
    finalRecords,
    selectedGroup
);


    } catch (error) {

        console.error(
            "ATTENDANCE ERROR:",
            error
        );


        absentList.innerHTML = `

            <p style="color:red;">

                Error loading attendance:<br>

                ${escapeHtml(
                    error.message
                )}

            </p>

        `;

    }

}


// =====================================================
// DISPLAY ATTENDANCE
// =====================================================

function displayAttendance(
    records,
    selectedGroup
) {

    let total = 0;


    if (selectedGroup) {

        total =
            groups[selectedGroup]?.length ||
            0;

    } else {

        total =
            Object.values(groups)
                .reduce(
                    (sum, list) =>
                        sum + list.length,
                    0
                );

    }


    totalStudents.textContent =
        total;


    absentCount.textContent =
        records.length;


    if (records.length === 0) {

        absentList.innerHTML = `

            <p>
                No absent students found.
            </p>

        `;

        return;
    }


    absentList.innerHTML = "";


    records.forEach(
        (record, index) => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "attendance-item";


            let time =
                "";


            if (
                record.submittedAt &&
                record.submittedAt.toDate
            ) {

                time =
                    formatTime(
                        record.submittedAt.toDate()
                    );

            }


            item.innerHTML = `

                <strong>
                    ${index + 1}.
                    ${escapeHtml(
                        record.studentName ||
                        "Unknown"
                    )}
                </strong>

                <br>

                Group:
                ${escapeHtml(
                    record.group ||
                    "-"
                )}

                <br>

                Time:
                ${time || "Unknown"}

                <br><br>

                <button
                    class="delete-attendance"
                    style="
                        padding:7px 12px;
                        border:none;
                        border-radius:6px;
                        background:#c62828;
                        color:white;
                        cursor:pointer;
                    "
                >
                    Delete
                </button>

            `;


            item
                .querySelector(
                    ".delete-attendance"
                )
                .addEventListener(
                    "click",
                    () => deleteAttendance(
                        record.id
                    )
                );


            absentList.appendChild(
                item
            );

        }
    );

}


// =====================================================
// DELETE ATTENDANCE
// =====================================================

async function deleteAttendance(
    id
) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this absence record?"
        );


    if (!confirmDelete) {
        return;
    }


    try {

        await deleteDoc(
            doc(
                db,
                "attendance",
                id
            )
        );


        await loadAttendance();


    } catch (error) {

        console.error(
            "DELETE ERROR:",
            error
        );


        alert(
            "Could not delete record:\n" +
            error.message
        );

    }

}


// =====================================================
// DATE HELPERS
// =====================================================

function todayString() {

    const now =
        new Date();


    const year =
        now.getFullYear();


    const month =
        String(
            now.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            now.getDate()
        ).padStart(
            2,
            "0"
        );


    return `${year}-${month}-${day}`;

}


function dateString(date) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return `${year}-${month}-${day}`;

}


// =====================================================
// TIME
// =====================================================

function formatTime(date) {

    return date.toLocaleTimeString(
        [],
        {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        }
    );

}


// =====================================================
// SECURITY
// =====================================================

function escapeHtml(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


// =====================================================
// FIREBASE ERROR
// =====================================================

function getErrorMessage(error) {

    console.error(
        "Firebase error:",
        error
    );


    switch (error.code) {

        case "auth/invalid-credential":

            return "Incorrect email or password.";

        case "auth/invalid-email":

            return "Invalid email address.";

        case "auth/user-not-found":

            return "No Firebase account exists with this email.";

        case "auth/wrong-password":

            return "Incorrect password.";

        case "auth/too-many-requests":

            return "Too many attempts. Try again later.";

        case "auth/network-request-failed":

            return "Network error. Check your internet connection.";

        case "auth/unauthorized-domain":

            return "This website is not authorized in Firebase.";

        case "auth/api-key-not-valid":

            return "Firebase API key is invalid.";

        case "permission-denied":

            return "Firestore permission denied. Check Firestore Rules.";

        default:

            return (
                error.message ||
                "Login failed."
            );

    }

}
// ================================================
// DOWNLOAD ABSENT STUDENTS PDF
// ================================================

const downloadAbsentPdfBtn =
    document.getElementById("downloadAbsentPdf");

if (downloadAbsentPdfBtn) {

    downloadAbsentPdfBtn.addEventListener(
        "click",
        async () => {

            try {

                // Disable button while creating PDF
                downloadAbsentPdfBtn.disabled = true;

                downloadAbsentPdfBtn.textContent =
                    "Preparing PDF...";


                // =========================================
                // GET SELECTED DATE
                // =========================================

                const selectedDate =
                    document.getElementById("dateFilter")?.value;


                // =========================================
                // GET SELECTED GROUP
                // =========================================

                const selectedGroup =
                    document.getElementById("groupFilter")?.value || "";


                // =========================================
                // CHECK DATE
                // =========================================

                if (!selectedDate) {

                    alert(
                        "Please select a date first."
                    );

                    return;
                }


                // =========================================
                // GET ALL ATTENDANCE RECORDS
                // =========================================

                const snapshot =
                    await getDocs(
                        collection(db, "attendance")
                    );


                // =========================================
                // UNIQUE STUDENTS MAP
                // =========================================

                const uniqueStudents =
                    new Map();


                // =========================================
                // CHECK EACH ATTENDANCE RECORD
                // =========================================

                snapshot.forEach((docSnap) => {

                    const data =
                        docSnap.data();


                    // =====================================
                    // ONLY ABSENT STUDENTS
                    // =====================================

                    if (
                        String(
                            data.status || ""
                        ).toLowerCase() !== "absent"
                    ) {

                        return;
                    }


                    // =====================================
                    // GET GROUP
                    // =====================================

                    const studentGroup =
                        String(
                            data.group || ""
                        ).trim();


                    // =====================================
                    // GROUP FILTER
                    // =====================================

                    if (
                        selectedGroup &&
                        studentGroup !== selectedGroup
                    ) {

                        return;
                    }


                    // =====================================
                    // GET RECORD DATE
                    // =====================================

                    let recordDate = "";


                    if (
                        data.submittedAt &&
                        typeof data.submittedAt.toDate ===
                        "function"
                    ) {

                        const submittedDate =
                            data.submittedAt.toDate();


                        recordDate =
                            dateString(
                                submittedDate
                            );
                    }


                    // If data.date exists,
                    // use that date

                    if (data.date) {

                        recordDate =
                            String(
                                data.date
                            ).trim();
                    }


                    // =====================================
                    // DATE FILTER
                    // =====================================

                    if (
                        recordDate !== selectedDate
                    ) {

                        return;
                    }


                    // =====================================
                    // GET STUDENT NAME
                    // =====================================

                    const studentName =
                        String(
                            data.studentName ||
                            "Unknown"
                        ).trim();


                    // =====================================
                    // NORMALIZE STUDENT NAME
                    // =====================================

                    const normalizedName =
                        studentName
                            .toLowerCase()
                            .replace(
                                /\s+/g,
                                " "
                            );


                    // =====================================
                    // CREATE UNIQUE KEY
                    // =====================================

                    const uniqueKey =
                        studentGroup
                            .toLowerCase()
                            .trim()
                        +
                        "|"
                        +
                        normalizedName
                        +
                        "|"
                        +
                        recordDate;


                    // =====================================
                    // ADD ONLY IF NOT ALREADY EXISTS
                    // =====================================

                    if (
                        !uniqueStudents.has(
                            uniqueKey
                        )
                    ) {

                        uniqueStudents.set(
                            uniqueKey,
                            {
                                group:
                                    studentGroup,

                                name:
                                    studentName,

                                studentId:
                                    data.studentId ||
                                    ""
                            }
                        );
                    }

                });


                // =========================================
                // CONVERT MAP TO ARRAY
                // =========================================

                const absentStudents =
                    Array.from(
                        uniqueStudents.values()
                    );


                // =========================================
                // SORT STUDENTS
                // =========================================

                absentStudents.sort(
                    (a, b) => {

                        // First sort by group

                        const groupCompare =
                            a.group.localeCompare(
                                b.group
                            );


                        if (
                            groupCompare !== 0
                        ) {

                            return groupCompare;
                        }


                        // Then sort by student name

                        return a.name.localeCompare(
                            b.name
                        );
                    }
                );


                // =========================================
                // NO ABSENT STUDENTS
                // =========================================

                if (
                    absentStudents.length === 0
                ) {

                    alert(
                        "No absent students found for the selected date/group."
                    );

                    return;
                }


                // =========================================
                // CHECK PDF LIBRARY
                // =========================================

                if (!window.jspdf) {

                    alert(
                        "PDF library is not loaded. Please refresh the page."
                    );

                    return;
                }


                // =========================================
                // CREATE PDF
                // =========================================

                const { jsPDF } =
                    window.jspdf;


                const pdf =
                    new jsPDF();


                // =========================================
                // TITLE
                // =========================================

                pdf.setFontSize(18);

                pdf.text(
                    "Mentoria Medicina",
                    105,
                    18,
                    {
                        align: "center"
                    }
                );


                pdf.setFontSize(14);

                pdf.text(
                    "Absent Students",
                    105,
                    28,
                    {
                        align: "center"
                    }
                );


                // =========================================
                // DATE
                // =========================================

                pdf.setFontSize(10);

                pdf.text(
                    "Date: " +
                    selectedDate,
                    14,
                    40
                );


                // =========================================
                // GROUP
                // =========================================

                pdf.text(
                    "Group: " +
                    (
                        selectedGroup
                            ? selectedGroup
                            : "All Groups"
                    ),
                    14,
                    47
                );


                // =========================================
                // TOTAL ABSENT
                // =========================================

                pdf.text(
                    "Total Absent: " +
                    absentStudents.length,
                    14,
                    54
                );


                // =========================================
                // TABLE ROWS
                // =========================================

                const tableRows =
                    absentStudents.map(
                        (
                            student,
                            index
                        ) => [

                            index + 1,

                            student.group,

                            student.name,

                            student.studentId
                        ]
                    );


                // =========================================
                // CREATE TABLE
                // =========================================

                pdf.autoTable({

                    startY: 62,

                    head: [

                        [
                            "No.",
                            "Group",
                            "Student Name",
                            "Student ID"
                        ]

                    ],

                    body:
                        tableRows,

                    theme:
                        "grid",

                    styles: {

                        fontSize:
                            9,

                        cellPadding:
                            3
                    },

                    headStyles: {

                        fontStyle:
                            "bold"
                    }

                });


                // =========================================
                // CREATE FILE NAME
                // =========================================

                const groupName =
                    selectedGroup
                        ? selectedGroup.replace(
                            /\s+/g,
                            "_"
                        )
                        : "All_Groups";


                const fileName =
                    "Mentoria_Absent_" +
                    groupName +
                    "_" +
                    selectedDate +
                    ".pdf";


                // =========================================
                // DOWNLOAD
                // =========================================

                pdf.save(
                    fileName
                );


            } catch (error) {

                // =========================================
                // ERROR
                // =========================================

                console.error(
                    "PDF DOWNLOAD ERROR:",
                    error
                );


                alert(
                    "Could not create PDF.\n\n" +
                    (
                        error.message ||
                        error
                    )
                );


            } finally {

                // =========================================
                // ENABLE BUTTON AGAIN
                // =========================================

                downloadAbsentPdfBtn.disabled =
                    false;

                downloadAbsentPdfBtn.textContent =
                    "Download Absent PDF";
            }

        }
    );
                }

