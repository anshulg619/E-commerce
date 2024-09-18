import express from 'express';
import cors from 'cors';
import {config } from 'dotenv';
import connectToMongoDb from "./config/db.js";
import path from 'path';
import DefaultData from './defaultData.js';
import router from './routes/flipRoutes.js';
import {v4 as uuid} from 'uuid';


const app = express();

const PORT = process.env.PORT || 8080;



config({
    path:"./.env"
});

connectToMongoDb();

app.use(cors());

app.use(express.json())

app.use('/userFiles', express.static(path.join(process.cwd(), 'public', 'userFiles')));

app.use("/flipkart", router)

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`)
})

export let paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};
paytmParams['MID'] = process.env.PAYTM_MID,
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE,
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
paytmParams['ORDER_ID'] = uuid(),
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID,
paytmParams['TXN_AMOUNT'] = '100',
paytmParams['CALLBACK_URL'] = 'http://localhost:8080/flipkart/callback'
paytmParams['EMAIL'] = 'anshulgupta394@gmail.com'
paytmParams['MOBILE_NO'] = '1234567852'

//DefaultData();