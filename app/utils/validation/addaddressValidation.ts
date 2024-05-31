export const validateaddressdata = (data: any) => {
  const errors: any = {};

  // Phone number validation (Indian format: 10 digits starting with 6, 7, 8, or 9)
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!data.phone_number) {
    errors.phone_number = "Phone number is required";
  } else if (!phoneRegex.test(data.phone_number)) {
    errors.phone_number = "Invalid phone number format";
  }

  // ZIP code validation (Indian PIN code format: 6 digits)
  const zipRegex = /^\d{6}$/;
  if (!data.zipcode) {
    errors.zipcode = "ZIP code is required";
  } else if (!zipRegex.test(data.zipcode)) {
    errors.zipcode = "Invalid ZIP code format";
  }
  if (!data.addressLine1) errors.addressLine1 = "Address is required";
  if (!data.city) errors.city = "City is required";
  if (!data.state) errors.state = "State is required";

  if (!data.country) errors.country = "Country is required";
  return errors;
};
