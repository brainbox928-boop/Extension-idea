document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  if (!form) return;

  const steps = Array.from(document.querySelectorAll('.form-step'));
  const progressSteps = Array.from(document.querySelectorAll('.progress-step'));
  const prevBtn = document.getElementById('prevStep');
  const nextBtn = document.getElementById('nextStep');
  const submitBtn = document.getElementById('submitBtn');
  const successMessage = document.getElementById('successMessage');
  let currentStep = 0;

  function updateProgress() {
    steps.forEach((step, index) => {
      step.classList.toggle('active', index === currentStep);
    });

    progressSteps.forEach((step, index) => {
      step.classList.toggle('active', index === currentStep);
    });

    prevBtn.style.display = currentStep === 0 ? 'none' : 'inline-flex';
    nextBtn.style.display = currentStep === steps.length - 1 ? 'none' : 'inline-flex';
    submitBtn.style.display = currentStep === steps.length - 1 ? 'inline-flex' : 'none';
  }

  function validateStep(stepIndex) {
    const currentFields = steps[stepIndex].querySelectorAll('input, select, textarea');
    let valid = true;

    currentFields.forEach((field) => {
      const isRequired = field.required;
      if (!isRequired) return;

      if (field.type === 'file') {
        if (!field.value) {
          field.classList.add('is-invalid');
          valid = false;
        } else {
          field.classList.remove('is-invalid');
        }
        return;
      }

      if (field.type === 'checkbox') {
        if (!field.checked) {
          field.classList.add('is-invalid');
          valid = false;
        } else {
          field.classList.remove('is-invalid');
        }
        return;
      }

      if (!field.value.trim()) {
        field.classList.add('is-invalid');
        valid = false;
      } else {
        field.classList.remove('is-invalid');
      }
    });

    if (!valid) {
      const firstInvalid = steps[stepIndex].querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
    }

    return valid;
  }

  function validateAllForm() {
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let valid = true;

    requiredFields.forEach((field) => {
      const isCheckbox = field.type === 'checkbox';
      const hasValue = isCheckbox ? field.checked : field.value.trim();

      if (!hasValue) {
        field.classList.add('is-invalid');
        valid = false;
      } else {
        field.classList.remove('is-invalid');
      }
    });

    return valid;
  }

  prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep -= 1;
      updateProgress();
      successMessage.style.display = 'none';
    }
  });

  nextBtn.addEventListener('click', () => {
    if (!validateStep(currentStep)) return;
    currentStep += 1;
    updateProgress();
    successMessage.style.display = 'none';
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!validateAllForm()) {
      const firstError = form.querySelector('.is-invalid');
      if (firstError) firstError.focus();
      return;
    }

    successMessage.style.display = 'block';
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // FRONTEND PROTOTYPE ONLY: no personal, identity, banking, or document data is stored locally or sent to a backend.
    // BACKEND REQUIRED: Connect this form to a secure backend/API before collecting real personal, identity or banking information.
  });

  updateProgress();
});
