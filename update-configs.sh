#!/bin/sh

set -e

PYTHON_DEST="proxy-application/global_config.py"
TS_DEST="iam-ui/src/global_config.ts"

if [ -f "./config.env" ]; then
    . ./config.env
else
    echo "❌ Error: File config.env not found."
    exit 1
fi

echo "⚙️  Config loaded. DEV mode: $IS_DEV_MODE"

if [ "$IS_DEV_MODE" = "true" ]; then
    APP_URI="$UI_DEV_URI"
    BACKEND_URI="$PROXY_DEV_URI"
else
    APP_URI="$UI_PROD_URI"
    BACKEND_URI="$PROXY_PROD_URI"
fi

# 3. Backend file
# mkdir if !exist
mkdir -p "$(dirname "$PYTHON_DEST")"

echo "# AUTO-GENERATED FILE" > "$PYTHON_DEST"
echo "APPLICATION_URI = \"$APP_URI\"" >> "$PYTHON_DEST"
echo "✅ Backend config generated: $PYTHON_DEST (URI: $APP_URI)"

# 4. Frontend file
# mkdir if !exist
mkdir -p "$(dirname "$TS_DEST")"

echo "// AUTO-GENERATED FILE" > "$TS_DEST"
echo "export const BACKEND_URI = \"$BACKEND_URI\";" >> "$TS_DEST"
echo "✅ Frontend config generated: $TS_DEST (URI: $BACKEND_URI)"
