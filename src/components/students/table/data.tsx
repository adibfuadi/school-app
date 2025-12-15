import { BadgeAlertIcon, BadgeCheckIcon, Mars, Venus } from "lucide-react";
import { Gender, StatusAcount } from "~/constant";
import { transformOptions } from "~/lib/helper";

const statusIcons = {
  [StatusAcount.Active]: BadgeCheckIcon,
  [StatusAcount.Inactive]: BadgeAlertIcon,
};

export const statuses = transformOptions(
  Object.values(StatusAcount),
  statusIcons,
);

const genderIcons = {
  [Gender.Male]: Mars,
  [Gender.Female]: Venus,
};

export const genders = transformOptions(Object.values(Gender), genderIcons);
