import Group, { IGroup } from '../../models/groupModel';

const getGroups = async (): Promise<IGroup[]> => {
    try {
        const groups = await Group.find();
        console.log('Groups:', groups);
        return groups;
    } catch (error) {
        console.error('Error fetching groups:', error);
        throw new Error('Unable to fetch groups');
    }
};

export default getGroups;
