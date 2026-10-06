#!/usr/bin/env bash
# deploy ARDA67 บน server  (รันจากในโฟลเดอร์โปรเจคบน server)
#   bash deploy.sh                  -> deploy branch developer_v1 ล่าสุด
#   bash deploy.sh main             -> deploy branch อื่น
#   bash deploy.sh developer_v1 a1b2c3d   -> ย้อนกลับไป commit ที่ระบุ (rollback)
#
# ไม่ลบโฟลเดอร์ ไม่ clone ใหม่  .env, server/ssl/, logs/ อยู่ในโฟลเดอร์นี้และ git ไม่แตะ (อยู่ใน .gitignore)
set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")" && pwd)"
BRANCH="${1:-developer_v1}"
TARGET="${2:-origin/$BRANCH}"
cd "$APP_DIR"

# ---- ตรวจไฟล์ที่ไม่อยู่ใน git ก่อน ----
if [ ! -f .env ]; then
  echo "ไม่พบ $APP_DIR/.env  (copy จาก .env.example แล้วใส่ค่าจริงก่อน)"; exit 1
fi
if grep -q '^USE_HTTPS=true' .env && [ ! -d server/ssl ]; then
  echo "USE_HTTPS=true แต่ไม่พบโฟลเดอร์ server/ssl/  (copy cert มาไว้ก่อน)"; exit 1
fi

PREV=$(git rev-parse --short HEAD)

echo "==> ดึงโค้ด $BRANCH"__________________________________________________
git fetch --prune origin
git checkout -q "$BRANCH"
git reset --hard "$TARGET"          # ทับเฉพาะไฟล์ที่ git ดูแล  ไฟล์ใน .gitignore ไม่ถูกลบ

echo "==> ติดตั้ง package ตาม package-lock.json"
npm ci --omit=dev

echo "==> restart ด้วย pm2"
pm2 startOrReload ecosystem.config.cjs --update-env
pm2 save > /dev/null

NOW=$(git rev-parse --short HEAD)
echo
echo "deploy เสร็จ: $PREV -> $NOW  ($(git log -1 --format=%s))"
echo "ถ้าต้องย้อนกลับ: bash deploy.sh $BRANCH $PREV"
