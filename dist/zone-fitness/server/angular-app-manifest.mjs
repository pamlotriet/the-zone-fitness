
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
    'index.csr.html': {size: 20738, hash: '91d0ce6899e5ec61b1887de7f03482ddd1d2ecda60010ba5832d523e55f484a7', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 4771, hash: '83fd2c8a12a452677eb7cc3d0cf4a966ccf7800c08fe38abed9d713ba3d6d04c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 187235, hash: '0d7337e2d18469c6d9ac3e17bbef433a44cb5bee78bc807723cf3781faaf158b', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-QVUIJI5Z.css': {size: 68404, hash: 'q21+oLpK4yU', text: () => import('./assets-chunks/styles-QVUIJI5Z_css.mjs').then(m => m.default)}
  },
};
