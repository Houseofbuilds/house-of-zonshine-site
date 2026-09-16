(function () {
  var priceInput = document.getElementById("sale-price");
  var rateInput = document.getElementById("commission-rate");
  var totalOutput = document.getElementById("commission-total");
  var breakdownOutput = document.getElementById("commission-breakdown");
  var errorMessage = document.getElementById("calculator-error");

  if (!priceInput || !rateInput || !totalOutput || !breakdownOutput || !errorMessage) return;

  var currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });

  function formatRate(value) {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 }).format(value) + "%";
  }

  function updateCommission() {
    var price = Number(priceInput.value);
    var rate = Number(rateInput.value);
    var priceIsValid = priceInput.value !== "" && Number.isFinite(price) && price >= 0;
    var rateIsValid = rateInput.value !== "" && Number.isFinite(rate) && rate >= 0 && rate <= 100;

    priceInput.setAttribute("aria-invalid", String(!priceIsValid));
    rateInput.setAttribute("aria-invalid", String(!rateIsValid));
    errorMessage.hidden = priceIsValid && rateIsValid;

    if (!priceIsValid || !rateIsValid) {
      totalOutput.textContent = "—";
      breakdownOutput.textContent = "Enter valid numbers to calculate the gross commission.";
      return;
    }

    var total = price * (rate / 100);
    totalOutput.textContent = currency.format(total);
    breakdownOutput.textContent = currency.format(price) + " × " + formatRate(rate) + " = " + currency.format(total);
  }

  priceInput.addEventListener("input", updateCommission);
  rateInput.addEventListener("input", updateCommission);
  updateCommission();
})();
