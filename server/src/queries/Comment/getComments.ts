import Comment from '../../models/commentModel';

const getComments = async () => {
    try {
        const comments = await Comment.find();
        return comments;
    } catch (error) {
        console.error('Error getting comments:', error);
        throw new Error('Error getting comments');
    }
};

export default getComments;
