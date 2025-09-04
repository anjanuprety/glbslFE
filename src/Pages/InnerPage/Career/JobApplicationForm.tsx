import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Accurate BS/AD conversion using lookup tables
const startBSYear = 1970;

// Days in each BS month for each year (1970-2100)
const daysInBSMonths = [
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 1970
  [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30], // 1971
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 1972
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 1973
  [31, 31, 32, 30, 31, 31, 30, 29, 30, 29, 30, 30], // 1974
  [31, 31, 32, 32, 30, 31, 30, 29, 30, 29, 30, 30], // 1975
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 1976
  [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31], // 1977
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 1978
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 1979
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 1980
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 1981
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 1982
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 1983
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 1984
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 1985
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 1986
  [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 1987
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 1988
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 1989
  [30, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 1990
  [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 1991
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 30], // 1992
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 1993
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 1994
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 1995
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 1996
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 1997
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 1998
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 1999
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 29, 31], // 2000
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2001
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2002
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2003
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2004
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2005
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2006
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2007
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31], // 2008
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2009
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2010
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2011
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 2012
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2013
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2014
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2015
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 2016
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2017
  [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2018
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2019
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2020
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2021
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 2022
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2023
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2024
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2025
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2026
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2027
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2028
  [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30], // 2029
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2030
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2031
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2032
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2033
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2034
  [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31], // 2035
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2036
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2037
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2038
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 2039
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2040
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2041
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2042
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 2043
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2044
  [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2045
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2046
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2047
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2048
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 2049
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2050
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2051
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2052
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 2053
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2054
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2055
  [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30], // 2056
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2057
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2058
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2059
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2060
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2061
  [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31], // 2062
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2063
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2064
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2065
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31], // 2066
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2067
  [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2068
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2069
  [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30], // 2070
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2071
  [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2072
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31], // 2073
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2074
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2075
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 2076
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2077
  [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30], // 2078
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2079
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 2080
  [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30], // 2081
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], // 2082
  [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30], // 2083
  [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30], // 2084
  [31, 32, 31, 32, 31, 31, 30, 30, 29, 30, 30, 30], // 2085
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], // 2086
  [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30], // 2087
  [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30], // 2088
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], // 2089
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], // 2090
  [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30], // 2091
  [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30], // 2092
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], // 2093
  [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30], // 2094
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30], // 2095
  [30, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30], // 2096
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], // 2097
  [31, 31, 32, 31, 31, 31, 29, 30, 29, 30, 30, 31], // 2098
  [31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30], // 2099
  [31, 32, 31, 32, 30, 31, 30, 29, 30, 29, 30, 30]  // 2100
];

// New Year dates in AD for each BS year
const newYearBS = [
  new Date(1913, 3, 13), // 1970 (month is 0-indexed in JS)
  new Date(1914, 3, 13), // 1971
  new Date(1915, 3, 13), // 1972
  new Date(1916, 3, 13), // 1973
  new Date(1917, 3, 13), // 1974
  new Date(1918, 3, 12), // 1975
  new Date(1919, 3, 13), // 1976
  new Date(1920, 3, 13), // 1977
  new Date(1921, 3, 13), // 1978
  new Date(1922, 3, 13), // 1979
  new Date(1923, 3, 13), // 1980
  new Date(1924, 3, 13), // 1981
  new Date(1925, 3, 13), // 1982
  new Date(1926, 3, 13), // 1983
  new Date(1927, 3, 13), // 1984
  new Date(1928, 3, 13), // 1985
  new Date(1929, 3, 13), // 1986
  new Date(1930, 3, 13), // 1987
  new Date(1931, 3, 13), // 1988
  new Date(1932, 3, 13), // 1989
  new Date(1933, 3, 13), // 1990
  new Date(1934, 3, 13), // 1991
  new Date(1935, 3, 13), // 1992
  new Date(1936, 3, 13), // 1993
  new Date(1937, 3, 13), // 1994
  new Date(1938, 3, 13), // 1995
  new Date(1939, 3, 13), // 1996
  new Date(1940, 3, 13), // 1997
  new Date(1941, 3, 13), // 1998
  new Date(1942, 3, 13), // 1999
  new Date(1943, 3, 14), // 2000
  new Date(1944, 3, 13), // 2001
  new Date(1945, 3, 13), // 2002
  new Date(1946, 3, 13), // 2003
  new Date(1947, 3, 14), // 2004
  new Date(1948, 3, 13), // 2005
  new Date(1949, 3, 13), // 2006
  new Date(1950, 3, 13), // 2007
  new Date(1951, 3, 14), // 2008
  new Date(1952, 3, 13), // 2009
  new Date(1953, 3, 13), // 2010
  new Date(1954, 3, 13), // 2011
  new Date(1955, 3, 14), // 2012
  new Date(1956, 3, 13), // 2013
  new Date(1957, 3, 13), // 2014
  new Date(1958, 3, 13), // 2015
  new Date(1959, 3, 14), // 2016
  new Date(1960, 3, 13), // 2017
  new Date(1961, 3, 13), // 2018
  new Date(1962, 3, 13), // 2019
  new Date(1963, 3, 14), // 2020
  new Date(1964, 3, 13), // 2021
  new Date(1965, 3, 13), // 2022
  new Date(1966, 3, 13), // 2023
  new Date(1967, 3, 14), // 2024
  new Date(1968, 3, 13), // 2025
  new Date(1969, 3, 13), // 2026
  new Date(1970, 3, 14), // 2027
  new Date(1971, 3, 14), // 2028
  new Date(1972, 3, 13), // 2029
  new Date(1973, 3, 13), // 2030
  new Date(1974, 3, 14), // 2031
  new Date(1975, 3, 14), // 2032
  new Date(1976, 3, 13), // 2033
  new Date(1977, 3, 13), // 2034
  new Date(1978, 3, 14), // 2035
  new Date(1979, 3, 14), // 2036
  new Date(1980, 3, 13), // 2037
  new Date(1981, 3, 13), // 2038
  new Date(1982, 3, 14), // 2039
  new Date(1983, 3, 14), // 2040
  new Date(1984, 3, 13), // 2041
  new Date(1985, 3, 13), // 2042
  new Date(1986, 3, 14), // 2043
  new Date(1987, 3, 14), // 2044
  new Date(1988, 3, 13), // 2045
  new Date(1989, 3, 13), // 2046
  new Date(1990, 3, 14), // 2047
  new Date(1991, 3, 14), // 2048
  new Date(1992, 3, 13), // 2049
  new Date(1993, 3, 13), // 2050
  new Date(1994, 3, 14), // 2051
  new Date(1995, 3, 14), // 2052
  new Date(1996, 3, 13), // 2053
  new Date(1997, 3, 13), // 2054
  new Date(1998, 3, 14), // 2055
  new Date(1999, 3, 14), // 2056
  new Date(2000, 3, 13), // 2057
  new Date(2001, 3, 14), // 2058
  new Date(2002, 3, 14), // 2059
  new Date(2003, 3, 14), // 2060
  new Date(2004, 3, 13), // 2061
  new Date(2005, 3, 14), // 2062
  new Date(2006, 3, 14), // 2063
  new Date(2007, 3, 14), // 2064
  new Date(2008, 3, 13), // 2065
  new Date(2009, 3, 14), // 2066
  new Date(2010, 3, 14), // 2067
  new Date(2011, 3, 14), // 2068
  new Date(2012, 3, 13), // 2069
  new Date(2013, 3, 14), // 2070
  new Date(2014, 3, 14), // 2071
  new Date(2015, 3, 14), // 2072
  new Date(2016, 3, 13), // 2073
  new Date(2017, 3, 14), // 2074
  new Date(2018, 3, 14), // 2075
  new Date(2019, 3, 14), // 2076
  new Date(2020, 3, 13), // 2077
  new Date(2021, 3, 14), // 2078
  new Date(2022, 3, 14), // 2079
  new Date(2023, 3, 14), // 2080
  new Date(2024, 3, 13), // 2081
  new Date(2025, 3, 14), // 2082
  new Date(2026, 3, 14), // 2083
  new Date(2027, 3, 14), // 2084
  new Date(2028, 3, 13), // 2085
  new Date(2029, 3, 14), // 2086
  new Date(2030, 3, 14), // 2087
  new Date(2031, 3, 15), // 2088
  new Date(2032, 3, 14), // 2089
  new Date(2033, 3, 14), // 2090
  new Date(2034, 3, 14), // 2091
  new Date(2035, 3, 13), // 2092
  new Date(2036, 3, 14), // 2093
  new Date(2037, 3, 14), // 2094
  new Date(2038, 3, 14), // 2095
  new Date(2039, 3, 15), // 2096
  new Date(2040, 3, 13), // 2097
  new Date(2041, 3, 14), // 2098
  new Date(2042, 3, 14), // 2099
  new Date(2043, 3, 14)  // 2100
];

// Convert BS date to AD date using lookup tables (one-way conversion only)
const convertBStoAD = (bsDate: string): string => {
  if (!bsDate || bsDate.length !== 10) return '';
  
  try {
    const [bsYear, bsMonth, bsDay] = bsDate.split('-').map(Number);
    
    // Validate BS year range
    if (bsYear < startBSYear || bsYear > (startBSYear + newYearBS.length - 1)) {
      throw new Error('Year out of range');
    }
    
    // Validate month
    if (bsMonth < 1 || bsMonth > 12) {
      throw new Error('Invalid month');
    }
    
    const offset = bsYear - startBSYear;
    const newYearDayAD = newYearBS[offset];
    const daysInCurrentBSMonths = daysInBSMonths[offset];
    
    // Validate day
    if (bsDay < 1 || bsDay > daysInCurrentBSMonths[bsMonth - 1]) {
      throw new Error('Invalid day');
    }
    
    // Calculate total days from new year
    let dayDelta = 0;
    for (let i = 0; i < bsMonth - 1; i++) {
      dayDelta += daysInCurrentBSMonths[i];
    }
    dayDelta += bsDay - 1; // -1 because we start from new year day
    
    // Add days to new year date
    const resultDate = new Date(newYearDayAD);
    resultDate.setDate(resultDate.getDate() + dayDelta);
    
    const year = resultDate.getFullYear();
    const month = (resultDate.getMonth() + 1).toString().padStart(2, '0');
    const day = resultDate.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch {
    return '';
  }
};

// Calculate age from date of birth
const calculateAge = (dateOfBirth: string): string => {
  if (!dateOfBirth) return '';
  
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();
  
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  return `${years}Y ${months}M ${days}D`;
};

// Validation schema for the job application form
const validationSchema = Yup.object({
  // Personal Information
  fullName: Yup.string().required('Full Name is required'),
  fullNameNepali: Yup.string().required('नाम थर (देवनागरीमा) is required'),
  fatherName: Yup.string().required('Father\'s Name is required'),
  motherName: Yup.string().required('Mother\'s Name is required'),
  grandfatherName: Yup.string().required('Grandfather\'s Name is required'),
  dateOfBirth: Yup.date().required('Date of Birth is required'),
  dateOfBirthAD: Yup.date().required('Date of Birth (AD) is required'),
  age: Yup.string().required('Age is required'),
  gender: Yup.string().required('Gender is required'),
  maritalStatus: Yup.string().required('Marital Status is required'),
  nationality: Yup.string().required('Nationality is required'),
  
  // Address Information
  permanentAddress: Yup.string().required('Permanent Address is required'),
  temporaryAddress: Yup.string().required('Temporary Address is required'),
  sameAsPermAddress: Yup.boolean(),
  contactNumber: Yup.string().required('Contact Number is required'),
  alternateNumber: Yup.string(),
  email: Yup.string().email('Invalid email').required('Email is required'),
  
  // Citizenship Information
  citizenshipNumber: Yup.string().required('Citizenship Number is required'),
  citizenshipIssueDate: Yup.date().required('Citizenship Issue Date is required'),
  citizenshipIssuePlace: Yup.string().required('Citizenship Issue Place is required'),
  
  // Driving License Information
  hasDrivingLicense: Yup.boolean(),
  drivingLicenseCategory: Yup.string(),
  drivingLicenseNumber: Yup.string(),
  
  // Educational Qualifications
  slcYear: Yup.number().required('SLC/SEE Year is required'),
  slcGrade: Yup.string().required('SLC/SEE Grade is required'),
  slcBoard: Yup.string().required('SLC/SEE Board is required'),
  
  plusTwoYear: Yup.number(),
  plusTwoGrade: Yup.string(),
  plusTwoBoard: Yup.string(),
  
  bachelorYear: Yup.number(),
  bachelorGrade: Yup.string(),
  bachelorUniversity: Yup.string(),
  bachelorSubject: Yup.string(),
  
  masterYear: Yup.number(),
  masterGrade: Yup.string(),
  masterUniversity: Yup.string(),
  masterSubject: Yup.string(),
  
  // Work Experience
  hasWorkExperience: Yup.boolean(),
  workExperiences: Yup.array().of(
    Yup.object().shape({
      position: Yup.string(),
      company: Yup.string(),
      duration: Yup.string(),
      responsibilities: Yup.string(),
    })
  ),
  
  // Training and Certifications
  hasTrainingCertifications: Yup.boolean(),
  trainingCertifications: Yup.array().of(
    Yup.object().shape({
      title: Yup.string(),
      institution: Yup.string(),
      duration: Yup.string(),
      description: Yup.string(),
    })
  ),
  
  // Position Applied For
  positionAppliedFor: Yup.string().required('Position Applied For is required'),
});

// Initial form values
const initialValues = {
  // Personal Information
  fullName: '',
  fullNameNepali: '',
  fatherName: '',
  motherName: '',
  grandfatherName: '',
  age: '',
  gender: '',
  maritalStatus: '',
  nationality: 'Nepali',
  dateOfBirth: '',
  dateOfBirthAD: '',
  
  // Address Information
  permanentAddress: '',
  temporaryAddress: '',
  sameAsPermAddress: false,
  contactNumber: '',
  alternateNumber: '',
  email: '',
  
  // Citizenship Information
  citizenshipNumber: '',
  citizenshipIssueDate: '',
  citizenshipIssuePlace: '',
  
  // Driving License Information
  hasDrivingLicense: false,
  drivingLicenseCategory: '',
  drivingLicenseNumber: '',
  
  // Educational Qualifications
  slcYear: '',
  slcGrade: '',
  slcBoard: '',
  
  plusTwoYear: '',
  plusTwoGrade: '',
  plusTwoBoard: '',
  
  bachelorYear: '',
  bachelorGrade: '',
  bachelorUniversity: '',
  bachelorSubject: '',
  
  masterYear: '',
  masterGrade: '',
  masterUniversity: '',
  masterSubject: '',
  
  // Work Experience
  hasWorkExperience: false,
  workExperiences: [{ position: '', company: '', duration: '', responsibilities: '' }],
  
  // Training and Certifications
  hasTrainingCertifications: false,
  trainingCertifications: [{ title: '', institution: '', duration: '', description: '' }],
  
  // Position Applied For
  positionAppliedFor: '',
};

interface JobApplicationFormProps {
  onSubmit: (values: any, photo: File | null) => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string>('');

  const totalSteps = 5;

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPhotoError('');

    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setPhotoError('Please select an image file (JPEG, PNG, etc.)');
        return;
      }

      // Validate file size (300KB = 307200 bytes)
      if (file.size > 307200) {
        setPhotoError('Photo size must be less than 300KB');
        return;
      }

      setUploadedPhoto(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (values: any) => {
    onSubmit(values, uploadedPhoto);
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {Math.round((currentStep / totalSteps) * 100)}% Complete
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
        <div 
          className="bg-khaki h-2 rounded-full transition-all duration-300" 
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  const renderStepContent = (values: any, setFieldValue: any) => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-lightBlack dark:text-white font-Garamond mb-4">
              Personal Information / व्यक्तिगत विवरण
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name (English) / पूरा नाम (अंग्रेजीमा) *
                </label>
                <Field
                  name="fullName"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                />
                <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name (Nepali) / नाम थर (देवनागरीमा) *
                </label>
                <Field
                  name="fullNameNepali"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                />
                <ErrorMessage name="fullNameNepali" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Father's Name / बुबाको नाम *
                </label>
                <Field
                  name="fatherName"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                />
                <ErrorMessage name="fatherName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mother's Name / आमाको नाम *
                </label>
                <Field
                  name="motherName"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                />
                <ErrorMessage name="motherName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Grandfather's Name / हजुरबुबाको नाम *
                </label>
                <Field
                  name="grandfatherName"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                />
                <ErrorMessage name="grandfatherName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date of Birth (BS) / जन्म मिति (वि.सं.) *
                </label>
                <Field
                  name="dateOfBirth"
                  type="text"
                  placeholder="YYYY-MM-DD"
                  maxLength={10}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let value = e.target.value;
                    // Allow only numbers and hyphens, limit year to 4 digits
                    value = value.replace(/[^\d-]/g, '');
                    
                    // Format as YYYY-MM-DD
                    if (value.length >= 4 && value.indexOf('-') === -1) {
                      value = value.substring(0, 4) + '-' + value.substring(4);
                    }
                    if (value.length >= 7 && value.lastIndexOf('-') === 4) {
                      value = value.substring(0, 7) + '-' + value.substring(7, 9);
                    }
                    
                    setFieldValue('dateOfBirth', value);
                    // Auto-convert to AD and update the AD field
                    if (value.length === 10) {
                      const adDate = convertBStoAD(value);
                      setFieldValue('dateOfBirthAD', adDate);
                      // Auto-calculate and set age
                      if (adDate) {
                        const age = calculateAge(adDate);
                        setFieldValue('age', age);
                      }
                    }
                  }}
                />
                <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date of Birth (AD) / जन्म मिति (इ.सं.) *
                </label>
                <Field
                  name="dateOfBirthAD"
                  type="text"
                  placeholder="YYYY-MM-DD"
                  maxLength={10}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let value = e.target.value;
                    // Allow only numbers and hyphens, limit year to 4 digits
                    value = value.replace(/[^\d-]/g, '');
                    
                    // Format as YYYY-MM-DD
                    if (value.length >= 4 && value.indexOf('-') === -1) {
                      value = value.substring(0, 4) + '-' + value.substring(4);
                    }
                    if (value.length >= 7 && value.lastIndexOf('-') === 4) {
                      value = value.substring(0, 7) + '-' + value.substring(7, 9);
                    }
                    
                    setFieldValue('dateOfBirthAD', value);
                    // Note: AD field changes don't affect BS field to avoid mapping inaccuracies
                  }}
                />
                <ErrorMessage name="dateOfBirthAD" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Age / उमेर *
                </label>
                <Field
                  name="age"
                  type="text"
                  placeholder="Format: 21Y 8M 15D"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let value = e.target.value.toUpperCase();
                    
                    // Remove any characters that aren't numbers, Y, M, D, or spaces
                    value = value.replace(/[^0-9YMD\s]/g, '');
                    
                    // Smart formatting: if user types numbers, auto-add Y M D
                    if (/^\d+$/.test(value) && value.length <= 2) {
                      // Just years entered
                      value = value + 'Y 0M 0D';
                    } else if (/^\d+\s+\d+$/.test(value)) {
                      // Years and months entered
                      const parts = value.split(/\s+/);
                      value = parts[0] + 'Y ' + parts[1] + 'M 0D';
                    } else if (/^\d+\s+\d+\s+\d+$/.test(value)) {
                      // Years, months, and days entered
                      const parts = value.split(/\s+/);
                      value = parts[0] + 'Y ' + parts[1] + 'M ' + parts[2] + 'D';
                    }
                    
                    // Ensure proper format with regex replacement
                    value = value.replace(/(\d+)Y?\s*(\d+)M?\s*(\d+)D?/g, '$1Y $2M $3D');
                    
                    setFieldValue('age', value);
                  }}
                />
                <ErrorMessage name="age" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gender / लिङ्ग *
                </label>
                <Field
                  as="select"
                  name="gender"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                >
                  <option value="">Select Gender / लिङ्ग छन्नुहोस्</option>
                  <option value="male">Male / पुरुष</option>
                  <option value="female">Female / महिला</option>
                  <option value="other">Other / अन्य</option>
                </Field>
                <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Marital Status / वैवाहिक स्थिति *
                </label>
                <Field
                  as="select"
                  name="maritalStatus"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                >
                  <option value="">Select Status / स्थिति छन्नुहोस्</option>
                  <option value="single">Single / अविवाहित</option>
                  <option value="married">Married / विवाहित</option>
                  <option value="divorced">Divorced / सम्बन्ध विच्छेद</option>
                  <option value="widowed">Widowed / विधवा/विधुर</option>
                </Field>
                <ErrorMessage name="maritalStatus" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nationality / राष्ट्रियता *
                </label>
                <Field
                  name="nationality"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                />
                <ErrorMessage name="nationality" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-lightBlack dark:text-white font-Garamond mb-4">
              Contact Information / सम्पर्क विवरण
            </h3>
            
            <div className="grid md:grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Permanent Address / स्थायी ठेगाना *
                </label>
                <Field
                  as="textarea"
                  name="permanentAddress"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                />
                <ErrorMessage name="permanentAddress" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Temporary Address / अस्थायी ठेगाना *
                </label>
                <div className="mb-2">
                  <label className="flex items-center space-x-2">
                    <Field
                      name="sameAsPermAddress"
                      type="checkbox"
                      className="w-4 h-4 text-khaki bg-gray-100 border-gray-300 rounded focus:ring-khaki focus:ring-2"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue('sameAsPermAddress', e.target.checked);
                        if (e.target.checked) {
                          setFieldValue('temporaryAddress', values.permanentAddress);
                        } else {
                          setFieldValue('temporaryAddress', '');
                        }
                      }}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Same as permanent address / स्थायी ठेगाना जस्तै
                    </span>
                  </label>
                </div>
                <Field
                  as="textarea"
                  name="temporaryAddress"
                  rows={3}
                  disabled={values.sameAsPermAddress}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white disabled:bg-gray-100 disabled:text-gray-500"
                />
                <ErrorMessage name="temporaryAddress" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contact Number / सम्पर्क नम्बर *
                  </label>
                  <Field
                    name="contactNumber"
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="contactNumber" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Alternate Number / वैकल्पिक नम्बर
                  </label>
                  <Field
                    name="alternateNumber"
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="alternateNumber" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address / इमेल ठेगाना *
                </label>
                <Field
                  name="email"
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <h4 className="text-lg font-semibold text-lightBlack dark:text-white font-Garamond mt-8 mb-4">
              Citizenship Information / नागरिकता विवरण
            </h4>

            <div className="grid md:grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Citizenship Number / नागरिकता नम्बर *
                </label>
                <Field
                  name="citizenshipNumber"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                />
                <ErrorMessage name="citizenshipNumber" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Issue Date / जारी मिति *
                  </label>
                  <Field
                    name="citizenshipIssueDate"
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="citizenshipIssueDate" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Issue Place / जारी गर्ने ठाउँ *
                  </label>
                  <Field
                    name="citizenshipIssuePlace"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="citizenshipIssuePlace" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-lightBlack dark:text-white font-Garamond mt-8 mb-4">
              Driving License Information / सवारी चालक अनुमतिपत्र विवरण
            </h4>

            <div className="grid md:grid-cols-1 gap-4">
              <div>
                <label className="flex items-center space-x-2 mb-4">
                  <Field
                    name="hasDrivingLicense"
                    type="checkbox"
                    className="w-4 h-4 text-khaki bg-gray-100 border-gray-300 rounded focus:ring-khaki focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    I have a driving license / मसँग सवारी चालक अनुमतिपत्र छ
                  </span>
                </label>
              </div>

              {values.hasDrivingLicense && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      License Category / अनुमतिपत्र श्रेणी
                    </label>
                    <Field
                      as="select"
                      name="drivingLicenseCategory"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                    >
                      <option value="">Select Category / श्रेणी छन्नुहोस्</option>
                      <option value="bike">Bike / मोटरसाइकल</option>
                      <option value="scooter">Scooter / स्कुटर</option>
                      <option value="car_jeep">Car/Jeep / कार/जीप</option>
                      <option value="multiple">Multiple Categories / धेरै श्रेणी</option>
                    </Field>
                    <ErrorMessage name="drivingLicenseCategory" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      License Number / अनुमतिपत्र नम्बर
                    </label>
                    <Field
                      name="drivingLicenseNumber"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                    />
                    <ErrorMessage name="drivingLicenseNumber" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-lightBlack dark:text-white font-Garamond mb-4">
              Educational Qualifications / शैक्षिक योग्यता
            </h3>
            
            {/* SLC/SEE */}
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h4 className="text-lg font-medium text-lightBlack dark:text-white mb-4">
                SLC/SEE
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Year / वर्ष *
                  </label>
                  <Field
                    name="slcYear"
                    type="number"
                    min="1980"
                    max="2030"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="slcYear" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Grade/Division / श्रेणी *
                  </label>
                  <Field
                    name="slcGrade"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="slcGrade" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Board / बोर्ड *
                  </label>
                  <Field
                    name="slcBoard"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="slcBoard" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            </div>

            {/* +2/Intermediate */}
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h4 className="text-lg font-medium text-lightBlack dark:text-white mb-4">
                +2/Intermediate / उच्च माध्यमिक
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Year / वर्ष
                  </label>
                  <Field
                    name="plusTwoYear"
                    type="number"
                    min="1980"
                    max="2030"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="plusTwoYear" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Grade/Division / श्रेणी
                  </label>
                  <Field
                    name="plusTwoGrade"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="plusTwoGrade" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Board / बोर्ड
                  </label>
                  <Field
                    name="plusTwoBoard"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="plusTwoBoard" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            </div>

            {/* Bachelor */}
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h4 className="text-lg font-medium text-lightBlack dark:text-white mb-4">
                Bachelor's Degree / स्नातक
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Year / वर्ष
                  </label>
                  <Field
                    name="bachelorYear"
                    type="number"
                    min="1980"
                    max="2030"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="bachelorYear" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Grade/Division / श्रेणी
                  </label>
                  <Field
                    name="bachelorGrade"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="bachelorGrade" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    University / विश्वविद्यालय
                  </label>
                  <Field
                    name="bachelorUniversity"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="bachelorUniversity" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject / विषय
                  </label>
                  <Field
                    name="bachelorSubject"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="bachelorSubject" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            </div>

            {/* Master */}
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h4 className="text-lg font-medium text-lightBlack dark:text-white mb-4">
                Master's Degree / स्नातकोत्तर
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Year / वर्ष
                  </label>
                  <Field
                    name="masterYear"
                    type="number"
                    min="1980"
                    max="2030"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="masterYear" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Grade/Division / श्रेणी
                  </label>
                  <Field
                    name="masterGrade"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="masterGrade" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    University / विश्वविद्यालय
                  </label>
                  <Field
                    name="masterUniversity"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="masterUniversity" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject / विषय
                  </label>
                  <Field
                    name="masterSubject"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="masterSubject" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-lightBlack dark:text-white font-Garamond mb-4">
              Work Experience & Training / कार्य अनुभव र तालिम
            </h3>
            
            <div>
              <label className="flex items-center space-x-2">
                <Field
                  name="hasWorkExperience"
                  type="checkbox"
                  className="w-4 h-4 text-khaki bg-gray-100 border-gray-300 rounded focus:ring-khaki focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  I have work experience / मसँग कार्य अनुभव छ
                </span>
              </label>
            </div>

            {values.hasWorkExperience && (
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <h4 className="text-lg font-medium text-lightBlack dark:text-white mb-4">
                  Work Experience Details / कार्य अनुभवको विवरण
                </h4>
                {values.workExperiences.map((experience: any, index: number) => (
                  <div key={index} className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 mb-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Position / पद
                        </label>
                        <Field
                          name={`workExperiences.${index}.position`}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Company / कम्पनी
                        </label>
                        <Field
                          name={`workExperiences.${index}.company`}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Duration / अवधि
                        </label>
                        <Field
                          name={`workExperiences.${index}.duration`}
                          type="text"
                          placeholder="e.g., Jan 2020 - Dec 2022"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Key Responsibilities / मुख्य जिम्मेवारीहरू
                        </label>
                        <Field
                          as="textarea"
                          name={`workExperiences.${index}.responsibilities`}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                        />
                      </div>
                    </div>
                    {values.workExperiences.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newExperiences = values.workExperiences.filter((_: any, i: number) => i !== index);
                          setFieldValue('workExperiences', newExperiences);
                        }}
                        className="mt-2 text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove Experience / अनुभव हटाउनुहोस्
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newExperiences = [...values.workExperiences, { position: '', company: '', duration: '', responsibilities: '' }];
                    setFieldValue('workExperiences', newExperiences);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors duration-300"
                >
                  Add Another Experience / अर्को अनुभव थप्नुहोस्
                </button>
              </div>
            )}

            <div>
              <label className="flex items-center space-x-2">
                <Field
                  name="hasTrainingCertifications"
                  type="checkbox"
                  className="w-4 h-4 text-khaki bg-gray-100 border-gray-300 rounded focus:ring-khaki focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  I have training or certifications / मसँग तालिम वा प्रमाणपत्रहरू छन्
                </span>
              </label>
            </div>

            {values.hasTrainingCertifications && (
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <h4 className="text-lg font-medium text-lightBlack dark:text-white mb-4">
                  Training & Certifications / तालिम र प्रमाणपत्रहरू
                </h4>
                {values.trainingCertifications.map((training: any, index: number) => (
                  <div key={index} className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 mb-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Training/Certification Title / तालिम/प्रमाणपत्रको शीर्षक
                        </label>
                        <Field
                          name={`trainingCertifications.${index}.title`}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Institution / संस्था
                        </label>
                        <Field
                          name={`trainingCertifications.${index}.institution`}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Duration / अवधि
                        </label>
                        <Field
                          name={`trainingCertifications.${index}.duration`}
                          type="text"
                          placeholder="e.g., 3 months, 2021"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Description / विवरण
                        </label>
                        <Field
                          as="textarea"
                          name={`trainingCertifications.${index}.description`}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                        />
                      </div>
                    </div>
                    {values.trainingCertifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newTrainings = values.trainingCertifications.filter((_: any, i: number) => i !== index);
                          setFieldValue('trainingCertifications', newTrainings);
                        }}
                        className="mt-2 text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove Training / तालिम हटाउनुहोस्
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newTrainings = [...values.trainingCertifications, { title: '', institution: '', duration: '', description: '' }];
                    setFieldValue('trainingCertifications', newTrainings);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors duration-300"
                >
                  Add Another Training / अर्को तालिम थप्नुहोस्
                </button>
              </div>
            )}

            <h4 className="text-lg font-semibold text-lightBlack dark:text-white font-Garamond mt-8 mb-4">
              Position Applied For / आवेदन दिएको पद
            </h4>

            <div className="grid md:grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Position Applied For / आवेदन दिएको पद *
                </label>
                <Field
                  name="positionAppliedFor"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                />
                <ErrorMessage name="positionAppliedFor" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-lightBlack dark:text-white font-Garamond mb-4">
              Photo Upload / तस्बिर अपलोड
            </h3>
            
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
              <div className="text-center">
                <div className="mb-4">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                
                <div className="mb-4">
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer bg-khaki hover:bg-opacity-90 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300"
                  >
                    Select Photo / तस्बिर छन्नुहोस्
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  PNG, JPG, JPEG files up to 300KB / PNG, JPG, JPEG फाइलहरू ३०० KB सम्म
                </p>
                
                {photoError && (
                  <p className="text-red-500 text-sm mt-2">{photoError}</p>
                )}
              </div>
              
              {photoPreview && (
                <div className="mt-6 text-center">
                  <img
                    src={photoPreview}
                    alt="Photo preview"
                    className="mx-auto h-32 w-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                  <p className="text-sm text-green-600 mt-2">
                    Photo uploaded successfully / तस्बिर सफलतापूर्वक अपलोड भयो
                  </p>
                </div>
              )}
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                Photo Requirements / तस्बिरका आवश्यकताहरू:
              </h4>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• Passport size photo / राहदानी साइजको तस्बिर</li>
                <li>• Clear and recent photo / स्पष्ट र हालको तस्बिर</li>
                <li>• Maximum file size: 300KB / अधिकतम फाइल साइज: ३०० KB</li>
                <li>• Supported formats: JPG, JPEG, PNG / समर्थित ढाँचा: JPG, JPEG, PNG</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="max-w-4xl mx-auto bg-white dark:bg-normalBlack border border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-lg">
          {renderProgressBar()}
          
          {renderStepContent(values, setFieldValue)}
          
          <div className="flex justify-between pt-8 border-t border-gray-200 dark:border-gray-600 mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="px-6 py-2 rounded-md font-medium transition-colors duration-300 bg-green-600 text-white hover:bg-green-700"
              >
                Previous / अघिल्लो
              </button>
            )}
            
            <div className={currentStep === 1 ? 'ml-auto' : ''}>
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-khaki text-white rounded-md font-medium hover:bg-opacity-90 transition-colors duration-300"
                >
                  Next / अर्को
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors duration-300"
                >
                  Submit Application / आवेदन पेश गर्नुहोस्
                </button>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default JobApplicationForm;
