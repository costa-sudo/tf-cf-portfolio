// Safely set the year if the element exists
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

function openPdfModal(pdfUrl, title) {
  const modal = document.getElementById('pdfModal');
  const viewer = document.getElementById('pdfViewer');
  const titleEl = document.getElementById('pdfModalTitle');
  const externalLink = document.getElementById('pdfExternalLink');

  if (!modal || !viewer) return;

  viewer.src = pdfUrl;
  if (titleEl) titleEl.innerText = title || 'Certificate Preview';
  if (externalLink) externalLink.href = pdfUrl;

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
