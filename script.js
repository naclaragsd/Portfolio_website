const certificatesToggle = document.querySelector('#toggle-certificates');
    const secondaryCertificates = document.querySelector('#all-certificates');
    const certificateModal = document.querySelector('#certificate-modal');
    const certificateModalBody = document.querySelector('#certificate-modal-body');
    const certificateModalTitle = document.querySelector('#certificate-modal-title');
    const certificateModalClose = document.querySelector('.certificate-modal-close');
    const avatarFrame = document.querySelector('.avatar-frame');
    const projectCards = document.querySelectorAll('.project-card[data-repo-url]');

    certificatesToggle?.setAttribute('aria-expanded', 'false');
    if (certificatesToggle) certificatesToggle.textContent = 'Ver todos os certificados';
    secondaryCertificates?.classList.remove('is-visible');
    secondaryCertificates?.setAttribute('aria-hidden', 'true');

    function toggleCertificates() {
      const isExpanded = secondaryCertificates?.classList.contains('is-visible') ?? false;

      certificatesToggle.setAttribute('aria-expanded', String(!isExpanded));
      certificatesToggle.textContent = isExpanded ? 'Ver todos os certificados' : 'Mostrar menos';
      secondaryCertificates?.classList.toggle('is-visible', !isExpanded);
      secondaryCertificates?.setAttribute('aria-hidden', String(isExpanded));
    }

    certificatesToggle?.addEventListener('click', toggleCertificates);

    function getCertificateData(card) {
      const title = card.querySelector('h3')?.textContent.trim() || 'Certificado';
      const image = card.querySelector('.certificate-image-wrapper img');

      if (image) {
        return {
          title,
          src: image.getAttribute('src'),
          alt: image.getAttribute('alt') || title,
        };
      }

      return null;
    }

    function openCertificateModal(card) {
      const data = getCertificateData(card);
      if (!data || !certificateModal || !certificateModalBody || !certificateModalTitle) return;

      certificateModalTitle.textContent = data.title;
      certificateModalBody.innerHTML = '';

      const img = document.createElement('img');
      img.className = 'certificate-modal-image';
      img.src = data.src;
      img.alt = data.alt;
      certificateModalBody.appendChild(img);

      certificateModal.classList.add('is-open');
      certificateModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      certificateModalClose?.focus();
    }

    function openProfilePhotoModal() {
      const image = avatarFrame?.querySelector('img');
      if (!image || !certificateModal || !certificateModalBody || !certificateModalTitle) return;

      certificateModalTitle.textContent = 'Foto de Ana Clara';
      certificateModalBody.innerHTML = '';

      const img = document.createElement('img');
      img.className = 'certificate-modal-image profile-modal-image';
      img.src = image.getAttribute('src');
      img.alt = image.getAttribute('alt') || 'Foto de Ana Clara';
      certificateModalBody.appendChild(img);

      certificateModal.classList.add('is-open');
      certificateModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      certificateModalClose?.focus();
    }

    function closeCertificateModal() {
      if (!certificateModal || !certificateModalBody) return;

      certificateModal.classList.remove('is-open');
      certificateModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      certificateModalBody.innerHTML = '';
    }

    document.querySelectorAll('.certificate-card').forEach((card) => {
      const media = card.querySelector('.certificate-image-wrapper');
      const link = card.querySelector('button.certificate-link');

      media?.setAttribute('tabindex', '0');
      media?.setAttribute('role', 'button');
      media?.setAttribute('aria-label', `Abrir certificado ${card.querySelector('h3')?.textContent.trim() || ''}`);

      media?.addEventListener('click', () => openCertificateModal(card));
      media?.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openCertificateModal(card);
        }
      });

      link?.addEventListener('click', (event) => {
        event.preventDefault();
        openCertificateModal(card);
      });
    });

    if (avatarFrame) {
      avatarFrame.setAttribute('tabindex', '0');
      avatarFrame.setAttribute('role', 'button');
      avatarFrame.setAttribute('aria-label', 'Ampliar foto de Ana Clara');
      avatarFrame.addEventListener('click', openProfilePhotoModal);
      avatarFrame.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openProfilePhotoModal();
        }
      });
    }

    projectCards.forEach((card) => {
      const repoUrl = card.dataset.repoUrl;
      const title = card.querySelector('h3')?.textContent.trim() || 'projeto';
      if (!repoUrl) return;

      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'link');
      card.setAttribute('aria-label', `Abrir repositório do projeto ${title}`);

      card.addEventListener('click', (event) => {
        if (event.target.closest('a, button')) return;
        window.location.href = repoUrl;
      });

      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          window.location.href = repoUrl;
        }
      });
    });

    certificateModalClose?.addEventListener('click', closeCertificateModal);

    certificateModal?.addEventListener('click', (event) => {
      if (event.target === certificateModal) {
        closeCertificateModal();
      }
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && certificateModal?.classList.contains('is-open')) {
        closeCertificateModal();
      }
    });

