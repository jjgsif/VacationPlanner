import { ShipList } from "@components/Common";
import PageTemplate from "@components/templates/PageTemplate";

const VacationCalendar = () => {
    return (
        <PageTemplate
            content={<ShipList />}
            headerShown
        />
    )
};

export default VacationCalendar;