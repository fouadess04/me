// ==========================================================================
// ESSAIDI FOUAD — PORTFOLIO INTERACTIVITY & EMBEDDED LIGHT UI CONTROLLERS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Page Fade-In Transition Overlay
  const overlay = document.getElementById('transition-overlay');
  if (overlay) {
    requestAnimationFrame(() => {
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 800);
    });
  }

  // 2. Cosmic Starfield Generation
  const starsContainer = document.querySelector('.stars');
  if (starsContainer) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 180; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 2.2 + 0.6;
      const delay = Math.random() * 5;
      const duration = 3.5 + Math.random() * 4;

      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDelay = `${delay}s`;
      star.style.animationDuration = `${duration}s`;
      fragment.appendChild(star);
    }
    starsContainer.appendChild(fragment);
  }

  // 3. 3D Orbital System Generation (Hero)
  const orbitalSystem = document.getElementById('orbital-system');
  if (orbitalSystem) {
    for (let i = 1; i <= 5; i++) {
      const orbit = document.createElement('div');
      orbit.classList.add('orbit');

      const size = i * 115;
      orbit.style.width = `${size}px`;
      orbit.style.height = `${size}px`;
      orbit.style.animationDuration = `${22 + i * 6}s`;
      if (i % 2 === 0) {
        orbit.style.animationDirection = 'reverse';
      }

      const planet = document.createElement('div');
      planet.classList.add('planet');
      const planetSize = Math.max(4, 11 - i * 1.4);
      planet.style.width = `${planetSize}px`;
      planet.style.height = `${planetSize}px`;

      const angle = (i * 1.35) % (Math.PI * 2);
      const orbitRadius = size / 2;
      const planetX = orbitRadius + Math.cos(angle) * orbitRadius - planetSize / 2;
      const planetY = orbitRadius + Math.sin(angle) * orbitRadius - planetSize / 2;

      planet.style.left = `${planetX}px`;
      planet.style.top = `${planetY}px`;

      orbit.appendChild(planet);
      orbitalSystem.appendChild(orbit);
    }
  }

  // 4. Scroll Progress, Header Blur, Parallax & Active Nav Link
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scroll-progress');
  const hero = document.querySelector('.hero');
  const heroContent = document.getElementById('hero-content');
  const navLinks = document.querySelectorAll('.nav-link');
  const trackedSections = ['about', 'projects', 'skills', 'contact'].map((id) =>
    document.getElementById(id)
  );

  window.addEventListener(
    'scroll',
    () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollProgress && docHeight > 0) {
        scrollProgress.style.width = `${Math.min(100, (scrollY / docHeight) * 100)}%`;
      }

      if (header) {
        header.classList.toggle('scrolled', scrollY > 40);
      }

      if (hero && heroContent && orbitalSystem && scrollY <= hero.offsetHeight) {
        heroContent.style.transform = `translate3d(0, ${scrollY * 0.38}px, 0)`;
        heroContent.style.opacity = `${Math.max(0, 1 - scrollY / (hero.offsetHeight * 0.85))}`;
        orbitalSystem.style.transform = `translate3d(0, ${scrollY * 0.22}px, 0)`;
      }

      // Active navigation link highlight
      let currentSectionId = 'about';
      trackedSections.forEach((sec) => {
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.38) {
          currentSectionId = sec.id;
        }
      });
      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === `#${currentSectionId}`);
      });
    },
    { passive: true }
  );

  // Subtle Mouse Parallax on Hero Orbital System
  if (hero && orbitalSystem) {
    hero.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 18;
      orbitalSystem.style.transform = `translate3d(${x}px, ${y + window.scrollY * 0.22}px, 0)`;
    });
  }

  // 5. Smooth Reveal on Scroll (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  // ========================================================================
  // 6. BCLASS INTERACTIVE LIGHT UI EMBED (INHERITED FROM ASTRO BCLASS PROJECT)
  //    - CourseMockup.tsx + BNoteShowcase.astro + QuizShowcase.astro
  // ========================================================================
  const initialCoursesData = [
    {
      id: 'biochem',
      title: 'Biochemistry',
      coursCount: 11,
      progress: 65,
      theme: { primary: '#37913c', secondary: '#e0f7e0', background: '#f6fff6', border: '#c8e6c9' },
      materials: [
        { id: 'm1', title: 'Exploration du métabolisme glucidique', coursChecked: 'auto', quizChecked: true },
        { id: 'm2', title: 'Exploration du métabolisme lipidique', coursChecked: 'true', quizChecked: true },
        { id: 'm3', title: 'Les Dysprotéinémies', coursChecked: 'false', quizChecked: false },
        { id: 'm4', title: 'Les amino-acidopathies', coursChecked: 'false', quizChecked: false },
        { id: 'm5', title: 'Etude biochimique du LCR', coursChecked: 'auto', quizChecked: false },
        { id: 'm6', title: 'Biochimie des liquides de ponction', coursChecked: 'false', quizChecked: false },
        { id: 'm7', title: 'Les enzymes sériques et tissulaires', coursChecked: 'true', quizChecked: true }
      ]
    },
    {
      id: 'pharm',
      title: 'Pharmacology',
      coursCount: 18,
      progress: 45,
      theme: { primary: '#3498db', secondary: '#e0f0ff', background: '#f6faff', border: '#aed6f1' },
      materials: [
        { id: 'm1', title: 'Autonomic Nervous System', coursChecked: 'true', quizChecked: true },
        { id: 'm2', title: 'Cardiovascular Pharma', coursChecked: 'auto', quizChecked: false },
        { id: 'm3', title: 'Antibiotics Mechanism', coursChecked: 'false', quizChecked: false }
      ]
    },
    {
      id: 'immuno',
      title: 'Immunology',
      coursCount: 9,
      progress: 88,
      theme: { primary: '#800080', secondary: '#faf0ff', background: '#fdf6ff', border: '#e6ccff' },
      materials: [
        { id: 'm1', title: 'Innate Immunity', coursChecked: 'true', quizChecked: true },
        { id: 'm2', title: 'Adaptive Immunity', coursChecked: 'true', quizChecked: true },
        { id: 'm3', title: 'Cytokines & Signaling', coursChecked: 'auto', quizChecked: false }
      ]
    },
    {
      id: 'anato',
      title: 'Anatomy',
      coursCount: 15,
      progress: 30,
      theme: { primary: '#e74c3c', secondary: '#f8d4d4', background: '#fff5f5', border: '#fadbd8' },
      materials: [
        { id: 'm1', title: 'Upper Limb', coursChecked: 'auto', quizChecked: false },
        { id: 'm2', title: 'Thorax', coursChecked: 'false', quizChecked: false }
      ]
    },
    {
      id: 'physio',
      title: 'Physiology',
      coursCount: 12,
      progress: 75,
      theme: { primary: '#f1c40f', secondary: '#fef9e7', background: '#fffef5', border: '#f9e79f' },
      materials: [
        { id: 'm1', title: 'Cardiac Cycle', coursChecked: 'true', quizChecked: true },
        { id: 'm2', title: 'Respiratory Mechanics', coursChecked: 'auto', quizChecked: true }
      ]
    },
    {
      id: 'micro',
      title: 'Microbiology',
      coursCount: 14,
      progress: 50,
      theme: { primary: '#1c4587', secondary: '#e0f0ff', background: '#f5f9ff', border: '#aed6f1' },
      materials: [
        { id: 'm1', title: 'Bacterial Genetics', coursChecked: 'true', quizChecked: false },
        { id: 'm2', title: 'Virology Basics', coursChecked: 'false', quizChecked: false }
      ]
    }
  ];

  let activeCourseId = 'biochem';

  const calculateMaterialProgress = (mat) => {
    let progress = 0;
    if (mat.coursChecked === 'true') progress += 67;
    else if (mat.coursChecked === 'auto') progress += 34;
    if (mat.quizChecked) progress += 33;
    return Math.min(100, progress);
  };

  const calculateCourseProgress = (materials) => {
    if (!materials || materials.length === 0) return 0;
    const total = materials.reduce((acc, mat) => acc + calculateMaterialProgress(mat), 0);
    return Math.round(total / materials.length);
  };

  const renderAstroCourseMarquee = () => {
    const marqueeEl = document.getElementById('astro-course-marquee');
    if (!marqueeEl) return;
    const doubled = initialCoursesData.concat(initialCoursesData);
    marqueeEl.innerHTML = doubled
      .map(
        (c, idx) => `
        <button type="button" data-marquee-course="${c.id}" data-idx="${idx}" style="
          display:inline-flex;align-items:center;gap:0.5rem;padding:0.5rem 1.1rem;
          border-radius:9999px;font-size:0.82rem;font-weight:700;cursor:pointer;transition:transform 0.2s ease;flex-shrink:0;
          background-color:${c.theme.background};border:1px solid ${c.theme.border};color:${c.theme.primary};
        ">
          <span style="width:10px;height:10px;border-radius:9999px;background-color:${c.theme.primary};"></span>
          <span>${c.title}</span>
        </button>
      `
      )
      .join('');

    marqueeEl.querySelectorAll('[data-marquee-course]').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCourseId = btn.getAttribute('data-marquee-course');
        renderAstroCourseMockup();
      });
    });
  };

  const renderAstroCourseMockup = () => {
    const mockupEl = document.getElementById('astro-app-mockup');
    const headerEl = document.getElementById('astro-app-header');
    const backBtn = document.getElementById('astro-course-back');
    const titleEl = document.getElementById('astro-header-title');
    const subEl = document.getElementById('astro-header-sub');
    const badgeEl = document.getElementById('astro-header-badge');
    const bodyEl = document.getElementById('astro-course-body');

    if (!mockupEl || !headerEl || !backBtn || !titleEl || !subEl || !badgeEl || !bodyEl) return;

    const activeCourse = initialCoursesData.find((c) => c.id === activeCourseId) || null;
    const defaultTheme = { primary: '#37913c', secondary: '#e0f7e0', background: '#f6fff6', border: '#c8e6c9' };
    const currentTheme = activeCourse ? activeCourse.theme : defaultTheme;

    mockupEl.style.backgroundColor = currentTheme.background;
    mockupEl.style.borderColor = currentTheme.border;
    headerEl.style.backgroundColor = currentTheme.background;
    headerEl.style.borderBottomColor = currentTheme.border;

    if (!activeCourse) {
      // All Courses Overview State (exact from CourseMockup.tsx)
      backBtn.style.display = 'none';
      titleEl.style.color = currentTheme.primary;
      titleEl.textContent = 'My Courses';
      subEl.style.display = 'block';
      subEl.style.color = '#5a6b5d';
      subEl.textContent = 'BClass Interactive Demo';
      badgeEl.style.backgroundColor = currentTheme.secondary;
      badgeEl.style.color = currentTheme.primary;
      badgeEl.style.borderRadius = '9999px';
      badgeEl.textContent = 'Live Preview';

      bodyEl.innerHTML = initialCoursesData
        .map((course) => {
          const progress = calculateCourseProgress(course.materials);
          return `
            <div class="course-card-mock" data-select-course="${course.id}" style="
              background-color:${course.theme.background};
              border-color:${course.theme.border};
              box-shadow:0 4px 12px ${course.theme.primary}20;
            ">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
                <span style="font-weight:800;font-size:0.95rem;color:${course.theme.primary};">${course.title}</span>
                <span class="mock-badge" style="background-color:${course.theme.secondary};color:${course.theme.primary};">
                  ${course.coursCount} cours
                </span>
              </div>
              <div class="mock-progress-track" style="background-color:${course.theme.border};">
                <div class="mock-progress-fill" style="width:${progress}%;background-color:${course.theme.primary};"></div>
              </div>
            </div>
          `;
        })
        .join('');

      bodyEl.querySelectorAll('[data-select-course]').forEach((card) => {
        card.addEventListener('click', () => {
          activeCourseId = card.getAttribute('data-select-course');
          renderAstroCourseMockup();
        });
      });
    } else {
      // Active Course Checklist State (exact from CourseMockup.tsx + Cours & Quiz labels under boxes)
      const t = activeCourse.theme;
      const totalProg = calculateCourseProgress(activeCourse.materials);

      backBtn.style.display = 'inline-flex';
      backBtn.style.borderColor = t.border;
      backBtn.style.color = t.primary;
      titleEl.style.color = t.primary;
      titleEl.textContent = activeCourse.title;
      subEl.style.display = 'block';
      subEl.style.color = '#5a6b5d';
      subEl.textContent = `${activeCourse.coursCount} modules`;
      badgeEl.style.backgroundColor = t.secondary;
      badgeEl.style.color = t.primary;
      badgeEl.style.borderRadius = '9999px';
      badgeEl.textContent = `${totalProg}% complete`;

      bodyEl.innerHTML =
        `
        <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:4px;font-weight:700;font-size:13px;margin-bottom:10px;color:${t.primary};">
          <span>Cours</span>
          <span style="font-size:11.5px;font-weight:400;">Click check box to cycle progress</span>
        </div>
        ` +
        activeCourse.materials
          .map((mat) => {
            const prog = calculateMaterialProgress(mat);
            const readBg =
              mat.coursChecked === 'true'
                ? t.primary
                : mat.coursChecked === 'auto'
                ? t.secondary
                : 'transparent';
            const readIcon =
              mat.coursChecked === 'true'
                ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4"><polyline points="20 6 9 17 4 12"/></svg>`
                : mat.coursChecked === 'auto'
                ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${t.primary}" stroke-width="3"><line x1="5" y1="12" x2="19" y2="12"/></svg>`
                : '';

            const quizIcon = mat.quizChecked
              ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4"><polyline points="20 6 9 17 4 12"/></svg>`
              : '';

            return `
              <div class="material-container" style="border-color:${t.border};">
                <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:8px;">
                  <span style="font-weight:700;color:#222222;font-size:13.5px;line-height:1.35;flex:1;">${mat.title}</span>
                  <div style="display:flex;align-items:flex-start;gap:10px;flex-shrink:0;">
                    <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
                      <button type="button" class="check-btn" data-toggle-cours="${mat.id}" title="Course Read State" style="
                        border-color:${t.primary};
                        background-color:${readBg};
                      ">${readIcon}</button>
                      <span style="font-size:9.5px;font-weight:700;color:${t.primary};line-height:1;">Cours</span>
                    </div>
                    <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
                      <button type="button" class="check-btn" data-toggle-quiz="${mat.id}" title="Quiz Completed" style="
                        border-color:${t.primary};
                        background-color:${mat.quizChecked ? t.primary : 'transparent'};
                      ">${quizIcon}</button>
                      <span style="font-size:9.5px;font-weight:700;color:${t.primary};line-height:1;">Quiz</span>
                    </div>
                  </div>
                </div>
                <div style="height:6px;background-color:#f3f4f6;border-radius:9999px;overflow:hidden;">
                  <div style="height:100%;width:${prog}%;background-color:${t.primary};border-radius:9999px;transition:width 0.3s ease;"></div>
                </div>
              </div>
            `;
          })
          .join('');

      bodyEl.querySelectorAll('[data-toggle-quiz]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const matId = btn.getAttribute('data-toggle-quiz');
          const mat = activeCourse.materials.find((m) => m.id === matId);
          if (mat) {
            mat.quizChecked = !mat.quizChecked;
            renderAstroCourseMockup();
          }
        });
      });

      bodyEl.querySelectorAll('[data-toggle-cours]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const matId = btn.getAttribute('data-toggle-cours');
          const mat = activeCourse.materials.find((m) => m.id === matId);
          if (mat) {
            mat.coursChecked =
              mat.coursChecked === 'false'
                ? 'auto'
                : mat.coursChecked === 'auto'
                ? 'true'
                : 'false';
            renderAstroCourseMockup();
          }
        });
      });
    }
  };

  const astroBackBtn = document.getElementById('astro-course-back');
  if (astroBackBtn) {
    astroBackBtn.addEventListener('click', () => {
      activeCourseId = null;
      renderAstroCourseMockup();
    });
  }

  renderAstroCourseMarquee();
  renderAstroCourseMockup();

  // BClass Top Tab Switcher (CourseMockup / BNoteShowcase / QuizShowcase)
  const bclassTabs = document.querySelectorAll('[data-bclass-tab]');
  bclassTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-bclass-tab');
      bclassTabs.forEach((t) => t.classList.toggle('active', t === tab));
      document.querySelectorAll('.bclass-astro-pane').forEach((pane) => {
        pane.classList.toggle('active', pane.id === `bclass-pane-${target}`);
      });
    });
  });

  // BNoteShowcase.astro — Collapsible Sommaire (TOC)
  const tocToggle = document.getElementById('bnote-toc-toggle');
  const tocBody = document.getElementById('bnote-toc-body');
  const tocArrow = document.getElementById('bnote-toc-arrow');
  if (tocToggle && tocBody && tocArrow) {
    tocToggle.addEventListener('click', () => {
      const isHidden = tocBody.style.display === 'none';
      tocBody.style.display = isHidden ? 'block' : 'none';
      tocArrow.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(-90deg)';
    });
  }

  // BNoteShowcase.astro — Word-by-Word BClass-AI Overlay Drawer
  const openBNoteAiTrigger = document.getElementById('open-bnote-ai-trigger');
  const closeBNoteAiBtn = document.getElementById('close-bnote-ai-overlay');
  const bnoteAiOverlay = document.getElementById('bnote-ai-overlay');
  const bnoteAiBackdrop = document.getElementById('bnote-ai-overlay-backdrop');
  const bnoteAiTypingContainer = document.getElementById('bnote-ai-typing-container');
  const bnoteAiQuote = document.getElementById('bnote-ai-selected-quote');
  let bnoteStreamTimeouts = [];

  const clearBNoteStream = () => {
    bnoteStreamTimeouts.forEach((t) => clearTimeout(t));
    bnoteStreamTimeouts = [];
  };

  const renderBNoteWordByWord = (selectedLabel) => {
    if (!bnoteAiTypingContainer) return;
    clearBNoteStream();
    bnoteAiTypingContainer.innerHTML = '';

    if (bnoteAiQuote && selectedLabel) {
      bnoteAiQuote.textContent = selectedLabel;
    }

    const introParagraph = document.createElement('p');
    introParagraph.style.cssText = 'color:#334155;line-height:1.6;margin:0 0 0.75rem 0;';
    bnoteAiTypingContainer.appendChild(introParagraph);

    const introTokens = [
      { text: 'Le ' },
      { text: 'récepteur ' },
      { text: 'à ' },
      { text: "l'insuline ", bold: true },
      { text: 'possède ' },
      { text: 'une ' },
      { text: 'activité ' },
      { text: 'Tyrosine ', bold: true, color: '#1c4587' },
      { text: 'Kinase ', bold: true, color: '#1c4587' },
      { text: 'intrinsèque ', bold: true },
      { text: 'portée ' },
      { text: 'par ' },
      { text: 'ses ' },
      { text: '2 ' },
      { text: 'sous-unités ' },
      { text: 'β ' },
      { text: 'transmembranaires.' }
    ];

    let delay = 50;
    const wordDelay = 38;

    introTokens.forEach((token) => {
      const tId = setTimeout(() => {
        const span = document.createElement('span');
        span.className = 'bnote-word';
        span.textContent = token.text;
        if (token.bold) span.style.fontWeight = '700';
        if (token.color) span.style.color = token.color;
        introParagraph.appendChild(span);
      }, delay);
      bnoteStreamTimeouts.push(tId);
      delay += wordDelay;
    });

    delay += 150;
    const tPearl = setTimeout(() => {
      const pearl = document.createElement('div');
      pearl.className = 'bnote-block-reveal';
      pearl.style.cssText =
        'background:#faf0ff;border-left:4px solid #800080;padding:0.7rem;border-radius:0 0.5rem 0.5rem 0;margin-bottom:0.65rem;';
      pearl.innerHTML = `
        <div style="font-weight:700;color:#800080;margin-bottom:0.25rem;font-size:0.78rem;">Distinction Clé d'Examen (EMD Biochimie)</div>
        <p style="margin:0;color:#475569;font-size:0.76rem;line-height:1.45;">
          Ne confondez jamais le récepteur de l'insuline (<strong>Tyrosine Kinase</strong> directe via IRS-1) avec celui du Glucagon ou de l'Adrénaline (<strong>RCPG → AMPc → PKA</strong>, qui est une Sérine/Thréonine Kinase).
        </p>
      `;
      bnoteAiTypingContainer.appendChild(pearl);
    }, delay);
    bnoteStreamTimeouts.push(tPearl);

    delay += 260;
    const tCit = setTimeout(() => {
      const cit = document.createElement('div');
      cit.className = 'bnote-block-reveal';
      cit.style.cssText =
        'padding-top:0.5rem;border-top:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;font-size:0.7rem;color:#94a3b8;';
      cit.innerHTML = `
        <span>Source: BNote Les Hormones (Section 2)</span>
        <span style="font-weight:700;color:#37913c;">BQS 96/100</span>
      `;
      bnoteAiTypingContainer.appendChild(cit);
    }, delay);
    bnoteStreamTimeouts.push(tCit);
  };

  const openBNoteOverlay = (quoteText) => {
    if (!bnoteAiOverlay || !bnoteAiBackdrop) return;
    bnoteAiBackdrop.style.opacity = '1';
    bnoteAiBackdrop.style.pointerEvents = 'auto';
    bnoteAiOverlay.style.transform = 'translateY(0)';
    renderBNoteWordByWord(quoteText);
  };

  const closeBNoteOverlay = () => {
    if (!bnoteAiOverlay || !bnoteAiBackdrop) return;
    bnoteAiBackdrop.style.opacity = '0';
    bnoteAiBackdrop.style.pointerEvents = 'none';
    bnoteAiOverlay.style.transform = 'translateY(100%)';
    clearBNoteStream();
  };

  if (openBNoteAiTrigger) {
    openBNoteAiTrigger.addEventListener('click', () => {
      openBNoteOverlay(
        '« Le récepteur à l’insuline est un hétérotétramère α2β2 à activité Tyrosine Kinase intrinsèque »'
      );
    });
  }
  document.querySelectorAll('[data-bnote-term]').forEach((termEl) => {
    termEl.addEventListener('click', () => {
      const label = termEl.getAttribute('data-bnote-term');
      openBNoteOverlay(`« ${label} — Mécanisme de transduction hormonale »`);
    });
  });
  if (closeBNoteAiBtn) closeBNoteAiBtn.addEventListener('click', closeBNoteOverlay);
  if (bnoteAiBackdrop) bnoteAiBackdrop.addEventListener('click', closeBNoteOverlay);

  // QuizShowcase.astro — Interactive Options + Word-by-Word BClass-AI Overlay
  const astroQuizOpts = document.querySelectorAll('#astro-quiz-options [data-qopt]');
  astroQuizOpts.forEach((optEl) => {
    optEl.addEventListener('click', () => {
      const letter = optEl.getAttribute('data-qopt');
      astroQuizOpts.forEach((el) => {
        const l = el.getAttribute('data-qopt');
        if (l === 'D') {
          el.style.border = '2px solid #22c55e';
          el.style.background = 'rgba(240,253,244,0.6)';
        } else if (l === letter && letter !== 'D') {
          el.style.border = '2px solid #ef4444';
          el.style.background = '#fef2f2';
        } else {
          el.style.border = '1px solid #f1f5f9';
          el.style.background = '#ffffff';
        }
      });
    });
  });

  const openQuizAiBtn = document.getElementById('open-card-ai-overlay');
  const closeQuizAiBtn = document.getElementById('close-card-ai-overlay');
  const quizAiOverlay = document.getElementById('ai-card-overlay');
  const quizAiBackdrop = document.getElementById('ai-card-overlay-backdrop');
  const quizAiTypingContainer = document.getElementById('ai-typing-container');
  let quizStreamTimeouts = [];

  const clearQuizStream = () => {
    quizStreamTimeouts.forEach((t) => clearTimeout(t));
    quizStreamTimeouts = [];
  };

  const renderQuizWordByWord = () => {
    if (!quizAiTypingContainer) return;
    clearQuizStream();
    quizAiTypingContainer.innerHTML = '';

    const introParagraph = document.createElement('p');
    introParagraph.style.cssText = 'color:#334155;line-height:1.6;margin:0 0 0.75rem 0;';
    quizAiTypingContainer.appendChild(introParagraph);

    const introTokens = [
      { text: 'La ' },
      { text: 'Protéine ', bold: true, color: '#0f172a' },
      { text: 'Kinase ', bold: true, color: '#0f172a' },
      { text: 'A ', bold: true, color: '#0f172a' },
      { text: '(PKA) ', bold: true, color: '#0f172a' },
      { text: 'est ' },
      { text: 'une ' },
      { text: 'enzyme ' },
      { text: 'clé ' },
      { text: 'activée ' },
      { text: 'par ' },
      { text: "l'AMPc ", bold: true, color: '#2563eb' },
      { text: '(second ' },
      { text: 'messager).' }
    ];

    let delay = 50;
    const wordDelay = 38;

    introTokens.forEach((token) => {
      const tId = setTimeout(() => {
        const span = document.createElement('span');
        span.className = 'bnote-word';
        span.textContent = token.text;
        if (token.bold) span.style.fontWeight = '700';
        if (token.color) span.style.color = token.color;
        introParagraph.appendChild(span);
      }, delay);
      quizStreamTimeouts.push(tId);
      delay += wordDelay;
    });

    delay += 150;
    const tPearl = setTimeout(() => {
      const pearl = document.createElement('div');
      pearl.className = 'bnote-block-reveal';
      pearl.style.cssText =
        'background:#eff6ff;border-left:4px solid #3b82f6;padding:0.7rem;border-radius:0 0.5rem 0.5rem 0;margin-bottom:0.75rem;';
      pearl.innerHTML = `
        <div style="font-weight:700;color:#1e40af;margin-bottom:0.25rem;font-size:0.78rem;">Mécanisme d'Activation</div>
        <p style="margin:0;color:#475569;font-size:0.75rem;line-height:1.45;">
          À l'état inactif, elle est sous forme de tétramère (2 sous-unités régulatrices + 2 catalytiques). La liaison de l'AMPc libère les <strong>sous-unités catalytiques</strong> qui deviennent actives.
        </p>
      `;
      quizAiTypingContainer.appendChild(pearl);
    }, delay);
    quizStreamTimeouts.push(tPearl);

    delay += 260;
    const tChoices = setTimeout(() => {
      const choices = document.createElement('div');
      choices.className = 'bnote-block-reveal';
      choices.style.cssText = 'display:flex;flex-direction:column;gap:0.45rem;margin-bottom:0.75rem;';
      choices.innerHTML = `
        <div style="font-weight:700;color:#1e293b;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.05em;">Analyse des choix :</div>
        <div style="display:flex;align-items:flex-start;gap:0.45rem;font-size:0.74rem;">
          <span style="color:#ef4444;font-weight:700;">✗ A :</span>
          <span style="color:#475569;">Faux. C'est une <strong>Sérine/Thréonine kinase</strong> (pas Tyrosine).</span>
        </div>
        <div style="display:flex;align-items:flex-start;gap:0.45rem;font-size:0.74rem;">
          <span style="color:#ef4444;font-weight:700;">✗ C :</span>
          <span style="color:#475569;">Faux. Le DAG active la <strong>Protéine Kinase C (PKC)</strong>.</span>
        </div>
        <div style="display:flex;align-items:flex-start;gap:0.45rem;font-size:0.74rem;background:#f0fdf4;padding:0.45rem;border-radius:0.4rem;border:1px solid #dcfce7;">
          <span style="color:#16a34a;font-weight:700;">✓ D :</span>
          <span style="color:#1e293b;font-weight:500;"><strong>Exact !</strong> La PKA phosphoryle les histones et le facteur CREB pour réguler la transcription génétique.</span>
        </div>
      `;
      quizAiTypingContainer.appendChild(choices);
    }, delay);
    quizStreamTimeouts.push(tChoices);

    delay += 260;
    const tCit = setTimeout(() => {
      const cit = document.createElement('div');
      cit.className = 'bnote-block-reveal';
      cit.style.cssText =
        'padding-top:0.5rem;border-top:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;font-size:0.68rem;color:#94a3b8;';
      cit.innerHTML = `
        <span>Source: Les Hormones (Page 22)</span>
        <span style="font-weight:600;color:#cbd5e1;">Blida 2024</span>
      `;
      quizAiTypingContainer.appendChild(cit);
    }, delay);
    quizStreamTimeouts.push(tCit);
  };

  const openQuizOverlay = () => {
    if (!quizAiOverlay || !quizAiBackdrop) return;
    quizAiBackdrop.style.opacity = '1';
    quizAiBackdrop.style.pointerEvents = 'auto';
    quizAiOverlay.style.transform = 'translateY(0)';
    renderQuizWordByWord();
  };

  const closeQuizOverlay = () => {
    if (!quizAiOverlay || !quizAiBackdrop) return;
    quizAiBackdrop.style.opacity = '0';
    quizAiBackdrop.style.pointerEvents = 'none';
    quizAiOverlay.style.transform = 'translateY(100%)';
    clearQuizStream();
  };

  if (openQuizAiBtn) openQuizAiBtn.addEventListener('click', openQuizOverlay);
  if (closeQuizAiBtn) closeQuizAiBtn.addEventListener('click', closeQuizOverlay);
  if (quizAiBackdrop) quizAiBackdrop.addEventListener('click', closeQuizOverlay);

  // ========================================================================
  // 7. SANAD INTERACTIVE CLINICAL LIGHT UI EMBED CONTROLLER
  // ========================================================================
  const sanadCases = [
    {
      id: 'case-1',
      ref: 'SANAD-2026-00412',
      motif: 'Douleur thoracique + ECG complexe (Transfert ?)',
      priority: 'URGENT',
      priorityLabel: 'Urgent',
      patientRef: 'Patient #3847',
      age: 58,
      sex: 'M',
      site: 'Médecin Généraliste · EPH Rural',
      remainingSec: 1492,
      totalSec: 1800,
      band: 'safe'
    },
    {
      id: 'case-2',
      ref: 'SANAD-2026-00415',
      motif: 'Déficit moteur brutal (Suspicion AVC — Thrombolyse ?)',
      priority: 'CRITICAL',
      priorityLabel: 'Critique',
      patientRef: 'P-9M2KLA',
      age: 71,
      sex: 'F',
      site: 'Médecin Généraliste · Urgences EPH Miliana',
      remainingSec: 245,
      totalSec: 900,
      band: 'soon'
    },
    {
      id: 'case-3',
      ref: 'SANAD-2026-00409',
      motif: 'Intoxication aiguë complexe — Conduite à tenir',
      priority: 'ROUTINE',
      priorityLabel: 'Courant',
      patientRef: 'P-4X8RTQ',
      age: 29,
      sex: 'M',
      site: 'Médecin Généraliste · Polyclinique Rurale',
      remainingSec: 2510,
      totalSec: 3600,
      band: 'safe'
    }
  ];

  let activeSanadFilter = '';
  let activeSanadCase = sanadCases[0];

  const formatSlaTime = (sec) => {
    const abs = Math.max(0, sec);
    const m = String(Math.floor(abs / 60)).padStart(2, '0');
    const s = String(abs % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const switchSanadTab = (tabName) => {
    document.querySelectorAll('[data-sanad-tab]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-sanad-tab') === tabName);
    });
    document.querySelectorAll('.sanad-view').forEach((view) => {
      view.classList.toggle('active', view.id === `sanad-view-${tabName}`);
    });
  };

  document.querySelectorAll('[data-sanad-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      switchSanadTab(btn.getAttribute('data-sanad-tab'));
    });
  });

  const renderSanadQueue = () => {
    const listEl = document.getElementById('sanad-queue-list');
    const countEl = document.getElementById('sanad-queue-count');
    if (!listEl || !countEl) return;

    const filtered = sanadCases.filter(
      (c) => !activeSanadFilter || c.priority === activeSanadFilter
    );
    countEl.textContent =
      filtered.length === sanadCases.length
        ? `${filtered.length}`
        : `${filtered.length}/${sanadCases.length}`;

    listEl.innerHTML = filtered
      .map((c) => {
        const strokeColor =
          c.band === 'soon' ? '#f5a524' : c.band === 'late' ? '#f4483c' : '#2fbf71';
        const r = 19;
        const circ = 2 * Math.PI * r;
        const spentRatio = 1 - c.remainingSec / c.totalSec;
        const offset = circ - spentRatio * circ;

        return `
          <div class="sanad-queue-row" data-open-case="${c.id}">
            <div style="position:relative;width:46px;height:46px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <svg width="46" height="46" style="transform:rotate(-90deg);">
                <circle cx="23" cy="23" r="${r}" fill="none" stroke="#dde1eb" stroke-width="4"></circle>
                <circle cx="23" cy="23" r="${r}" fill="none" stroke="${strokeColor}" stroke-width="4"
                  stroke-dasharray="${circ.toFixed(1)}" stroke-dashoffset="${offset.toFixed(1)}" stroke-linecap="round"></circle>
              </svg>
              <span style="position:absolute;font-family:'Space Mono',monospace;font-size:0.62rem;font-weight:800;color:#1d2e5c;">
                ${formatSlaTime(c.remainingSec)}
              </span>
            </div>

            <div style="flex:1;min-width:0;">
              <div style="display:flex;align-items:center;gap:0.45rem;margin-bottom:0.2rem;">
                <span class="sanad-priority-tag ${c.priority}">${c.priorityLabel}</span>
                <span style="font-family:'Space Mono',monospace;font-size:0.65rem;font-weight:700;color:#4a5679;background:#f7f8fc;padding:0.1rem 0.4rem;border-radius:4px;">${c.ref}</span>
              </div>
              <div style="font-size:0.84rem;font-weight:800;color:#1d2e5c;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                ${c.motif}
              </div>
              <div style="font-size:0.71rem;color:#4a5679;">
                ${c.patientRef} · ${c.age} ans · ${c.sex} · <strong>${c.site}</strong>
              </div>
            </div>

            <div style="font-size:0.72rem;font-weight:700;color:#1d2e5c;display:flex;align-items:center;gap:0.25rem;flex-shrink:0;">
              <span>Ouvrir</span>
              <span>→</span>
            </div>
          </div>
        `;
      })
      .join('');

    listEl.querySelectorAll('[data-open-case]').forEach((row) => {
      row.addEventListener('click', () => {
        const found = sanadCases.find((c) => c.id === row.getAttribute('data-open-case'));
        if (found) {
          activeSanadCase = found;
          updateSanadCaseHeader();
          switchSanadTab('case');
        }
      });
    });
  };

  const updateSanadCaseHeader = () => {
    const motifEl = document.getElementById('sanad-detail-motif');
    const subEl = document.getElementById('sanad-detail-sub');
    const patEl = document.getElementById('sanad-detail-patient');
    const prioEl = document.getElementById('sanad-detail-prio');
    const timerEl = document.getElementById('sanad-detail-timer');

    if (motifEl) motifEl.textContent = `${activeSanadCase.motif} · ${activeSanadCase.ref}`;
    if (subEl)
      subEl.textContent = `${activeSanadCase.priorityLabel} · ${activeSanadCase.patientRef} · ${activeSanadCase.age} ans · ${activeSanadCase.sex} · ${activeSanadCase.site}`;
    if (patEl) patEl.textContent = activeSanadCase.patientRef;
    if (prioEl) {
      prioEl.className = `sanad-priority-tag ${activeSanadCase.priority}`;
      prioEl.textContent = activeSanadCase.priorityLabel;
    }
    if (timerEl) timerEl.textContent = formatSlaTime(activeSanadCase.remainingSec);
  };

  renderSanadQueue();

  // SANAD Priority Filter Buttons
  const sanadFilterBtns = document.querySelectorAll('#sanad-priority-filters .sanad-filter-btn');
  sanadFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeSanadFilter = btn.getAttribute('data-sfilter') || '';
      sanadFilterBtns.forEach((b) => b.classList.toggle('active', b === btn));
      renderSanadQueue();
    });
  });

  // Live 1-Second Server SLA Ticker for SANAD
  setInterval(() => {
    sanadCases.forEach((c) => {
      if (c.remainingSec > 0) c.remainingSec -= 1;
    });
    const queueView = document.getElementById('sanad-view-queue');
    if (queueView && queueView.classList.contains('active')) {
      renderSanadQueue();
    }
    const timerEl = document.getElementById('sanad-detail-timer');
    if (timerEl) {
      timerEl.textContent = formatSlaTime(activeSanadCase.remainingSec);
    }
    const clockEl = document.getElementById('sanad-live-clock');
    if (clockEl) {
      const now = new Date();
      clockEl.textContent = `UTC ${now.toISOString().slice(11, 19)} · SLA Active`;
    }
  }, 1000);

  // SANAD Decision Form Interactions
  const orientBtns = document.querySelectorAll('#sanad-orientations .sanad-orientation-btn');
  orientBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      orientBtns.forEach((b) => b.classList.toggle('selected', b === btn));
    });
  });

  const diagChips = document.querySelectorAll('#sanad-diag-chips .sanad-diag-chip');
  diagChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      diagChips.forEach((c) => {
        const isSelected = c === chip;
        c.classList.toggle('active', isSelected);
        c.style.background = isSelected ? '#1d2e5c' : '#ffffff';
        c.style.color = isSelected ? '#ffffff' : '#1d2e5c';
        c.style.borderColor = isSelected ? '#1d2e5c' : '#dde1eb';
      });
    });
  });

  const signBtn = document.getElementById('sanad-sign-btn');
  const signFeedback = document.getElementById('sanad-sign-feedback');
  const registryChain = document.getElementById('sanad-registry-chain');
  let decisionSigned = false;

  if (signBtn) {
    signBtn.addEventListener('click', () => {
      if (signFeedback) signFeedback.style.display = 'block';
      signBtn.textContent = '✓ Décision Signée & Horodatée (Voir Registre →)';
      if (!decisionSigned && registryChain) {
        decisionSigned = true;
        const newBlock = document.createElement('div');
        newBlock.style.cssText =
          'padding:0.5rem 0.65rem;background:#e7f8ee;border:1px solid #2fbf71;border-radius:6px;';
        newBlock.innerHTML = `
          <div style="display:flex;justify-content:space-between;font-weight:700;color:#146c3a;">
            <span>seq #4 · DECISION_SIGNED (TRANSFER_URGENT · STEMI)</span>
            <span>JUST NOW</span>
          </div>
          <div style="color:#146c3a;font-size:0.6rem;margin-top:2px;">prev: e3b0c44298fc1c14… · hash: 7d865e959b2466918c9863afca942d0f</div>
        `;
        registryChain.appendChild(newBlock);
      } else if (decisionSigned) {
        switchSanadTab('registry');
      }
    });
  }

  // ========================================================================
  // 8. TABIB DESKTOP (طبيب) INTERACTIVE LIGHT UI EMBED CONTROLLER
  // ========================================================================
  const tabibPatients = [
    {
      id: 'PAT-041',
      name: 'Amine Khelifi',
      age: 54,
      arrivedAt: '09:15',
      motif: 'Poussée hypertensive + Céphalées',
      triage: 'CRITIQUE',
      status: 'En consultation'
    },
    {
      id: 'PAT-042',
      name: 'Meriem Boudiaf',
      age: 38,
      arrivedAt: '09:30',
      motif: 'Fièvre aiguë + Angine érythémateuse',
      triage: 'MOYEN',
      status: null
    },
    {
      id: 'PAT-043',
      name: 'Karim Mansouri',
      age: 62,
      arrivedAt: '09:42',
      motif: 'Suivi Diabète Type 2 & Bilan HbA1c',
      triage: 'MOYEN',
      status: null
    },
    {
      id: 'PAT-044',
      name: 'Nadia Ziani',
      age: 29,
      arrivedAt: '10:05',
      motif: 'Renouvellement ordonnance + Certificat',
      triage: 'ROUTINE',
      status: null
    },
    {
      id: 'PAT-045',
      name: 'Yacine Brahimi',
      age: 45,
      arrivedAt: '10:18',
      motif: 'Épigastralgies post-prandiales',
      triage: 'ROUTINE',
      status: null
    }
  ];

  const tabibCatalogDrugs = [
    {
      id: 'd1',
      name: 'AUGMENTIN 1g',
      dci: 'Amoxicilline / Ac. Clavulanique',
      posology: '1 sachet 2x/jour (Matin & Soir)',
      duration: '7 jours (2 boîtes)'
    },
    {
      id: 'd2',
      name: 'DOLIPRANE 1000mg',
      dci: 'Paracétamol',
      posology: '1 comprimé 3x/jour si douleur/fièvre',
      duration: '5 jours (1 boîte)'
    },
    {
      id: 'd3',
      name: 'AMLOR 5mg',
      dci: 'Amlodipine',
      posology: '1 gélule par jour le soir',
      duration: '30 jours (1 boîte)'
    },
    {
      id: 'd4',
      name: 'GLUCOPHAGE 850mg',
      dci: 'Metformine',
      posology: '1 comprimé matin et soir au milieu du repas',
      duration: '30 jours (2 boîtes)'
    },
    {
      id: 'd5',
      name: 'MOPRAL 20mg',
      dci: 'Oméprazole',
      posology: '1 gélule par jour à jeun le matin',
      duration: '14 jours (1 boîte)'
    }
  ];

  let activeTabibTriageFilter = null;
  let activeTabibRxItems = [tabibCatalogDrugs[2], tabibCatalogDrugs[1]];

  const switchTabibTab = (tabName) => {
    document.querySelectorAll('[data-tabib-tab]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-tabib-tab') === tabName);
    });
    document.querySelectorAll('.tabib-view').forEach((view) => {
      view.classList.toggle('active', view.id === `tabib-view-${tabName}`);
    });
  };

  document.querySelectorAll('[data-tabib-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      switchTabibTab(btn.getAttribute('data-tabib-tab'));
    });
  });

  const renderTabibQueue = () => {
    const tbody = document.getElementById('tabib-queue-tbody');
    const resetBtn = document.getElementById('tabib-reset-triage');
    if (!tbody) return;

    if (resetBtn) {
      resetBtn.style.display = activeTabibTriageFilter ? 'inline-block' : 'none';
    }

    const filtered = tabibPatients.filter(
      (p) => !activeTabibTriageFilter || p.triage === activeTabibTriageFilter
    );

    tbody.innerHTML = filtered
      .map(
        (p) => `
        <tr data-tabib-patient="${p.id}" style="border-bottom:1px solid rgba(16,25,58,0.08);cursor:pointer;transition:background 0.15s;">
          <td style="padding:0.55rem 0.4rem 0.55rem 0;">
            <div style="font-weight:700;color:#10193a;font-size:0.76rem;display:flex;align-items:center;gap:0.35rem;">
              <span>${p.name}</span>
              ${
                p.status
                  ? `<span style="font-size:0.58rem;padding:0.1rem 0.35rem;border-radius:4px;border:1px solid rgba(59,110,165,0.3);background:rgba(59,110,165,0.1);color:#3b6ea5;text-transform:uppercase;font-weight:700;">${p.status}</span>`
                  : ''
              }
            </div>
            <div style="font-size:0.64rem;color:#8c93ad;">ID: ${p.id} · ${p.age} ans</div>
          </td>
          <td style="padding:0.55rem 0.35rem;color:#8c93ad;font-size:0.72rem;white-space:nowrap;">${p.arrivedAt}</td>
          <td style="padding:0.55rem 0.35rem;color:#4a5679;font-size:0.72rem;">${p.motif}</td>
          <td style="padding:0.55rem 0.35rem;text-align:center;">
            <span class="tabib-badge ${p.triage}">${p.triage}</span>
          </td>
          <td style="padding:0.55rem 0 0.55rem 0.35rem;text-align:right;font-weight:700;color:#10193a;">→</td>
        </tr>
      `
      )
      .join('');

    tbody.querySelectorAll('[data-tabib-patient]').forEach((row) => {
      row.addEventListener('click', () => {
        const pat = tabibPatients.find((p) => p.id === row.getAttribute('data-tabib-patient'));
        if (pat) {
          const rxPatEl = document.getElementById('tabib-rx-patient');
          if (rxPatEl) rxPatEl.textContent = `${pat.name} (${pat.age} ans)`;
          switchTabibTab('rx');
        }
      });
    });
  };

  const tabibTriageBtns = document.querySelectorAll('#tabib-triage-filters .tabib-triage-btn');
  tabibTriageBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const level = btn.getAttribute('data-ttriage');
      activeTabibTriageFilter = activeTabibTriageFilter === level ? null : level;
      tabibTriageBtns.forEach((b) =>
        b.classList.toggle('active', b.getAttribute('data-ttriage') === activeTabibTriageFilter)
      );
      renderTabibQueue();
    });
  });

  const tabibResetBtn = document.getElementById('tabib-reset-triage');
  if (tabibResetBtn) {
    tabibResetBtn.addEventListener('click', () => {
      activeTabibTriageFilter = null;
      tabibTriageBtns.forEach((b) => b.classList.remove('active'));
      renderTabibQueue();
    });
  }

  const renderTabibPrescription = () => {
    const catalogEl = document.getElementById('tabib-drug-catalog');
    const rxListEl = document.getElementById('tabib-rx-list');
    if (!catalogEl || !rxListEl) return;

    catalogEl.innerHTML = tabibCatalogDrugs
      .map((d) => {
        const added = activeTabibRxItems.some((item) => item.id === d.id);
        return `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:0.42rem 0.55rem;background:#f3f4f8;border:1px solid rgba(16,25,58,0.08);border-radius:6px;">
            <div style="min-width:0;flex:1;">
              <div style="font-size:0.72rem;font-weight:800;color:#10193a;">${d.name}</div>
              <div style="font-size:0.62rem;color:#8c93ad;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${d.dci}</div>
            </div>
            <button type="button" data-add-drug="${d.id}" style="
              background:${added ? '#3f7a5c' : '#10193a'};
              color:#ffffff;border:none;border-radius:4px;padding:0.25rem 0.5rem;font-size:0.64rem;font-weight:700;cursor:pointer;flex-shrink:0;
            ">${added ? 'Ajouté' : '+ Ajouter'}</button>
          </div>
        `;
      })
      .join('');

    catalogEl.querySelectorAll('[data-add-drug]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const drug = tabibCatalogDrugs.find((d) => d.id === btn.getAttribute('data-add-drug'));
        if (drug && !activeTabibRxItems.some((i) => i.id === drug.id)) {
          activeTabibRxItems.push(drug);
          renderTabibPrescription();
        }
      });
    });

    rxListEl.innerHTML = activeTabibRxItems
      .map(
        (item, idx) => `
        <div style="padding:0.42rem 0.55rem;border-left:3px solid #10193a;background:#f9fafc;border-radius:0 4px 4px 0;display:flex;justify-content:space-between;align-items:flex-start;gap:0.4rem;">
          <div>
            <div style="font-size:0.72rem;font-weight:800;color:#10193a;">${idx + 1}. ${item.name} <span style="font-weight:500;color:#8c93ad;font-size:0.64rem;">(${item.dci})</span></div>
            <div style="font-size:0.66rem;color:#4a5679;margin-top:1px;">${item.posology} — <strong>${item.duration}</strong></div>
          </div>
          <button type="button" data-remove-drug="${item.id}" style="background:none;border:none;color:#a34b42;font-weight:800;font-size:0.78rem;cursor:pointer;line-height:1;" title="Retirer">×</button>
        </div>
      `
      )
      .join('');

    rxListEl.querySelectorAll('[data-remove-drug]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-remove-drug');
        activeTabibRxItems = activeTabibRxItems.filter((i) => i.id !== id);
        renderTabibPrescription();
      });
    });
  };

  renderTabibQueue();
  renderTabibPrescription();

  const tabibPrintBtn = document.getElementById('tabib-print-btn');
  const tabibPrintStatus = document.getElementById('tabib-print-status');
  if (tabibPrintBtn && tabibPrintStatus) {
    tabibPrintBtn.addEventListener('click', () => {
      tabibPrintStatus.textContent = '✓ Spooler A5 généré (Iframe Isolé)';
    });
  }

  const tabibCopyBtn = document.getElementById('tabib-copy-code');
  if (tabibCopyBtn) {
    tabibCopyBtn.addEventListener('click', () => {
      navigator.clipboard?.writeText('TBB-88A1-44C2-9901').catch(() => {});
      tabibCopyBtn.textContent = '✓ Code Copié';
      setTimeout(() => {
        tabibCopyBtn.textContent = 'Copier Code';
      }, 1800);
    });
  }

  // ========================================================================
  // 8. GRAYED-OUT LOGOS SHOWOFF GALLERY FILTER & HOVER TILT
  // ========================================================================
  const skillFilterBtns = document.querySelectorAll('#skills-filter-bar .skill-filter-btn');
  const logoCards = document.querySelectorAll('#logo-gallery-grid .logo-showcase-card');

  skillFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-filter');
      skillFilterBtns.forEach((b) => b.classList.toggle('active', b === btn));

      logoCards.forEach((card) => {
        const matches = cat === 'all' || card.getAttribute('data-category') === cat;
        if (matches) {
          card.classList.remove('hidden-skill');
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px) scale(0.96)';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = '';
          });
        } else {
          card.classList.add('hidden-skill');
        }
      });
    });
  });

  // Subtle 3D tilt on logo showcase cards
  logoCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `translateY(-6px) rotateX(${(-y / 8).toFixed(2)}deg) rotateY(${(x / 8).toFixed(2)}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ========================================================================
  // 9. DIRECT MAIL FORM PAYLOAD DISPATCH
  // ========================================================================
  const contactForm = document.getElementById('contact-mail-form');
  const contactStatus = document.getElementById('contact-form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('contact-name')?.value || '').trim();
      const email = (document.getElementById('contact-email')?.value || '').trim();
      const subject = (document.getElementById('contact-subject')?.value || '').trim();
      const message = (document.getElementById('contact-message')?.value || '').trim();

      const formattedSubject = encodeURIComponent(
        subject ? `[Portfolio] ${subject}` : `[Portfolio] Inquiry from ${name}`
      );
      const formattedBody = encodeURIComponent(
        `Sender: ${name}\nReply-To: ${email}\n\n${message}`
      );

      if (contactStatus) {
        contactStatus.textContent = 'Opening mail client with payload...';
      }

      window.location.href = `mailto:bigovi@outlook.com?subject=${formattedSubject}&body=${formattedBody}`;
    });
  }
});
