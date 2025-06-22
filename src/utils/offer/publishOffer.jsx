import api from "../http/api";

const getMissingServiceLabel = (type) => {
  switch (type) {
    case "Online Wallet Transfer":
      return "Select Online Wallet";
    case "Direct Bank Transfer":
      return "Select Bank Account";
    case "Gift Card Exchange":
      return "Select Gift Card";
    case "Card-Based Spending":
      return "Select Debit or Credit Card";
    case "Crypto Trading":
      return "Select Crypto Asset";
    default:
      return "Service";
  }
};

export async function publishOffer(offerDetails) {
  console.log("Hey, Publishing Ok!");

  const baseUrl = import.meta.env.VITE_API_URL;
  console.log("API URL:", baseUrl);

  if (!offerDetails) return { success: false, error: "No offer data provided" };

  const {
    serviceType,
    service,
    serviceId,
    currency,
    minimum,
    maximum,
    margin,
    termTags,
    paymentWindow,
    confirmationTime,
    instruction,
  } = offerDetails;

  if (!serviceType) {
    return { success: false, error: "Missing required field: Service Type" };
  }

  if (!service) {
    const label = getMissingServiceLabel(serviceType);
    return { success: false, error: `Missing required field: ${label}` };
  }

  if (!currency?.code && !currency?.name) {
    return { success: false, error: "Missing required field: Select Currency" };
  }

  if (!minimum) {
    return {
      success: false,
      error: "Missing required field: Minimum trade limit",
    };
  }

  if (!maximum) {
    return {
      success: false,
      error: "Missing required field: Maximum trade limit",
    };
  }

  if (margin <= 2) {
    return {
      success: false,
      error: "Profit margin must be greater than 2% to publish your offer.",
    };
  }

  if (!paymentWindow) {
    return { success: false, error: "Missing required field: Payment window" };
  }

  if (!confirmationTime) {
    return {
      success: false,
      error: "Missing required field: Confirmation window",
    };
  }

  if (!termTags || termTags.length === 0) {
    return { success: false, error: "Missing required field: Offer terms tag" };
  }

  if (!instruction) {
    return {
      success: false,
      error: "Missing required field: Trade instruction",
    };
  }

  const payload = {
    service_type: serviceType,
    service: service,
    service_id: serviceId,
    preferred_currency: [
      {
        code: currency.code,
        name: currency.name,
      },
    ],
    purchase_limits: {
      minimum,
      maximum,
    },
    margin_rate: [
      {
        from: minimum,
        to: maximum,
        rate: margin,
      },
    ],
    terms: termTags,
    payment_window: paymentWindow,
    confirmation_window: confirmationTime,
    instructins: instruction,
  };

  try {
    const response = await api.post(
      `${baseUrl}/service-provider/offers/create`,
      payload
    );

    console.log;
    "Publish response:", response;

    return {
      success: true,
      message: response?.data?.message,
    };
  } catch (err) {
    console.log(err);

    return {
      success: false,
      error:
        err?.response?.data?.errorMessage || err?.message || "Unknown error",
    };
  }
}
