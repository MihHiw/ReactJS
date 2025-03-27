import Person, { IPerson } from "../../models/personModel";

const UpdatePerson = async (id: string, personData: Partial<IPerson>) => {
    return await Person.findByIdAndUpdate(id, personData, { new: true });
};

export default UpdatePerson;