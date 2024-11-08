
document.addEventListener("DOMContentLoaded", () => {
    const generateButton = document.getElementById("button") as HTMLButtonElement;
    const generatedResume = document.getElementById("generated") as HTMLDivElement;
    const resumeForm = document.getElementById("resumeBox") as HTMLFormElement;
    const editResume = document.getElementById("editResume") as HTMLButtonElement;
    const downloadAsPdf = document.getElementById("downloadAsPdf") as HTMLButtonElement;
    const shareableLinkContainer = document.getElementById('shareAbleLink') as HTMLDivElement;

    const urlParams = new URLSearchParams(window.location.search);
    const nameFromUrl = urlParams.get('resume'); 
    const emailFromUrl = urlParams.get('email'); 
    const phoneFromUrl = urlParams.get('phone'); 
    const regionFromUrl = urlParams.get('region'); 

    if (nameFromUrl) {
        resumeForm.classList.add("hidden");
        generateButton.classList.add("hidden");
        editResume.classList.add("hidden");

        generatedResume.classList.remove("hidden");

        (document.getElementById("getName") as HTMLSpanElement).textContent = nameFromUrl;
        (document.getElementById("getmail") as HTMLSpanElement).textContent = emailFromUrl || "example@example.com";
        (document.getElementById("getNumber") as HTMLSpanElement).textContent = phoneFromUrl || "1234567890";
        (document.getElementById("getRegion") as HTMLSpanElement).textContent = regionFromUrl || "Region Name";

        shareableLinkContainer.classList.add("hidden");
    }

    // Generate button click event
    generateButton.addEventListener("click", (event) => {
        event.preventDefault();

        const name = (document.getElementById("userName") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const phone = (document.getElementById("phoneNo") as HTMLInputElement).value;
        const region = (document.getElementById("region") as HTMLInputElement).value;
        const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;
        const education1 = (document.getElementById("education") as HTMLInputElement).value;
        const education2 = (document.getElementById("education2") as HTMLInputElement).value;

        // IN generated section,data will be displayed
        (document.getElementById("getName") as HTMLSpanElement).textContent = name;
        (document.getElementById("getmail") as HTMLSpanElement).textContent = email;
        (document.getElementById("getNumber") as HTMLSpanElement).textContent = phone;
        (document.getElementById("getRegion") as HTMLSpanElement).textContent = region;
        (document.getElementById("getskills") as HTMLSpanElement).textContent = skills;
        (document.getElementById("getEdu") as HTMLSpanElement).textContent = education1;
        (document.getElementById("getEdu2") as HTMLSpanElement).textContent = education2;

        generatedResume.classList.remove("hidden");
        resumeForm.classList.add("hidden");
        generateButton.classList.add("hidden");
        editResume.classList.remove("hidden");

        // shareable link
        const uniqueURL = `${window.location.origin}?resume=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&region=${encodeURIComponent(region)}`;
        shareableLinkContainer.innerHTML = `
            <h2>Shareable Link:</h2>
            <a href="${uniqueURL}" target="_blank">${uniqueURL}</a>
        `;
        shareableLinkContainer.classList.remove("hidden");
    });

    // Edit resume functionality 
    editResume.addEventListener('click', () => {
        (document.getElementById("userName") as HTMLInputElement).value = (document.getElementById("getName") as HTMLSpanElement).textContent || '';
        (document.getElementById("email") as HTMLInputElement).value = (document.getElementById("getmail") as HTMLSpanElement).textContent || '';
        (document.getElementById("phoneNo") as HTMLInputElement).value = (document.getElementById("getNumber") as HTMLSpanElement).textContent || '';
        (document.getElementById("region") as HTMLInputElement).value = (document.getElementById("getRegion") as HTMLSpanElement).textContent || '';
        (document.getElementById("skills") as HTMLTextAreaElement).value = (document.getElementById("getskills") as HTMLSpanElement).textContent || '';
        (document.getElementById("education") as HTMLInputElement).value = (document.getElementById("getEdu") as HTMLSpanElement).textContent || '';
        (document.getElementById("education2") as HTMLInputElement).value = (document.getElementById("getEdu2") as HTMLSpanElement).textContent || '';

        generatedResume.classList.add("hidden");
        resumeForm.classList.remove("hidden");
        generateButton.classList.remove("hidden");
        editResume.classList.add("hidden");
        shareableLinkContainer.classList.add("hidden");
    });

    // PDF download functionality 
    downloadAsPdf.addEventListener('click', () => {
        const resumeElement = document.getElementById('generated');
        if (resumeElement) {
            (window as any).html2pdf().from(resumeElement).save("resume.pdf");
        }
    });
});
