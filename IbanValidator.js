const debounce = (func, timeout = 250) => {
  let timer;
  return (...args) => {
    const boundFunc = func.bind(this, ...args);
    clearTimeout(timer);
    timer = setTimeout(boundFunc, timeout);
  };
};

const validateIban = async (inputData) => {
  try {
    const response = await fetch("https://eo710ouhxzmvxt2.m.pipedream.net", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: inputData,
    });

    return await response.json();
  } catch (error) {
    console.log(error);
    return { isValid: false };
  }
};

/* 
  if we are able to select only the Heyflow IBAN input field and it has an event of heyflow-change
  
  window.addEventListener("load", () => {
    document.querySelector("input[name='IBAN']").addEventListener("heyflow-change", debounce(async (event) => {
      const { isValid } = await validateIban(event.detail.fieldsSimple["IBAN"]);

      if (!isValid) {
        window.alert("Invalid IBAN");
      }
    }));
  });


*/
window.addEventListener(
  "heyflow-change",
  // assuming that heyflow-change follows the behavior of input change
  debounce(async (event) => {
    if (!event.detail.fieldsSimple["IBAN"]) {
      return;
    }

    //assuming that the heyflow label input name is iban
    const { isValid } = await validateIban(event.detail.fieldsSimple["IBAN"]);

    if (!isValid) {
      window.alert("Invalid IBAN");
    }
  })
);
