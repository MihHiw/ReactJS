import Person, { IPerson } from "../../models/personModel";

const deletePerson = async (id: string) => {
    return await Person.findByIdAndDelete(id);
};
export default deletePerson;