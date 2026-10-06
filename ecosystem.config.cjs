// pm2 config  ใช้กับ: pm2 startOrReload ecosystem.config.cjs   (deploy.sh เรียกให้)
module.exports = {
  apps: [
    {
      name: "arda67",
      script: "index.js",
      cwd: __dirname,              // .env ถูกอ่านจากโฟลเดอร์นี้
      instances: 1,
      autorestart: true,
      max_memory_restart: "500M",
      time: true,                  // ใส่เวลาใน log ของ pm2
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
