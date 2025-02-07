const display = document.querySelector('.display');
document.querySelectorAll('.button').forEach(button => {
  button.onclick = () => {
    const action = button.getAttribute('data-action');
    const value = button.getAttribute('value') || button.textContent;

    if (action === 'clear') {
      display.value = display.value.slice(0,-1);
    } else if (action === 'fan') {
      display.value = '';
    } else if (value === '=') {
      display.value = calculate(display.value);
    } else {
      display.value += value;
    }
  }
});

const calculate = expr => {
  const sanitizedExpr = expr.replace(/[^-()\d/*+.]/g, '');
  try {
    return new Function('return ' + sanitizedExpr)();
  } catch {
    return 'Error';
  }
};
