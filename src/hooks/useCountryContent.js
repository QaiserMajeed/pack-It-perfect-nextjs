
import { useTranslation } from "react-i18next";

export const useCountryContent = () => {
  const { t } = useTranslation();

  const getCountryName = () => t("common.country");
  const getCountryFullName = () => t("common.countryFull");
  const getPhoneNumber = () => t("common.phone");
  const getFreeShippingThreshold = () => t("common.freeShippingThreshold");
  const getCompanyAddress = () => t("common.company.address");

  const getShippingText = () => t("shipping.freeShippingText");
  const getDeliveryTime = () => t("shipping.deliveryTime");
  const getShippingCoverage = () => t("shipping.coverage");

  const getLegalNotices = () => ({
    vatNotice: t("legal.vatNotice"),
    termsNotice: t("legal.termsNotice"),
  });

  return {
    getCountryName,
    getCountryFullName,
    getPhoneNumber,
    getFreeShippingThreshold,
    getCompanyAddress,
    getShippingText,
    getDeliveryTime,
    getShippingCoverage,
    getLegalNotices,
  };
};
