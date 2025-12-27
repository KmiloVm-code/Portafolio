export function initContactForm() {
  const form = document.querySelector<HTMLFormElement>('#contact-form');
  const formWrapper = document.querySelector<HTMLElement>('#form-wrapper');
  const successScreen = document.querySelector<HTMLElement>('#success-screen');
  const sendAnotherBtn = document.querySelector<HTMLButtonElement>('#send-another');
  const submitBtn = form?.querySelector<HTMLButtonElement>('button[type="submit"]');

  if (!form || form.dataset.bound === 'true') return;
  form.dataset.bound = 'true';

  const setLoading = (isLoading: boolean) => {
    if (!submitBtn) return;

    const label = submitBtn.querySelector<HTMLElement>('.btn-label');
    const loading = submitBtn.querySelector<HTMLElement>('.btn-loading');

    submitBtn.disabled = isLoading;
    submitBtn.setAttribute('aria-busy', String(isLoading));

    if (isLoading) {
      label?.classList.add('hidden');
      loading?.classList.remove('hidden');
      loading?.classList.add('inline-flex');
    } else {
      loading?.classList.add('hidden');
      loading?.classList.remove('inline-flex');
      label?.classList.remove('hidden');
    }
  };

  const toggleSuccess = (visible: boolean) => {
    formWrapper?.setAttribute('data-visible', visible ? 'false' : 'true');
    successScreen?.setAttribute('data-visible', visible ? 'true' : 'false');

    if (visible) {
      sendAnotherBtn?.setAttribute('data-animate', 'true');
      window.setTimeout(() => sendAnotherBtn?.removeAttribute('data-animate'), 600);
    }
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submitBtn?.disabled) return;

    setLoading(true);

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      message: String(formData.get('message') ?? '').trim(),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || 'No se pudo enviar el mensaje.');

      toggleSuccess(true);
      form.reset();
    } catch (error) {
      console.error(error);
      alert('No se pudo enviar el mensaje. Intenta de nuevo en unos minutos.');
    } finally {
      setLoading(false);
    }
  });

  sendAnotherBtn?.addEventListener('click', (event) => {
    event.preventDefault();
    form.reset();
    toggleSuccess(false);
  });
}