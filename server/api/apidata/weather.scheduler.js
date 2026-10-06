import cron from 'node-cron';
import { conn } from "../../configs/db.config.js";


export async function test_weather_api_schedule() {
  

  // ทำงานทุกชั่วโมง
  cron.schedule('*/1 * * * *', async () => {
    try {
      // เรียก API
      // const API_KEY = 'ed41bbb7cbdd42d5d59d9c1f970e69bf'; // ต้องสมัครที่เว็บไซต์
      // const city = 'Bangkok';
      // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

      const API_KEY = process.env.THINGSPEAK_TEST_API_KEY;
      const url = `https://api.thingspeak.com/channels/${process.env.THINGSPEAK_TEST_CHANNEL_ID}/feeds/last.json&appid=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      // เก็บข้อมูลลง DB
      // const query = `INSERT INTO demo (name, value) VALUES (?, ?)`;
      // // // await conn.query(sql, [data.field1, data.field2]);
      // await conn.execute(
      //   query,
      //   [data.name, data.cod]
      // );

      console.log(data);
      // console.log(data.sys.sunset);
      
      // console.log(data.name, data.cod);

      console.log('บันทึกข้อมูลสำเร็จ');
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
    }
  });


}

export async function fetchThingSpeakData() {
  try {
    const CHANNEL_ID = process.env.THINGSPEAK_CHANNEL_ID;
    const API_KEY = process.env.THINGSPEAK_API_KEY;
    
    // วิธีที่ 1: ใช้ URL last entry โดยตรง
    // const response = await fetch('https://api.thingspeak.com/channels/2635036/feeds/last.json');
    
    // หรือ วิธีที่ 2: ใส่ api_key ใน URL
    const response = await fetch(`https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds/last.json?api_key=${API_KEY}`);
    
    const data = await response.json();
    console.log('ข้อมูลที่ได้:', data);

    const CHANNEL_ID2 = process.env.THINGSPEAK_CHANNEL_ID2;
    const API_KEY2 = process.env.THINGSPEAK_API_KEY2;
    
    // วิธีที่ 1: ใช้ URL last entry โดยตรง
    // const response = await fetch('https://api.thingspeak.com/channels/2635036/feeds/last.json');
    
    // หรือ วิธีที่ 2: ใส่ api_key ใน URL
    const response2 = await fetch(`https://api.thingspeak.com/channels/${CHANNEL_ID2}/feeds/last.json?api_key=${API_KEY2}`);
    const data2 = await response2.json();
    console.log('ข้อมูลที่ได้2:', data2);

    return data;
    
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
    throw error;
  }
}