import express from 'express';
import ViteExpress from 'vite-express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';

// 환경 변수 설정 파일 로드
dotenv.config();

const app = express();
const port = 3000;
const url = "mongodb+srv://user1:1q2w3e4r5t6y7u8i9o0p@react-pwa-getbcard.8akafap.mongodb.net/?retryWrites=true&w=majority&appName=react-pwa-getbcard";


app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

app.post('/onCreate', async (req, res) => {
    const { auth, name, hpNum, company, email, image } = req.body;
    const client = new MongoClient(url);

    try {
        await client.connect();
        const database = client.db('bcard');
        const collection = database.collection('bcardlist');

        const user = await collection.insertOne({
            auth: auth,
            name: name,
            hpNum: hpNum,
            company: company,
            email: email,
            image: image
        });
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    } finally {
        await client.close();
    }
});

app.post('/selectData', async (req, res) => {
    const { auth } = req.body;
    const client = new MongoClient(url);

    try {
        await client.connect();
        const database = client.db('bcard');
        const collection = database.collection('bcardlist');

        const list = await collection.find({ auth: auth }).toArray();
        res.status(200).send(list);
    } catch (error) {
        res.status(500).send(error);
    } finally {
        await client.close();
    }
});

// ViteExpress를 사용하여 Vite와 함께 서버 실행
ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));
