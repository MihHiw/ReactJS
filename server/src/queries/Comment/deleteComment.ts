import Comment from '../../models/commentModel';

const deleteComment = async (id: string) => {
    return await Comment.findByIdAndDelete(id);
};

export default deleteComment;
