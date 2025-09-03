import { CruiseFilters } from "./Filters";
import CountdownSlice from "./VacationCountdown";

const Slices = {
    [CruiseFilters.reducerPath]: CruiseFilters.reducer,
    [CountdownSlice.reducerPath]: CountdownSlice.reducer
};

export default Slices;

