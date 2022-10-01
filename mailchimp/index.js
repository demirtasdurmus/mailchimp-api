const express = require('express')
const bodyParser = require("body-parser");
const { sendEmail } = require("./send_email");
const app = express()
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));

const client = require("@mailchimp/mailchimp_marketing");
client.setConfig({
    apiKey: "d4cbdf86cc41bded4a163f1e71d7329c-us1",
    server: "us1",
});


app.post('/get-templates', async (req, res, next) => {
    try {

        // tüm templateları getir
        // const run = async () => {
        //     const response = await client.templates.list();
        //     console.log(response);
        //     res.send(response);
        // };

        // const run = async () => {
        //     const response = await client.templates.getTemplate("10021789");
        //     console.log(response);
        //     res.send(response);
        // };

        // const run = async () => {
        //     const response = await client.campaigns.list();
        //     console.log(response);
        //     res.send(response);
        // };

        // const run = async () => {
        //     const response = await client.campaigns.getContent("2ee71f190b");
        //     console.log(response);
        //     res.send(response);
        // };

        // const run = async () => {
        //     const response = await client.campaigns.sendTestEmail("fdf0cc669d", {
        //         test_emails: ["demirtasdurmus@gmail.com"],
        //         send_type: "html",
        //     });
        //     console.log(response);
        //     return response;
        // };

        // const run = async () => {
        //     const response = await client.campaigns.send("fdf0cc669d");
        //     console.log(response);
        //     return response;
        // };

        // const run = async () => {
        //     const response = await client.campaigns.getContent("fdf0cc669d");
        //     console.log(response);
        //     return response;
        // };

        const run = async () => {
            const response = await client.campaigns.setContent("fdf0cc669d",
                {
                    // url: "assdddddd",
                    // variate_contents: {
                    //     template: {
                    //         id: 10021789,
                    //     },
                    // }
                    template: {
                        // sections: {
                        //     name: "Durmuş"
                        // },
                        id: 10021497
                    }

                });
            console.log(true);
            res.send(response.html);
        };


        // const run = async () => {
        //     const response = await client.lists.getAllLists();
        //     console.log(response);
        //     return response;
        // };

        // const run = async () => {
        //     const response = await client.lists.listSegments("33f2c32378");
        //     console.log(response);
        //     return response;
        // };
        await run();



    } catch (err) {
        console.log(err)
        next(err)
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});