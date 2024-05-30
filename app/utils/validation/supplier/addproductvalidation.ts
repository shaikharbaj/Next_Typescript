export const validateProductData = (data: any) => {
  const errors: any = {};

  if (!data.name) errors.name = "Product name is required";

  if (!data.description) errors.description = "Description is required";

  if (!data.category_id) errors.category_id = "Category is required";

  if (!data.subcategory_id) errors.subcategory_id = "Sub-category is required";

  if (!data.originalprice) {
    errors.originalprice = "Original price is required";
  } else if (
    isNaN(Number(data.originalprice)) ||
    Number(data.originalprice) <= 0
  ) {
    errors.originalprice = "Invalid original price";
  }

  if (!data.discountprice) {
    errors.discountprice = "Discount price is required";
  } else if (
    isNaN(Number(data.discountprice)) ||
    Number(data.discountprice) <= 0
  ) {
    errors.discountprice = "Invalid discount price";
  } else if (Number(data.discountprice) >= Number(data.originalprice)) {
    errors.discountprice = "Discount price must be less than original price";
  }

  if (!data.stock) {
    errors.stock = "Stock quantity is required";
  } else if (isNaN(Number(data.stock)) || Number(data.stock) < 0) {
    errors.stock = "Invalid stock quantity";
  }

  if (!data.images || data.images.length === 0) {
    errors.images = "At least one image is required";
  }

  if (data.primaryImageIndex === null || data.primaryImageIndex === undefined) {
    errors.primaryImageIndex = "Primary image must be selected";
  }

  return errors;
};
