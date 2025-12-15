/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import { Gender, StatusAcount, type GenderTypeEnum, type StatusAcountTypeEnum } from "~/constant";

const useStudentTableFilter = () => {
  return useQueryStates({
    status: parseAsStringEnum<StatusAcountTypeEnum>(
      Object.values(StatusAcount)
    ),
    gender: parseAsStringEnum<GenderTypeEnum>(
      Object.values(Gender)
    ),
    keyword: parseAsString,
  });
};

export default useStudentTableFilter;
