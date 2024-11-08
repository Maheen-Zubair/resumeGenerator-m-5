document.addEventListener("DOMContentLoaded", function () {
    var generateButton = document.getElementById("button");
    var generatedResume = document.getElementById("generated");
    var resumeForm = document.getElementById("resumeBox");
    var editResume = document.getElementById("editResume");
    var downloadAsPdf = document.getElementById("downloadAsPdf");
    var shareableLinkContainer = document.getElementById('shareAbleLink');
    var urlParams = new URLSearchParams(window.location.search);
    var nameFromUrl = urlParams.get('resume');
    var emailFromUrl = urlParams.get('email');
    var phoneFromUrl = urlParams.get('phone');
    var regionFromUrl = urlParams.get('region');
    if (nameFromUrl) {
        resumeForm.classList.add("hidden");
        generateButton.classList.add("hidden");
        editResume.classList.add("hidden");
        generatedResume.classList.remove("hidden");
        document.getElementById("getName").textContent = nameFromUrl;
        document.getElementById("getmail").textContent = emailFromUrl || "example@example.com";
        document.getElementById("getNumber").textContent = phoneFromUrl || "1234567890";
        document.getElementById("getRegion").textContent = regionFromUrl || "Region Name";
        shareableLinkContainer.classList.add("hidden");
    }
    // Generate button click event
    generateButton.addEventListener("click", function (event) {
        event.preventDefault();
        var name = document.getElementById("userName").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phoneNo").value;
        var region = document.getElementById("region").value;
        var skills = document.getElementById("skills").value;
        var education1 = document.getElementById("education").value;
        var education2 = document.getElementById("education2").value;
        // IN generated section,data will be displayed
        document.getElementById("getName").textContent = name;
        document.getElementById("getmail").textContent = email;
        document.getElementById("getNumber").textContent = phone;
        document.getElementById("getRegion").textContent = region;
        document.getElementById("getskills").textContent = skills;
        document.getElementById("getEdu").textContent = education1;
        document.getElementById("getEdu2").textContent = education2;
        generatedResume.classList.remove("hidden");
        resumeForm.classList.add("hidden");
        generateButton.classList.add("hidden");
        editResume.classList.remove("hidden");
        // shareable link
        var uniqueURL = "".concat(window.location.origin, "?resume=").concat(encodeURIComponent(name), "&email=").concat(encodeURIComponent(email), "&phone=").concat(encodeURIComponent(phone), "&region=").concat(encodeURIComponent(region));
        shareableLinkContainer.innerHTML = "\n            <h2>Shareable Link:</h2>\n            <a href=\"".concat(uniqueURL, "\" target=\"_blank\">").concat(uniqueURL, "</a>\n        ");
        shareableLinkContainer.classList.remove("hidden");
    });
    // Edit resume functionality 
    editResume.addEventListener('click', function () {
        document.getElementById("userName").value = document.getElementById("getName").textContent || '';
        document.getElementById("email").value = document.getElementById("getmail").textContent || '';
        document.getElementById("phoneNo").value = document.getElementById("getNumber").textContent || '';
        document.getElementById("region").value = document.getElementById("getRegion").textContent || '';
        document.getElementById("skills").value = document.getElementById("getskills").textContent || '';
        document.getElementById("education").value = document.getElementById("getEdu").textContent || '';
        document.getElementById("education2").value = document.getElementById("getEdu2").textContent || '';
        generatedResume.classList.add("hidden");
        resumeForm.classList.remove("hidden");
        generateButton.classList.remove("hidden");
        editResume.classList.add("hidden");
        shareableLinkContainer.classList.add("hidden");
    });
    // PDF download functionality 
    downloadAsPdf.addEventListener('click', function () {
        var resumeElement = document.getElementById('generated');
        if (resumeElement) {
            window.html2pdf().from(resumeElement).save("resume.pdf");
        }
    });
});
