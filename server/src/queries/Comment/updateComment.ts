import Comment, { IComment } from '../../models/commentModel';

const updateComment = async (id: string, commentData: Partial<IComment>) => {
    return await Comment.findByIdAndUpdate(id, commentData, { new: true });
};

export default updateComment;
