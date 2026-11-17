# Hưng's Blog (Astro Static Blog)

Blog tĩnh cá nhân xây dựng bằng **Astro + TypeScript + Content Collections**, tối ưu triển khai miễn phí lên **Cloudflare Pages** (`tenban.pages.dev`).

## Chạy local

```bash
npm install
npm run dev
```

Build production static (`dist/`):

```bash
npm run check
npm run build
```

## Triển khai lên Cloudflare Pages

1. Đẩy mã nguồn lên GitHub repository (không commit file cài đặt `.exe`, `.zip`, video vào repo).
2. Vào **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git**.
3. Chọn repo và cấu hình:
   - **Framework preset:** `Astro`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Cập nhật `site` trong `astro.config.mjs` và `SITE.url` trong `src/lib/site.ts` thành domain `https://<tenban>.pages.dev` của bạn.
