/* Portfolio programming-language showcase.
 * No external dependencies; switching tabs never executes code.
 */
(() => {
  'use strict';
  const box = document.getElementById('codeShowcase');
  if (!box) return;

  const examples = {
    javascript: {file:'app.js', detail:'Browser interactivity',
      code:'// JavaScript — interactive interfaces\nconst developer = "Dadal Upendra Singh";\nconst skills = ["HTML", "CSS", "JavaScript"];\n\nskills.forEach(skill => {\n  console.log(\`Building with \${skill}\`);\n});'},
    python: {file:'main.py', detail:'Automation & backend foundations',
      code:'# Python — clear, practical logic\ndef greet(name):\n    return f"Hello, {name}!"\n\nprojects = ["Web apps", "Automation", "AI"]\nfor project in projects:\n    print(greet(project))'},
    java: {file:'Main.java', detail:'Object-oriented programming',
      code:'// Java — strongly typed applications\npublic class Main {\n  public static void main(String[] args) {\n    String name = "Dadal Upendra Singh";\n    System.out.println("Hello, " + name);\n  }\n}'},
    html: {file:'index.html', detail:'Accessible website structure',
      code:'<!-- HTML — semantic web structure -->\n<main class="portfolio">\n  <header>\n    <h1>Dadal Upendra Singh</h1>\n  </header>\n  <section aria-label="My projects">\n    <h2>Featured work</h2>\n  </section>\n</main>'},
    css: {file:'styles.css', detail:'Responsive visual design',
      code:'/* CSS — thoughtful visual systems */\n:root {\n  --navy: #071225;\n  --blue: #4b9fff;\n  --cyan: #3de0d6;\n}\n.portfolio {\n  display: grid;\n  gap: 1.5rem;\n}'},
    c: {file:'main.c', detail:'Programming fundamentals',
      code:'// C — understand the fundamentals\n#include <stdio.h>\n\nint main(void) {\n  const char *name = "Dadal";\n  printf("Hello, %s!\\n", name);\n  return 0;\n}'},
    sql: {file:'projects.sql', detail:'Database queries & data',
      code:'-- SQL — structure and query data\nSELECT title, technology\nFROM projects\nWHERE published = 1\nORDER BY created_at DESC;'},
    typescript: {file:'profile.ts', detail:'Type-safe JavaScript',
      code:'// TypeScript — type-safe objects\ntype Developer = {\n  name: string;\n  skills: string[];\n};\n\nconst profile: Developer = {\n  name: "Dadal",\n  skills: ["Java", "JavaScript", "SQL"]\n};'}
  };

  const tabs = Array.from(box.querySelectorAll('[data-code-lang]'));
  const output = box.querySelector('#codePreviewText');
  const name = box.querySelector('#codeFileName');
  const detail = box.querySelector('#codeDetail');
  const copy = box.querySelector('#codeCopy');
  let current = 'javascript';

  function highlight(source) {
    const tokens = /(\/\/[^\n]*|#[^\n]*|--[^\n]*|\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:const|let|var|public|class|static|void|String|return|def|for|in|print|SELECT|FROM|WHERE|ORDER|BY|DESC|type|display|grid|gap|int|char|include|main|true|false|new|function)\b|\b\d+(?:\.\d+)?\b)/g;
    const escape = value => value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
    let result = '', pos = 0, match;
    while ((match = tokens.exec(source)) !== null) {
      result += escape(source.slice(pos, match.index));
      const token = match[0];
      const style = /^(\/\/|#|--|\/\*|<!--)/.test(token) ? 'comment'
        : /^(["'`])/.test(token) ? 'string'
        : /^\d/.test(token) ? 'number' : 'keyword';
      result += '<span class="token-' + style + '">' + escape(token) + '</span>';
      pos = match.index + token.length;
    }
    return result + escape(source.slice(pos));
  }

  function selectLanguage(language) {
    const example = examples[language];
    if (!example) return;
    current = language;
    tabs.forEach(tab => {
      const selected = tab.dataset.codeLang === language;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    output.innerHTML = highlight(example.code);
    name.textContent = example.file;
    detail.textContent = example.detail;
    copy.textContent = 'Copy code';
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectLanguage(tab.dataset.codeLang));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1
        : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      tabs[next].focus();
      selectLanguage(tabs[next].dataset.codeLang);
    });
  });

  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(examples[current].code);
      copy.textContent = 'Copied ✓';
      setTimeout(() => {copy.textContent = 'Copy code';}, 1800);
    } catch {
      copy.textContent = 'Select code to copy';
      setTimeout(() => {copy.textContent = 'Copy code';}, 2200);
    }
  });
  selectLanguage('javascript');
})();
