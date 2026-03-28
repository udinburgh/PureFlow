const BASE_URL = "http://localhost:3000/api";

// ==========================
// Form Debit (area & velocity)
// ==========================
document.getElementById("debitForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();

  const area = parseFloat(document.getElementById("area").value);
  const velocity = parseFloat(document.getElementById("velocity").value);
  const lokasi = document.getElementById("lokasi").value || "Unknown";

  if (!area || !velocity || velocity <= 0) {
    document.getElementById("result").innerText = "Input tidak valid!";
    return;
  }

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

  // Validasi input
  if (!durasi || durasi <= 0) {
    alert("Durasi harus lebih dari 0!");
    return;
  }
  if (!jenisAlat) {
    alert("Pilih jenis alat!");
    return;
  }

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
      loadEstimasi(); // update riwayat setelah simpan
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (err) {
    alert(`Terjadi error: ${err.message}`);
  }
});

// ==========================
// Load Riwayat Estimasi
// ==========================
async function loadEstimasi() {
  try {
    const res = await fetch(`${BASE_URL}/estimasi`);
    const data = await res.json();

    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    if (data.data && data.data.length > 0) {
      document.getElementById("emptyState").style.display = "none";
      document.getElementById("table").style.display = "table";

      data.data.forEach(d => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${new Date(d.createdAt).toLocaleString()}</td>
          <td>${d.jenisAlat}</td>
          <td>${d.durasi} menit</td>
          <td>${d.konsumsi} L</td>
        `;
        tbody.appendChild(tr);
      });
    }
  } catch (err) {
    console.error("Error load estimasi:", err);
  }
}

// ==========================
// Load Cuaca
// ==========================
async function loadWeather() {
  try {
    const res = await fetch(`${BASE_URL}/weather?lokasi=Jakarta`);
    const data = await res.json();
    document.getElementById("weatherInfo").innerText =
      `${data.lokasi}: ${data.kondisi}, Suhu ${data.suhu}°C, Kelembapan ${data.kelembapan}%`;
  } catch (err) {
    document.getElementById("weatherInfo").innerText = "Gagal ambil data cuaca";
  }
}

// ==========================
// Load semua saat halaman dibuka
// ==========================
loadEstimasi();
loadWeather();