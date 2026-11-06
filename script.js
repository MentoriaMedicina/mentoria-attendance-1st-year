/* ==================================================
   MENTORIA MEDICINA
   STUDENT ATTENDANCE
   Firebase + Firestore
================================================== */


/* ==================================================
   FIREBASE IMPORTS
================================================== */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


/* ==================================================
   FIREBASE CONFIG
================================================== */

const firebaseConfig = {

    apiKey:
        "AIzaSyBPag4SLUqmdfAws0WFLV7FWp3X8_eLPXQ",

    authDomain:
        "mentoria-medicina-attend-7d5ca.firebaseapp.com",

    projectId:
        "mentoria-medicina-attend-7d5ca",

    storageBucket:
        "mentoria-medicina-attend-7d5ca.firebasestorage.app",

    messagingSenderId:
        "238479536134",

    appId:
        "1:238479536134:web:3ff9a57dc1cb70dc8c9387"
};


/* ==================================================
   INITIALIZE FIREBASE
================================================== */

const app =
    initializeApp(firebaseConfig);

const db =
    getFirestore(app);

console.log(
    "Firebase connected successfully"
);


/* ==================================================
   STUDENT GROUPS
================================================== */

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


/* ==================================================
   HTML ELEMENTS
================================================== */

const groupSelect =
    document.getElementById(
        "groupSelect"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const studentList =
    document.getElementById(
        "studentList"
    );

const classTitle =
    document.getElementById(
        "classTitle"
    );

const attendanceStatus =
    document.getElementById(
        "attendanceStatus"
    );

const totalStudents =
    document.getElementById(
        "totalStudents"
    );

const absentCount =
    document.getElementById(
        "absentCount"
    );


/* ==================================================
   VARIABLES
================================================== */

let activeSession = null;

let attendance = {};


/* ==================================================
   CREATE STUDENT ID
================================================== */

function createStudentId(
    group,
    name
) {

    return (
        group +
        "_" +
        name
            .replace(/\s+/g, "_")
            .replace(/[.#$[\]/]/g, "")
    );

}


/* ==================================================
   LOAD GROUPS INTO SELECT
================================================== */

Object.keys(groups).forEach(
    groupName => {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            groupName;

        option.textContent =
            groupName;

        groupSelect.appendChild(
            option
        );

    }
);


/* ==================================================
   UPDATE STATUS
================================================== */

function updateStatus(
    message
) {

    if (
        attendanceStatus
    ) {

        attendanceStatus.textContent =
            message;

    }

}


/* ==================================================
   FIND ACTIVE SESSION
================================================== */

async function findActiveSession() {

    try {

        console.log(
            "Checking active session..."
        );


        const sessionsRef =
            collection(
                db,
                "sessions"
            );


        const sessionQuery =
            query(
                sessionsRef,
                where(
                    "active",
                    "==",
                    true
                )
            );


        const snapshot =
            await getDocs(
                sessionQuery
            );


        activeSession =
            null;


        if (
            snapshot.empty
        ) {

            console.log(
                "No active session"
            );

            updateStatus(
                "No active attendance"
            );

            return null;

        }


        const now =
            new Date();


        for (
            const sessionDoc
            of snapshot.docs
        ) {

            const data =
                sessionDoc.data();


            let startTime =
                null;

            let endTime =
                null;


            /* ---------- START TIME ---------- */

            if (
                data.startTime
            ) {

                if (
                    typeof data.startTime.toDate
                    === "function"
                ) {

                    startTime =
                        data.startTime.toDate();

                } else {

                    startTime =
                        new Date(
                            data.startTime
                        );

                }

            }


            /* ---------- END TIME ---------- */

            if (
                data.endTime
            ) {

                if (
                    typeof data.endTime.toDate
                    === "function"
                ) {

                    endTime =
                        data.endTime.toDate();

                } else {

                    endTime =
                        new Date(
                            data.endTime
                        );

                }

            }


            /*
               Session without time
               is treated as active.
            */

            if (
                !startTime ||
                !endTime ||
                (
                    now >= startTime &&
                    now <= endTime
                )
            ) {

                activeSession = {

                    id:
                        sessionDoc.id,

                    ...data

                };

                break;

            }

        }


        /* ---------- NO VALID SESSION ---------- */

        if (
            !activeSession
        ) {

            updateStatus(
                "Attendance closed"
            );

            return null;

        }


        console.log(
            "Active session:",
            activeSession
        );


        updateStatus(
            "Attendance Open"
        );


        return activeSession;


    } catch (error) {

        console.error(
            "Session error:",
            error
        );


        updateStatus(
            "Connection error"
        );


        return null;

    }

}


/* ==================================================
   LOAD ATTENDANCE
================================================== */

async function loadAttendance() {

    attendance = {};


    if (
        !activeSession
    ) {

        displayStudents();

        return;

    }


    const selectedGroup =
        groupSelect.value;


    if (
        !selectedGroup
    ) {

        displayStudents();

        return;

    }


    try {

        const attendanceRef =
            collection(
                db,
                "attendance"
            );


        const attendanceQuery =
            query(

                attendanceRef,

                where(
                    "sessionId",
                    "==",
                    activeSession.id
                ),

                where(
                    "group",
                    "==",
                    selectedGroup
                )

            );


        const snapshot =
            await getDocs(
                attendanceQuery
            );


        snapshot.forEach(
            attendanceDoc => {

                const data =
                    attendanceDoc.data();


                attendance[
                    data.studentId
                ] = {

                    id:
                        attendanceDoc.id,

                    ...data

                };

            }
        );


        console.log(
            "Attendance loaded:",
            attendance
        );


    } catch (error) {

        console.error(
            "Attendance loading error:",
            error
        );

    }


    displayStudents();

}


/* ==================================================
   DISPLAY STUDENTS
================================================== */

function displayStudents() {

    const selectedGroup =
        groupSelect.value;


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    studentList.innerHTML =
        "";


    /* ---------- NO GROUP ---------- */

    if (
        !selectedGroup
    ) {

        classTitle.textContent =
            "Select a group";

        totalStudents.textContent =
            "0";

        absentCount.textContent =
            "0";


        studentList.innerHTML = `
            <div class="empty-message">
                Please select a group.
            </div>
        `;

        return;

    }


    /* ---------- GROUP ---------- */

    classTitle.textContent =
        selectedGroup;


    const students =
        groups[
            selectedGroup
        ];


    totalStudents.textContent =
        students.length;


    let numberOfAbsent =
        0;


    students.forEach(
        (
            student,
            index
        ) => {


            const studentId =
                createStudentId(
                    selectedGroup,
                    student
                );


            const record =
                attendance[
                    studentId
                ];


            if (
                record
            ) {

                numberOfAbsent++;

            }


            /* ---------- SEARCH ---------- */

            if (
                searchText &&
                !student
                    .toLowerCase()
                    .includes(
                        searchText
                    )
            ) {

                return;

            }


            /* ---------- CARD ---------- */

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "student-card";


            /* ---------- INFO ---------- */

            const studentInfo =
                document.createElement(
                    "div"
                );

            studentInfo.className =
                "student-info";


            const number =
                document.createElement(
                    "span"
                );

            number.className =
                "student-number";

            number.textContent =
                (index + 1) + ".";


            const name =
                document.createElement(
                    "span"
                );

            name.className =
                "student-name";

            name.textContent =
                student;


            studentInfo.appendChild(
                number
            );

            studentInfo.appendChild(
                name
            );


            /* ---------- BUTTON ---------- */

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "absent-button";


            /* ---------- ALREADY SUBMITTED ---------- */

            if (
                record
            ) {

                button.textContent =
                    "✓ SUBMITTED";

                button.disabled =
                    true;

                button.classList.add(
                    "submitted"
                );

            }


            /* ---------- CLOSED ---------- */

            else if (
                !activeSession
            ) {

                button.textContent =
                    "CLOSED";

                button.disabled =
                    true;

            }


            /* ---------- ACTIVE ---------- */

            else {

                button.textContent =
                    "ABSENT";


                button.addEventListener(
                    "click",
                    () => {

                        markAbsent(
                            selectedGroup,
                            student
                        );

                    }
                );

            }


            card.appendChild(
                studentInfo
            );

            card.appendChild(
                button
            );


            studentList.appendChild(
                card
            );

        }
    );


    absentCount.textContent =
        numberOfAbsent;

}


/* ==================================================
   MARK ABSENT
================================================== */

async function markAbsent(
    group,
    student
) {

    /* ---------- CHECK SESSION ---------- */

    if (
        !activeSession
    ) {

        alert(
            "Attendance is currently closed."
        );

        return;

    }


    const studentId =
        createStudentId(
            group,
            student
        );


    /* ---------- ALREADY SUBMITTED ---------- */

    if (
        attendance[
            studentId
        ]
    ) {

        return;

    }


    /*
       Immediately lock the button
       while Firebase is saving.
    */

    attendance[
        studentId
    ] = {

        studentId:
            studentId,

        studentName:
            student,

        group:
            group,

        status:
            "absent",

        sessionId:
            activeSession.id,

        submittedAt:
            new Date()

    };


    displayStudents();


    try {

        await addDoc(

            collection(
                db,
                "attendance"
            ),

            {

                sessionId:
                    activeSession.id,

                studentId:
                    studentId,

                studentName:
                    student,

                group:
                    group,

                status:
                    "absent",

                submittedAt:
                    serverTimestamp()

            }

        );


        console.log(
            "Attendance saved:"
            ,
            student
        );


        alert(
            student +
            " marked as ABSENT."
        );


    } catch (error) {

        console.error(
            "Firebase save error:",
            error
        );


        /* ---------- ROLLBACK ---------- */

        delete attendance[
            studentId
        ];


        displayStudents();


        alert(
            "Attendance could not be saved.\n\n" +
            "Please check Firebase Firestore Rules."
        );

    }

}


/* ==================================================
   GROUP CHANGE
================================================== */

groupSelect.addEventListener(
    "change",
    async () => {

        attendance = {};

        displayStudents();

        await loadAttendance();

    }
);


/* ==================================================
   SEARCH
================================================== */

searchInput.addEventListener(
    "input",
    () => {

        displayStudents();

    }
);


/* ==================================================
   INITIALIZE
================================================== */

async function initializeAttendance() {

    console.log(
        "Initializing attendance..."
    );


    updateStatus(
        "Checking attendance..."
    );


    await findActiveSession();


    /*
       Automatically select
       the active session group.
    */

    if (

        activeSession &&

        activeSession.group &&

        groups[
            activeSession.group
        ]

    ) {

        groupSelect.value =
            activeSession.group;

    }


    await loadAttendance();


    console.log(
        "Attendance system ready"
    );

}


/* ==================================================
   START
================================================== */

initializeAttendance();
