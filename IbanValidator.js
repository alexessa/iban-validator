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

window.addEventListener("heyflow-change", async (event) => {
  console.log(event);
  if (
    !event.detail.fieldsSimple["IBAN"] &&
    event.detail.fieldsSimple["IBAN"] !== ""
  ) {
    return;
  }

  const { isValid } = await validateIban(event.detail.fieldsSimple["IBAN"]);

  if (!isValid) {
    window.alert("Invalid IBAN");
  }
});
