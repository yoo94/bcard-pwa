import { MongoClient } from "mongodb";

const url =  import.meta.env.MONGODB_URI;

async function insertData(
    id:number,
    name:string,
    hpNum:string,
    company:string,
    email:string,
    image:string
) {
    const client = new MongoClient(url);

    try {
        await client.connect();
        const database = client.db('react-pwa-getbcard');
        const collection = database.collection('bcardlist');

        const user = await collection.insertOne({
            id,
            name,
            hpNum,
            company,
            email,
            image
        });
        return user;
    } catch (error) {
        return null;
    } finally {
        await client.close();
    }
}


export default insertData;