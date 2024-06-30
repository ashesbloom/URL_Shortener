// Get the elements
let text = document.getElementById("copy_text"); //the object to be copied
let copiedText = text.textContent; //extracting the text from the object
let copyButton = document.getElementById("copy"); //the copy icon
let copySuccess = document.querySelector(".msg"); //the message to be displayed after copying

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

    // Use the Clipboard API to copy the text
    navigator.clipboard.writeText(tempTextArea.value).then(function(){  //we could also use document.execCommand('copy') but it is deprecated
        // Remove the temporary textarea
        document.body.removeChild(tempTextArea);

        // Display the copy message
        copySuccess.style.display = 'inline-block';
        setTimeout(function(){
            copySuccess.style.display = "none";
        },1500);
    }).catch(err =>{
        console.error('Failed to copy: ',err);
    })
});