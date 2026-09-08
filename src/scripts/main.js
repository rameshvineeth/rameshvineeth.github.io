// Main Controller for Vineeth Ramesh AI Engineer Portfolio
import { initSound, playBlip, playSuccessChime } from './sound.js';
import { initCRTMonitors } from './floral-kaleidoscope.js';
import { initWorkflowScrubber } from './workflow-scrubber.js';
import { initProjects } from './projects-modal.js';
import { initCustomCursor } from './cursor.js';
import { initHelicopter } from './helicopter.js';
import { initMeadowFlowers } from './flowers.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize core tactile sound & cursor
  initSound();
  initCustomCursor();

  // 2. Initialize graphics, helicopter mascot, meadow flowers & interactive engines
  initCRTMonitors();
  initWorkflowScrubber();
  initProjects();
  initHelicopter();
  initMeadowFlowers();

  // 3. Email Copy Functionality with Toast Notification
  const copyEmailBtns = document.querySelectorAll('.action-copy-email');
  const toast = document.getElementById('toast-notification');
  const emailToCopy = 'work.vineethramesh@gmail.com';

  copyEmailBtns.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(emailToCopy);
        playSuccessChime();
        showToast('✓ Copied Vineeth\'s email (work.vineethramesh@gmail.com) to clipboard!');
      } catch (err) {
        showToast('Email: work.vineethramesh@gmail.com');
      }
    });
  });

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 3200);
  }

  // 4. Logo Click Interaction (Single permanent logo with clean tactile animation & smooth scroll to top)
  const logoTrigger = document.getElementById('brand-logo-trigger');
  const logoSvg = document.getElementById('brand-logo-svg');

  if (logoTrigger && logoSvg) {
    logoTrigger.addEventListener('click', (e) => {
      e.preventDefault();

      // Trigger clean ripple & pop animation
      logoSvg.classList.remove('is-clicked');
      void logoSvg.offsetWidth; // Force CSS reflow to replay animation cleanly
      logoSvg.classList.add('is-clicked');

      setTimeout(() => {
        logoSvg.classList.remove('is-clicked');
      }, 500);

      // Play subtle micro-audio blip if sound is enabled
      playBlip(680, 0.04);

      // Smooth scroll back to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Real Message Dispatch Engine (Sends all inquiries via Formspree to work.vineethramesh@gmail.com)
  const inquiryForm = document.getElementById('quick-inquiry-form');
  const inquiryFeedback = document.getElementById('inquiry-feedback');
  const submitBtn = document.getElementById('dispatch-submit-btn');
  const btnLabel = document.getElementById('dispatch-btn-label');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const messageInput = document.getElementById('dispatch-query') || inquiryForm.querySelector('input[name="message"]') || inquiryForm.querySelector('input[type="text"]');
      const emailInput = document.getElementById('dispatch-email') || inquiryForm.querySelector('input[name="email"]') || inquiryForm.querySelector('input[type="email"]');

      const message = messageInput ? messageInput.value.trim() : '';
      const senderEmail = emailInput ? emailInput.value.trim() : '';

      if (!message) return;

      // Loading state
      if (submitBtn) submitBtn.disabled = true;
      if (btnLabel) btnLabel.textContent = '⏳ Transmitting...';

      if (inquiryFeedback) {
        inquiryFeedback.style.display = 'block';
        inquiryFeedback.innerHTML = `
          <div style="background:#18132A; color:#E2D7FC; padding:14px 18px; border-radius:12px; font-family:var(--font-mono); font-size:0.85rem; text-align:left; border:1px solid #7C3AED; box-shadow:0 8px 24px rgba(0,0,0,0.2);">
            <span style="color:#FACC15;">[DISPATCHING]</span> Transmitting message payload to <strong>work.vineethramesh@gmail.com</strong>...
          </div>
        `;
      }

      try {
        const formData = new FormData(inquiryForm);
        if (senderEmail) formData.set('email', senderEmail);
        if (message) formData.set('message', message);
        formData.set('_subject', `⚡ Portfolio Dispatch: ${message.slice(0, 50)}...`);

        const response = await fetch('https://formspree.io/f/mnpqgygz', {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok || data.ok) {
          playSuccessChime();

          if (inquiryFeedback) {
            inquiryFeedback.innerHTML = `
              <div style="background:#131B2A; color:#E2D7FC; padding:18px 22px; border-radius:14px; font-family:var(--font-mono); font-size:0.85rem; text-align:left; border:1.5px solid #10B981; box-shadow:0 12px 30px rgba(16,185,129,0.2);">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                  <span style="color:#34D399; font-size:1.1rem;">✓</span>
                  <strong style="color:#6EE7B7; font-size:0.95rem;">[DISPATCH CONFIRMED — DELIVERED TO INBOX]</strong>
                </div>
                <p style="margin:0 0 10px; color:#E2E8F0; line-height:1.5;">
                  Message delivered in real time directly to <strong>work.vineethramesh@gmail.com</strong>!
                </p>
                <div style="padding:10px 14px; background:rgba(0,0,0,0.35); border-radius:8px; margin-bottom:8px; border-left:3px solid #10B981;">
                  <span style="color:#94A3B8; font-size:0.75rem;">MESSAGE CONTENT:</span><br/>
                  <strong style="color:#FDE047;">&gt; "${message}"</strong><br/>
                  ${senderEmail ? `<span style="color:#38BDF8; font-size:0.75rem;">SENDER REPLY-TO: <strong>${senderEmail}</strong></span>` : ''}
                </div>
                <span style="color:#A78BFA; font-size:0.8rem;">[STATUS] Vineeth has received your transmission and will follow up shortly. Thank you!</span>
              </div>
            `;
          }

          if (messageInput) messageInput.value = '';
          if (emailInput) emailInput.value = '';
        } else {
          const errorMsg = data.errors ? data.errors.map((e) => e.message).join(', ') : 'Dispatch gateway rejected request';
          throw new Error(errorMsg);
        }
      } catch (err) {
        console.error('Dispatch error, offering mailto fallback:', err);
        const mailtoUrl = `mailto:work.vineethramesh@gmail.com?subject=${encodeURIComponent('Portfolio Inquiry: ' + message.slice(0, 35))}&body=${encodeURIComponent(message + (senderEmail ? '\n\nReply-to: ' + senderEmail : ''))}`;

        if (inquiryFeedback) {
          inquiryFeedback.innerHTML = `
            <div style="background:#1F1524; color:#FBCFE8; padding:18px 22px; border-radius:14px; font-family:var(--font-mono); font-size:0.85rem; text-align:left; border:1.5px solid #EC4899; box-shadow:0 12px 30px rgba(236,72,153,0.2);">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                <span style="color:#F472B6; font-size:1.1rem;">✉️</span>
                <strong style="color:#FBCFE8; font-size:0.95rem;">[DIRECT EMAIL READY]</strong>
              </div>
              <p style="margin:0 0 10px; color:#E2E8F0; line-height:1.5;">
                Click below to send your dispatch directly to <strong>work.vineethramesh@gmail.com</strong>:
              </p>
              <div style="margin:12px 0;">
                <a href="${mailtoUrl}" class="btn-pill btn-purple-filled btn-sm" style="display:inline-block; text-decoration:none; padding:10px 20px;">
                  Open Email Client to Send ✉️
                </a>
              </div>
              <span style="color:#94A3B8; font-size:0.75rem;">Direct recipient: work.vineethramesh@gmail.com</span>
            </div>
          `;
        }
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (btnLabel) btnLabel.textContent = 'Send Dispatch ✉️';
      }
    });
  }

  // 5. Scroll Reveal IntersectionObserver Fallback
  const scrollElements = document.querySelectorAll('.scroll-reveal');
  if (!window.CSS || !CSS.supports || !CSS.supports('(animation-timeline: view())')) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    scrollElements.forEach((el) => {
      el.classList.add('scroll-reveal-initial');
      observer.observe(el);
    });
  }

  // 6. Smooth Scroll Anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      let targetEl = document.querySelector(targetId);
      if (!targetEl && (targetId === '#experience' || targetId === '#workflow-scrubber')) {
        targetEl = document.getElementById('workflow-scrubber');
      }
      if (targetEl) {
        e.preventDefault();
        playBlip(540, 0.03);
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Tactile highlight pulse when navigating to the experience scrubber
        if (targetEl.id === 'workflow-scrubber') {
          targetEl.classList.remove('scrubber-focus-highlight');
          void targetEl.offsetWidth;
          targetEl.classList.add('scrubber-focus-highlight');
          setTimeout(() => {
            targetEl.classList.remove('scrubber-focus-highlight');
          }, 1800);
        }
      }
    });
  });

  console.log('✦ Vineeth Ramesh Portfolio Initialized (Tines 3B Aesthetic & Agent Engine)');
});
