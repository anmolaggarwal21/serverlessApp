import {Group } from '../models/group'
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import * as AWS from 'aws-sdk';

export class GroupAccess{

    private readonly docClient: DocumentClient  = new AWS.DynamoDB.DocumentClient()
    private readonly groupsTable = process.env.GROUP_TABLE
    constructor (){
       
    }
    

    async getAllGroups(): Promise<Group[]> {
        console.log('Getting all groups')

        const result = await this.docClient.scan({
            TableName: this.groupsTable
        }).promise()

        const items = result.Items
        return items as Group[]
    }

    async createGroup (group: Group): Promise<Group> {
        console.log(`Creating a group with id ${group.id}`)

        await this.docClient.put({
            TableName: this.groupsTable,
            Item: group
        }).promise()

        return group

    }

}

