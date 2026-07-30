const API_URL =
    "https://script.google.com/macros/s/AKfycbysw_mnJyaL8qSD4vvCZ8ZU7adHc42WugPlQT9LojXqKfRcL7quozRfTkevTn0RDy5CYA/exec";


let visitor = {

    userAgent: navigator.userAgent,

    platform: navigator.platform,

    language: navigator.language,

    timezone: Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone,

    screenWidth: screen.width,

    screenHeight: screen.height,

    browser: navigator.appName,

    cookiesEnabled: navigator.cookieEnabled,

    timestamp: new Date().toISOString(),

    location: "Denied",

    ip: "Unknown"

};


// Get Public IP
fetch("https://api.ipify.org?format=json")
    .then(response => response.json())
    .then(data => {

        visitor.ip = data.ip;

        getLocation();

    })
    .catch(() => {

        getLocation();

    });



// Get GPS Location
function getLocation() {


    if (navigator.geolocation) {


        navigator.geolocation.getCurrentPosition(

            function (position) {


                visitor.location = {

                    latitude:
                        position.coords.latitude,

                    longitude:
                        position.coords.longitude,

                    accuracy:
                        position.coords.accuracy

                };


                sendData();


            },


            function (error) {


                visitor.location =
                    "Permission Denied";


                sendData();


            },


            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }


        );


    } else {


        visitor.location =
            "Not Supported";


        sendData();


    }


}



// Send to Google Sheet
function sendData() {


    fetch(API_URL, {

        method: "POST",

        mode: "no-cors",

        headers: {

            "Content-Type":
                "application/json"

        },

        body:
            JSON.stringify(visitor)

    });


    console.log("Visitor Data Sent");

    console.log(visitor);


}