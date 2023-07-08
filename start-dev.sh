# Load .env
export $(cat .env | xargs)

# Start dev server
npx next dev -p $DEV_WEB_PORT
