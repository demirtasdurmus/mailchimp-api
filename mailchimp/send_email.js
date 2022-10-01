const mailchimp = require("@mailchimp/mailchimp_marketing");
mailchimp.setConfig({
    apiKey: "d4cbdf86cc41bded4a163f1e71d7329c-us1",
    server: "us1",
});

const sendEmail = async () => {
    console.log("object")
    // check API connection w/mailchimp
    const response = await mailchimp.ping.get();
    //{ health_status: "Everything's Chimpy!" }
    console.log(response);

};

exports.sendEmail = sendEmail;
