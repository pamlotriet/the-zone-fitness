
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 20738, hash: '8699d878506fcd4a18eafc40c087be43a08da5fa21d7ea76c59a01b2811e9177', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 4771, hash: '4cb917a865ecc4cb5b63807f4e1e0ee01d2f9c7ca9b6eecdbfb07f3511b80314', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 163454, hash: '444c95fc25e2f25f79938dae74c0643fcd8af677cbf03bdd73542b9989a541d6', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-T7F5EZMD.css': {size: 61478, hash: 'OZyEwH0qouU', text: () => import('./assets-chunks/styles-T7F5EZMD_css.mjs').then(m => m.default)}
  },
};
