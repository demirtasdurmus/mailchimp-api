const mailchimp = require("@mailchimp/mailchimp_marketing");
mailchimp.setConfig({
    apiKey: "",
    server: "us1",
});

const sendCampaign = async (campaignId) => {

    const campaign = await mailchimp.campaigns.send(campaignId)
    return campaign;

};

exports.sendCampaign = sendCampaign;
