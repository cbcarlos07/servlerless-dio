"use stritct"
const data = require('./table.json')
const TABLENAME = data.table
const AWS =  require('aws-sdk')

const fetchItem = async event => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    const {id} = event.pathParameters
    let item;
    try {
        const result = await dynamoDB.get({
            TableName: TABLENAME,
            Key: {id}
        }).promise()
        item = result.item
    } catch (error) {
        console.log(error);
    }
    return {
        statusCode: 200,
        body: JSON.stringify(item)
    }
}

module.exports = {
    handler:fetchItem
}