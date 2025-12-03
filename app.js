console.log("Invoice");

constPrintNumber = (invData) => {
  document.querySelector(".SFnumber").innerHTML = invData.number;
  document.querySelector(".SF-invoice-date").innerHTML = invData.date;
  document.querySelector(".seller-name").innerHTML =
    invData.company.seller.name;
  document.querySelector(".seller-address").innerHTML =
    invData.company.seller.address;
  document.querySelector(".seller-code").innerHTML =
    invData.company.seller.code;
  document.querySelector(".seller-VAT").innerHTML = invData.company.seller.vat;
  document.querySelector(".seller-phone").innerHTML =
    invData.company.seller.phone;
  document.querySelector(".seller-email").innerHTML =
    invData.company.seller.email;
  document.querySelector(".buyer-name").innerHTML = invData.company.buyer.name;
  document.querySelector(".buyer-address").innerHTML =
    invData.company.buyer.address;
  document.querySelector(".buyer-code").innerHTML = invData.company.buyer.code;
  document.querySelector(".buyer-VAT").innerHTML = invData.company.buyer.vat;
  document.querySelector(".buyer-phone").innerHTML =
    invData.company.buyer.phone;
  document.querySelector(".buyer-email").innerHTML =
    invData.company.buyer.email;

  document.querySelector(".due-date").innerHTML = invData.due_date;

  document.querySelector(".shipping").innerHTML =
    invData.shippingPrice.toFixed(2).replace(".", ",") + " Eur";

  // ITEMS

  let itemTotalSum = 0;
  let shipping = invData.shippingPrice;

  const itemsContainer = document.querySelector(".items-container");

  invData.items.forEach((item) => {
    const itemQuantity = item.quantity;
    const itemPrice = item.price;
    const itemSum = itemQuantity * itemPrice;

    if (item.discount.value === undefined) {
      itemDiscountValue = "-";
    } else {
      itemDiscountValue = item.discount.value.toFixed(2);
    }

    if (item.discount.type === undefined) {
      itemDiscountType = "-";
    } else {
      if (item.discount.type === "fixed") {
        itemDiscountType = "fiksuota";
      } else {
        if (item.discount.type === "percentage") {
          itemDiscountType = "proc.";
        }
      }
    }

    if (item.discount.type === undefined) {
      itemSumPlusDiscount = itemSum;
    } else {
      if (item.discount.type === "fixed") {
        itemSumPlusDiscount = itemSum - itemDiscountValue;
      } else {
        if (item.discount.type === "percentage") {
          itemSumPlusDiscount = itemSum - (itemSum * itemDiscountValue) / 100;
        }
      }
    }

    itemTotalSum += itemSumPlusDiscount;

    itemsContainer.insertAdjacentHTML(
      "beforeend",
      `
        <div class="item-cell description">${item.description}</div>
        <div class="item-cell">${item.quantity}</div>
        <div class="item-cell">${item.price.toFixed(2).replace(".", ",")}</div>
        <div class="item-cell">${itemSum.toFixed(2).replace(".", ",")}</div>
        <div class="item-cell">${itemDiscountValue.replace(".", ",")}</div>
        <div class="item-cell">${itemDiscountType}</div>
        <div class="item-cell">${itemSumPlusDiscount
          .toFixed(2)
          .replace(".", ",")}</div>
        `
    );
  });
  console.log(itemTotalSum.toFixed(2).replace(".", ",")) + " Eur";

  itemTotalSumPlusShipping = itemTotalSum + shipping;

  document.querySelector(".sum-plus-shipping").innerHTML =
    itemTotalSumPlusShipping.toFixed(2).replace(".", ",") + " Eur";

  itemVat = itemTotalSumPlusShipping * 0.21;

  document.querySelector(".VAT").innerHTML =
    itemVat.toFixed(2).replace(".", ",") + " Eur";

  total = itemTotalSumPlusShipping + itemVat;

  document.querySelector(".sum-total").innerHTML =
    total.toFixed(2).replace(".", ",") + " Eur";

  // Skaičių vertimas žodžiais:

  function numberToWordsLt(number) {
    const units = [
      "",
      "vienas",
      "du",
      "trys",
      "keturi",
      "penki",
      "šeši",
      "septyni",
      "aštuoni",
      "devyni",
    ];
    const teens = [
      "dešimt",
      "vienuolika",
      "dvylika",
      "trylika",
      "keturiolika",
      "penkiolika",
      "šešiolika",
      "septyniolika",
      "aštuoniolika",
      "devyniolika",
    ];
    const tens = [
      "",
      "",
      "dvidešimt",
      "trisdešimt",
      "keturiasdešimt",
      "penkiasdešimt",
      "šešiasdešimt",
      "septyniasdešimt",
      "aštuoniasdešimt",
      "devyniasdešimt",
    ];
    const hundreds = [
      "",
      "šimtas",
      "du šimtai",
      "trys šimtai",
      "keturi šimtai",
      "penki šimtai",
      "šeši šimtai",
      "septyni šimtai",
      "aštuoni šimtai",
      "devyni šimtai",
    ];

    const scales = ["", "tūkstantis", "milijonas", "milijardas"];

    let euros = Math.floor(number);
    const cents = Math.round((number - euros) * 100);

    if (euros === 0) return `nulis Eur ${cents} ct.`;

    let words = [];
    let scaleIndex = 0;

    while (euros > 0) {
      const chunk = euros % 1000; // paimame po 3 skaitmenis
      euros = Math.floor(euros / 1000);

      if (chunk > 0) {
        let chunkWords = "";

        const h = Math.floor(chunk / 100);
        const t = Math.floor((chunk % 100) / 10);
        const u = chunk % 10;

        if (t === 1) {
          chunkWords = `${hundreds[h]} ${teens[u]}`;
        } else {
          chunkWords = `${hundreds[h]} ${tens[t]} ${units[u]}`;
        }

        chunkWords = chunkWords.trim();

        if (scaleIndex > 0) {
          // tvarkome daugiskaitą pagal lietuvių kalbą
          let scaleWord = scales[scaleIndex];
          if (chunk > 1 && scaleWord === "tūkstantis")
            scaleWord = "tūkstančiai";
          if (chunk > 1 && scaleWord === "milijonas") scaleWord = "milijonai";
          if (chunk > 1 && scaleWord === "milijardas") scaleWord = "milijardai";
          chunkWords += " " + scaleWord;
        }

        words.unshift(chunkWords); // dedame į priekį
      }

      scaleIndex++;
    }

    const euroWords = words.join(" ").replace(/\s+/g, " ").trim();

    return `${euroWords} Eur ${cents} ct.`;
  }

  const totalWords = numberToWordsLt(total);

  document.querySelector(".sum-words").innerHTML = totalWords;
};

fetch("https://in3.dev/inv/")
  .then((res) => res.json())
  .then((invData) => {
    console.log(invData);

    constPrintNumber(invData); // sugrįžę duomenys
  });
