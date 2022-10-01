const mailchimp = require("@mailchimp/mailchimp_marketing");
mailchimp.setConfig({
    apiKey: "",
    server: "us1",
});

const createCampaign = async (listId, segmentId, templateId, subjectLine, previewText, campaignTitle, fromName, replyTo) => {
    const campaign = await mailchimp.campaigns.create({
        type: "regular",
        recipients: {
            segment_opts: {
                saved_segment_id: segmentId,
                match: 'any'
            },
            list_id: listId
        },
        settings: {
            subject_line: subjectLine,
            preview_text: previewText,
            title: campaignTitle,
            template_id: templateId,
            from_name: fromName,
            reply_to: replyTo,
            to_name: "*|FNAME|*",
            auto_footer: true,
            inline_css: true,
        }
    })
    return campaign.id


};

exports.createCampaign = createCampaign;
