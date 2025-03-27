import Person, { IPerson } from "../../models/personModel";

const createPerson = async (personData: Partial<IPerson>) => {
    const newPerson = new Person(personData);
    return await newPerson.save();
};

export default createPerson;