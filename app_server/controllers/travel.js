const request = require('request');
const response = require('../../app')


const apiOptions = {
    server: 'http://localhost:3000'
}


const renderTravelList = (req, res, responseBody) => {
    let message = null;
    let pageTitle = process.env.npm_package_description + ' - Travel';
    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = 'No trips exist in our database!';
        }
    }
    res.render('travel',
        {
            title: pageTitle,
            trips: responseBody,
            message
        });
}

/* GET travel view */
const travelList = (req, res) => {
    const path = '/api/trips';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,

        method: "GET",
        json: {},
    }
    // console.log(uri, "right here!!!")
    console.info('>> travelController.travelList calling ' + requestOptions.url)

    // let statusInfo = response.statusCode

    request(
        requestOptions,
        (err, { statusCode }, body) => {
            if (err) {
                console.log(err)
            }
            renderTravelList(req, res, body)
        }
    )
};
module.exports = {
    travelList
};