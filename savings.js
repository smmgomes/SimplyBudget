document.addEventListener(DOMContentLoaded, () => {
    const container = document.getElementById("confEtti");
    const amount = document.createElement("h2");
    amount.innerHTML = "$$$$$";
    container.appendChild(amount); 
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);
    const confetti = window.confetti.create(canvas, {
        resize: true,
        useWorker: true,
    });
    confetti({
        particleCount: 100,
        spread: 50,
        origin: { y: 0.6 },
        ticks: 200,
    }).then(function () {
        container.removeChild(canvas);
    });
}); 