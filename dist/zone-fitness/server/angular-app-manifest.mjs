
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
    'index.csr.html': {size: 20738, hash: '4aeaa4c7851145dd4653e68360900f03810016468f3ce0c07b327c170077431c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 4771, hash: '6164b3d67053ee9856eefbee4dcdb7f3b476d9c2f1ef67cf2a9551703d954553', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 183105, hash: 'be4e40d2c55eb39e43913f9f04041d31d4f9db58d22f7dc243459c7118d16280', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-36LUHXE4.css': {size: 65930, hash: 'DmNTIydUPP4', text: () => import('./assets-chunks/styles-36LUHXE4_css.mjs').then(m => m.default)}
  },
};
