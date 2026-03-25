// main.js

document
  .getElementById("debitForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const area = parseFloat(document.getElementById("area").value);
    const velocity = parseFloat(document.getElementById("velocity").value);
    const lokasi = document.getElementById("lokasi").value || "Unknown";

    try {
      // Panggil backend API
      const response = await fetch("http://localhost:3000/api/debit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          volume: area,   // bisa disesuaikan: area dianggap volume
          waktu: velocity, // velocity dianggap waktu (sementara)
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