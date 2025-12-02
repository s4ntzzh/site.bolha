const container = document.getElementById('container');
const totalBubbles = 32; // Quantidade de bolhas

// Função para criar o som de "pop" (usando oscilador simples)
function playPopSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    // Frequência aleatória para cada pop soar um pouco diferente
    oscillator.frequency.setValueAtTime(800 + Math.random() * 200, audioCtx.currentTime); 
    oscillator.frequency.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
}

function createBubbles() {
    container.innerHTML = ''; // Limpa container
    for (let i = 0; i < totalBubbles; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        bubble.addEventListener('click', function() {
            if (!this.classList.contains('popped')) {
                this.classList.add('popped');
                this.innerText = "POP!";
                playPopSound(); // Toca o som
                
                // Vibrar o celular se suportado
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }
        });

        container.appendChild(bubble);
    }
}

function resetBubbles() {
    createBubbles();
}

// Inicia o site com bolhas
createBubbles();
