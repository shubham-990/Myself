document.addEventListener('DOMContentLoaded', () => {
    // 1. Clock functionality
    function updateClock() {
        const clockElement = document.getElementById('clock');
        if (clockElement) {
            const now = new Date();
            clockElement.textContent = now.toLocaleTimeString([], { 
                hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
            });
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 2. Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // 3. Typing Effect
    const typingElement = document.getElementById('typing-role');
    const roles = [
        "Digital Marketer",
        "3D Designer",
        "UI/UX Specialist",
        "Frontend Developer"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // 4. Side Panel System
    const sidePanel = document.getElementById('side-panel');
    const panelContent = document.getElementById('panel-content');
    const panelOverlay = document.getElementById('panel-overlay');
    const navItems = document.querySelectorAll('.minimal-nav-item');
    const closeBtn = document.querySelector('.panel-close');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const panelType = item.getAttribute('data-panel');
            const template = document.getElementById(`${panelType}-template`);
            
            if (template) {
                // Clear and inject new content
                panelContent.innerHTML = '';
                const content = template.content.cloneNode(true);
                panelContent.appendChild(content);
                
                // Open panel
                sidePanel.classList.add('active');
                panelOverlay.classList.add('active');
                
                // Initialize specific listeners for injected content
                initPanelInteractions();
            }
        });

        // Professional Hover Sound or Subtle Effect (Optional - keeping logic clean)
    });

    function closePanel() {
        sidePanel.classList.remove('active');
        panelOverlay.classList.remove('active');
    }

    closeBtn.addEventListener('click', closePanel);
    panelOverlay.addEventListener('click', closePanel);

    function initPanelInteractions() {
        // Copy Email
        const copyBtn = panelContent.querySelector('#copy-email-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                const email = panelContent.querySelector('#email-text').textContent;
                navigator.clipboard.writeText(email).then(() => {
                    const original = copyBtn.innerHTML;
                    copyBtn.innerHTML = '<div class="email-info"><i class="fas fa-check"></i><span>Copied to Clipboard!</span></div>';
                    copyBtn.style.borderColor = '#10b981';
                    copyBtn.style.background = 'rgba(16, 185, 129, 0.1)';
                    setTimeout(() => {
                        copyBtn.innerHTML = original;
                        copyBtn.style.borderColor = '';
                        copyBtn.style.background = '';
                    }, 2000);
                });
            });
        }

        // Contact Form
        const form = panelContent.querySelector('#contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = form.querySelector('button');
                const originalText = btn.textContent;
                btn.textContent = 'MESSAGE SENT SUCCESSFULLY!';
                btn.style.background = '#10b981';
                btn.disabled = true;
                form.reset();
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            });
        }

        // Skill bar animation on load
        const progressBars = panelContent.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.transition = 'width 1s cubic-bezier(0.22, 1, 0.36, 1)';
                bar.style.width = width;
            }, 100);
        });
    }

    // 5. Interactive Background Grid, Eye Tracking & Smiling & Nav Hints
    const grid = document.querySelector('.bg-grid-pattern');
    const pupils = document.querySelectorAll('.pupil');
    const mouth = document.querySelector('.mouth');
    const eyes = document.querySelectorAll('.eye');
    const navHint = document.getElementById('nav-hint');
    const defaultHint = "Select a path to explore...";
    const interactiveElements = document.querySelectorAll('a, button, .minimal-nav-item, .project-card, .theme-toggle');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            mouth?.classList.add('smiling');
            eyes.forEach(eye => eye.classList.add('squinting'));
            
            // Show Nav Hint if element has data-hint
            if (el.dataset.hint && navHint) {
                navHint.textContent = el.dataset.hint;
                navHint.classList.add('active');
            }
        });
        el.addEventListener('mouseleave', () => {
            mouth?.classList.remove('smiling');
            eyes.forEach(eye => eye.classList.remove('squinting'));
            
            // Restore default hint
            if (navHint) {
                navHint.textContent = defaultHint;
                navHint.classList.remove('active');
            }
        });
    });

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Update Grid Spotlight
        if (grid) {
            const x = (mouseX / window.innerWidth) * 100;
            const y = (mouseY / window.innerHeight) * 100;
            grid.style.maskImage = `radial-gradient(circle at ${x}% ${y}%, black, transparent 100%)`;
            grid.style.webkitMaskImage = `radial-gradient(circle at ${x}% ${y}%, black, transparent 100%)`;
        }

        // Update Eye Pupils
        pupils.forEach(pupil => {
            const rect = pupil.parentElement.getBoundingClientRect();
            const eyeX = rect.left + rect.width / 2;
            const eyeY = rect.top + rect.height / 2;
            
            const angle = Math.atan2(mouseY - eyeY, mouseX - eyeX);
            const distance = Math.min(3, Math.hypot(mouseX - eyeX, mouseY - eyeY) / 50);
            
            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance;
            
            pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        });
    });

    // Escape to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePanel();
    });
});
