import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RootObject {
  _id: string;
  allies: string[];
  enemies: string[];
  photoUrl: string;
  name: string;
  affiliation: string;
}

export const apiSlice = createApi({
  reducerPath: "lastAirBenderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://last-airbender-api.herokuapp.com/api/v1",
  }),
  endpoints(builder) {
    return {
      fetchlastAirBenderApi: builder.query<RootObject[], number | void>({
        query(perPage = 10) {
          return `/characters?perPage=${perPage}&page=1`;
        },
      }),
    };
  },
});

export const { useFetchlastAirBenderApiQuery } = apiSlice;
