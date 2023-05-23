"use stritct"
const data = require('./table.json')
const TABLENAME = data.table
const AWS =  require('aws-sdk')
const fetchItems = async event => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    let items;

    try {
        const results = await dynamoDB.scan({
            TableName: TABLENAME
        }).promise()

        items = results.item
        
    } catch (error) {
        console.log(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(items)
    }
}

module.exports = {
    handler:fetchItems
}
