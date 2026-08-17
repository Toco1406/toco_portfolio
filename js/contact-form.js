emailjs.init("ah8usvnW40dvO3wwW");

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = 'Envoi...';
  status.textContent = '';
  status.className = 'form-status';

  emailjs.sendForm('service_v0s1i8m', 'template_74tms3o', form)
    .then(function () {
      status.textContent = 'Message envoyé avec succès !';
      status.classList.add('success');
      form.reset();
    })
    .catch(function (error) {
      status.textContent = "Une erreur est survenue, réessaie plus tard.";
      status.classList.add('error');
      console.error(error);
    })
    .finally(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Envoyer';
    });
});