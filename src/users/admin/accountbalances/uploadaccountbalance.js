
export class UploadAccountBalance{


    fileSelected() {
        var file = document.getElementById("file").files[0];
        if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            console.log(evt.target.result);
            var userRequest = '{year:"' + year + '",fileContent: "' + evt.target.result + '"}';
            // call controller method
            $http({
                method: "POST",
                url: "/api/AccountBalance/UploadBalance",
                dataType: 'json',
                data: userRequest,
                headers: { "Content-Type": "application/json" }
            }).then(function OnSuccess(response) {
                $window.alert(response.data);
                $window.location.href = "#!AdminDashboard/";

            }, function OnError(Error) {
                console.log(Error)
            })
        }
        reader.onerror = function (evt) {
            $window.alert("An error occured while reading file. Please try again later.");
        }
    }
}
}