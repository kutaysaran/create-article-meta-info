const axios = require('axios');
const FormData = require('form-data');
const request = require('request')

const wikipedia_endpoint = 'https://en.wikipedia.org/api/rest_v1/page/summary/'
const meaningCloud_endpoint = 'https://api.meaningcloud.com/topics-2.0'

async function fetchSummaryFromWikipedia(title) {
    try {
        const response = await axios.get(wikipedia_endpoint + title)
        return {
            extract: response.data.extract,
            description : response.data.description
        }
    } catch (error) {
        return {
            error: true
        }
    }
}

async function fetchMetaTags(extract) {
    try {
        const formData = new URLSearchParams();
        formData.append('key','8ada8205dbc04c4168973cac2880c0e4')
        formData.append('txt',extract)
        formData.append('tt','a')
        formData.append('lang','en')
        const response = await axios({
            method: "post",
            url: meaningCloud_endpoint,
            data: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        const sementity_list = []

        response.data.entity_list.forEach((element) => {
            sementity_list.push(element.sementity.type)
        })

        console.log(sementity_list)

        return {
            'meta-tags': {
                sementity_list : {

                }
            } 
        }
    } catch (error) {
        console.log(error)
        return {
            error: true
        }
    }
}

module.exports = {
    fetchSummaryFromWikipedia,
    fetchMetaTags
}