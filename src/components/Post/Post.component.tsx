import { Link } from 'react-router-dom';
import { IPost } from 'utils/types';

interface PostProps {
    post: IPost
}

const Post: React.FC<PostProps> = ({ post }) => (
    <Link to={`/post/${post.id}`}>
        <div className="post-container">
            <p>{post.title}</p>
            <p>{post.body}</p>
        </div>
    </Link>
);

export default Post;
