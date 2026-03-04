const componentCache = {};

/**
 * Vue SFC (.vue) をブラウザで読み込むための共通ローダー
 * - fetch で .vue ファイルを取得
 * - DOMParser で <template> を安全に抽出
 * - <script> があれば実行して component オプションをマージ
 * - <style> を自動で <style> タグとして注入（重複防止）
 * 
 * 使用例:
 * const TreeView = await loadVueComponent('./components/TreeView.vue');
 * app.component('tree-view', TreeView);
 */
async function loadVueComponent(path) {
  if (componentCache[path]) {
    return componentCache[path];
  }

  const text = await (await fetch(path)).text();

  // Vue SFC を HTML としてパース
  const doc = new DOMParser().parseFromString(text, 'text/html');

  // template
  const templateEl = doc.querySelector('template');
  if (!templateEl) throw new Error(`No <template> found in ${path}`);
  const template = templateEl.innerHTML.trim();

  // script
  const scriptEl = doc.querySelector('script');
  let scriptExports = {};

  if (scriptEl) {
    try {
      // script 内容を関数として実行し、export default を取得
      const scriptContent = scriptEl.textContent;
      const module = { exports: {} };

      // 安全に eval するため Function を使用
      new Function('module', 'exports', scriptContent)(module, module.exports);
      scriptExports = module.exports.default || module.exports;
    } catch (err) {
      console.error(`Error in <script> of ${path}:`, err);
    }
  }

  // style（重複注入防止）
  const styleEl = doc.querySelector('style');
  if (styleEl) {
    if (!document.querySelector(`style[data-path="${path}"]`)) {
      // DOM に注入
      const styleTag = document.createElement('style');
      styleTag.dataset.path = path;
      styleTag.textContent = styleEl.textContent;
      document.head.appendChild(styleTag);
    }
  }

  // Vue コンポーネントとして返す
  const component = {
    template,
    ...scriptExports
  };
  componentCache[path] = component;
  return component;
}
