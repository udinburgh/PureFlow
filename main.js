// main.js

document
  .getElementById("debitForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const area = parseFloat(document.getElementById("area").value);
    const velocity = parseFloat(document.getElementById("velocity").value);

    const debit = await hitungDebitAPI(area, velocity);
    document.getElementById("result").innerText =
      `Debit Air: ${debit.toFixed(2)} m³/s`;
  });

async function hitungDebitAPI(area, velocity) {
  return area * velocity;
}
