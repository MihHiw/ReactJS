import Comment, { IComment } from '../../models/commentModel';

const createComment = async (commentData: Partial<IComment>) => {
    const comment = new Comment(commentData);
    return await comment.save();
};

export default createComment;
