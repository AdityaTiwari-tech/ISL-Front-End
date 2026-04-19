const modeToggle = document.getElementById('modeToggle');

modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    modeToggle.textContent = '☀️ LIGHT';
  } else {
    modeToggle.textContent = '🌗 DARK';
  }
});

