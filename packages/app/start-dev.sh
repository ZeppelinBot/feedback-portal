# Load .env
set -o allexport
source ../../.env
source .env
set +o allexport

# Start dev server
npx next dev -p $DEV_WEB_PORT
