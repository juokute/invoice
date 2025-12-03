console.log('Invoice');


  constPrintNumber = invData => {
  

    document.querySelector('.SFnumber').innerHTML = invData.number;
    document.querySelector('.SF-invoice-date').innerHTML = invData.date;
    document.querySelector('.seller-name').innerHTML = invData.company.seller.name;
    document.querySelector('.seller-address').innerHTML = invData.company.seller.address;
    document.querySelector('.seller-code').innerHTML = invData.company.seller.code;
    document.querySelector('.seller-VAT').innerHTML = invData.company.seller.vat;
    document.querySelector('.seller-phone').innerHTML = invData.company.seller.phone;
    document.querySelector('.seller-email').innerHTML = invData.company.seller.email;
    document.querySelector('.buyer-name').innerHTML = invData.company.buyer.name;
    document.querySelector('.buyer-address').innerHTML = invData.company.buyer.address;


  }

  fetch("https://in3.dev/inv/")
  .then((res) => res.json())
  .then((invData) => {
    console.log(invData);

    constPrintNumber(invData); // sugrįžę duomenys
  });