/* ═══════════════════════════════════════════════════════════
   main.js — Portfolio Core Logic
   Author: Dadal Upendra Singh
   Features: Nav, Theme, Vault (IndexedDB), Modal, Lang, Email
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ──────────── HELPERS ──────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ──────────── FOOTER YEAR ──────────── */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ──────────────────────────────────────
     1. MOBILE NAV TOGGLE
  ────────────────────────────────────── */
  const navToggle = $('#navToggle');
  const navMenu = $('#navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open);
      // Animate hamburger bars
      const bars = $$('.nav-toggle-bar', navToggle);
      if (open) {
        if (bars[0]) bars[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
        if (bars[1]) bars[1].style.opacity = '0';
        if (bars[2]) bars[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
      } else {
        bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
      }
    });
    // Close on link click
    $$('.nav-link', navMenu).forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        $$('.nav-toggle-bar', navToggle).forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
      });
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        $$('.nav-toggle-bar', navToggle).forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
      }
    });
  }

  /* ──────────────────────────────────────
     2. ACTIVE NAV HIGHLIGHT ON SCROLL
  ────────────────────────────────────── */
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');
  function updateActiveNav() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* ──────────────────────────────────────
     3. THEME TOGGLE (DARK / LIGHT)
  ────────────────────────────────────── */
  const themeToggle = $('#themeToggle');
  const themeIcon = $('#themeIcon');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) themeIcon.textContent = theme === 'light' ? '☀️' : '🌙';
    localStorage.setItem('portfolio-theme', theme);
  }
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  /* ──────────────────────────────────────
     4. EDUCATION LANGUAGE SWITCHER
  ────────────────────────────────────── */
  const eduBtns = $$('.edu-lang-btn');
  let currentEduLang = 'en';

  function switchEduLang(lang) {
    currentEduLang = lang;
    eduBtns.forEach(b => b.classList.toggle('active', b.dataset.eduLang === lang));
    $$('[data-edu-lang]').forEach(el => {
      if (el.tagName === 'BUTTON') return; // skip toggle buttons
      if (el.dataset.eduLang === lang) {
        el.hidden = false;
        el.style.display = '';
      } else if (el.dataset.eduLang) {
        el.hidden = true;
        el.style.display = 'none';
      }
    });
  }
  switchEduLang('en');

  eduBtns.forEach(btn => {
    btn.addEventListener('click', () => switchEduLang(btn.dataset.eduLang));
  });

  /* ──────────────────────────────────────
     5. SCHOOL MODAL
  ────────────────────────────────────── */
  const modal = $('#schoolModal');
  const modalTitle = $('#modalTitle');
  const modalBody = $('#modalBody');

  const schoolData = {
    ttc: { title: 'Tokyo Technical College', templateId: 'school-ttc' },
    nepal: { title: 'A.T.T.S College', templateId: 'school-nepal' },
  };

  function openModal(schoolKey) {
    const data = schoolData[schoolKey];
    if (!data || !modal) return;
    const tmpl = $('#' + data.templateId);
    if (!tmpl) return;

    modalTitle.textContent = data.title;
    modalBody.innerHTML = '';
    const clone = tmpl.content.cloneNode(true);
    modalBody.appendChild(clone);

    // Apply current edu lang inside modal
    $$('[data-edu-lang]', modalBody).forEach(el => {
      if (el.dataset.eduLang === currentEduLang) {
        el.hidden = false;
        el.style.display = '';
      } else {
        el.hidden = true;
        el.style.display = 'none';
      }
    });

    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Open triggers
  $$('.school-open').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.school));
  });

  // Close triggers
  if (modal) {
    $$('[data-close]', modal).forEach(el => {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });
  }

  /* ──────────────────────────────────────
     6. EMAIL COPY
  ────────────────────────────────────── */
  const copyEmailBtn = $('#copyEmailBtn');
  const emailText = $('#emailText2');

  if (copyEmailBtn && emailText) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailText.textContent.trim());
        const orig = copyEmailBtn.textContent;
        copyEmailBtn.textContent = '✓ Copied!';
        copyEmailBtn.style.borderColor = 'var(--accent2)';
        copyEmailBtn.style.color = 'var(--accent2)';
        setTimeout(() => {
          copyEmailBtn.textContent = orig;
          copyEmailBtn.style.borderColor = '';
          copyEmailBtn.style.color = '';
        }, 2000);
      } catch {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = emailText.textContent.trim();
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        copyEmailBtn.textContent = '✓ Copied!';
        setTimeout(() => { copyEmailBtn.textContent = 'Copy Email'; }, 2000);
      }
    });
  }

  /* ──────────────────────────────────────
     7. AVATAR UPLOAD + BRAND SYNC
  ────────────────────────────────────── */
  const avatarInput = $('.avatar-edit input');
  const avatarImg = $('.avatar-wrap img');
  const avatarFallback = $('.avatar-fallback');
  const brandImg = $('#brandImg');
  const brandFallback = $('#brandFallback');
  const avatarReset = $('.avatar-reset-link');

  // Load saved avatar
  const savedAvatar = localStorage.getItem('portfolio-avatar');
  if (savedAvatar) {
    if (avatarImg) { avatarImg.src = savedAvatar; avatarImg.style.display = 'block'; }
    if (avatarFallback) avatarFallback.style.display = 'none';
    if (brandImg) { brandImg.src = savedAvatar; brandImg.style.display = 'block'; }
    if (brandFallback) brandFallback.style.display = 'none';
  } else {
    // Show fallback if image fails
    if (avatarImg) {
      avatarImg.onerror = () => { avatarImg.style.display = 'none'; if (avatarFallback) avatarFallback.style.display = ''; };
    }
    if (brandImg) {
      brandImg.onerror = () => { brandImg.style.display = 'none'; if (brandFallback) brandFallback.style.display = ''; };
    }
  }

  if (avatarInput) {
    avatarInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        const dataUrl = ev.target.result;
        if (avatarImg) { avatarImg.src = dataUrl; avatarImg.style.display = 'block'; }
        if (avatarFallback) avatarFallback.style.display = 'none';
        if (brandImg) { brandImg.src = dataUrl; brandImg.style.display = 'block'; }
        if (brandFallback) brandFallback.style.display = 'none';
        localStorage.setItem('portfolio-avatar', dataUrl);
      };
      reader.readAsDataURL(file);
    });
  }

  if (avatarReset) {
    avatarReset.addEventListener('click', () => {
      localStorage.removeItem('portfolio-avatar');
      if (avatarImg) { avatarImg.src = 'assets/profile.jpg'; }
      if (brandImg) { brandImg.src = 'assets/profile.jpg'; }
    });
  }

  /* ──────────────────────────────────────
     8. VAULT — IndexedDB Storage
  ────────────────────────────────────── */
  const DB_NAME = 'PortfolioVault';
  const DB_VER = 1;
  const STORE = 'items';
  let db = null;

  function openDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VER);
      req.onupgradeneeded = e => {
        const d = e.target.result;
        if (!d.objectStoreNames.contains(STORE)) {
          const store = d.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true });
          store.createIndex('region', 'region');
          store.createIndex('type', 'type');
        }
      };
      req.onsuccess = e => { db = e.target.result; resolve(db); };
      req.onerror = () => reject(req.error);
    });
  }

  function dbGetAll() {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  function dbAdd(item) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      const req = tx.objectStore(STORE).add(item);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  function dbDelete(id) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      const req = tx.objectStore(STORE).delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  // State
  let vaultRegion = 'japan';
  let vaultType = 'photo';
  let vaultQuery = '';

  const vaultList = $('#vaultList');
  const vaultForm = $('#vaultForm');
  const vaultSearch = $('#vaultSearch');
  const vaultNote = $('#vaultNoteLine');

  // Region / Type segment buttons
  $$('.seg-btn[data-region]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.seg-btn[data-region]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      vaultRegion = btn.dataset.region;
      renderVault();
    });
  });
  $$('.seg-btn[data-type]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.seg-btn[data-type]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      vaultType = btn.dataset.type;
      renderVault();
    });
  });

  if (vaultSearch) {
    vaultSearch.addEventListener('input', e => {
      vaultQuery = e.target.value.toLowerCase();
      renderVault();
    });
  }

  const clearSearch = $('#vaultClearSearch');
  if (clearSearch) {
    clearSearch.addEventListener('click', () => {
      if (vaultSearch) vaultSearch.value = '';
      vaultQuery = '';
      renderVault();
    });
  }

  // Render
  async function renderVault() {
    if (!db || !vaultList) return;
    const all = await dbGetAll();
    const filtered = all.filter(item => {
      if (item.region !== vaultRegion) return false;
      if (item.type !== vaultType) return false;
      if (vaultQuery) {
        const hay = (item.title + ' ' + (item.note || '')).toLowerCase();
        if (!hay.includes(vaultQuery)) return false;
      }
      return true;
    });

    if (!filtered.length) {
      vaultList.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--muted2);padding:2rem;">No items yet. Add one above.</p>';
      return;
    }

    vaultList.innerHTML = filtered.map(item => {
      const isImg = item.mime && item.mime.startsWith('image/');
      const thumbHTML = isImg
        ? `<img src="${item.data}" alt="${item.title}" loading="lazy"/>`
        : `<div style="font-size:2rem;color:var(--muted)">📄</div>`;

      return `
        <div class="vault-item" data-id="${item.id}">
          <div class="vault-thumb">${thumbHTML}</div>
          <div class="vault-body">
            <div class="vault-title">${escHTML(item.title)}</div>
            <div class="vault-meta">${item.region} · ${item.type} · ${item.date}</div>
            ${item.note ? `<div class="vault-note">${escHTML(item.note)}</div>` : ''}
            <div class="vault-item-actions">
              ${isImg ? `<button class="btn btn-sm btn-secondary vault-view-btn">View</button>` : ''}
              <button class="btn btn-sm btn-secondary vault-dl-btn">Download</button>
              <button class="btn btn-sm btn-ghost vault-del-btn" style="color:var(--red)">Delete</button>
            </div>
          </div>
        </div>`;
    }).join('');

    // Bind actions
    $$('.vault-del-btn', vaultList).forEach(btn => {
      btn.addEventListener('click', async () => {
        const card = btn.closest('.vault-item');
        const id = Number(card.dataset.id);
        if (confirm('Delete this item?')) {
          await dbDelete(id);
          renderVault();
        }
      });
    });

    $$('.vault-dl-btn', vaultList).forEach(btn => {
      btn.addEventListener('click', async () => {
        const card = btn.closest('.vault-item');
        const id = Number(card.dataset.id);
        const all2 = await dbGetAll();
        const item = all2.find(i => i.id === id);
        if (!item) return;
        const a = document.createElement('a');
        a.href = item.data;
        a.download = item.filename || item.title;
        a.click();
      });
    });

    $$('.vault-view-btn', vaultList).forEach(btn => {
      btn.addEventListener('click', async () => {
        const card = btn.closest('.vault-item');
        const id = Number(card.dataset.id);
        const all2 = await dbGetAll();
        const item = all2.find(i => i.id === id);
        if (!item) return;
        const w = window.open('');
        w.document.write(`<img src="${item.data}" style="max-width:100%;"/>`);
      });
    });
  }

  // Submit
  if (vaultForm) {
    vaultForm.addEventListener('submit', async e => {
      e.preventDefault();
      const title = $('#vaultTitle').value.trim();
      const note = $('#vaultNote').value.trim();
      const fileInput = $('#vaultFile');
      const file = fileInput.files[0];
      if (!file || !title) return;

      const reader = new FileReader();
      reader.onload = async ev => {
        await dbAdd({
          title,
          note,
          region: vaultRegion,
          type: vaultType,
          mime: file.type,
          filename: file.name,
          data: ev.target.result,
          date: new Date().toLocaleDateString('ja-JP'),
        });
        vaultForm.reset();
        if (vaultNote) vaultNote.textContent = `✓ "${title}" saved!`;
        setTimeout(() => { if (vaultNote) vaultNote.textContent = ''; }, 3000);
        renderVault();
      };
      reader.readAsDataURL(file);
    });
  }

  function escHTML(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  // Init vault
  openDB().then(() => renderVault()).catch(err => {
    console.warn('Vault DB error:', err);
    if (vaultNote) vaultNote.textContent = 'Vault storage unavailable in this browser.';
  });

  /* ──────────────────────────────────────
     9. PAGE LOAD ANIMATION
  ────────────────────────────────────── */
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  /* ──────────────────────────────────────
     10. SMOOTH HEADER SHADOW ON SCROLL
  ────────────────────────────────────── */
  const header = $('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

})();
