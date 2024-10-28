const introText = `
Hi there! I'm Kayb Campbell, and welcome to my Solar Estimator project that I have coded specifically for the company of SunnyMac Solar.

While exploring your site, I noticed that your "Design Your System" tool encountered errors when generating an online quote. As a result, I would have had to fill out a form and wait for follow-up, which inspired me to create a solution that can deliver a mostly accurate, interactive estimate in real-time.

This project showcases my skills and offers an alternative solution! A streamlined, automated approach to improve user experience and engagement. I hope you find it a valuable demonstration of what I can bring to your team. Thank you for your time (:
`;

let i = 0;
let typingSpeed = 35;

function loadNavBar(activePage) {
    const pages = ["Intro", "Estimator Logic", "Estimator", "About Me"];
    const navButtons = pages
        .map(page => {
            const isActive = page === activePage ? "box-shadow: 0px 0px 15px #00FF00;" : "";
            return `<button onclick="load${page.replace(/\s+/g, '')}()" style="padding: 10px 20px; color: #00FF00; background-color: #333; border: none; border-radius: 5px; ${isActive}">${page}</button>`;
        })
        .join("");
    return `<div style="display: flex; justify-content: center; gap: 15px; padding: 10px;">${navButtons}</div>`;
}

function typeWriter() {
    if (i < introText.length) {
        document.getElementById("intro-text").innerHTML += introText.charAt(i);
        i++;
        setTimeout(typeWriter, typingSpeed);
    }
}

function loadIntro() {
    document.getElementById("content-box").innerHTML = `
        ${loadNavBar("Intro")}
        <div id="intro-text" style="color: #00FF00; font-size: 1.2rem; text-align: center; line-height: 1.5; padding: 20px;"></div>
        <div style="display: flex; justify-content: center; margin-top: 20px;">
            <button onclick="skipIntroAnimation()" style="padding: 10px 20px; font-size: 1rem; color: #00FF00; background-color: #333; border: none; border-radius: 5px;">Skip Animation</button>
        </div>
    `;
    i = 0;
    typingSpeed = 35;
    typeWriter();
}

function skipIntroAnimation() {
    typingSpeed = 0; // Instantly complete the typing
}

function loadEstimatorLogic() {
    document.getElementById("content-box").innerHTML = `
        ${loadNavBar("Estimator Logic")}
        <div style="padding: 20px; max-width: 800px; margin: auto; background-color: rgba(0, 0, 0, 0.85); border-radius: 10px; box-shadow: 0px 0px 15px #00FF00;">
            <h2 style="color: #00FF00; font-size: 1.6rem; text-align: center; margin-bottom: 20px;">Estimator Logic</h2>
            <ul style="color: #00FF00; font-size: 1.2rem; line-height: 1.5; list-style-type: disc; padding-left: 20px;">
                <li>Roof Size Calculation: Based on the home type, the total roof size is determined by multiplying the square footage by 1.15 for a single-story house, or 1.4 for a multi-story house.</li>
                <li>Usable Roof Area: The usable area for solar panels is calculated by taking the total roof size and applying the percentage coverage desired by the user. Note: this is an optional entry field but will default to roughly 50% of the estimated roof size if left blank.</li>
                <li>Number of Panels: Each panel covers approx. 17 sq ft. The per-panel cost is set at $300 by default. The number of panels is estimated by dividing the usable roof area by the panel coverage area.</li>
                <li>Total Cost Calculation: The total cost is calculated by multiplying the panel count by the cost per panel. An additional 10% of the annual electricity cost is added to the estimate to cover potential additional expenses.</li>
            </ul>
        </div>
    `;
}

function loadEstimator() {
    document.getElementById("content-box").innerHTML = `
        ${loadNavBar("Estimator")}
        <div style="padding: 20px; max-width: 700px; margin: auto; background-color: rgba(0, 0, 0, 0.8); border-radius: 10px; box-shadow: 0px 0px 15px #00FF00;">
            <h1 style="color: #00FF00; font-size: 1.6rem; text-align: center; margin-bottom: 15px;">Solar Panel Estimator</h1>
            <form id="estimator-form" style="color: #00FF00; font-size: 1.2rem;">
                <div style="margin-bottom: 20px; padding: 0 8px;">
                    <label for="squareFootage">Square Footage of House:</label><br>
                    <input type="number" id="squareFootage" required style="font-size: 1.2rem; padding: 8px; width: 90%;" value="2000">
                </div>
                <div style="margin-bottom: 20px; padding: 0 8px;">
                    <label for="houseStyle">Style of House:</label><br>
                    <select id="houseStyle" required style="font-size: 1.2rem; padding: 8px; width: 90%;">
                        <option value="" disabled selected>Select style</option>
                        <option value="single-story">Single-Story</option>
                        <option value="multi-story">Multi-Story</option>
                    </select>
                </div>
                <div style="margin-bottom: 20px; padding: 0 8px;">
                    <label for="roofCoverage">Percentage of Roof to Cover (%):</label><br>
                    <input type="number" id="roofCoverage" style="font-size: 1.2rem; padding: 8px; width: 90%;" placeholder="Optional">
                </div>
                <div style="margin-bottom: 20px; padding: 0 8px;">
                    <label for="electricityBill">Current Monthly Electricity Bill ($):</label><br>
                    <input type="number" id="electricityBill" required style="font-size: 1.2rem; padding: 8px; width: 90%;" value="150">
                </div>
                <button type="submit" style="padding: 10px 20px; font-size: 1.2rem; color: #00FF00; background-color: #333; border: none; border-radius: 5px; width: 90%; margin: 10px 0;">Estimate Cost</button>
            </form>
            <p id="estimate-result" style="margin-top: 20px; font-weight: bold; color: #00FF00; font-size: 1.2rem;"></p>
        </div>
    `;

    document.getElementById("estimator-form").onsubmit = function (event) {
        event.preventDefault();
        calculateEstimate();
    };
}

function loadAboutMe() {
    document.getElementById("content-box").innerHTML = `
        ${loadNavBar("About Me")}
        <div style="padding: 20px; max-width: 700px; margin: auto; background-color: rgba(0, 0, 0, 0.85); border-radius: 10px; box-shadow: 0px 0px 15px #00FF00;">
            <h1 style="color: #00FF00; font-size: 1.6rem; text-align: center; margin-bottom: 20px;">About Me</h1>
            <p style="color: #00FF00; font-size: 1.2rem; line-height: 1.5;">
                Hello again! Thank you for taking the time to review my application. Although I do not have a formal university degree in coding, I firmly believe I have the skills necessary to excel in this role. I am a self-taught programmer with hands-on experience in HTML, CSS, JavaScript, GO, Python, and C#. I am also well-versed in GitHub, cloud-based server hosting, API integration, and more!
            </p>
            <p style="color: #00FF00; font-size: 1.2rem; line-height: 1.5;">
                Over the past two years, I have worked as a freelance developer, taking on diverse projects that have honed my skills in problem-solving and adaptability. I consider back-end development to be my strong suit, where logic and reasoning are critical. While UI design does not come as naturally to me, I can still produce clean, effective interfaces. My true passion lies in coding, and I would love the opportunity to build a career around it at SunnyMac.
            </p>
            <p style="color: #00FF00; font-size: 1.2rem; line-height: 1.5;">
                Thank you again for your time, and I look forward to speaking with you soon!
            </p>
            <div style="margin-top: 20px;">
                <p style="color: #00FF00; font-size: 1.2rem; text-align: center;">Connect with me:</p>
                <p style="color: #00FF00; text-align: center;">
                    <a href="https://github.com/kaybcampp" target="_blank" style="color: #00FF00; text-decoration: underline;">GitHub Profile</a> | 
                    <a href="https://profile.indeed.com/p/kaybrianac-xg0k963" target="_blank" style="color: #00FF00; text-decoration: underline;">Resume</a><br>
                    Email: <a href="mailto:campbellkaybriana@yahoo.com" style="color: #00FF00;">campbellkaybriana@yahoo.com</a><br>
                    Phone: (302) 898-1430
                </p>
            </div>
        </div>
    `;
}

function calculateEstimate() {
    const squareFootage = parseFloat(document.getElementById("squareFootage").value);
    const houseStyle = document.getElementById("houseStyle").value;
    const roofCoverage = parseFloat(document.getElementById("roofCoverage").value || 50);
    const electricityBill = parseFloat(document.getElementById("electricityBill").value);

    const roofMultiplier = houseStyle === "single-story" ? 1.15 : 1.4;
    const estimatedRoofSize = squareFootage * roofMultiplier;
    const usableRoofArea = estimatedRoofSize * (roofCoverage / 100);
    const panelArea = 17;
    const panelCount = Math.floor(usableRoofArea / panelArea);
    const costPerPanel = 300;
    const estimatedCost = panelCount * costPerPanel + electricityBill * 12 * 0.1;

    document.getElementById("estimate-result").textContent = `Estimated Solar Panel Cost: $${estimatedCost.toFixed(2)}`;
}

// Load the intro page on initial load
window.onload = loadIntro;
