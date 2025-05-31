document.addEventListener('DOMContentLoaded', function() {
  const phoneInput = document.getElementById('popupPhone');
  console.log("test");
  
  if (phoneInput) {
    // Маска ввода
    phoneInput.addEventListener('input', function(e) {
      const x = e.target.value
        .replace(/\D/g, '')
        .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
      
      if (x) {
        e.target.value = !x[2] ? '+7' : `+7 (${x[2]}${x[3] ? `) ${x[3]}` : ''}${
          x[4] ? `-${x[4]}` : ''}${x[5] ? `-${x[5]}` : ''}`;
      }
    });

    // Валидация при отправке
    const form = phoneInput.closest('form');
    if (form) {
      form.addEventListener('submit', function(e) {
        const digits = phoneInput.value.replace(/\D/g, '');
        if (digits.length !== 11) {
          e.preventDefault();
          phoneInput.setCustomValidity('Введите 11 цифр номера');
          phoneInput.reportValidity();
        }
      });
    }
  }
});