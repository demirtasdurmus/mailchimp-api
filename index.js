const express = require('express')
const bodyParser = require("body-parser");
const fs = require('fs');
const { createAudience } = require("./create_audience");
const { addMember } = require("./add_member");
const { sendEmail } = require("./send_email");
const { setSettings } = require("./set_connection_settings");
const { createCampaign } = require('./create_campaign');
const { sendCampaign } = require('./send_campaign');
const app = express()
const port = 3000;
const mailchimp = require("@mailchimp/mailchimp_marketing");
mailchimp.setConfig({
    apiKey: "",
    server: "us1",
});

app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// not allowed to create further audiences Error:403
app.post('/create-audience', async (req, res, next) => {
    try {
        // const footerContactInfo = { company, address1: address, city, state, zip, country } //post edilecek-db den çekilecek data
        // const campaignDefaults = { from_name, from_email, subject, language }

        const event = {
            name: "Node.js API"
        };

        const footerContactInfo = {
            company: "GOGOCAR",
            address1: "675 Ponce de Leon Ave NE",
            address2: "Suite 5000",
            city: "Ankara",
            state: "Turkey",
            zip: "30308",
            country: "US"
        };

        const campaignDefaults = {
            from_name: "Api Integration",
            from_email: "demirtasdurmus@gmail.com",
            subject: "JS Developers Meetup",
            language: "EN_US"
        };

        const result = await createAudience(event, footerContactInfo, campaignDefaults);

        res.send(result)

    } catch (err) {
        console.log(err)
        next(err)
    }
})

// add-members to the existing audience
app.post('/add-member', async (req, res, next) => {
    try {
        // const { listId, firstname, lastname, email, tag } = req.body  //post edilecek-db den çekilecek data

        const listId = "33f2c32378";  // mailchimpden aldım
        const subscribingUser = {
            firstName: "Durmus",
            lastName: "Demirtas",
            email: "demirtasdurmus@outlook.com"
        };

        const result = await addMember(listId, subscribingUser)

        res.send(result)

    } catch (err) {
        console.log(err)
        next(err)
    }
})

// group audience
app.post('/group-audience', async (req, res) => {
    // const { listId, segment_name, emailList } = req.body

    const emailList = ["demirtasdurmus@outlook.com", "demirtasdurmus@gmail.com"];
    const conditions = []
    emailList.forEach(email => {
        conditions.push(
            {
                "field": "EMAIL",
                "op": "contains",
                "value": email // email address
            })
    })


    const listId = "33f2c32378";
    const segment_name = "deneme";

    const createSegment = async () => {
        try {
            const response = await mailchimp.lists.createSegment(listId, {
                name: segment_name,
                options: {
                    match: 'any',
                    conditions: conditions
                }
            })
            console.log(`Successfully created {segment_name} segment. The segment id is ${response.id}.`); // save it to db here
            res.send(response)
        }
        catch (err) {
            res.status(400).send(err)
        }
    }
    createSegment()
})

// create and send campaign
app.post('/send-email', async (req, res, next) => {
    try {
        // const { ListId, SegmentId, tempalteId, subjectLine, previewText, campaignTitle, fromName, replyTo } = req.body;

        const listId = "33f2c32378";
        const segmentId = "3164317";
        const templateId = "10012629";
        const subjectLine = "10012629";
        const previewText = "10012629";
        const campaignTitle = "10012629";
        const fromName = "10012629";
        const replyTo = "10012629";

        const campaignId = await createCampaign(listId, segmentId, templateId, subjectLine, previewText, campaignTitle, fromName, replyTo);
        const campaign = await sendCampaign(campaignId)

        res.send(campaign)


    } catch (err) {
        console.log(err)
        next(err)
    }
})

const client = require("@mailchimp/mailchimp_marketing");
client.setConfig({
    apiKey: "",
    server: "us1",
});
// this is a one time route and maybe commented out after use
app.post('/set', async (req, res, next) => {
    try {

        const run = async () => {
            const response = await client.templates.list();
            console.log(response);
        };

        run();

    } catch (err) {
        console.log(err)
        next(err)
    }
})


app.post('/campaign', async (req, res) => {
    // const { ListId, SegmentId, tempalteId, subjectLine, previewText, campaignTitle, fromName, replyTo } = req.body

    const listId = "33f2c32378";
    const segmentId = "3164317";
    const templateId = "10012629";
    const subjectLine = "10012629";
    const previewText = "10012629";
    const campaignTitle = "10012629";
    const fromName = "10012629";
    const replyTo = "10012629";

    const createCampaign = async () => {
        try {
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
            console.log(campaign.id)
            return campaign.id
        }
        catch (err) {
            res.status(400).send(err)
        }
    }
    const sendCampaign = async (campaignId) => {
        try {
            const res = await mailchimp.campaigns.send(campaignId)
            console.log("object", res)
            // res.redirect("success.html")
        }
        catch (e) {
            // res.redirect("fail.html")
        }
    }
    const campaignId = await createCampaign()
    sendCampaign(campaignId)
})




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// segment_id:"3164317"