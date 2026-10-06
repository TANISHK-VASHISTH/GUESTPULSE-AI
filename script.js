/* ==================================
   GUESTPULSE AI
   FRONTEND DEMO ENGINE

   NOTE:
   This is a prototype.
   AI decisions are currently simulated
   using intelligent keyword/rule logic.

   A real NLP/ML API can replace this
   function later.
================================== */


const complaintInput = document.getElementById("complaint");
const charCount = document.getElementById("charCount");


/* ==============================
   CHARACTER COUNTER
================================ */

complaintInput.addEventListener("input", function () {

    charCount.textContent = this.value.length;

});


/* ==============================
   EXAMPLE BUTTON
================================ */

function setExample(text) {

    complaintInput.value = text;

    charCount.textContent = text.length;

    complaintInput.focus();

}


/* ==============================
   MAIN ANALYSIS
================================ */

function submitRequest() {

    const complaint = complaintInput.value.trim();

    if (complaint.length < 5) {

        alert("Please describe your concern before analyzing it.");

        complaintInput.focus();

        return;
    }


    /*
       Convert message into lowercase
       for easier analysis.
    */

    const text = complaint.toLowerCase();


    let department = "Guest Relations";
    let priority = "Medium";
    let sentiment = "Concerned";

    let riskScore = 55;

    let action =
        "Guest Relations should review the request.";

    let actionDescription =
        "The request has been identified and routed for follow-up.";

    let insight =
        "GuestPulse AI identified a guest concern and evaluated its context, sentiment and potential impact.";


    /* ==============================
       MAINTENANCE
    ============================== */

    if (
        text.includes("ac") ||
        text.includes("air conditioner") ||
        text.includes("air conditioning") ||
        text.includes("water") ||
        text.includes("electric") ||
        text.includes("electricity") ||
        text.includes("light") ||
        text.includes("power") ||
        text.includes("hot water") ||
        text.includes("heater") ||
        text.includes("leak")
    ) {

        department = "Maintenance";

        priority = "High";

        riskScore = 91;

        sentiment = "Frustrated";

        action =
            "Immediate maintenance attention recommended.";

        actionDescription =
            "A technical issue may directly affect the guest's stay.";

        insight =
            "The complaint indicates a service-impacting maintenance issue. High urgency combined with potential stay disruption increases the guest risk score.";

    }


    /* ==============================
       HOUSEKEEPING
    ============================== */

    else if (
        text.includes("clean") ||
        text.includes("dirty") ||
        text.includes("towel") ||
        text.includes("bed") ||
        text.includes("housekeeping") ||
        text.includes("room service") ||
        text.includes("linen")
    ) {

        department = "Housekeeping";

        priority = "Medium";

        riskScore = 72;

        sentiment = "Dissatisfied";

        action =
            "Housekeeping response recommended.";

        actionDescription =
            "The guest's room-service concern should be addressed promptly.";

        insight =
            "The issue directly affects room comfort. Prompt housekeeping intervention can prevent the concern from escalating.";

    }


    /* ==============================
       FOOD & BEVERAGE
    ============================== */

    else if (
        text.includes("food") ||
        text.includes("restaurant") ||
        text.includes("meal") ||
        text.includes("order") ||
        text.includes("breakfast") ||
        text.includes("lunch") ||
        text.includes("dinner") ||
        text.includes("coffee")
    ) {

        department = "Food & Beverage";

        priority = "High";

        riskScore = 76;

        sentiment = "Dissatisfied";

        action =
            "Food & Beverage team should respond promptly.";

        actionDescription =
            "A delayed or incorrect food-service experience can quickly impact guest satisfaction.";

        insight =
            "The complaint relates to food-service experience. Timely intervention may prevent dissatisfaction from affecting the overall stay.";

    }


    /* ==============================
       FRONT DESK
    ============================== */

    else if (
        text.includes("check in") ||
        text.includes("check-in") ||
        text.includes("booking") ||
        text.includes("reservation") ||
        text.includes("bill") ||
        text.includes("payment") ||
        text.includes("checkout") ||
        text.includes("check out") ||
        text.includes("key")
    ) {

        department = "Front Desk";

        priority = "Medium";

        riskScore = 63;

        sentiment = "Concerned";

        action =
            "Front Desk assistance recommended.";

        actionDescription =
            "The guest's request requires front-desk coordination.";

        insight =
            "The request involves guest-facing hotel operations. Quick communication from the front desk can reduce friction.";

    }


    /* ==============================
       URGENCY BOOST
    ============================== */

    if (
        text.includes("urgent") ||
        text.includes("immediately") ||
        text.includes("as soon as possible") ||
        text.includes("right now") ||
        text.includes("already called") ||
        text.includes("still not") ||
        text.includes("since yesterday") ||
        text.includes("hours")
    ) {

        riskScore += 4;

        if (priority !== "High") {
            priority = "High";
        }

    }


    /* ==============================
       CHECKOUT DETECTION
    ============================== */

    if (
        text.includes("checking out") ||
        text.includes("check out in") ||
        text.includes("checkout in")
    ) {

        riskScore += 4;

        insight +=
            " The message also indicates limited time before checkout, increasing the importance of rapid resolution.";

    }


    /* ==============================
       REPEATED COMPLAINT
    ============================== */

    if (
        text.includes("again") ||
        text.includes("twice") ||
        text.includes("already complained") ||
        text.includes("already called")
    ) {

        riskScore += 5;

        priority = "Critical";

        action =
            "Escalation recommended — repeated complaint detected.";

        actionDescription =
            "The guest appears to have raised the issue previously without satisfactory resolution.";

        insight +=
            " A repeated complaint is a strong escalation signal because the issue may already have remained unresolved.";

    }


    /* ==============================
       NEGATIVE SENTIMENT BOOST
    ============================== */

    if (
        text.includes("terrible") ||
        text.includes("worst") ||
        text.includes("angry") ||
        text.includes("disappointed") ||
        text.includes("unacceptable") ||
        text.includes("ridiculous")
    ) {

        riskScore += 5;

        sentiment = "Highly Frustrated";

        priority = "Critical";

        action =
            "Immediate supervisor attention recommended.";

        actionDescription =
            "Strong negative sentiment suggests a high risk of guest dissatisfaction.";

    }


    /* ==============================
       CAP SCORE
    ============================== */

    if (riskScore > 99) {
        riskScore = 99;
    }


    /* ==============================
       RISK LABEL
    ============================== */

    let riskLabel = "Moderate";

    if (riskScore >= 85) {

        riskLabel = "High Risk";

    } else if (riskScore >= 70) {

        riskLabel = "Watch Closely";

    } else {

        riskLabel = "Low Risk";

    }


    /* ==============================
       RESPONSE STATUS
    ============================== */

    let responseStatus = "Team Notified";

    if (riskScore >= 85) {

        responseStatus = "Priority Alert Sent";

    }

    if (priority === "Critical") {

        responseStatus = "Supervisor Escalated";

    }


    /* ==============================
       UPDATE UI
    ============================== */

    document.getElementById("resultComplaint").textContent =
        complaint;

    document.getElementById("department").textContent =
        department;

    document.getElementById("priority").textContent =
        priority;

    document.getElementById("sentiment").textContent =
        sentiment;

    document.getElementById("riskScore").textContent =
        riskScore;

    document.getElementById("riskLabel").textContent =
        riskLabel;

    document.getElementById("recommendedAction").textContent =
        action;

    document.getElementById("actionDescription").textContent =
        actionDescription;

    document.getElementById("responseStatus").textContent =
        responseStatus;

    document.getElementById("aiInsight").textContent =
        insight;


    /* ==============================
       SHOW RESULT
    ============================== */

    const resultSection =
        document.getElementById("resultSection");

    resultSection.classList.remove("hidden");


    /* ==============================
       SCROLL TO RESULT
    ============================== */

    setTimeout(() => {

        resultSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 150);

}


/* ==============================
   NEW REQUEST
================================ */

function newRequest() {

    complaintInput.value = "";

    charCount.textContent = "0";

    document
        .getElementById("resultSection")
        .classList.add("hidden");

    window.scrollTo({
        top: document.querySelector(".complaint-card").offsetTop - 100,
        behavior: "smooth"
    });

}


/* ==============================
   DEMO CONSOLE MESSAGE
================================ */

console.log(
    "%c GuestPulse AI ",
    "background:#0b1420;color:#c9a86a;font-size:18px;padding:8px;"
);

console.log(
    "Resolve Before They Review. | AI/NLP Hospitality Student Project"
);