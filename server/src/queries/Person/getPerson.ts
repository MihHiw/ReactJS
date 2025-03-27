import Person from '../../models/personModel'

const getPerson = async () => {
    try {
        const person = await Person.find();
        return person;

    } catch (error) {
        throw new Error('Error getting comments');

    }
}
export default getPerson;