import CruiseFilters from "./Filters/CruiseFilters";
import CountdownSlice from "./VacationCountdown";

const Slices = {
    [CountdownSlice.reducerPath]: CountdownSlice.reducer,
    [CruiseFilters.reducerPath]: CruiseFilters.reducer
};

export default Slices;