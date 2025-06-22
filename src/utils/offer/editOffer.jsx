import api from "../http/api";

export async function editOffer(offerDetails) {
  console.log("Hey, Editting Offer Ok!");

  const baseUrl = import.meta.env.VITE_API_URL;
  console.log("API URL:", baseUrl);

  if (!offerDetails) return { success: false, error: "No offer data provided" };

  const {
    offerId,
    minimum,
    maximum,
    margin,
    termTags,
    paymentWindow,
    confirmationTime,
    instruction,
  } = offerDetails;

  if (!offerId) {
    return {
      success: false,
      error: "Cannot process edit, Offer Id is invalid",
    };
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
    offer_id: offerId,
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
    "Close response:", response;

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
