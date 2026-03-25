// ==========================
// Form Debit (area & velocity)
// ==========================
document
  .getElementById("debitForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const area = parseFloat(document.getElementById("area").value);
    const velocity = parseFloat(document.getElementById("velocity").value);
    const lokasi = document.getElementById("lokasi").value || "Unknown";

    try {
      const response = await fetch("http://localhost:3000/api/debit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          volume: area,      // sementara area dianggap volume
          waktu: velocity,   // velocity dianggap waktu
          lokasi
        })
      });

      const result = await response.json();

      if (response.ok) {
        document.getElementById("result").innerText =
          `Debit Air: ${result.debit.toFixed(2)} m³/s (Lokasi: ${result.lokasi})`;
      } else {
        document.getElementById("result").innerText =
          `Error: ${result.error}`;
      }
    } catch (err) {
      document.getElementById("result").innerText =
        `Terjadi error: ${err.message}`;
    }
  });


// ==========================
// Form Kalkulator (durasi & jenis alat)
// ==========================
document
  .getElementById("waterForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const durasi = document.getElementById("duration").value;
    const jenisAlat = document.getElementById("device").value;

    try {
      const response = await fetch("http://localhost:3000/api/estimasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ durasi, jenisAlat })
      });

      const data = await response.json();

      if (response.ok) {
        document.getElementById("hasil").innerText =
          `${data.konsumsi} ${data.satuan} (${data.jenisAlat})`;
      } else {
        document.getElementById("hasil").innerText =
          `Error: ${data.error}`;
      }
    } catch (err) {
      document.getElementById("hasil").innerText =
        `Terjadi error: ${err.message}`;
    }
  });