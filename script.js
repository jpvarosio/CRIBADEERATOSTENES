document.getElementById('calculate').addEventListener('click', function () {
    const limit = parseInt(document.getElementById('limit').value);
    if (isNaN(limit) || limit < 2) {
        document.getElementById('result').innerHTML = '<p>Por favor, ingresa un número válido mayor o igual a 2.</p>';
        return;
    }

    const primes = sieveOfEratosthenes(limit);
    displayPrimes(primes);
});

function sieveOfEratosthenes(limit) {
    const isPrime = Array(limit + 1).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let i = 2; i * i <= limit; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= limit; j += i) {
                isPrime[j] = false;
            }
        }
    }

    const primes = [];
    for (let i = 2; i <= limit; i++) {
        if (isPrime[i]) primes.push(i);
    }
    return primes;
}

function displayPrimes(primes) {
    const resultDiv = document.getElementById('result');
    if (primes.length === 0) {
        resultDiv.innerHTML = '<p>No se encontraron números primos.</p>';
        return;
    }

    const list = primes.map(prime => `<span class="prime">${prime}</span>`).join(', ');
    resultDiv.innerHTML = `<p>Números primos encontrados: ${list}</p>`;
}
