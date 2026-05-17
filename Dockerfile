# Base
FROM node:20-slim AS base
WORKDIR /app

# Dependencies
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm install --production=false

# Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# wget is used by the HEALTHCHECK below; install it once and clean apt caches
RUN apt-get update && apt-get install -y --no-install-recommends wget ca-certificates && \
    rm -rf /var/lib/apt/lists/*

RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs --shell /bin/false nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# sweph is a native Node binding listed in next.config's serverExternalPackages,
# so Next.js's standalone tracer copies its JS files but strips the .node prebuilds.
# Copy the full sweph package over the standalone-stripped copy so the prebuilt
# linux-x64 binary is present at runtime.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/sweph ./node_modules/sweph
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/node-gyp-build ./node_modules/node-gyp-build
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/node-addon-api ./node_modules/node-addon-api

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Liveness probe — hit a tiny /api/health endpoint that returns immediately
# without touching the panchang engine. Hitting / would redirect to /d/<today>
# and trigger a full sweph compute; in production the .se1 ephemeris files
# aren't bundled so sweph falls back to Moshier (~30× slower) and the cold-start
# compute can exceed the timeout. Longer start-period gives the Node process
# room to come up before the first probe runs.
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
