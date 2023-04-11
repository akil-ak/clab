// Initialize the Dropbox API client with your access token
var ACCESS_TOKEN = 'sl.BZXYP15PERbeMrbWmGkQaZiIFLGvaqxjouxvZNrbiHe9wHyz_RTFfq15OtKCEMJv8bSIN3E-yB6MrTeXLqR4BVMjI_2CbFfug24G9owYcQMl9a0XrylwE0kpOHOtJfr4ZnYjzuE';
var dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN });

// Get the shared link of the image file you want to retrieve
function selectFile(){


var sharedLink = 'https://www.dropbox.com/s/abc123/your-image.jpg?dl=0';

// Extract the file path from the shared link
var filePath = sharedLink.substring(sharedLink.indexOf('/s/') + 3, sharedLink.indexOf('?dl=0'));

// Download the file using the Dropbox API
dbx.filesDownload({ path: filePath })
  .then(function(response) {
    // Create a URL for the image file
    var imageUrl = URL.createObjectURL(response.fileBlob);

    // Display the image in the HTML image element
    var imageElement = document.getElementById('image');
    imageElement.src = imageUrl;
  })
  .catch(function(error) {
    console.error(error);
  });
}