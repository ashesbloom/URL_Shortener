// Get the elements
let text = document.getElementById("copy_text");
let copiedText = text.textContent;
let copyButton = document.getElementById("copy");
let copySuccess = document.querySelector(".msg");

// Add event listener to the copy icon
copyButton.addEventListener("click", function() {
    // Create a temporary textarea element
    let tempTextArea = document.createElement("textarea");
    tempTextArea.value = copiedText;

    // Append the textarea to the body (required for it to be selectable)
    document.body.appendChild(tempTextArea);

    // Select the text
    tempTextArea.select();
    // For mobile devices
    tempTextArea.setSelectionRange(0, 99999);

    // Execute the copy command
    document.execCommand('copy');

    // Remove the temporary textarea
    document.body.removeChild(tempTextArea);

    // Display the copy message
    copySuccess.style.display = 'inline-block';
    setTimeout(function(){
        copySuccess.style.display = "none";
    },1500);
    
});