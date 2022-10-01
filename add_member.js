const mailchimp = require("@mailchimp/mailchimp_marketing");
mailchimp.setConfig({
    apiKey: "",
    server: "us1",
});

const addMember = async (listId, subscribingUser) => {

    const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName
        }
    });

    console.log(
        `Successfully added contact as an audience member. The contact's id is ${response.id}.`
    );
    return response;
};

exports.addMember = addMember;
