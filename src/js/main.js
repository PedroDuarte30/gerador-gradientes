const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const cssCode = document.getElementById('css-code');
const copyBtn = document.getElementById('copy-button');
const body = document.body;

function updateGradient() {
    const c1 = color1.value;
    const c2 = color2.value;
    const gradient = `linear-gradient(to right, ${c1}, ${c2})`;

    // Aplicar o fundo
    body.style.background = gradient;
    cssCode.textContent = `background: ${gradient};`;

    // Cálculo da Luminosidade
    const hex = c1.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Ajuste de contraste dinâmico
    const textColor = brightness < 128 ? '#ffffff' : '#333333';
    
    // Aplicar cor aos textos
    const textElements = document.querySelectorAll('h1, h2, label, p, footer p, #css-code');
    textElements.forEach(el => el.style.color = textColor);
    
    // Ajustar botão e o fundo para visibilidade
    copyBtn.style.backgroundColor = textColor;
    copyBtn.style.color = brightness < 128 ? '#333333' : '#ffffff';
}

// Evento de do botão para cópia
copyBtn.addEventListener('click', () => {
    const text = cssCode.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copiado!";
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });
});

color1.addEventListener('input', updateGradient);
color2.addEventListener('input', updateGradient);

updateGradient();