// Safely set the year if the element exists
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

function openPdfModal(pdfUrl, title, isLandscape = false) {
  const modal = document.getElementById('pdfModal');
  const viewer = document.getElementById('pdfViewer');
  const titleEl = document.getElementById('pdfModalTitle');
  const externalLink = document.getElementById('pdfExternalLink');
  const modalContent = modal.querySelector('.pdf-modal-content');

  if (!modal || !viewer) return;

  viewer.src = pdfUrl;
  if (titleEl) titleEl.innerText = title || 'Certificate Preview';
  if (externalLink) externalLink.href = pdfUrl;

  // Apply or remove the horizontal style class based on the flag
  if (modalContent) {
    if (isLandscape) {
      modalContent.classList.add('horizontal-pdf');
    } else {
      modalContent.classList.remove('horizontal-pdf');
    }
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closePdfModal() {
  const modal = document.getElementById('pdfModal');
  const viewer = document.getElementById('pdfViewer');

  if (!modal || !viewer) return;

  modal.classList.add('hidden');
  modal.classList.remove('flex');
  viewer.src = '';
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closePdfModal();
});
