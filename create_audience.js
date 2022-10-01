const mailchimp = require("@mailchimp/mailchimp_marketing");
mailchimp.setConfig({
    apiKey: "",
    server: "us1",
});

const createAudience = async (event, footerContactInfo, campaignDefaults) => {

    const response = await mailchimp.lists.createList({
        name: event.name,
        contact: footerContactInfo,
        permission_reminder: "permission_reminder",
        email_type_option: true,
        campaign_defaults: campaignDefaults
    });
    console.log(`Successfully created an audience. The audience id is ${response.id}.`);
    return response;
};

exports.createAudience = createAudience;
