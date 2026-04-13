
// 見積もり関数
function calculateEstimate(amount, isWithholding, isFee) {
  let result = amount;

  let withholdingAmount = 0;
  let feeAmount = 0;

  if (isWithholding) {
    withholdingAmount = amount * 0.1021;
    result -= withholdingAmount;
  }

  if (isFee) {
    feeAmount = amount * 0.10;
    result -= feeAmount;
  }

  return {
    result: Math.floor(result),
    withholding: Math.floor(withholdingAmount),
    fee: Math.floor(feeAmount)
  };
}

// ボタン処理
document.getElementById("calcBtn").addEventListener("click", () => {

  const amountInput = document.getElementById("amount").value.replace(/,/g, "");
  const amount = parseFloat(amountInput);

  const isWithholding = document.getElementById("withholding").checked;
  const isFee = document.getElementById("fee").checked;

  if (isNaN(amount) || amount <= 0) {
    document.getElementById("error").textContent = "正しい金額を入力してください";
    return;
  } else {
    document.getElementById("error").textContent = "";
  }

  const result = calculateEstimate(amount, isWithholding, isFee);

  document.getElementById("result").textContent =
    `振込金額：${result.result.toLocaleString()}円`;

  document.getElementById("breakdown").textContent =
    `源泉徴収: ${result.withholding.toLocaleString()}円 / 手数料: ${result.fee.toLocaleString()}円`;
});


const amountInput = document.getElementById("amount");

// フォーカス外れたとき
amountInput.addEventListener("blur", () => {
  let value = amountInput.value.replace(/,/g, "");

  if (value === "") return;

  if (!isNaN(value)) {
    amountInput.value = Number(value).toLocaleString();
  }
});

// フォーカス時
amountInput.addEventListener("focus", () => {
  if (amountInput.value !== "") {
    amountInput.value = amountInput.value.replace(/,/g, "");
  }
});