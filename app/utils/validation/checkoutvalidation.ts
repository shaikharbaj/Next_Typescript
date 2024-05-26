export const validatedata = (data: any) => {
  const errors: any = {};
  if (!data.shippingName) errors.shippingName = "Name is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.shippingEmail) {
    errors.shippingEmail = "Email is required";
  } else if (!emailRegex.test(data.shippingEmail)) {
    errors.shippingEmail = "Invalid email format";
  }

  // Phone number validation (Indian format: 10 digits starting with 6, 7, 8, or 9)
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!data.shippingPhone) {
    errors.shippingPhone = "Phone number is required";
  } else if (!phoneRegex.test(data.shippingPhone)) {
    errors.shippingPhone = "Invalid phone number format";
  }

  // ZIP code validation (Indian PIN code format: 6 digits)
  const zipRegex = /^\d{6}$/;
  if (!data.shippingZipCode) {
    errors.shippingZipCode = "ZIP code is required";
  } else if (!zipRegex.test(data.shippingZipCode)) {
    errors.shippingZipCode = "Invalid ZIP code format";
  }
  if (!data.shippingAddressLine1)
    errors.shippingAddressLine1 = "Address is required";
  if (!data.shippingCity) errors.shippingCity = "City is required";
  if (!data.shippingState) errors.shippingState = "State is required";

  if (!data.shippingCountry) errors.shippingCountry = "Country is required";
  return errors;
};
