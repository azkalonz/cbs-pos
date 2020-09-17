import { getConfig } from "../App";

const PRODUCTS = getConfig().products || {};
export const Product = {
  isHidden: (p) => {
    let isHidden = false;
    if (typeof p === "object" && p.product_id) {
      isHidden = PRODUCTS.hidden?.findIndex((q) => q === p.product_id) >= 0;
    } else if (typeof p === "number") {
      isHidden = PRODUCTS.hidden?.findIndex((q) => q === p);
    }
    return isHidden;
  },
  ignore: (p) => {
    if (p?.length && typeof p === "object") {
      return p.filter((q) =>
        PRODUCTS.hidden?.findIndex
          ? PRODUCTS.hidden?.findIndex((qq) => qq === q.product_id) < 0
          : true
      );
    }
  },
};
