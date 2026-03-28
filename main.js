const BASE_URL = "http://localhost:3000/api";

// ==========================
// Form Debit (area & velocity)
// ==========================
document.getElementById("debitForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();

  const area = parseFloat(document.getElementById("area").value);
  const velocity = parseFloat(document.getElementById("velocity").value);
  const lokasi = document.getElementById("lokasi").value || "Unknown";

  try {
    const response = await fetch(`${BASE_URL}/debit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ area, velocity, lokasi })
    });

    const result = await response.json();

    if (response.ok) {
      document.getElementById("result").innerText =
        `Debit Air: ${result.debit.toFixed(2)} m³/s (Lokasi: ${result.lokasi})`;
    } else {
      document.getElementById("result").innerText = `Error: ${result.error}`;
    }
  } catch (err) {
    document.getElementById("result").innerText = `Terjadi error: ${err.message}`;
  }
});

// ==========================
// Form Kalkulator (durasi & jenis alat)
// ==========================
document.getElementById("waterForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();

  const durasi = document.getElementById("duration").value;
  const jenisAlat = document.getElementById("device").value;

  try {
    const response = await fetch(`${BASE_URL}/estimasi`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ durasi, jenisAlat })
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById("liter").innerText = data.konsumsi + " L";
      document.getElementById("m3").innerText = (data.konsumsi / 1000).toFixed(3) + " m³";
      document.getElementById("cost").innerText = "Rp " + (data.konsumsi * 4);
      document.getElementById("resultBox").classList.add("show");
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (err) {
    alert(`Terjadi error: ${err.message}`);
  }
});